import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricVehicleBlogComponent } from './electric-vehicle-blog.component';
import { By } from '@angular/platform-browser';

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

    // Add mock data for testing
    component.sectionTitle = 'Introduction to Electric Vehicles';
    component.subSectionA = { title: 'History', content: 'Electric vehicles have a long history.' };
    component.subSectionB = { title: 'Current Trends', content: 'Electric vehicles are gaining popularity.' };

    component.toptwowheelerlist = [
      {
        path: 'assets/images/pr1.png',
        manufacturer: 'Brand A',
        model: 'Model X',
        selectedRating: 4,
        unSelectRating: 1,
        exShowroomPrice: 120000,
        twId: 1
      },
      {
        path: 'assets/images/pr2.png',
        manufacturer: 'Brand B',
        model: 'Model Y',
        selectedRating: 5,
        unSelectRating: 0,
        exShowroomPrice: 150000,
        twId: 2
      }
    ];

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main title and section title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    const sectionTitleElement = fixture.debugElement.query(By.css('.introduction h2')).nativeElement;

    expect(titleElement.textContent).toContain('Introduction to Electric Vehicles');
    expect(sectionTitleElement.textContent).toContain('Introduction to Electric Vehicles');
  });

  it('should render the subsections with correct titles and content', () => {
    const subSectionAElement = fixture.debugElement.query(By.css('.introduction article:nth-of-type(1) h3')).nativeElement;
    const subSectionBElement = fixture.debugElement.query(By.css('.introduction article:nth-of-type(2) h3')).nativeElement;

    expect(subSectionAElement.textContent).toContain('History');
    expect(subSectionBElement.textContent).toContain('Current Trends');
  });

  it('should display the vehicle list in the sidebar', () => {
    const vehicleElements = fixture.debugElement.queryAll(By.css('.vehicleBox'));

    expect(vehicleElements.length).toBe(2); // There are 2 vehicles in the mock list

    const firstVehicleTitle = vehicleElements[0].query(By.css('.vehicle-title')).nativeElement;
    expect(firstVehicleTitle.textContent).toContain('Brand A Model X');

    const secondVehicleTitle = vehicleElements[1].query(By.css('.vehicle-title')).nativeElement;
    expect(secondVehicleTitle.textContent).toContain('Brand B Model Y');
  });

  it('should call onSelect() when a vehicle is clicked', () => {
    spyOn(component, 'onSelect'); // Spy on the onSelect method

    const vehicleElements = fixture.debugElement.queryAll(By.css('.vehicleBox'));
    const firstVehicle = vehicleElements[0].query(By.css('.infobox')).nativeElement;

    // Simulate click event
    firstVehicle.click();
    fixture.detectChanges();

    expect(component.onSelect).toHaveBeenCalledWith(1); // onSelect should have been called with twId 1
  });
});
