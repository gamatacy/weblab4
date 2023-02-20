import {Injectable} from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from "@angular/common/http";
import {catchError, delay, Observable, retry, take, tap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {AuthResponse} from "../models/auth-response";
import {Router} from "@angular/router";
import {ErrorService} from "../services/error.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {
    let authReq = req.clone({
      headers: req.headers.set("Authorization", localStorage.getItem("token") || "")
    })

    return next.handle(authReq).pipe(
      tap({
        next: event => {
          if (event instanceof HttpResponse) {
            if (event.body.jwtAccessToken != undefined) {
              localStorage.setItem("token", event.body.jwtAccessToken)
            }
            this.authService.setIsAuth(true)
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 401) {

            this.http.get<AuthResponse>("/api/auth/refresh").pipe(
              catchError(() => {
                  this.authService.setIsAuth(false)
                  this.router.navigate(["/"])
                  throw this.errorHandler("Logged out")
                }
              )
            ).subscribe(
              (res) => {
                localStorage.setItem("token", res.jwtAccessToken)
              }
            )

          } else if (error.status == 403 && error.error == "Token Expired") {
            this.authService.setIsAuth(false)
            this.router.navigate(["/"])
          }
        }
      })
    )

  }

  private errorHandler(message: string) {
    //this.errorService.handle(message)
    return throwError(() => message)
  }

}
