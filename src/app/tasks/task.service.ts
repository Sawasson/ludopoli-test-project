import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTaskRequest } from '../models/api-models/addTaskRequest.model';
import { Task } from '../models/api-models/task.model';
import { UpdateTaskRequest } from '../models/api-models/updateTaskRequest.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseApiUrl = "https://localhost:44348";

  constructor(private httpClient:HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.baseApiUrl+'/tasks');
  }

  getTask(taskId:string | null): Observable<Task>{
    return this.httpClient.get<Task>(this.baseApiUrl+'/tasks/'+taskId)
  }

  updateTask(taskId:string,taskRequest:Task): Observable<Task>{
    const updateTaskRequest : UpdateTaskRequest ={
      name: taskRequest.name,
      priorityId: taskRequest.priorityId,
      statusId: taskRequest.statusId,
    }
    return this.httpClient.put<Task>(this.baseApiUrl+'/tasks/'+taskId,updateTaskRequest);
  }

  deleteTask(taskId:string): Observable<Task>{
    return this.httpClient.delete<Task>(this.baseApiUrl+'/tasks/'+taskId);
  }

  addTask(taskRequest:Task): Observable<Task>{
    const addTaskRequest : AddTaskRequest ={
      name: taskRequest.name,
      priorityId: taskRequest.priorityId,
      statusId: taskRequest.statusId,
    }
    return this.httpClient.post<Task>(this.baseApiUrl+'/tasks/add',addTaskRequest);
  }

}
