import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Share, ShareOptions, ShareResult } from '@capacitor/share';


@Component({
  selector: 'app-sim',
  templateUrl: './sim.page.html',
  styleUrls: ['./sim.page.scss'],
})
export class SimPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  styleButton='clear'
  action!:string;
  modalAction:boolean=false;
  joueurActif : Joueur = {};
  relance:number=0;
  difficulte!:number;
  sequence:any[]=[];
  blocage: Blocage = {};
  result:string[]=[];
  proba:number = 1
  ngOnInit() {
  }

  async displayAction(typeAction:string){
    if (this.action== typeAction) this.action=""
    else {
      this.action = typeAction
    }
  }
    addDifficulte(action:String, dif:number, comp?:boolean|undefined){
      if(dif){
        let s = `${action} : ${dif}+`
        let proba = 1-(dif-1)/6
        if(comp){
          switch(action){
            case "Esquive" : 
            s += " (avec Esquive)";
            proba += (1-proba)*proba
  
  
            break;
            case "Ramassage" : 
            s += " (avec Prise sûre)";
            proba += (1-proba)*proba
  
            break;
            case "Réception" : 
            s += " (avec Réception)";
            proba += (1-proba)*proba
  
            break;
            case "Passe" : 
            s += " (avec Passe)";
            proba += (1-proba)*proba
  
            break;
            case "Foncer" : 
            s += " (avec Équilibre)";
            proba += (1-proba)*proba
            break;
            default : break;
          }
        
        }
      
        this.sequence.push({com: s, proba:proba})
        // resultat temporaire ligne de calcul
        this.calculProba();
      }
        //faire un toast erreur
    }

    addBlocage(blocage:Blocage, dif:number){
      if(dif){
        let s:string = `Blocage à ${dif} dés()). Réussite sur` 
        let prob = 1;
        let dice:number = 0
        if (blocage.skull) {
          s += " crâne,";
          dice ++
        }
        if (blocage.powskull) {
          s += " Les 2 au sol,";
          dice++}
        if (blocage.push) {
          s += " Flèche,";
        dice += 2}
        if (blocage.bouscule) {
          s += " Bousculé,";
          dice++}
        if (blocage.pow) {s += " Flash";{
          dice++
        }}

        switch(dif){
          case 1:
            prob =  1-(6-dice)/6;
            break;
          case 2:
            prob =  1-(6-dice)*(6-dice)/6*6;
            break;
          case 3:
            prob =  1-(6-dice)*(6-dice)*(6-dice)/6*6*6;
            break;
          case -2:
            prob = 1-(6*6-(dice)*(dice))/6*6
            break;
          case -3:
            prob =   1-(6*6*6-(dice)*(dice)*(dice))/6*6*6
            break;
        }
      
        


        this.sequence.push({com: s, proba:prob})
        // resultat temporaire ligne de calcul
        this.calculProba();
      }
   
     
    }

    calculProba(){
      this.proba=1;
      this.sequence.forEach(seq =>{
        this.proba *= seq.proba; 
      })
      
      for (let i =0;i <= this.relance;i++){
        this.result[i] = ` ${i}rr : ${(this.proba*100).toFixed(2)} % `;
      }
    }

    export(){
      let com:string[] =[]
      this.sequence.forEach(seq=>{
        com.push(seq.com);
      })
      Share.share({
        text: `Pour la séquence ${[...com]} | Résultat : ${[...this.result]}`,
      });
    }
    supSeq(index:number){
      console.log(index)
      this.sequence.splice(index,1)
      this.sequence.forEach(seq=>{
        console.log(seq)
      })
     
      this.calculProba();
     
    }
    clear(){
      this.sequence=[];
      this.result=[];
      this.proba=1;
    }

}
interface Joueur{
  esquive?:boolean ,
  priseSure?:boolean ,
  equilibre?:boolean ,
  reception?:boolean ,
  pro?:boolean 
  frenesie?:boolean ,
  passe?:boolean 
  bagareur?:boolean ,
  solitaire?:number ,
  cp?:number
}

interface Blocage{
  skull?:boolean,
  powskull?:boolean,
  push?:boolean,
  bouscule?:boolean,
  pow?:boolean     
}
