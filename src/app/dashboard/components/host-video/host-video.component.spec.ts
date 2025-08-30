import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostVideoComponent } from './host-video.component';

describe('HostVideoComponent', () => {
  let component: HostVideoComponent;
  let fixture: ComponentFixture<HostVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
