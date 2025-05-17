import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHostModalComponent } from './create-host-modal.component';

describe('CreateHostModalComponent', () => {
  let component: CreateHostModalComponent;
  let fixture: ComponentFixture<CreateHostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateHostModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
