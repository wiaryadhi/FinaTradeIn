export interface IKonsumen {
  merk: string;
  model: string;
  tahun: string;
  noPol: string;
  warna: string;
  transmisi: string;
  kilometer: string;
  stnk: string;
  deskripsi: string;
  tampakDepan?: File;
  tampakBelakang?: File;
  tampakKanan?: File;
  tampakKiri?: File;
  tampakInterior?: File;
  tampakDashboard?: File;
  email: string;
  nohp: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamatLengkap: string;
  isTrade: string;
  hargaKonsumen: string;
  kunciCadangan: string

  bukuService: string
  bukuManual: string
}

export interface IKonsumenWrapper {
  data: Array<IKonsumen>
}
