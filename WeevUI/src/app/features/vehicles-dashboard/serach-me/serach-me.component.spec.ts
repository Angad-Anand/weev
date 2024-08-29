import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachMeComponent } from './serach-me.component';

describe('SerachMeComponent', () => {
  let component: SerachMeComponent;
  let fixture: ComponentFixture<SerachMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerachMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SerachMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
