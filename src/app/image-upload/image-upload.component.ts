import { Component } from '@angular/core';
import {KonsumenService} from "../services/konsumen.service";
import {IKonsumen, IKonsumenWrapper} from "../interfaces/i-konsumen";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  konsumen:any={
    tampakDepan:undefined
  };
  constructor(
              private konsumenService: KonsumenService) {
  }
  onchange(event:any){
    const tadep = event.target.file[0];
    this.konsumen.tampakDepan=tadep;
  }

  savekonsumen(konsumen:any){
    console.log(this.konsumen)

    this.konsumenService.create(konsumen)
      .subscribe(
        ((error: any) => {
          console.log(error);
          alert(error.message)
        }))

  }


}
