import { Component, OnInit } from '@angular/core';
import { Priority } from 'src/app/models/api-models/priority.model';
import { Status } from 'src/app/models/api-models/status.model';
import { TaskService } from '../task.service';
import { PriorityService } from '../services/priority.service';
import { StatusService } from '../services/status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/api-models/task.model';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  taskId: string | null | undefined;
  task: Task={
    id:'',
    name:'',
    priorityId:'',
    statusId:'',
    priority: {
      id:'',
      name:''
    },
    status: {
      id:'',
      name:'',
    }  
  };


  priorityList : Priority[] = [];

  statusList : Status[] = [];

  isNewTask = false;

  header = "";

  constructor(private readonly taskService:TaskService,
    private readonly priorityService:PriorityService,
    private readonly statusService:StatusService,
    private readonly route:ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar
    ) { }


    ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params) => {
          this.taskId = params.get('id');
          if(this.taskId==="add")
          {
            this.isNewTask=true;
            this.header="Add New Task";
          }
          else
          {
            this.isNewTask=false;
            this.header="Edit Task";
          }
          this.taskService.getTask(this.taskId).subscribe(
          (success) =>{
            debugger;
              this.task=success;
          },
          (error)=>{
    
          }
          )
          this.priorityService.getPriorityList().subscribe(
            (success) =>{
                this.priorityList=success;
            },
            (error)=>{
      
            }
            ),
            this.statusService.getStatusList().subscribe(
              (success) =>{
                  this.statusList=success;
              },
              (error)=>{
        
              }
              )
        }
  
  
      )
    }

    onUpdate(){
      debugger;
      this.taskService.updateTask(this.task.id,this.task)
      .subscribe(
        (success) => {
          debugger;
          this.router.navigateByUrl('');
          this.snackBar.open('Task successfully updated.',undefined,{
            duration: 2000,
          })
  
        },
        (error) => {
          this.snackBar.open('Task could not be updated!',undefined,{
            duration: 2000
          })
        }
      )
  
    }

    onDelete(){
      this.taskService.deleteTask(this.task.id).subscribe(
        (success) => {
          debugger;
          this.router.navigateByUrl('');
          this.snackBar.open('Task successfully deleted.',undefined,{
            duration: 2000,
          })
  
        },
        (error) => {
          this.snackBar.open('Uncompleted tasks cannot be deleted!',undefined,{
            duration: 2000
          })
        }
      )

    }

    onAdd(){
      this.taskService.addTask(this.task).subscribe(
        (success) => {
          debugger;
          this.router.navigateByUrl('');
          this.snackBar.open('Task successfully added.',undefined,{
            duration: 2000,
          })
            this.router.navigateByUrl("");
        },
        (error) => {
          this.snackBar.open('Task could not be added!',undefined,{
            duration: 2000
          })
        }
      )
    }

}
