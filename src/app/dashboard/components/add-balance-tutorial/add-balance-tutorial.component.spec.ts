import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBalanceTutorialComponent } from './add-balance-tutorial.component';

describe('AddBalanceTutorialComponent', () => {
  let component: AddBalanceTutorialComponent;
  let fixture: ComponentFixture<AddBalanceTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBalanceTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBalanceTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
