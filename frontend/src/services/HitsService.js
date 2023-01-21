import $api from "./http/interceptors";
export class HitsService {

    async sendHit(x,y,r){
        const offset = Intl.DateTimeFormat().resolvedOptions().timeZone
        return $api.post("/hits/applyHit", {
            x,
            y,
            r,
            offset
        })
    }

    async getHits(page){
        const offset = Intl.DateTimeFormat().resolvedOptions().timeZone
        return $api.post("/hits/getHits",{
            page,
            offset
        })
            .then(response => response.data)
            .then(d => d.data)
    }

    async getPagesCount(){
        return $api.get("/hits/getPagesCount")
            .then(response => response.data)
            .then(data => data.pagesCount)
    }

}