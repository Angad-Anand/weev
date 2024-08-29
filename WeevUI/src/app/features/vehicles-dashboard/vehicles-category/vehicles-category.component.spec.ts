import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesCategoryComponent } from './vehicles-category.component';

describe('VehiclesCategoryComponent', () => {
  let component: VehiclesCategoryComponent;
  let fixture: ComponentFixture<VehiclesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
