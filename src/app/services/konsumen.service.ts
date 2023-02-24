import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {IKonsumen, IKonsumenWrapper} from "../interfaces/i-konsumen";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KonsumenService {
  endpoint: string = "konsumen"

  constructor(private baseService: BaseService, private httpClient: HttpClient) {
  }

  all(): Observable<IKonsumenWrapper> {
    console.log(`${this.baseService.merkURL}${this.endpoint}/all`)

    return this.httpClient.get<IKonsumenWrapper>(
      `${this.baseService.merkURL}${this.endpoint}/all`
    )
  }

  create(konsumen: IKonsumen): Observable<IKonsumen> {
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = JSON.stringify(konsumen);

    return this.httpClient.post<IKonsumen>(
      `${this.baseService.merkURL}${this.endpoint}/v2`,
      body,
      {headers}
    );
  }

  createV2(konsumen:IKonsumen,tampakDepan:File,tampakBelakang:File,tampakKiri:File,tampakKanan:File,
           tampakInterior:File,tampakDashboard:File):Observable<IKonsumen>{
    let formData = new FormData();
    formData.append('tampakDepan',tampakDepan);
    formData.append('tampakBelakang',tampakBelakang);
    formData.append('tampakKiri',tampakKiri);
    formData.append('tampakKanan',tampakKanan);
    formData.append('tampakInterior',tampakInterior);
    formData.append('tampakDashboard',tampakDashboard);
    formData.append('merk',konsumen.merk);
    formData.append('model',konsumen.model);
    formData.append('alamatLengkap',konsumen.alamatLengkap);
    formData.append('deskripsi',konsumen.deskripsi);
    formData.append('email',konsumen.email);
    formData.append('isTrade',konsumen.isTrade);
    formData.append('kecamatan',konsumen.kecamatan);
    formData.append('kilometer',konsumen.kilometer.toString());
    formData.append('kota',konsumen.kota);
    formData.append('noPol',konsumen.noPol);
    formData.append('nohp',konsumen.nohp);
    formData.append('provinsi',konsumen.provinsi);
    formData.append('stnk',konsumen.stnk);
    formData.append('tahun',konsumen.tahun.toString());
    formData.append('transmisi',konsumen.transmisi);
    formData.append('warna',konsumen.warna);
    formData.append('bidDate','');
    formData.append('hargaKonsumen',konsumen.hargaKonsumen.toString());


    return this.httpClient.post<IKonsumen>(`${this.baseService.merkURL}${this.endpoint}/v2`, formData);
  }

  public uploadImage(image: File): Observable<IKonsumen> {
    const formData = new FormData();

    formData.append('image', image);

    return this.httpClient.post<IKonsumen>(`${this.baseService.merkURL}${this.endpoint}`, formData);
  }

}
