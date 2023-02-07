import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit{

  constructor(private router: Router, private authService: AuthService) {
  }

  redirect(path: String){
    this.router.navigate([path])
  }

  ngOnInit(): void {
    this.authService.restoreAuth().subscribe(()=>{
      this.authService.setIsAuth(true)
      this.redirect("main")
    })
  }

}
