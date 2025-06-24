import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportVideosComponent } from './support-videos.component';

describe('SupportVideosComponent', () => {
  let component: SupportVideosComponent;
  let fixture: ComponentFixture<SupportVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
