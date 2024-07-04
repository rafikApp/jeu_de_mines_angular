import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.scss']
})
export class GrilleComponent implements OnInit {
  private grille: any;
  jeuTerminer = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.grille = this.elRef.nativeElement.querySelector('#grille');
    this.genererUneGrille();
  }


  genererUneGrille() {
    this.jeuTerminer = false;
    this.renderer.setProperty(this.grille, 'innerHTML', '');
    for (let i = 0; i < 15; i++) {
      let rangée = this.renderer.createElement('tr');
      this.renderer.appendChild(this.grille, rangée);
      for (let j = 0; j < 15; j++) {
        let cellule = this.renderer.createElement('td');
        this.renderer.listen(cellule, 'click', () => this.init(cellule));
        this.renderer.setAttribute(cellule, 'mine', 'false');
        this.renderer.appendChild(rangée, cellule);
      }
    }
    this.genererDesMines();
  }

  genererDesMines() {
    for (let i = 0; i < 30; i++) {
      let rangée = Math.floor(Math.random() * 15);
      let colonne = Math.floor(Math.random() * 15);
      let cellule = this.grille.rows[rangée].cells[colonne];
      this.renderer.setAttribute(cellule, 'mine', 'true');
    }
  }

  ajouterMineIcon(cellule: any) {
    let img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', 'assets/mine.png');
    this.renderer.setStyle(img, 'width', '20px');
    this.renderer.setStyle(img, 'height', '20px');
    this.renderer.setStyle(img, 'display', 'block');
    this.renderer.setStyle(img, 'margin', 'auto');
    this.renderer.appendChild(cellule, img);
  }

  afficherLesMines() {
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        let cellule = this.grille.rows[i].cells[j];
        if (cellule.getAttribute('mine') === 'true') {
          this.renderer.addClass(cellule, 'mine');
          this.ajouterMineIcon(cellule);
        }
      }
    }
  }

  jeuATerminer() {
    let terminer = true;
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (this.grille.rows[i].cells[j].getAttribute('mine') === 'false' && this.grille.rows[i].cells[j].innerHTML === '') {
          terminer = false;
        }
      }
    }
    if (terminer) {
      this.afficherLesMines();
    }
  }

  init(cellule: any) {
    if (this.jeuTerminer) {
      return;
    } else {
      if (cellule.getAttribute('mine') === 'true') {
        this.afficherLesMines();
        this.jeuTerminer = true;
      } else {
        this.renderer.addClass(cellule, 'active');
        let nbMines = 0;
        let cellRow = cellule.parentNode.rowIndex;
        let cellCol = cellule.cellIndex;
        for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 14); i++) {
          for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 14); j++) {
            if (this.grille.rows[i].cells[j].getAttribute('mine') === 'true') {
              nbMines++;
            }
          }
        }

        if (nbMines === 1) {
          this.renderer.addClass(cellule, 'une-mine');
        } else if (nbMines === 2) {
          this.renderer.addClass(cellule, 'deux-mines');
        } else if (nbMines === 3) {
          this.renderer.addClass(cellule, 'trois-mines');
        }

        cellule.innerHTML = nbMines === 0 ? ' ' : nbMines.toString();

        if (nbMines === 0) {
          for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 14); i++) {
            for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 14); j++) {
              if (this.grille.rows[i].cells[j].innerHTML === '') {
                this.init(this.grille.rows[i].cells[j]);
              }
            }
          }
        }
        this.jeuATerminer();
      }
    }
  }


}
