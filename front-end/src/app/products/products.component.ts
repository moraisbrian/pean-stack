import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const payload = jwt_decode(this.authService.token)
    console.log(payload);
  }

}
