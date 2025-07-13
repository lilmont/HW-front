import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportVideoDetailComponent } from './support-video-detail.component';

describe('SupportVideoDetailComponent', () => {
  let component: SupportVideoDetailComponent;
  let fixture: ComponentFixture<SupportVideoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportVideoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportVideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
