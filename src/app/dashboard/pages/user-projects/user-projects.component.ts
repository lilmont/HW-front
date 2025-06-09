import { Component, OnInit } from '@angular/core';
import { IProject, Project } from '../../../models/IProject';
import { ProjectHttpService } from '../../../core/services/project-http.service';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrl: './user-projects.component.css'
})
export class UserProjectsComponent implements OnInit {
  Messages = Messages;
  projects: IProject[] = [];
  isModalOpen: boolean = false;
  titleInvalid = false;
  descriptionInvalid = false;
  previewLinkInvalid = false;
  downloadLinkInvalid = false;
  selectedImage: File | null = null;
  imageInvalid = false;
  selectedProject: IProject = new Project();

  constructor(private projectHttpService: ProjectHttpService) { }

  ngOnInit(): void {
    this.projectHttpService.getAllUserProjects().subscribe({
      next: (data) => {
        this.projects = data
      },
      error: () => { }
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
          const index = this.projects.findIndex(p => p.id === savedProject.id);
          if (index > -1) this.projects[index] = savedProject;
        } else {
          this.projects.push(savedProject);
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
