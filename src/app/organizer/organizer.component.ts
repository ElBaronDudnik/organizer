import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService, Task} from '../shared/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;
  taskList: Task[] = [];
  constructor(private dateService: DateService,
              private taskService: TaskService) {
    this.form = new FormGroup({
      task: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
   this.dateService.gettingDate.pipe(
     switchMap(value => this.taskService.getTasks(value)))
     .subscribe(tasks => this.taskList = tasks);
  }

  addTask() {
    if (this.form.valid) {
      const task = {
        title: this.form.value.task,
        date: this.dateService.gettingDate.value.format('DD-MM-YYYY').toString(),
      };
      this.taskService.create(task).subscribe(data => console.log(data));
      this.taskList.push(task);
      this.form.reset();
    }
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe();
    const index = this.taskList.indexOf(task);
    this.taskList.splice(index, 1);
  }
}
