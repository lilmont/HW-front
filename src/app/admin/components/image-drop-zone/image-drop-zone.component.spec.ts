import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDropZoneComponent } from './image-drop-zone.component';

describe('ImageDropZoneComponent', () => {
  let component: ImageDropZoneComponent;
  let fixture: ComponentFixture<ImageDropZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageDropZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
