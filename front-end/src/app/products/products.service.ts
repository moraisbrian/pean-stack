import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Product } from '../models/product.model';

@Injectable()
export class ProductsService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `bearer ${this.authService.token}`,
      'Content-Type': 'application/json'
    })
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`, this.httpOptions);
  }
}
