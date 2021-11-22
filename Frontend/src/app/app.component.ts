import { Component } from '@angular/core';
import { IsAdminService } from './is-admin.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GABSFrontEnd';
  isAdmin:boolean;
  showNav:boolean;
  showHeader:boolean;
  constructor (private isAdminService:IsAdminService, private router:Router)
  {
    isAdminService.getIsAdmin().subscribe((value)=>{
      this.isAdmin = value;
    })
    router.events.forEach((event) => {
    if(event instanceof NavigationStart) {
      if(event.url === "/" || event.url === "/welcome" || event.url === "/login" || event.url === "/register")
      {
        this.showNav = false;
      }
      else
      {
        this.showNav = true;
      }
      if(event.url === "/")
      {
        this.showHeader = false;
      }
      else
      {
        this.showHeader = true;
      }
        
    }
  });

  }
}
