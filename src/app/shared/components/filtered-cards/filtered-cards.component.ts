import { Component, Input, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ProjectHttpService } from '../../../core/services/project-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IProjectCategory } from '../../../models/IProjectCategory';
import { IProjectCard } from '../../../models/IProjectCard';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'hw-filtered-cards',
  templateUrl: './filtered-cards.component.html',
  styleUrl: './filtered-cards.component.css'
})
export class FilteredCardsComponent implements OnInit {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  labels: IProjectCategory[] = [];
  cards: IProjectCard[] = [];
  selectedLabelId: number = 0;

  @Input() isRecentProjects: boolean = false;

  constructor(private projectHttpService: ProjectHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getRecentProjects();
  }

  getCategories(): void {
    this.loadingService.show();
    this.projectHttpService.getAllProjectCategories().subscribe({
      next: (data) => {
        this.labels = data;
        this.labels.unshift({ id: 0, title: Messages.Buttons.all });
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  getRecentProjects(): void {
    const count = this.isRecentProjects == true ? 5 : 0;
    const categoryId = this.selectedLabelId === 0 ? null : this.selectedLabelId;

    this.loadingService.show();
    this.projectHttpService.getRecentProjects(count, categoryId).subscribe({
      next: (data) => {
        this.cards = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  filterCards(labelId: number) {
    this.selectedLabelId = labelId;
    this.getRecentProjects();
  }
}
