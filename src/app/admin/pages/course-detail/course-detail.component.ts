import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { environment } from '../../../../environments/environment';
import { CourseHttpService } from '../../services/course-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uniqueSessionNumberValidator } from '../../validators/custom-validators';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'hw-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  isAddMode: boolean = true;
  Messages = Messages;
  baseUrl = environment.apiBaseUrl;
  courseForm!: FormGroup;
  courseId?: number = undefined;

  videoPreviewUrl?: string;
  imageCoverPreviewUrl?: string;
  imagePreviewUrl?: string;

  constructor(private route: ActivatedRoute,
    private loadingService: LoadingService,
    private courseHttpService: CourseHttpService,
    private toastr: ToastService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      fullDescription: ['', Validators.required],
      courseSessionNumber: [1, [Validators.required, Validators.min(1)]],
      courseDurationInHours: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      syllabus: ['', Validators.required],
      isPurchasable: [true],
      showOrder: [0, [Validators.required, Validators.min(1)]],
      spotPlayerProductId: ['', Validators.required],
      courseStatus: [0, Validators.required],
      sessions: this.fb.array([], uniqueSessionNumberValidator),
      dateCreated: [null],
      isAffiliate: [true],

      courseImage: [''],
      courseImageFile: [null],
      courseCoverImage: [''],
      courseCoverImageFile: [null],
      courseVideo: [''],
      courseVideoFile: [null]
    });

    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('id'));
      this.isAddMode = !this.courseId;

      const imgFileCtrl = this.courseForm.get('courseImageFile');
      const coverFileCtrl = this.courseForm.get('courseCoverImageFile');
      const videoFileCtrl = this.courseForm.get('courseVideoFile');

      if (this.isAddMode) {
        imgFileCtrl?.setValidators(Validators.required);
        coverFileCtrl?.setValidators(Validators.required);
        videoFileCtrl?.setValidators(Validators.required);
      } else {
        imgFileCtrl?.clearValidators();
        coverFileCtrl?.clearValidators();
        videoFileCtrl?.clearValidators();
      }

      imgFileCtrl?.updateValueAndValidity();
      coverFileCtrl?.updateValueAndValidity();
      videoFileCtrl?.updateValueAndValidity();

      if (!this.isAddMode) {
        this.getCourseDetail(this.courseId);
      }
    });
  }
  getCourseDetail(id: number): void {
    this.loadingService.show();
    this.courseHttpService.getCourseDetail(id).subscribe({
      next: (response) => {
        if (response.success) {
          const course = response.data;

          // Populate simple fields
          this.courseForm.patchValue({
            id: course.id,
            title: course.title,
            description: course.description,
            fullDescription: course.fullDescription,
            courseSessionNumber: course.courseSessionNumber,
            courseDurationInHours: course.courseDurationInHours,
            price: course.price,
            syllabus: course.syllabus,
            isPurchasable: course.isPurchasable,
            showOrder: course.showOrder,
            spotPlayerProductId: course.spotPlayerProductId,
            courseStatus: course.courseStatus,
            dateCreated: course.dateCreated,
            courseImage: course.courseImage,
            courseCoverImage: course.courseCoverImage,
            courseVideo: course.courseVideo,
            isAffiliate: course.isAffiliate,
          });

          // Populate sessions
          this.sessions.clear();
          if (course.sessions?.length) {
            course.sessions.forEach(session => {
              this.sessions.push(this.fb.group({
                id: [session.id],
                title: [session.title, Validators.required],
                description: [session.description],
                number: [session.number, [Validators.required, Validators.min(1)]],
                downloadLink: [session.downloadLink, Validators.required]
              }));
            });
          }
        } else {
          this.toastr.error(Messages.Errors.invalidRequest, Messages.Errors.error);
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  get courseImageUrl(): string {
    return this.imagePreviewUrl
      ? this.imagePreviewUrl
      : `${this.baseUrl}/uploads/courses/images/${this.courseForm.get('courseImage')?.value}`;
  }

  get courseCoverImageUrl(): string {
    return this.imageCoverPreviewUrl
      ? this.imageCoverPreviewUrl
      : `${this.baseUrl}/uploads/courses/images/${this.courseForm.get('courseCoverImage')?.value}`;
  }

  get courseVideoUrl(): string {
    return this.videoPreviewUrl
      ? this.videoPreviewUrl
      : `${this.baseUrl}/uploads/courses/videos/${this.courseForm.get('courseVideo')?.value}`;
  }

  get sessions(): FormArray {
    return this.courseForm.get('sessions') as FormArray;
  }

  addSession() {
    const numbers = this.sessions.controls
      .map(control => control.get('number')?.value)
      .filter(n => n != null);
    const nextNumber = numbers.length != 0 ? Math.max(...numbers) + 1 : 1;

    const sessionGroup = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      number: [nextNumber, [Validators.required, Validators.min(1)]],
      downloadLink: ['', Validators.required]
    });

    this.sessions.push(sessionGroup);
  }

  deleteSession(index: number) {
    this.sessions.removeAt(index);
  }
  get hasDuplicateSessionNumber() {
    return this.sessions.errors?.['duplicateSessionNumber'];
  }

  onCourseImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imagePreviewUrl = undefined;
      this.courseForm.get('courseImageFile')?.setValue(null);
      return;
    }

    const file = input.files[0];

    // Clean previous preview
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }

    // Create preview URL
    this.imagePreviewUrl = URL.createObjectURL(file);
    this.courseForm.get('courseImageFile')?.setValue(file);
  }
  onCourseCoverImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imageCoverPreviewUrl = undefined;
      this.courseForm.get('courseCoverImageFile')?.setValue(null);
      return;
    }

    const file = input.files[0];

    // Clean previous preview
    if (this.imageCoverPreviewUrl) {
      URL.revokeObjectURL(this.imageCoverPreviewUrl);
    }

    // Create preview URL
    this.imageCoverPreviewUrl = URL.createObjectURL(file);
    this.courseForm.get('courseCoverImageFile')?.setValue(file);
  }

  onVideoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.videoPreviewUrl = undefined;
      this.courseForm.get('courseVideoFile')?.setValue(null);
      return;
    }

    const file = input.files[0];

    // Revoke previous preview URL if it exists
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }

    // Create a preview URL from the file
    this.videoPreviewUrl = URL.createObjectURL(file);
    this.courseForm.get('courseVideoFile')?.setValue(file);
    this.cdr.detectChanges();
  }

  // Cleanup object URL when component is destroyed
  ngOnDestroy(): void {
    if (this.videoPreviewUrl) {
      URL.revokeObjectURL(this.videoPreviewUrl);
    }
    if (this.imagePreviewUrl) {
      URL.revokeObjectURL(this.imagePreviewUrl);
    }
    if (this.imageCoverPreviewUrl) {
      URL.revokeObjectURL(this.imageCoverPreviewUrl);
    }
  }

  AddOrEditCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const formValues = this.courseForm.value;
    const formData = new FormData();

    formData.append('Id', formValues.id ?? '');
    formData.append('Title', formValues.title);
    formData.append('Description', formValues.description);
    formData.append('FullDescription', formValues.fullDescription);
    formData.append('CourseSessionNumber', formValues.courseSessionNumber.toString());
    formData.append('CourseDurationInHours', formValues.courseDurationInHours.toString());
    formData.append('Price', formValues.price.toString().replace(/,/g, ''));
    formData.append('Syllabus', formValues.syllabus);
    formData.append('IsPurchasable', formValues.isPurchasable);
    formData.append('ShowOrder', formValues.showOrder);
    formData.append('SpotPlayerProductId', formValues.spotPlayerProductId);
    formData.append('CourseStatus', formValues.courseStatus.toString());
    formData.append('IsAffiliate', formValues.isAffiliate);

    // Sessions (array)
    formValues.sessions.forEach((session: any, index: number) => {
      formData.append(`Sessions[${index}].Id`, session.id ?? '');
      formData.append(`Sessions[${index}].Title`, session.title);
      formData.append(`Sessions[${index}].Description`, session.description);
      formData.append(`Sessions[${index}].Number`, session.number.toString());
      formData.append(`Sessions[${index}].DownloadLink`, session.downloadLink);
    });

    // File uploads
    if (this.courseForm.get('courseImageFile')) {
      formData.append('CourseImageFile', this.courseForm.get('courseImageFile')?.value);
    }
    if (this.courseForm.get('courseCoverImageFile')) {
      formData.append('CourseCoverImageFile', this.courseForm.get('courseCoverImageFile')?.value);
    }
    if (this.courseForm.get('courseVideoFile')) {
      formData.append('CourseVideoFile', this.courseForm.get('courseVideoFile')?.value);
    }

    this.loadingService.show();

    const apiCall = this.isAddMode
      ? this.courseHttpService.addCourse(formData)
      : this.courseHttpService.editCourse(formData);

    apiCall.subscribe({
      next: (response) => {
        if (response.success) {
          this.toastr.success(this.isAddMode ? Messages.Success.courseAddedSuccessfully : Messages.Success.courseEditedSuccessfully, '');
          if (this.isAddMode)
            this.router.navigate(['/mazmon/courses']);
          else
            location.reload();
        } else {
          this.toastr.error(response.data ?? Messages.Errors.invalidRequest, Messages.Errors.error)
        }
        this.loadingService.hide();
      },
      error: () => {

        this.loadingService.hide();
      },
    });
  }
}
