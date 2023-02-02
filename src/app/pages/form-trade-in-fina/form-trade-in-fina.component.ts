import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DaerahService} from "../../services/daerah.service";
import {IDaerah, IDaerahWrapper} from "../../interfaces/i-daerah";
import {IKota, IKotaWrapper} from "../../interfaces/i-kota";
import {IKecamatan, IKecamatanWrapper} from "../../interfaces/i-kecamatan";

@Component({
  selector: 'app-form-trade-in-fina',
  templateUrl: './form-trade-in-fina.component.html',
  styleUrls: ['./form-trade-in-fina.component.css']
})
export class FormTradeInFinaComponent implements OnInit {

  formProvinsi: Array<IDaerah> = []

  formKota: Array<IKota> = []

  formKecamatan: Array<IKecamatan> = []

  selectedProvinsi?: string = "";
  selectedKota?: string = "";
  selectedKecamatan?: string = "";

  dataKendaraan!: FormGroup;
  detailKendaraan!: FormGroup;
  detailContact!: FormGroup;


  dataKendaraan_step = false
  detailKendaraan_step = false
  detailContact_step = false

  step = 1;

  constructor(private formBuilder: FormBuilder,
              private daerahService: DaerahService) {
  }

  onChangeProvinsi(value: any) {
   this.selectedProvinsi = value.target.value
    this.daerahService.allKota(this.selectedProvinsi).subscribe(
      (response: IKotaWrapper) => {
        let tempData = response.kota_kabupaten;
        this.formKota = tempData;

      }
    )
  }

  onChangeKota(value: any) {
    this.selectedKota = value.target.value
    this.daerahService.allKecamatan(this.selectedKota).subscribe(
      (response: IKecamatanWrapper) => {
        let tempData = response.kecamatan;
        this.formKecamatan = tempData;

      }
    )
  }

  ngOnInit(): void {
    this.dataKendaraan = this.formBuilder.group({
      merk: ['', Validators.required],
      model: ['', Validators.required],
      tahun: ['', Validators.required],
      nopol: ['', Validators.required],
      warna: ['', Validators.required],
      transmisi: ['', Validators.required],
      kilometer: ['', Validators.required],
      deskripsi: ['', Validators.required],
    })

    this.detailKendaraan = this.formBuilder.group({
      depan: ['', Validators.required]
    })
    this.onAllProvinsi()
    console.log(this.selectedProvinsi)
// this.onAllKota()
  }

  get kendaraan() {
    return this.dataKendaraan.controls
  }

  get detail() {
    return this.detailKendaraan.controls
  }

  get contact() {
    return this.detailContact.controls
  }


  next() {
    if (this.step == 1) {
      this.dataKendaraan_step = true;
      if (this.dataKendaraan.invalid) {
        return
      }
      this.step++
    } else if (this.step == 2) {
      this.detailKendaraan_step = true;
      if (this.detailKendaraan.invalid) {
        return
      }
      this.step++
    }
  }

  previous() {
    this.step--

    if (this.step == 1) {
      this.detailKendaraan_step = false;
    }
    if (this.step == 2) {
      this.detailContact_step = false
    }

  }

  submit() {

    if (this.step == 3) {
      this.detailContact_step = true;
      if (this.detailContact.invalid) {
        return
      }
      //do logic  setelah di klik
    }
  }


onAllProvinsi():void {
    this.daerahService.all().subscribe(
      (response: IDaerahWrapper) => {
        let tempData = response.provinsi;
        this.formProvinsi = tempData;
      }
    )

}
  // onAllKota():void {
  //   this.daerahService.allKota(this.selectedProvinsi).subscribe(
  //     (response: IKotaWrapper) => {
  //       let tempData = response.kota_kabupaten;
  //       this.formKota = tempData;
  //
  //     }
  //   )
  // }
  // //


}
