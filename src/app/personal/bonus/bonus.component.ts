import { Component, OnInit } from '@angular/core';
import { PersonalService } from '../personal.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss']
})

export class BonusComponent implements OnInit {

  bonuses: any;

  constructor(private personalService: PersonalService) {

    this.bonuses = this.personalService.client_data.BonusLevelInfo;
  }

  ngOnInit() {}

}
