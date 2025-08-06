import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearBlockageComponent } from './clear-blockage.component';

describe('ClearBlockageComponent', () => {
  let component: ClearBlockageComponent;
  let fixture: ComponentFixture<ClearBlockageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearBlockageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearBlockageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
