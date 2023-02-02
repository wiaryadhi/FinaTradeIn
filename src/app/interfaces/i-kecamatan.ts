export interface IKecamatan {
  id: number;
  id_kota: number;
  nama: string;
}

export interface IKecamatanWrapper {
  kecamatan: Array<IKecamatan>;
}
