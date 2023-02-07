import {Component} from '@angular/core';
import {ErrorService} from "../../services/error.service";

@Component({
  selector: 'app-error-notice',
  templateUrl: './error-notice.component.html',
  styleUrls: ['./error-notice.component.scss']
})
export class ErrorNoticeComponent {
  constructor(public errorService: ErrorService) {
  }
}
