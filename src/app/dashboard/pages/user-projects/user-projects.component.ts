import { Component, OnInit } from '@angular/core';
import { IProject, IProjectList, Project, ProjectList } from '../../../models/IProject';
import { ProjectHttpService } from '../../../core/services/project-http.service';
import { Messages } from '../../../texts/messages';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrl: './user-projects.component.css'
})
export class UserProjectsComponent implements OnInit {
  Messages = Messages;
  projectList: IProjectList = new ProjectList();
  isModalOpen: boolean = false;
  titleInvalid = false;
  descriptionInvalid = false;
  previewLinkInvalid = false;
  downloadLinkInvalid = false;
  selectedImage: File | null = null;
  imageInvalid = false;
  selectedProject: IProject = new Project();

  constructor(private projectHttpService: ProjectHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.projectHttpService.getAllUserProjects().subscribe({
      next: (data) => {
        this.projectList = data
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  onAddClick(): void {
    this.selectedProject = new Project();
    this.openModal();
  }

  onEditClick(project: IProject): void {
    this.selectedProject = { ...project };
    this.openModal();
  }

  onSave(project: IProject): void {
    project.title = project.title?.trim();
    project.description = project.description?.trim();
    project.previewLink = project.previewLink?.trim();
    project.downloadLink = project.downloadLink?.trim();

    this.titleInvalid = !project.title;
    this.descriptionInvalid = !project.description;
    this.previewLinkInvalid = !project.previewLink || !this.isValidUrl(project.previewLink);
    this.downloadLinkInvalid = !project.downloadLink || !this.isValidUrl(project.downloadLink);

    if (this.titleInvalid || this.descriptionInvalid || this.previewLinkInvalid || this.downloadLinkInvalid) {
      return;
    }

    if (!project.id && !this.selectedImage) {
      this.imageInvalid = true;
      return;
    }

    const formData = new FormData();
    if (project.id) formData.append('Id', project.id.toString());
    formData.append('Title', project.title);
    formData.append('Description', project.description);
    formData.append('PreviewLink', project.previewLink);
    formData.append('DownloadLink', project.downloadLink);

    if (this.selectedImage) {
      formData.append('ProjectImageFile', this.selectedImage, this.selectedImage.name);
    }
    const request$ = project.id
      ? this.projectHttpService.editProject(formData)
      : this.projectHttpService.addProject(formData);

    request$.subscribe({
      next: (savedProject) => {
        if (project.id) {
          // Replace in list
          const index = this.projectList.userProjects.findIndex(p => p.id === savedProject.id);
          if (index > -1) this.projectList.userProjects[index] = savedProject;
        } else {
          this.projectList.userProjects.push(savedProject);
        }
        this.closeModal();
      },
      error: () => { } // toast already handled
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch (_) {
      return false;
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.selectedImage = file;
  }
}
