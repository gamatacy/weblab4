import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {


  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.setIsAuth(false)
      this.router.navigate([""])
      localStorage.clear()
    })
  }

}
