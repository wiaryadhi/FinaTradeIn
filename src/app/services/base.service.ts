import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  daerahBaseURL: string = "https://dev.farizdotid.com/api/daerahindonesia/"
  merkURL: string = "http://localhost:4200/api/"


  constructor() { }
}
