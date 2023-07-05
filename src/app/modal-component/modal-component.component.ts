import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() imageSrc: string;
  private initialScale = 1;
  private currentScale = 1;

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  onPinch(event: any) {
    const scale = this.calculatePinchScale(event);
    this.currentScale = this.initialScale * scale;
    this.applyZoom();
  }

  private calculatePinchScale(event: any): number {
    // Aquí puedes agregar la lógica para calcular el factor de escala del gesto de pellizco
    // Puedes usar event.scale o cualquier otro método según la biblioteca o enfoque que estés utilizando

    // Ejemplo utilizando event.scale en un rango de escala entre 0.5 y 2
    const minScale = 0.5;
    const maxScale = 2;
    return Math.max(minScale, Math.min(maxScale, event.scale));
  }

  private applyZoom() {
    const imgElement = document.querySelector('.zoom-image') as HTMLElement;
    imgElement.style.transform = `scale(${this.currentScale})`;
  }
}
