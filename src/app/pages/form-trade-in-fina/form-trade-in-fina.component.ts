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
import {HttpClient} from "@angular/common/http";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

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


  tempHarga: string = '';
  tempKilo: string = '';
//Variabel ngModel
  selectedProvinsi: string = "";
  selectedKota: string = "";
  selectedKecamatan: string = "";
  selectedMerk: string = "";
  ngModel: string = "";
  ngTahun: string = "";
  ngNopol: string = "";
  ngWarna: string = "";
  ngTransmisi: string = "";
  ngKilometer: string = "";
  ngStnk: string = "";
  ngDeskripsi: string = "";
  ngEmail: string = "";
  ngNohp: string = "";
  ngAlamat: string = "";
  ngTrade: string = "";
  ngDashboard: any;
  ngActive: boolean = false;

  dataKendaraan!: FormGroup;
  detailKendaraan!: FormGroup;
  detailContact!: FormGroup;


  dataKendaraan_step = false
  detailKendaraan_step = false
  detailContact_step = false

  step = 1;

  selectedFile!: ImageSnippet;

  tampakDepan: File = {} as File;
  tampakBelakang: File = {} as File;
  tampakKiri: File = {} as File;
  tampakKanan: File = {} as File;
  tampakInterior: File = {} as File;
  tampakDashboard: File = {} as File;
  dataKonsumen: IKonsumen = {
    merk: '',
    model: '',
    tahun: '',
    noPol: '',
    warna: '',
    transmisi: '',
    kilometer: '',
    stnk: '',
    deskripsi: '',
    // tampakDepan: undefined,
    // tampakBelakang: undefined,
    // tampakKanan: undefined,
    // tampakKiri: undefined,
    // tampakInterior: undefined,
    // tampakDashboard: undefined,
    email: '',
    nohp: '',
    provinsi: '',
    kota: '',
    kecamatan: '',
    alamatLengkap: '',
    isTrade: '',
    hargaKonsumen: '',
    bukuManual: '',
    bukuService: '',
    kunciCadangan: '',
  }

  onChangeTampakDepan(event: any) {
    console.log(this.tampakDepan)
    const tadep = event.target.files.item(0);
    this.tampakDepan = tadep;
    console.log(this.tampakDepan);
  }

  onChangeTampakBelakang(event: any) {
    const tadep = event.target.files.item(0);
    this.tampakBelakang = tadep;
    console.log(this.tampakBelakang);
  }

  onChangeTampakKiri(event: any) {
    const tadep = event.target.files.item(0);
    this.tampakKiri = tadep;
    console.log(this.tampakKiri);
  }

  onChangeTampakKanan(event: any) {
    const tadep = event.target.files.item(0);
    this.tampakKanan = tadep;
    console.log(this.tampakKanan);
  }

  onChangeTampakInterior(event: any) {
    const tadep = event.target.files.item(0);
    this.tampakInterior = tadep;
    console.log(this.tampakInterior);
  }

  onChangeTampakDashboard(event: any) {
    const tadep = event.target.files.item(0);
    this.tampakDashboard = tadep;
    console.log(this.tampakDashboard);
  }

  // @Input() konsumen: IKonsumen = {} as IKonsumen;


  constructor(private formBuilder: FormBuilder,
              private daerahService: DaerahService,
              private merkService: MerkService,
              private konsumenService: KonsumenService,
              private router: Router) {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.konsumenService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        })
    });

    reader.readAsDataURL(file);
  }

  public onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }


  onChangeProvinsi(value: any) {
    this.selectedProvinsi = value.target.value
    var parts: string[] = this.selectedProvinsi.split('+');
    this.daerahService.allKota(parts[0]).subscribe(
      (response: IKotaWrapper) => {
        let tempData = response.kota_kabupaten;
        this.formKota = tempData;

      }
    )
  }

  onChangeKota(value: any) {
    this.selectedKota = value.target.value
    var parts: string[] = this.selectedKota.split('+');
    this.daerahService.allKecamatan(parts[0]).subscribe(
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
      datestnk: ['', Validators.required],
      radioKunci: [Validators.required],
      radioManual: [Validators.required],
      radioService: [Validators.required],
    })
    //
    this.detailKendaraan = this.formBuilder.group({
      depan: ['', Validators.required],
      belakang: ['', Validators.required],
      kanan: ['', Validators.required],
      kiri: ['', Validators.required],
      interior: ['', Validators.required],
      dashboard: ['', Validators.required],
      hargakonsumen: ['', Validators.required]
    })
    //
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
        this.dataKonsumen.tampakDashboard = this.ngDashboard
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

  submit02() {
    if (this.step == 3) {
      this.detailContact_step = true;
      if (this.detailContact.invalid) {
        return
      }
      this.dataKonsumen.tampakDepan = this.tampakDepan;
      var provinsi: string[] = this.dataKonsumen.provinsi.split('+');
      var kabupaten: string[] = this.dataKonsumen.kecamatan.split('+');
      var kota: string[] = this.dataKonsumen.kota.split('+');

      this.dataKonsumen.provinsi = provinsi[1]
      this.dataKonsumen.kecamatan = kabupaten[1]
      this.dataKonsumen.kota = kota[1]
      this.konsumenService.createV2(this.dataKonsumen, this.tampakDepan, this.tampakBelakang, this.tampakKiri, this.tampakKanan, this.tampakInterior, this.tampakDashboard)
        .subscribe(
          (response: IKonsumen) => {
            this.onAllKonsumen()
            Swal.fire({
              title: 'Success!',
              text: 'Penawaran berhasil dibuat!',
              icon: 'success',
              timer: 4000,
              timerProgressBar: true,
              showConfirmButton: false
            });
          },
          ((error: any) => {
            console.log(error);
            alert(error.message)
          }))
    }
    console.log(this.dataKonsumen)
    this.router.navigate(['']);
  }

  onAllProvinsi() {
    var parts: string[] = this.selectedProvinsi.split('+');
    this.daerahService.all(parts[1]).subscribe(
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

  formatRupiah() {
    var prefix: string = "Rp. ";
    const number_string = this.tempHarga.replace(/[^,\d]/g, '').toString();
    const split = number_string.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    // return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    this.tempHarga = prefix + rupiah;
    this.dataKonsumen.hargaKonsumen = this.hilang(this.tempHarga).toString()
    console.log(this.dataKonsumen.hargaKonsumen);
  }

  formatKilometer() {
    const number_string = this.tempKilo.replace(/[^,\d]/g, '').toString();
    const split = number_string.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    // return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    this.tempKilo = rupiah;
    this.dataKonsumen.kilometer = this.hilang(this.tempKilo).toString()
  }

  hilang(harga: String) {
    harga = harga.replace("Rp. ", "");
    for (var i = 0; i < harga.length; i++) {
      harga = harga.replace('.', '');
    }
    return harga


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
