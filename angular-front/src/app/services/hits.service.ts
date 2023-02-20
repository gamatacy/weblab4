import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHit} from "../models/IHit";
import {delay, retry, tap} from "rxjs";
import {PagesCount} from "../models/pages-count";
import {IHitsResponse} from "../models/IHitsResponse";
import {RadiusService} from "./radius.service";
import {GraphService} from "./graph.service";

// инверьтровать данные +
// поле execTime вернуть + id +
// отрисовка всего +
// ошибка при валидации +
// старые данные при смене пользователя +
// proxy, dispatcherservlet,
@Injectable({
  providedIn: 'root'
})
export class HitsService {

  constructor(private http: HttpClient, private radiusService: RadiusService, private graphService: GraphService) {
  }

  hits: IHit[] = []
  pagesCount: number = 1
  currentPage = 1


  getHits() {
    const offset = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.http.post<IHitsResponse>("/api/hits/getHits", {
      page: this.currentPage,
      offset: offset
    }).pipe(
      retry(2),
      tap(hits => {
        this.hits = hits.data
        this.hits.reverse()
        this.graphService.drawHits(this.hits)
      })
    )
  }

  getPagesCount() {
    return this.http.get<PagesCount>("/api/hits/getPagesCount").pipe(
      retry(2),
      tap(
        res => this.pagesCount = res.pagesCount
      ),
      tap(() => {
        if (this.hits.length == 10) {
          this.currentPage = this.pagesCount
        }
      })
    )
  }

  applyHit(x: number, y: number) {
    const offset = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.http.post<string>("api/hits/applyHit", {
      x: x,
      y: y,
      r: this.radiusService.rValue,
      offset: offset
    }).pipe(
      delay(500),
      retry(2)
    )
  }

}
