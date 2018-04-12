import {Component, OnInit, HostListener, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})

export class SearchBlockComponent implements OnInit {

  @Input() hidden: boolean = false;
  @Input() clicker;

  constructor(public eRef: ElementRef) {}

  @HostListener('document:mouseover', ['$event'])

  clickout(event) {

    if(this.eRef.nativeElement.contains(event.target) || event.target == this.clicker || event.target.closest('.menu_tabs_dishes_dropdown')) {
    } else {

      if(typeof this.clicker != 'undefined'){
        this.clicker.style.display='inline-block';
        this.hidden = false;
      }
    }
  }

  Toggle(par){

    par.style.display='none';
    this.hidden = !this.hidden;
  }

  ngOnInit() {}

}
