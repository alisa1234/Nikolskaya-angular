import { Component, OnInit } from '@angular/core';
import { PersonalService } from './personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  type_content: {[index:string]:boolean}={};


  constructor(private personalService: PersonalService) {
    this.type_content['history']=false;
    this.type_content['address']=true;
    this.type_content['data']=true;
    this.type_content['bonus']=true;

  }

  ngOnInit() {
  }
  showContent(type_content: string) {
    for (let key in this.type_content){
      this.type_content[key]=true;
      this.type_content[type_content]=false;
    }

  }
}
