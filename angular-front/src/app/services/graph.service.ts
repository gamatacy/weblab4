import {Injectable} from '@angular/core';
import * as $ from "jquery";
import {RadiusService} from "./radius.service";
import {IHit} from "../models/IHit";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private radiusService: RadiusService) {
  }

  width: number = 500
  height: number = 500
  isSmall: boolean = false

  radius: number = 1

  setSize() {
    // @ts-ignore
    if ($(window).width() <= 891) {
      this.height = 300
      this.width = 300
      this.isSmall = true
    } else {
      this.height = 500
      this.width = 500
      this.isSmall = false
    }
    // @ts-ignore
  }

  graphCoords(setX: Function, setY: Function) {
    const canvas = document.getElementById("graph")
    // @ts-ignore
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      this.setSize()
      const {x, y} = this.convertCoordinates(e.offsetX, e.offsetY, this.isSmall)

      setX(x.toString().substring(0, 6))
      setY(y.toString().substring(0, 6))
    })

    // @ts-ignore
    canvas.addEventListener("mouseout", () => {
      setX(" ")
      setY(" ")
    })

  }

  convertCoordinates(x: number, y: number, isSmall: boolean) {
    let pixelR = 100
    const center = this.height / 2

    if (isSmall) {
      pixelR = 60
    }

    const segment = pixelR / this.radiusService.rValue

    const coordinateX = (x - center) / segment
    const coordinateY = (center - y) / segment
    return {x: coordinateX, y: coordinateY}
  }

  convertToPixels(x: number, y: number) {
    let pixelR = 100
    const center = this.height / 2
    if (this.isSmall) {
      pixelR = 60
    }

    let segment = pixelR / this.radiusService.rValue

    const coordinateX = x * segment + center
    const coordinateY = center - y * segment

    return {x: coordinateX, y: coordinateY}
  }

  drawHits(hits: IHit[]) {
    this.setSize()
    // @ts-ignore
    let canvas = document.getElementById("graph")
    // @ts-ignore
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, this.width, this.height)
    // @ts-ignore
    canvas.width = this.width
    // @ts-ignore
    canvas.height = this.height
    let color = "black"

    hits.forEach((hit) => {

      if (hit.r == this.radiusService.rValue) {
        if (hit.result) {
          color = "#6366F1"
        } else {
          color = "black"
        }
      } else {
        color = "#acade8"
      }

      this.drawHit(hit.x, hit.y, hit.result, ctx, color)

    })
  }

  drawHit(x: number, y: number, result: boolean, ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath()
    ctx.fillStyle = color

    // @ts-ignore
    const {x: xCoordinate, y: yCoordinate} = this.convertToPixels(x, y)
    ctx.arc(xCoordinate, yCoordinate, 3, 0, Math.PI * 2)
    ctx.fill()
  }

}
