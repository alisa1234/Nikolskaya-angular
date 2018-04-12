import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {SubmenuComponent} from '../submenu/submenu.component'
import {DatePickerComponent} from 'ng2-date-picker';

declare let $: any;

@Component({
  selector: 'app-submenu-calendar',
  templateUrl: './submenu-calendar.component.html',
  styleUrls: ['./submenu-calendar.component.scss']
})

export class SubmenuCalendarComponent extends SubmenuComponent implements OnInit, AfterViewInit {

  @ViewChild('dayPicker') datePicker: DatePickerComponent;

  hide_calendar: boolean = false;

  constructor() {

    super();
    this.type_menu['all']=true;
    this.type_menu['news']=false;
    this.type_menu['reports']=false;
    this.type_menu['events']=false;
    this.type_menu['stocks']=false;
  }

  ngOnInit() {}
  ngAfterViewInit() {

    $($('.calendar_widget')[0]).children().css('padding', '20px 30px');
    $($('.dp-day-calendar-container').children('dp-calendar-nav')).children().css('border','none');
    $('.dp-calendar-nav-container').children('.dp-nav-header').css({left:'50%',transform: 'translate(-50%, -50%)'});
    $('.dp-nav-header>button').css({border:'none', 	fontFamily: 'Ubuntu', color: '#3C332B',fontSize: '17px', fontWeight: 'bold', lineHeight: '23px'});
    $('.dp-nav-btns-container').remove();
    $('.dp-calendar-nav-container').append('<div class="nav-left"><img src="app/sass/images/array.png"></div>');
    $('.dp-calendar-nav-container').append('<div class="nav-right"><img src="app/sass/images/array.png"></div>');
    $('.nav-left').css({position:'absolute', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F7F6F5'});
    $('.nav-right').css({position:'absolute', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#F7F6F5', right: '0'});
    $('.nav-left>img').css({position:'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'});
    $('.nav-right>img').css({position:'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(180deg)'});
  }

}
