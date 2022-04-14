import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/datasource/user.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor(private httpClient: HttpClient) {}
  private user: User;
  url: any = 'http://localhost:7000/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.url)
      .pipe(catchError(this.errorHandler));
  }

  getUser(id: any): Observable<User[]> {
    return this.httpClient.get(`${this.url}/${id}`, this.httpOptions).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.errorHandler)
    );
  }

  delete(id: any) {
    return this.httpClient
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  createUser(data: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient
      .post(this.url, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  find(id): Observable<User> {
    return this.httpClient
      .get<User>(`${this.url}/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.url}/${id}`, JSON.stringify(data), this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
  getCustomerList() {
    return this.httpClient
      .get<{ name: string; id: number }[]>(`http://localhost:7000/customers`)
      .pipe(
        map((res) => {
          const list: { name: string; id: number }[] = [];
          res.forEach((res) => {
            list.push(res);
          });
          return list;
        }),
        catchError(this.errorHandler)
      );
  }
  getRoleList() {
    return this.httpClient
      .get<{ name: string; key: string }[]>(`http://localhost:7000/roles`)
      .pipe(
        map((res) => {
          const roleslist: { name: string; key: string }[] = [];
          res.forEach((response) => {
            roleslist.push(response);
          });
          return roleslist;
        }),
        catchError(this.errorHandler)
      );
  }
  setter(user: User) {
    this.user = user;
  }
  getter() {
    return this.user;
  }
  errorHandler(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      errorMessage;
    });
  }
}
