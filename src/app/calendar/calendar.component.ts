import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {DateService} from '../shared/date.service';

interface Day {
  day: moment.Moment;
  active: boolean;
  selected: boolean;
  disabled: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: Week[];
  dateObject: moment.Moment;
  constructor(private dateService: DateService) { }

  ngOnInit() {
    this.dateService.gettingDate.subscribe(this.generate);
  }
  generate = (now: moment.Moment) => {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');
    const date = startDay.subtract(1, 'day');
    this.calendar = [];
    while (date.isBefore(endDay, 'day')) {
      this.calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const day = date.add(1, 'day').clone();
            const active = moment().isSame(day, 'date');
            const disabled = !now.isSame(day, 'month');
            const selected = now.isSame(day, 'date');

            return {day, active, disabled, selected};
          })
      });
    }
  }
  select(selectedDay: moment.Moment) {
    this.dateService.changeDay(selectedDay);
  }
}
