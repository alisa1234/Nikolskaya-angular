import {Component, OnInit, HostListener, ElementRef, Input, Injectable} from '@angular/core';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent implements OnInit {

  public hidden: boolean = false;

  @Input() clicker;

  constructor(public eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])

  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target) || event.target == this.clicker) {
    } else {
      this.clicker.style.display='inline-block';
      this.hidden = false;
    }
  }

  Toggle(par){
    par.style.display='none';
    this.hidden = !this.hidden;
  }

  ngOnInit() {
  }

}
