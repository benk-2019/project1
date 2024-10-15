import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapCoachComponent } from './swap-coach.component';

describe('SwapCoachComponent', () => {
  let component: SwapCoachComponent;
  let fixture: ComponentFixture<SwapCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapCoachComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
