import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapPlayerComponent } from './swap-player.component';

describe('SwapPlayerComponent', () => {
  let component: SwapPlayerComponent;
  let fixture: ComponentFixture<SwapPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwapPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
