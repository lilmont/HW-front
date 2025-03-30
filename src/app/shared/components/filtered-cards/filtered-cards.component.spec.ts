import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCardsComponent } from './filtered-cards.component';

describe('FilteredCardsComponent', () => {
  let component: FilteredCardsComponent;
  let fixture: ComponentFixture<FilteredCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteredCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
