import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = "http://stackoverflowcgvm.apphb.com/";
  private http : HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  registerUser(user : User){
    const body: any = {
      Email : user.Email,
      Password : user.Password,
      ConfirmPassword : user.ConfirmPassword,
      UserName : user.UserName
    };
    return this.http.post<User>(this.rootUrl + 'api/Account/Register', body);
  }

  signinUser(user : User){
    const body = `username=${user.UserName}&password=${user.Password}&grant_type=password`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.rootUrl + "Token", body,{headers: headers});
  }

  
}
