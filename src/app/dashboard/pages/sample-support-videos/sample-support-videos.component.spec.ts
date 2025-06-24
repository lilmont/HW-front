import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleSupportVideosComponent } from './sample-support-videos.component';

describe('SampleSupportVideosComponent', () => {
  let component: SampleSupportVideosComponent;
  let fixture: ComponentFixture<SampleSupportVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SampleSupportVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleSupportVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
