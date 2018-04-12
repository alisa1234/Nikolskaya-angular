import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

    type_content: {[index:string]:boolean}={};

    constructor() {
        this.type_content['concept']=false;
        this.type_content['news']=true;
        this.type_content['vacancies']=true;
    }

    ngOnInit() {}

    showContent(type_content: string) {
        for (let key in this.type_content){
            this.type_content[key]=true;
            this.type_content[type_content]=false;
        }
    }
}
