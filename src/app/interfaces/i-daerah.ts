export interface IDaerah {
  id: number;
  nama: string;
}

export interface IDaerahWrapper {
  provinsi: Array<IDaerah>;
}
