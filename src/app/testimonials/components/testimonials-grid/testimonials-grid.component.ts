import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IUserCommentList } from '../../../models/IUserCommentList';
import { LoadingService } from '../../../core/services/loading.service';
import { UserHttpService } from '../../../core/services/user-http.service';

@Component({
  selector: 'hw-testimonials-grid',
  templateUrl: './testimonials-grid.component.html',
  styleUrl: './testimonials-grid.component.css'
})
export class TestimonialsGridComponent implements OnInit {
  baseUrl = environment.apiBaseUrl;
  testimonialsList: IUserCommentList[] = [];

  constructor(private loadingService: LoadingService,
    private userHttpService: UserHttpService
  ) {

  }

  ngOnInit(): void {
    this.loadingService.show();
    this.userHttpService.getApprovedUserComments(0).subscribe({
      next: (response) => {
        this.testimonialsList = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  chunk(arr: TestimonialModel[], chunkSize: number): TestimonialModel[][] {
    const chunks: TestimonialModel[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

class TestimonialModel {
  Image: string;
  FullName: string;
  Text: string;
  constructor(image: string, fullName: string, text: string) {
    this.Image = image;
    this.FullName = fullName;
    this.Text = text;
  }
}
