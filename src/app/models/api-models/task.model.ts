import { Priority } from "./priority.model";
import { Status } from "./status.model";

export interface Task{
    id:string,
    name:string,
    priorityId:string,
    statusId:string,
    priority:Priority,
    status:Status
}