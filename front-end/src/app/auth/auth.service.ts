import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as momentTimezone from 'moment-timezone';
import jwt_decode from 'jwt-decode';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    if (this.token) {
      const decoded = jwt_decode<Token>(this.token);
      if (decoded.exp) {
        const now = new Date(momentTimezone.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS'));
        const expiresDate = new Date(momentTimezone.tz(decoded.exp * 1000, 'America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss.SSS'));
        if (now < expiresDate) {
          return true;
        }
      }
      
    }
    this.removeInvalidToken();
    return false;
  }

  private removeInvalidToken(): void {
    this.token = '';
  }

  private _token? : string;
  public get token() : string {
    if (!this._token && localStorage.getItem('token')) {
      this._token = localStorage.getItem('token')!;
    }

    return this._token ?? '';
  }
  public set token(value : string) {
    this._token = value;
    if (value === '') {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', value);
    }
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
