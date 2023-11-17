import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],


})
export class AppComponent {
  constructor() {}
  public appPages:Pages[] =  [
    { title: 'Accueil', url: '/home', icon: 'home-outline' },
    { title: 'Simulateur', url: '/sim', icon: 'calculator-outline' },
    { title: 'Lanceur', url: '/lanceur', icon: 'dice-outline' }
  ];
}



interface Pages{
 title:string,
 url:string,
 icon:string
}