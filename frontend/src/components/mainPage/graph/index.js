import $ from "jquery";

export class GraphManager {

    static graphCoords(setX, setY, radius){
        const canvas = document.getElementsByClassName("graph")[0]
        const ctx = canvas.getContext("2d");
        let width, height, isSmall
        const setSize = () => {
            if ($(window).width() <= 891) {
                height = 350
                width = 350
                isSmall = true
            } else {
                height = 500
                width = 500
                isSmall = false
            }
        }

        $(".graph").mousemove(function (e) {
            setSize()
            const{x,y} = convertCoordinates(height / 2, e.offsetX, e.offsetY, isSmall, radius)
            setX(x.toString().substring(0,4))
            setY(y.toString().substring(0,4))
        })

    }
    static applyHit(radius, hitsService, setTrigger) {
        let width, height, isSmall
        const setSize = () => {
            if ($(window).width() <= 891) {
                height = 350
                width = 350
                isSmall = true
            } else {
                height = 500
                width = 500
                isSmall = false
            }
        }

        $(".graph").unbind().click(e => {
            if(!checkR(radius)){
                setTrigger()
                setSize()
                const {x, y} = convertCoordinates(height / 2, e.offsetX, e.offsetY, isSmall, radius)
                hitsService.sendHit(x, y, radius).then()
            }
        })

    }

    static drawHits(radius, hits) {
        const canvas = document.getElementsByClassName("graph")[0]
        const ctx = canvas.getContext("2d");
        let width, height, isSmall

        if (checkR(radius)) {
            $(".graph").addClass("opacity-50")
            return false
        }else{
            $(".graph").removeClass("opacity-50")
        }


        if ($(window).width() <= 891) {
            height = 350
            width = 350
            isSmall = true
        } else {
            height = 500
            width = 500
            isSmall = false
        }

        canvas.width = width
        canvas.height = height
        ctx.clearRect(0, 0, width, height)

        hits.forEach(hit => {
            if (hit.r == radius) {
                const {x, y} = convertToPixels(height / 2, hit.x, hit.y, isSmall, hit.r)
                drawHit(
                    hit.result,
                    x,
                    y,
                    ctx
                )
            }
        })

    }


}

function checkR(radius){
    return radius > 3 || radius <= 0 || radius.length > 4
}

function convertCoordinates(center, x, y, isSmall, r) {
    let pixelR = 100
    if (isSmall) {
        pixelR = 65
    }

    let segment = pixelR / r

    let coordinateX = (x - center) / segment
    let coordinateY = (center - y) / segment
    return {x: coordinateX, y: coordinateY}
}

function convertToPixels(center, x, y, isSmall, r) {
    let pixelR = 100
    if (isSmall) {
        pixelR = 65
    }

    let segment = pixelR / r

    let coordinateX = x * segment + center
    let coordinateY = center - y * segment

    return {x: coordinateX, y: coordinateY}
}

function drawHit(result, x, y, ctx) {
    ctx.beginPath()
    if (result == true) {
        ctx.fillStyle = "#6366F1"
    } else {
        ctx.fillStyle = "black"
    }
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
}