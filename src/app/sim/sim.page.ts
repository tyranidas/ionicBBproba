import { Component, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sim',
  templateUrl: './sim.page.html',
  styleUrls: ['./sim.page.scss'],
})
export class SimPage implements OnInit {

  constructor(private toastController: ToastController) { }
  styleButton = 'clear'
  action!: string;
  modalAction: boolean = false;
  joueurActif: Joueur = { frenesie: false, jugg: false };
  relance: number = 0;
  difficulte!: number;
  sequence: any[] = [];
  blocage: Blocage = {};
  frenesie: Blocage = {};
  result: string[] = [];
  proba: number = 1
  ngOnInit() {
  }

  async displayAction(typeAction: string) {
    if (this.action == typeAction) this.action = ""
    else {
      this.action = typeAction
    }
  }
  async addDifficulte(action: String, dif: number, comp?: boolean | undefined) {
    if (dif) {
      let s = `${action} : ${dif}+`
      let proba = 1 - (dif - 1) / 6
      let rrAuto:boolean=false
      if (comp) {
        switch (action) {
          case "Esquive":
            s += " (avec Esquive)";
            proba += (1 - proba) * proba
            rrAuto=true;
            break;
          case "Ramassage":
            s += " (avec Prise sûre)";
            proba += (1 - proba) * proba
            rrAuto=true;
            break;
          case "Réception":
            s += " (avec Réception)";
            proba += (1 - proba) * proba
            rrAuto=true;
            break;
          case "Passe":
            s += " (avec Passe)";
            proba += (1 - proba) * proba
            rrAuto=true;
            break;
          case "Foncer":
            s += " (avec Équilibre)";
            proba += (1 - proba) * proba
            break;
          default: break;
        }

      }

      this.sequence.push({ com: s, proba: proba, rrAuto: rrAuto })
      // resultat temporaire ligne de calcul
      this.calculProba();
    }
    else {
      const toast = await this.toastController.create({
        message: 'Merci de sélectionner un niveau de difficulté',
        duration: 1500,
        position: 'middle',
      });
      await toast.present();

    }
  }
  addPasse(portee: number, cp: number | undefined, comp?: boolean | undefined) {
    if (!cp) {
      this.toast('Merci de sélectionner la capacité de passe du lanceur');
      return
    }
    if (!portee) {
      this.toast('Merci de sélectionner la portée');
      return
    }
    let porteString: string = ""
    switch (portee) {
      case 0:
        porteString = "éclair"
        break;
      case -1:
        porteString = "courte"
        break;
      case -2:
        porteString = "longue"
        break;
      case -3:
        porteString = "bombe"
        break;
      default: break;
    }
    let dif: number = cp - portee;
    let s = `Passe ${porteString} : ${dif}+`;
    let proba = 1 - (dif - 1) / 6;
    if (comp) {
      proba += (1 - proba) * proba
      s += " (avec Passe)";
    }
    if (cp > 1) {
      if (portee > -3 || cp == 3) {
        proba += (cp - 2) / 6 * 0.0469 + (cp - 2) / 6 * 0.469 / 8
      }
      else {
        proba += 1 / 6 * 0.0469 + 1 / 6 * 0.469 / 8
      }
    }
    this.sequence.push({ com: s, proba: proba });
    this.calculProba();


  }
  addBlocage(blocage: Blocage, frenesie?: Blocage) {
    let dif!: number
    if (blocage.dif) dif = blocage.dif;
    if (!dif) {
      this.toast('Merci de sélectionner un niveau de difficulté')
      return
    }
    if (Object.keys(blocage).length === 0) {
      this.toast('Merci de sélectionner au moins un dé')
      return
    }

    let s: string = `Blocage à ${dif} dés()). Réussite sur`
    let blockDice: { dice: number, s: string } = this.calculBlocDice(blocage, s)
    let prob = this.calculBloc(dif, blockDice.dice, blocage);

    if (frenesie && frenesie.dif) {
      frenesie.frenesie = true
      let sJugg=this.joueurActif.jugg ? ' avec JuggerNauth' : '' ;
      blockDice.s += ` (Frénésie ${sJugg}: Blocage à ${frenesie.dif} dés()). Réussite sur`
      let frenDice: { dice: number, s: string } = this.calculBlocDice(frenesie, blockDice.s)
      let probFren = this.calculBloc(frenesie.dif, frenDice.dice, frenesie);
      blockDice.s = frenDice.s;
      prob += probFren;
    }
    
    this.sequence.push({ com: blockDice.s, proba: prob })
    // resultat temporaire ligne de calcul
    this.calculProba();


  }

  calculProba() {
    this.proba = 1;
    this.sequence.forEach(seq => {
      this.proba *= seq.proba;
    })
    // this.result[0]= `0rr : ${(this.proba * 100).toFixed(2)} %`;
    for (let i = 0; i <= this.relance; i++) {
      let sRR =  this.relance >0 ? i+"rr: " : "";
      this.result[i] = ` ${sRR} ${(this.proba * 100).toFixed(2)} % `;
    }
  }

  calculBloc(dif: number, dice: number, blocage: Blocage): number {
    let prob = 1;
    if (dif == 1) {
      prob = 1 - (6 - dice) / 6;
    }
    if (dif == 2) {
      prob = 1 - (6 - dice) * (6 - dice) / (6 * 6);
    }
    if (dif == 3) {
      prob = 1 - (6 - dice) * (6 - dice) * (6 - dice) / (6 * 6 * 6);
    }
    if (dif == -2) {
      prob = 1 - (6 * 6 - (dice) * (dice)) / (6 * 6)
    }
    if (dif == -3) {
      prob = 1 - (6 * 6 * 6 - (dice) * (dice) * (dice)) / (6 * 6 * 6)
    }
    if (blocage.frenesie) {
      prob =  this.joueurActif.jugg ? prob = prob * 27 / 36 : prob = prob * 20 / 36;
    }
    return prob;
  }

  calculBlocDice(blocage: Blocage, s: string): { dice: number, s: string } {
    let dice = 0;
    if (blocage.skull) {
      s += " crâne,";
      dice++
    }
    if (blocage.powskull) {
      s += " Les 2 au sol,";
      dice++
    }
    if (blocage.push) {
      s += " Flèche,";
      dice += 2
    }
    if (blocage.bouscule) {
      s += " Bousculé,";
      dice++
    }
    if (blocage.pow) {
      s += " Flash"; {
        dice++
      }
    }
 
    let blocDice = { dice: dice, s: s }
    return blocDice;
  }
  export() {
    let com: string[] = []
    this.sequence.forEach(seq => {
      com.push(seq.com);
    })
    Share.share({
      text: `Pour la séquence ${[...com]} \nRésultat : ${[...this.result]}`,
    });
  }
  supSeq(index: number) {
    this.sequence.splice(index, 1)
    this.sequence.forEach(seq => {
    })

    this.calculProba();

  }
  clear() {
    this.sequence = [];
    this.result = [];
    this.proba = 1;
  }
  async toast(text: string, duration?: number, pos?: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: 'middle',
    });
    await toast.present();

  }
}
interface Joueur {
  esquive?: boolean,
  priseSure?: boolean,
  equilibre?: boolean,
  reception?: boolean,
  pro?: boolean
  frenesie: boolean,
  jugg: boolean,
  passe?: boolean
  bagareur?: boolean,
  solitaire?: number,
  cp?: number
}

interface Blocage {
  skull?: boolean,
  powskull?: boolean,
  push?: boolean,
  bouscule?: boolean,
  pow?: boolean,
  frenesie?: boolean,
  dif?: number
}
