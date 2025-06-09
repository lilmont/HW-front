import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../models/IProject';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  @Input() project!: IProject;
  @Output() edit = new EventEmitter<IProject>();

  constructor(private toastr: ToastService) { }

  editProject(project: IProject): void {
    if (project.projectStatus == 1) {
      this.toastr.error(Messages.Errors.cannotEditConfirmedProject, Messages.Errors.error);
      return;
    }

    this.edit.emit(project)
  }
}
