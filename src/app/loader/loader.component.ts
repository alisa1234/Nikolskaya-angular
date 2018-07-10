import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  host: {'class': 'root'}
})
export class LoaderComponent implements OnInit {

  @Input() hidden: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
