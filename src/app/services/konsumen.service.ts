import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {IKonsumen, IKonsumenWrapper} from "../interfaces/i-konsumen";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KonsumenService {
  endpoint:string="konsumen"
  constructor(private baseService:BaseService, private httpClient:HttpClient) { }

  all():Observable<IKonsumenWrapper>{
    console.log(`${this.baseService.merkURL}${this.endpoint}/all`)

    return this.httpClient.get<IKonsumenWrapper>(
      `${this.baseService.merkURL}${this.endpoint}/all`
    )
  }
  create(konsumen:IKonsumen):Observable<IKonsumen>{
    const headers = {
      'Content-Type':'application/json'
    };

    const body = JSON.stringify(konsumen);

    return this.httpClient.post<IKonsumen>(
      `${this.baseService.merkURL}${this.endpoint}`,
      body,
      {headers}
    );
  }
}
