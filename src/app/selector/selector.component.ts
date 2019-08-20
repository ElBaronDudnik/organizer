import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  constructor(private dateService: DateService) { }
  changeMonth(n: number) {
    this.dateService.changeMonth(n);
  }
  ngOnInit() {
  }

}
