import { Injectable } from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  constructor() { }
  get gettingDate() {
    return this.date;
  }
  changeMonth(n: number) {
    const newDate = this.date.value.add(n, 'month');
    return this.date.next(newDate);
  }

  changeDay(d: moment.Moment) {
    console.log(d);
    const value = this.date.value.set({
      date: d.date(),
      month: d.month()
    });
    this.date.next(value);
  }
}
