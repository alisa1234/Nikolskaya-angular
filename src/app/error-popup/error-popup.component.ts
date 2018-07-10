import {Component, OnInit, Input, HostListener} from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss'],
  host: {'class': 'root'}
})
export class ErrorPopupComponent implements OnInit {
  @Input() id: number;
  @Input() main_text: string;
  @Input() start_date: string;
  @Input() end_date: string;
  @Input() header: string;
  @Input() image: any;
  @Input() _parent: any;
  @Input() hidden: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  @HostListener('document:click', ['$event'])

  clickLink(event) {

    if (event.target.closest('.overlay')) {
      this._parent.error_make_order = false;
      $(document.body).css('overflow', 'unset');
    } else {

    }
  }

  closeEvent() {
    this._parent.error_make_order = false;
    $(document.body).css('overflow', 'unset');
    $(document.body).css({position: 'unset'});
  }

}
