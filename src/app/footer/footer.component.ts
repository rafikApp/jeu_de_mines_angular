import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  goTo(url: string): void {  // Suppression du mot-clé 'function' et ajout du type pour 'url'
    window.open(url, "_blank");
  }
}
