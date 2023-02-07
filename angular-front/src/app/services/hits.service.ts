import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IHit} from "../models/IHit";
import {delay, retry, retryWhen, tap} from "rxjs";
import {PagesCount} from "../models/pages-count";
import {IHitsResponse} from "../models/IHitsResponse";

@Injectable({
  providedIn: 'root'
})
export class HitsService {

  constructor(private http: HttpClient) {
  }

  hits: IHit[] = []
  pagesCount: number = 1

  currentPage = 1


  getHits(page: number) {
    const offset = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.http.post<IHitsResponse>("/api/hits/getHits", {
      page: page,
      offset: offset
    }).pipe(
      retry(2),
      tap(hits => this.hits = hits.data),
      tap(hits => console.log(hits))
    )
  }

  getPagesCount() {
    return this.http.get<PagesCount>("/api/hits/getPagesCount").pipe(
      retry(2),
      tap(
        res => this.pagesCount = res.pagesCount
      )
    )
  }

  applyHit(x: number, y: number, r: number) {
    const offset = Intl.DateTimeFormat().resolvedOptions().timeZone
    return this.http.post<string>("api/hits/applyHit", {
      x:x,
      y:y,
      r:r,
      offset:offset
    }).pipe(
      delay(500),
      retry(2)
    )
  }

}
