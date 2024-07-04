import { Component, ViewChild } from '@angular/core';
import { GrilleComponent } from '../grille/grille.component';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrl: './jeu.component.scss'
})
export class JeuComponent {
  @ViewChild(GrilleComponent) grilleComponent!: GrilleComponent;
  reinJeu() {
    this.grilleComponent.genererUneGrille();
  }
}
