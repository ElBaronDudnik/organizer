import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as moment from 'moment';
import {Observable} from 'rxjs';

export interface Task {
  id?: number;
  title: any;
  date?: string;
}

@Injectable({providedIn: 'root'})
export class TaskService {
  static url = 'https://angular-calendar-e0bd5.firebaseio.com/tasks';
  constructor(private http: HttpClient) {}
  create(task: Task) {
    return this.http.post(`${TaskService.url}/${task.date}.json`, task)
      .pipe( map(res => {
        console.log(res['name']);
        return {...task, id: res['name']};
      }));
  }
  getTasks(date: moment.Moment) {
    return this.http.get(`${TaskService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe( map(res => {
        if (!res) {
          return [];
        }
        return Object.keys(res).map(key => ({...res[key], id: key}));
      }));
  }
  deleteTask(task: Task): Observable<void> {
    return this.http.delete<void>(`${TaskService.url}/${task.date}/${task.id}.json`);
  }
}
