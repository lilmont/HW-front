import { Component, Input } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { IUserCourseCard } from '../../../models/IUserCourseCard';
import { Router } from '@angular/router';

@Component({
  selector: 'hw-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  copied = false;
  @Input() courseCard: IUserCourseCard | undefined;

  constructor(private router: Router) { }
  navigateToCoursePage(): void {
    if (!this.courseCard) return;
    this.router.navigate(['/courses', this.courseCard.courseId, this.toSlug(this.courseCard.courseTitle)]);
  }

  toSlug(title: string): string {
    return title
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-');
  }

  copyLicenseCommand(input: HTMLInputElement): void {
    const text = input.value;

    // Fallback for disabled input
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show "Copied" state
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }
}
