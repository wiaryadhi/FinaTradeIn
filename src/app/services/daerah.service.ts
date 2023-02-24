import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDaerahWrapper} from "../interfaces/i-daerah";
import {IKotaWrapper} from "../interfaces/i-kota";
import {IKecamatanWrapper} from "../interfaces/i-kecamatan";

@Injectable({
  providedIn: 'root'
})
export class DaerahService {

  endpointProvince: string = "provinsi"
  endpointKota: string = "kota?id_provinsi="
  endpointKecamatan: string = "kecamatan?id_kota="



  constructor(private baseService: BaseService,
              private httpCLient: HttpClient,
  ) {
  }

  all(id: string): Observable<IDaerahWrapper> {
    return this.httpCLient.get<IDaerahWrapper>(
      `${this.baseService.daerahBaseURL}${this.endpointProvince}`
    )
  }


  allKota(id: string): Observable<IKotaWrapper> {
    console.log(`${this.baseService.daerahBaseURL}${this.endpointKota}${id}`)
    return this.httpCLient.get<IKotaWrapper>(
      `${this.baseService.daerahBaseURL}${this.endpointKota}${id}`
    )
  }

  allKecamatan(id: any): Observable<IKecamatanWrapper> {
    console.log(`${this.baseService.daerahBaseURL}${this.endpointKota}${id}`)
    return this.httpCLient.get<IKecamatanWrapper>(
      `${this.baseService.daerahBaseURL}${this.endpointKecamatan}${id}`
    )
  }
}
