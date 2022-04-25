import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../models/api-models/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks:Task[]=[];
  displayedColumns: string[] = ['id', 'name', 'priorityId', 'statusId', 'edit'];
  dataSource:MatTableDataSource<Task> = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (success) =>{
        this.tasks = success;
        this.dataSource = new MatTableDataSource<Task>(this.tasks);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      },
      (err)=>
      {

      }
    )    
  }

  filterTasks()
  {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }

}
