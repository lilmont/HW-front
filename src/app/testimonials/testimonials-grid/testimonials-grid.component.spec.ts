import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsGridComponent } from './testimonials-grid.component';

describe('TestimonialsGridComponent', () => {
  let component: TestimonialsGridComponent;
  let fixture: ComponentFixture<TestimonialsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestimonialsGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
