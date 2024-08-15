import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'creditcardadmin';
  sidebarOpen = true;
  showSidebarAndToolbar = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebarAndToolbar = !event.urlAfterRedirects.includes('/login') 
        && !event.urlAfterRedirects.includes('/page-not-found');
      }
    });
  }

  toggleSideBar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
