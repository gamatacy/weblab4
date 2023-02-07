import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {AuthResponse} from "../models/auth-response";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth = false

  constructor(private http: HttpClient, private errorService: ErrorService) {
  }

  setIsAuth(condition: boolean) {
    this.isAuth = condition
  }

  getIsAuth(): boolean {
    return this.isAuth
  }

  logout() {
    return this.http.get("/api/auth/logout").pipe(retry(2))
  }

  restoreAuth() {
    return this.http.post("/api/hits/getHits", {
      page: 1,
      offset: "Asia/Tokyo"
    }).pipe(
      delay(1000),
      retry(2)
    )
  }

  signIn(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/api/auth/login",
      {
        username: username,
        password: password
      }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  signUp(name: string, username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("/api/auth/registration",
      {
        name: name,
        username: username,
        password: password
      }).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.error.message)
    return throwError(() => error.message)
  }

}
