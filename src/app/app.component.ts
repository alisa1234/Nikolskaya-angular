import { Component } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-root',
  template: '<app-header></app-header><router-outlet></router-outlet><app-footer></app-footer>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
