import {Component, OnInit} from '@angular/core';
import {GraphService} from "../../services/graph.service";
import {HitsService} from "../../services/hits.service";
import {RadiusService} from "../../services/radius.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  constructor(private graphService: GraphService, private hitsService: HitsService) {
  }

  xValue: string = ' '

  yValue: string = ' '

  ngOnInit(): void {
    this.graphService.graphCoords((x: string) => {
      this.xValue = x
    }, (y: string) => {
      this.yValue = y
    })
    // @ts-ignore
    document.getElementById("graph").addEventListener("click", () => {
      this.hitsService.applyHit(parseFloat(this.xValue),parseFloat(this.yValue)).subscribe()
      this.hitsService.getHits().subscribe()
      this.hitsService.getPagesCount().subscribe()
    })

    const radiusObserver = new MutationObserver(() => {
      this.graphService.drawHits(this.hitsService.hits);
    })

    // @ts-ignore
    radiusObserver.observe(document.querySelector("#r-input"),{attributes : "aria-valuenow"})

  }


}
