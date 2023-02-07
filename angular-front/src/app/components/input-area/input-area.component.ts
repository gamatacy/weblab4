import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {HitsService} from "../../services/hits.service";
import {RadiusService} from "../../services/radius.service";

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.scss']
})
export class InputAreaComponent{

  constructor(private hitsService: HitsService, public radiusService: RadiusService) {
  }

  xValue = 0
  yValue = 0

  submit(){
    this.hitsService.applyHit(this.xValue, this.yValue).subscribe()
    this.hitsService.getPagesCount().subscribe()
    this.hitsService.getHits().subscribe()
    this.hitsService.currentPage = this.hitsService.pagesCount
  }


}
