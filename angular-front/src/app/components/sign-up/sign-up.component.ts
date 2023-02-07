import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  name: string = ""
  username: string = ""
  password: string = ""
  password2: string = ""

  nameIsShort: boolean = false
  usernameIsShort: boolean = false
  passwordIsShort: boolean = false
  passwordsEquals: boolean = true

  constructor(private router: Router, private authService: AuthService) {
  }

  redirect(path: String) {
    this.router.navigate([path])
  }

  signUp() {
    if (this.validateForm()) this.authService.signUp(this.name, this.username, this.password).subscribe(()=>{
      this.router.navigate(['/main'])
    })
  }

  validateForm(): boolean {
    this.nameIsShort = this.name.length == 0
    this.usernameIsShort = this.username.length == 0
    this.passwordIsShort = this.password.length == 0
    this.passwordsEquals = this.password == this.password2
    return !this.nameIsShort && !this.usernameIsShort && !this.passwordIsShort && this.passwordsEquals
  }

}
