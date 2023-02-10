export interface IKonsumen {
  merk: string;
  model: string;
  tahun: number;
  noPol: string;
  warna: string;
  transmisi: string;
  kilometer: number;
  stnk: string;
  deskripsi: string;
  tampakDepan: string;
  tampakBelakang: string;
  tampakKanan: string;
  tampakKiri: string;
  tampakInterior: string;
  tampakDashboard: string;
  email: string;
  nohp: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamatLengkap: string;
  isTrade: string;
}

export interface IKonsumenWrapper {
  data: Array<IKonsumen>
}
