import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    if (this.token) {
      return true;
    }

    return false;
  }

  private _token? : string;
  public get token() : string {
    return this._token ?? localStorage.getItem('token') ?? '';
  }
  public set token(value : string) {
    this._token = value;
    localStorage.setItem('token', value);
  }
  
  authenticate(email: string, password: string): Promise<any> {
    return firstValueFrom(this.http.post(`${environment.baseUrl}/auth`, JSON.stringify({
      Email: email,
      Password: password
    }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }));
  }
}
