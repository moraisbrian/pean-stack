import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/products']);
    }
  }

  email!: string;
  password!: string;

  showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  emailAndPasswordIsValid(): boolean {
    if (this.email && this.password) {
      return true;
    }

    return false;
  }

  authenticate(): void {
    this.authService.authenticate(this.email, this.password)
      .then((result: any) => {
        if (result) {
          this.authService.token = result;
          this.router.navigate(['/products']);
        }
      })
      .catch((err: any) => {
        this.email = '';
        this.password = '';
        this.showModal.emit(true);
      });
  }
}
