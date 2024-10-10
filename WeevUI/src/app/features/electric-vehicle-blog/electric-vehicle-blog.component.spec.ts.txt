import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricVehicleBlogComponent } from './electric-vehicle-blog.component';

describe('ElectricVehicleBlogComponent', () => {
  let component: ElectricVehicleBlogComponent;
  let fixture: ComponentFixture<ElectricVehicleBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectricVehicleBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectricVehicleBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
