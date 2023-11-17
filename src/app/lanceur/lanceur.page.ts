import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Haptics, ImpactStyle, VibrateOptions } from '@capacitor/haptics';

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

  async certif (f:number)  {
    let opt! : VibrateOptions 
    opt.duration=1000;
    await Haptics.vibrate(opt);
    this.lancer(f,1)
  };


 
  
}
