import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotplayerTutorialComponent } from './spotplayer-tutorial.component';

describe('SpotplayerTutorialComponent', () => {
  let component: SpotplayerTutorialComponent;
  let fixture: ComponentFixture<SpotplayerTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpotplayerTutorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotplayerTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
