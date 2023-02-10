import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMerkWrapper} from "../interfaces/i-merk";

@Injectable({
  providedIn: 'root'
})
export class MerkService {

  endpointMerk: string = "mobil/all"

  constructor(private baseService: BaseService,
              private httpCLient: HttpClient) {
  }

  all(): Observable<IMerkWrapper> {
    return this.httpCLient.get<IMerkWrapper>(
      `${this.baseService.merkURL}${this.endpointMerk}`
    )
  }
}
