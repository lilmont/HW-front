import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingCardsComponent } from './hosting-cards.component';

describe('HostingCardsComponent', () => {
  let component: HostingCardsComponent;
  let fixture: ComponentFixture<HostingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostingCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
