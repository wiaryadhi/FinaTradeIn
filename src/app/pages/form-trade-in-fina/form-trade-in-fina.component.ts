import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DaerahService} from "../../services/daerah.service";
import {IDaerah, IDaerahWrapper} from "../../interfaces/i-daerah";
import {IKota, IKotaWrapper} from "../../interfaces/i-kota";
import {IKecamatan, IKecamatanWrapper} from "../../interfaces/i-kecamatan";
import {MerkService} from "../../services/merk.service";
import {IMerk, IMerkWrapper} from "../../interfaces/i-merk";
import {KonsumenService} from "../../services/konsumen.service";
import {IKonsumen, IKonsumenWrapper} from "../../interfaces/i-konsumen";

@Component({
  selector: 'app-form-trade-in-fina',
  templateUrl: './form-trade-in-fina.component.html',
  styleUrls: ['./form-trade-in-fina.component.css']
})
export class FormTradeInFinaComponent implements OnInit {

  formProvinsi: Array<IDaerah> = []

  konsumens: Array<IKonsumen> = []

  formMerk: Array<IMerk> = []

  formKota: Array<IKota> = []

  formKecamatan: Array<IKecamatan> = []


//Variabel ngModel
  selectedProvinsi: string = "";
  selectedKota: string = "";
  selectedKecamatan: string = "";
  selectedMerk: string = "";
  ngModel: string = "";
  ngTahun: number = 0;
  ngNopol: string = "";
  ngWarna: string = "";
  ngTransmisi: string = "";
  ngKilometer: number = 0;
  ngStnk: string = "";
  ngDeskripsi: string = "";
  ngEmail: string = "";
  ngNohp: string = "";
  ngAlamat: string = "";
  ngTrade: string = "";
  ngActive: boolean = false;

  dataKendaraan!: FormGroup;
  detailKendaraan!: FormGroup;
  detailContact!: FormGroup;


  dataKendaraan_step = false
  detailKendaraan_step = false
  detailContact_step = false

  step = 1;

  dataKonsumen: IKonsumen = {
    merk: '',
    model: '',
    tahun: 0,
    noPol: '',
    warna: '',
    transmisi: '',
    kilometer: 0,
    stnk: '',
    deskripsi: '',
    tampakDepan: '',
    tampakBelakang: '',
    tampakKanan: '',
    tampakKiri: '',
    tampakInterior: '',
    tampakDashboard: '',
    email: '',
    nohp: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    alamatLengkap: '',
    isTrade: ''
  }

  // @Input() konsumen: IKonsumen = {} as IKonsumen;


  constructor(private formBuilder: FormBuilder,
              private daerahService: DaerahService,
              private merkService: MerkService,
              private konsumenService: KonsumenService) {
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
      datestnk: ['', Validators.required]
    })

    this.detailKendaraan = this.formBuilder.group({
      depan: ['', Validators.required],
      belakang: ['', Validators.required],
      kanan: ['', Validators.required],
      kiri: ['', Validators.required],
      interior: ['', Validators.required],
      dashboard: ['', Validators.required]
    })

    this.detailContact = this.formBuilder.group({
      email: ['', Validators.required],
      nohp: ['', Validators.required],
      provinsi: ['', Validators.required],
      kota: ['', Validators.required],
      kecamatan: ['', Validators.required],
      fullalamat: ['', Validators.required],
      radioTrad: ['', Validators.required],
    })
    this.onAllProvinsi()

    this.onAllMerk()

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

  onAllKonsumen(): void {
    this.konsumenService.all().subscribe(
      (response: IKonsumenWrapper) => {
        this.konsumens = response.data
      }
    )
  }

  submit() {
    if (this.step == 3) {
      this.detailContact_step = true;
      if (this.detailContact.invalid) {
        return
      } else {
        this.dataKonsumen.merk = this.selectedMerk
        this.dataKonsumen.model = this.ngModel
        this.dataKonsumen.tahun = this.ngTahun
        this.dataKonsumen.noPol = this.ngNopol
        this.dataKonsumen.warna = this.ngWarna
        this.dataKonsumen.transmisi = this.ngTransmisi
        this.dataKonsumen.kilometer = this.ngKilometer
        this.dataKonsumen.stnk = this.ngStnk
        this.dataKonsumen.deskripsi = this.ngDeskripsi
        this.dataKonsumen.email = this.ngEmail
        this.dataKonsumen.nohp = this.ngNohp
        this.dataKonsumen.provinsi = this.selectedProvinsi
        this.dataKonsumen.kota = this.selectedKota
        this.dataKonsumen.kecamatan = this.selectedKecamatan
        this.dataKonsumen.alamatLengkap = this.ngAlamat
        this.dataKonsumen.isTrade = this.ngTrade
        this.konsumenService.create(this.dataKonsumen)
          .subscribe(
            (response: IKonsumen) => {
              this.onAllKonsumen()
              alert("Data berhasil ditambahkan")
            },
            ((error: any) => {
              console.log(error);
              alert(error.message)
            }))
      }
    }
  }


  onAllProvinsi()
    :
    void {
    this.daerahService.all().subscribe(
      (response: IDaerahWrapper) => {
        let tempData = response.provinsi;
        this.formProvinsi = tempData;
      }
    )

  }

  onAllMerk()
    :
    void {
    this.merkService.all().subscribe(
      (response: IMerkWrapper) => {
        let tempFata = response.data;
        this.formMerk = tempFata
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
