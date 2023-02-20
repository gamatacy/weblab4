import {AfterViewChecked, Injectable, Input, OnChanges, SimpleChanges} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RadiusService{

  constructor() { }

  rValue = 1

  validateR(): boolean {
    if (this.rValue == null){
      const error = document.getElementById("r-value-error")
      // @ts-ignore
      error.innerText = "R cannot be empty"
      setTimeout(() => {
        // @ts-ignore
        error.innerText = ""
      }, 2000)
      return false
    }
    else if (this.rValue > 3 || this.rValue < -3) {
      const error = document.getElementById("r-value-error")
      // @ts-ignore
      error.innerText = "R should be between -3 and 3"
      setTimeout(() => {
        // @ts-ignore
        error.innerText = ""
      }, 2000)
      return false
    } else if (this.rValue.toString().length > 4) {
      const error = document.getElementById("r-value-error")
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
