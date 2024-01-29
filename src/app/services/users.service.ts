import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from '../models/user.interface';
import { UsersData } from '../models/users-data.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<UsersData> {
    return this.http.get<UsersData>(`https://reqres.in/api/users?page=${page}`).pipe(
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  getUserDetails(id: number): Observable<User> {
    return this.http.get<User>(`https://reqres.in/api/users/${id}`);
  }
}
