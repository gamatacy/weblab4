import { Component } from '@angular/core';
import {HitsService} from "../../services/hits.service";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss']
})
export class InputAreaComponent {

  constructor(private hitsService: HitsService) {
  }

  xValue = 0
  yValue = 0
  rValue = 0

  submit(){
    this.hitsService.applyHit(this.xValue, this.yValue, this.rValue).subscribe()
    this.hitsService.getPagesCount().subscribe()
    this.hitsService.getHits(this.hitsService.pagesCount).subscribe()
    this.hitsService.currentPage = this.hitsService.pagesCount
  }

}
