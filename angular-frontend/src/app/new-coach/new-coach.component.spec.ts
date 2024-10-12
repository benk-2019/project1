import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoachComponent } from './new-coach.component';

describe('NewCoachComponent', () => {
  let component: NewCoachComponent;
  let fixture: ComponentFixture<NewCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCoachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
