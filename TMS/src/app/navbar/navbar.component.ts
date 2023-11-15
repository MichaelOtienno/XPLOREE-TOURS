import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  showAboutLink: boolean = true;
  isUserLoggedIn: boolean = false;
  isLoginPage: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute,private scrollService : ScrollService) { }

  @Input() isLandingComponent: boolean = false;
scrollToFooter() {
  this.scrollService.scrollToFooter();
}

  ngOnInit(): void {
    this.updateDate();
    setInterval(() => this.updateDate(), 24 * 60 * 60 * 1000);
    this.updateLoginStatus();
    this.route.url.subscribe(url => {
      this.isLoginPage = url.some(segment => segment.path === 'signin');
    });
  }

  //date
  currentDate: string | undefined;
  updateLoginStatus() {
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  updateDate() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    this.currentDate = now.toLocaleDateString("en-US",options);
  }
   

}
