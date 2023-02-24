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
  hargaKonsumen: number;
}

export interface IKonsumenWrapper {
  data: Array<IKonsumen>
}
