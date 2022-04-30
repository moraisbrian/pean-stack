import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {

  constructor(private authService: AuthService) {}
  
  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
