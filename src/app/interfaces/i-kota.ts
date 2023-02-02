export interface IKota {
  id: number;
  id_provinsi: number;
  nama: string;
}

export interface IKotaWrapper {
  kota_kabupaten: Array<IKota>
}
