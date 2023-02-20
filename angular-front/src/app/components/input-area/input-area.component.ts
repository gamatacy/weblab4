import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {HitsService} from "../../services/hits.service";
import {RadiusService} from "../../services/radius.service";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss']
})
export class InputAreaComponent {

  constructor(private hitsService: HitsService, public radiusService: RadiusService) {
  }

  xValue: number = 0
  yValue: number = 0

  submit() {
    if (this.validateX() && this.radiusService.validateR()) {
      this.hitsService.applyHit(this.xValue, this.yValue).subscribe()
      setTimeout(() => {
        this.hitsService.getPagesCount().subscribe()
        this.hitsService.getHits().subscribe()
        this.hitsService.currentPage = this.hitsService.pagesCount
      }, 1000)
    }
  }

  validateX(): boolean {
    if (this.xValue == null){
      const error = document.getElementById("x-value-error")
      // @ts-ignore
      error.innerText = "X cannot be empty"
      setTimeout(() => {
        // @ts-ignore
        error.innerText = ""
      }, 2000)
      return false
    }
    else if (this.xValue > 3 || this.xValue < -3) {
      const error = document.getElementById("x-value-error")
      // @ts-ignore
      error.innerText = "X should be between -3 and 3"
      setTimeout(() => {
        // @ts-ignore
        error.innerText = ""
      }, 2000)
      return false
    } else if (this.xValue.toString().length > 4) {
      const error = document.getElementById("x-value-error")
      // @ts-ignore
      error.innerText = "No more than 4 symbols"
      setTimeout(() => {
        // @ts-ignore
        error.innerText = ""
      }, 2000)
      return false
    }
    return true
  }


}
