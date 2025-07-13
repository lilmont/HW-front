import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportVideoListComponent } from './support-video-list.component';

describe('SupportVideoListComponent', () => {
  let component: SupportVideoListComponent;
  let fixture: ComponentFixture<SupportVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportVideoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
