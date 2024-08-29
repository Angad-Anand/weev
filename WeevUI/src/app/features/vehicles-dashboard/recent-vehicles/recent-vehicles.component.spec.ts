import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentVehiclesComponent } from './recent-vehicles.component';

describe('RecentVehiclesComponent', () => {
  let component: RecentVehiclesComponent;
  let fixture: ComponentFixture<RecentVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
