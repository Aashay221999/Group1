import { HomeComponent } from 'src/app/generaluser/home/home.component';
import { BookAppointmentComponent } from 'src/app/generaluser/book-appointment/book-appointment.component';
import { MyCalenderComponent } from 'src/app/generaluser/my-calender/my-calender.component';
import { LoginComponent } from '../login/login.component';
import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router,RouterModule,Routes } from "@angular/router";

//import { HomeComponent} from 'c:/Users/atharva_waranashiwar/Desktop/gabsProject/src/app/';
import { NavigationBarComponent } from "./navigation-bar.component";
describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let location: Location;
  let router: Router;
  let routes:Routes=[
  { //default
    path:'',
    component:LoginComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'myCal',
    component:MyCalenderComponent,
  },
  {
    path:'bookApp',
    component:BookAppointmentComponent,
  },

  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes )],
      declarations: [HomeComponent, MyCalenderComponent, BookAppointmentComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(NavigationBarComponent);
    //router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "Home" redirects you to /home', fakeAsync(() => {
    router.navigate(["/home"]).then(() => {
      tick();
      expect(location.path()).toBe("/home");
    });
  }));

  it('navigate to "My Calenders" redirects you to /myCal', fakeAsync(() => {
    router.navigate(["/myCal"]).then(() => {
      expect(location.path()).toBe("/myCal");
    });
  }));

  it('navigate to "Book Appointment" redirects you to /bookApp', fakeAsync(() => {
    router.navigate(["/bookApp"]).then(() => {
      expect(location.path()).toBe("/bookApp");
    });
  }));

  

});
