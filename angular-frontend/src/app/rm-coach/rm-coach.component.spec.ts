import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCoachComponent } from './rm-coach.component';

describe('RmCoachComponent', () => {
  let component: RmCoachComponent;
  let fixture: ComponentFixture<RmCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmCoachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
