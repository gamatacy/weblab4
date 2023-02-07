import {Component, OnInit} from '@angular/core';
import {HitsService} from "../../services/hits.service";

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss']
})
export class ResultsTableComponent implements OnInit{

  constructor(public hitsService: HitsService) {
  }

  ngOnInit(): void {
      this.hitsService.getHits(this.hitsService.currentPage).subscribe()
      this.hitsService.getPagesCount().subscribe()
  }


  previousPage(){
    if ( this.hitsService.currentPage > 1){
      this.hitsService.currentPage -= 1
      this.hitsService.getHits( this.hitsService.currentPage).subscribe()
    }
  }

  nextPage(){
    if ( this.hitsService.currentPage < this.hitsService.pagesCount){
      this.hitsService.currentPage += 1
      this.hitsService.getHits( this.hitsService.currentPage).subscribe()
    }
  }

}
