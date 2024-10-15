import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmPlayerComponent } from './rm-player.component';

describe('RmPlayerComponent', () => {
  let component: RmPlayerComponent;
  let fixture: ComponentFixture<RmPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
