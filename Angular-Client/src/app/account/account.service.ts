import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/iuser';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient, private router:Router) { }

  login(values:any){
    return this.http.post<IUser>(environment.apiUrl + 'User/Login', values).pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values:any){
    return this.http.post<IUser>(environment.apiUrl + 'User/Register', values).pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email:string){
    return this.http.get<IUser>(environment.apiUrl + `User/EmailExists?email=${email}`);
  }

  loadCurrentUser(token:string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<IUser>(environment.apiUrl + 'User', {headers}).pipe(
      map((user:IUser) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }
}
