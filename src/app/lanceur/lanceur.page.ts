import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-lanceur',
  templateUrl: './lanceur.page.html',
  styleUrls: ['./lanceur.page.scss'],
})
export class LanceurPage implements OnInit {

  constructor() { }

  public faces:number = 6;
  public nbr:number= 1;
  public result:number[] = []
  ngOnInit() {
  }
  lancer(f:number, n:number){
    this.result=[]
    for (let i=0; i< n;i++){
      this.result.push(Math.floor(Math.random() * f+1))
    }
  }
  getPhoto():any { Promise<Photo>}

  async takePicture ()  {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

  };


 
  
}
