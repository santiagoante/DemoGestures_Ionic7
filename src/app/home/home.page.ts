import { Component,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule,AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Gesture, GestureController, GestureDetail  } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,]

})

export class HomePage {

  @ViewChild('content', { static: false }) content!: ElementRef;
  newWindow: Window | null = null;


  constructor(
    private alertController: AlertController,
    private gestureCtrl: GestureController,
    private elementRef: ElementRef
 
    ) {}


  ///// UN TAP /////  

  unTap() {
    console.log('Gesto TOCAR detectado!');
    this.AlertUnTap();
  }

  async AlertUnTap() {
    const alert = await this.alertController.create({
      header: 'Un Tap Detectado',
      message: 'Has realizado un toque en el botón',
      buttons: ['Aceptar'],
      cssClass: 'custom-alert',
    });

    await alert.present();
  }


  ///// DOBLE TAP /////

  dosTap() {
    console.log('Gesto DOBLE TOQUE detectado!');
    this.AlertDosTap();
  }

  async AlertDosTap() {
    const alert = await this.alertController.create({
      header: 'Doble Tap Detectado',
      message: 'Has realizado dos toques en el botón',
      buttons: ['Aceptar'],
      cssClass: 'custom-alert',
    });

    await alert.present();
  }


  ///// UN PRESS /////
  
  pressTimer: any;

  pressOn() {
    this.pressTimer = setTimeout(() => {
      this.showAlert();
    }, 3000); // Tiempo de espera en milisegundos (3 segundos)
  }
  
  pressOff() {
    clearTimeout(this.pressTimer);
  }
  
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Presión Detectada',
      message: 'Has mantenido presionado durante 3 segundos',
      buttons: ['Aceptar'],
      cssClass: 'custom-alert',
    });
  
    await alert.present();
  }

  ///// SWIPE /////

  swipe() {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-size: 100px;
              }
            </style>
          </head>
          <body>
            <div>Hola</div>
          </body>
        </html>
      `);
  
      const swipeListener = newWindow.addEventListener('touchstart', (event) => {
        const startX = event.changedTouches[0].clientX;
  
        newWindow.addEventListener('touchend', (event) => {
          const endX = event.changedTouches[0].clientX;
          const deltaX = endX - startX;
  
          if (deltaX < 0) {
            showMundo();
            //newWindow.close();
          } else if (deltaX > 0) {
            //this.openWindow();
            showHola();
            
          }
        });
      });
  
      const showHola = () => {
        newWindow.document.body.innerHTML = `
          <div>Hola</div>
        `;
      };
      const showMundo = () => {
        newWindow.document.body.innerHTML = `
          <div>Mundo</div>
        `;
      };
    } else {
      console.error('No se pudo abrir la nueva ventana');
    }
  }

  showMundo() {
    if (this.newWindow) {
      this.newWindow.document.body.innerHTML = `
        <div>Mundo</div>
      `;
    }
  }

  ///// PAN /////

  pan() {
    const nuevaVentana = window.open('', '_blank');
    if (nuevaVentana) {
      nuevaVentana.document.write(`
        <html>
          <head>
            <style>
              html, body {
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .container {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              .rectangle {
                position: relative;
                width: 900px;
                height: 700px;
                background-color: gray;
                margin-bottom: 40px;
                touch-action: none;
              }
              .output {
                text-align: center;
                font-size: 40px;
              }
              .draggable {
                position: absolute;
                width: 50px;
                height: 50px;
                background-color: blue;
                cursor: move;
              }
              h1{
                font-size: 60px;
                align-items: center;
                margin-bottom: 40px;
              }
            </style>
          </head>
          <body>  
            <div class="container">
            <h1>TIPO DE GESTO PAN</h1>
              <div class="rectangle">
                <div class="draggable"></div>
              </div>
              <div class="output">
                <div id="touchPosition"></div>
              </div>
            </div>
            <script>
              const rectangle = document.querySelector('.rectangle');
              const draggable = document.querySelector('.draggable');
              const touchPosition = document.getElementById('touchPosition');
              let isDragging = false;
              let initialX = 0;
              let initialY = 0;
    
              rectangle.addEventListener('touchstart', startSwipe);
              rectangle.addEventListener('touchmove', handleSwipe);
              rectangle.addEventListener('touchcancel', cancelSwipe);
    
              draggable.addEventListener('touchstart', startDrag);
              draggable.addEventListener('touchmove', handleDrag);
              draggable.addEventListener('touchend', endDrag);
    
              function startSwipe(event) {
                const touch = event.touches[0];
                updateTouchPosition(touch);
              }
    
              function handleSwipe(event) {
                event.preventDefault();
                const touch = event.touches[0];
                updateTouchPosition(touch);
              }
    
              function cancelSwipe() {
                clearTouchPosition();
              }
    
              function startDrag(event) {
                const touch = event.touches[0];
                initialX = touch.clientX - draggable.offsetLeft;
                initialY = touch.clientY - draggable.offsetTop;
                isDragging = true;
              }
    
              function handleDrag(event) {
                event.preventDefault();
                if (isDragging) {
                  const touch = event.touches[0];
                  const offsetX = touch.clientX - initialX;
                  const offsetY = touch.clientY - initialY;
                  draggable.style.left = offsetX + 'px';
                  draggable.style.top = offsetY + 'px';
                }
              }
    
              function endDrag() {
                isDragging = false;
              }
    
              function updateTouchPosition(touch) {
                const currentX = parseInt(touch.clientX, 10);
                const currentY = parseInt(touch.clientY, 10);
    
                touchPosition.innerHTML = \`
                  <div>Posición:</div>
                  <div>X: \${currentX}</div>
                  <div>Y: \${currentY}</div>
                \`;
              }
    
              function clearTouchPosition() {
                touchPosition.innerHTML = '';
              }
            </script>
          </body>
        </html>
      `);
    
      nuevaVentana.document.close();
    }
  }
  

  ///// ROTATE /////
    
  rotate() {
    const nuevaVentana = window.open('', '_blank');
    if (nuevaVentana) {
      nuevaVentana.document.write(`
        <html>
          <head>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                overflow: hidden;
              }
              .rotate-container {
                position: relative;
                width: 800px;
                height: 800px;
                perspective: 100px;
                touch-action: none;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .rotate-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
                transition: transform 0.3s;
              }
              .rotate-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .rotate-title {
                position: absolute;
                top: -250px;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 60px;
                color: Black;
                z-index: 1;
              }
            </style>
          </head>
          <body>
            <div class="rotate-container">
              <div class="rotate-title">TIPO DE GESTO ROTATE</div>
              <div class="rotate-image">
                <img src="/assets/img/unicauca.jpg" alt="Imagen rotada">
              </div>
            </div>
            <script>
              const rotateContainer = document.querySelector('.rotate-container');
              const rotateImage = document.querySelector('.rotate-image');
              let initialAngle = 0;
              let currentAngle = 0;
    
              rotateContainer.addEventListener('touchstart', startRotate);
              rotateContainer.addEventListener('touchmove', rotate);
              rotateContainer.addEventListener('touchend', endRotate);
    
              function startRotate(event) {
                initialAngle = getAngle(event.touches);
              }
    
              function rotate(event) {
                currentAngle = getAngle(event.touches);
                const rotation = (currentAngle - initialAngle) % 360;
                rotateImage.style.transform = 'rotate(' + rotation + 'deg)';
              }
    
              function endRotate() {
                initialAngle = currentAngle;
              }
    
              function getAngle(touches) {
                const touch1 = touches[0];
                const touch2 = touches[1];
                const deltaX = touch2.clientX - touch1.clientX;
                const deltaY = touch2.clientY - touch1.clientY;
                const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
                return angle;
              }
            </script>
          </body>
        </html>
      `);
      nuevaVentana.document.close();
    }
  }


  ///// PINCH /////

  pinch() {
    const nuevaVentana = window.open('', '_blank');
    if (nuevaVentana) {
      nuevaVentana.document.write(`
        <html>
          <head>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                overflow: hidden;
              }
              .pinch-container {
                position: relative;
                width: 800px;
                height: 800px;
                touch-action: none;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .pinch-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transition: transform 0.3s;
                transform-origin: center center;
              }
              .pinch-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
              .pinch-title {
                position: absolute;
                top: -250px;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: 60px;
                color: black;
                z-index: 1;
              }
            </style>
          </head>
          <body>
            <div class="pinch-container">
              <div class="pinch-title">TIPO DE GESTO PINCH</div>
              <div class="pinch-image">
                <img src="/assets/img/unicauca.jpg" alt="Imagen con gesto de pinch">
              </div>
            </div>
            <script>
              const pinchContainer = document.querySelector('.pinch-container');
              const pinchImage = document.querySelector('.pinch-image');
              let initialDistance = 0;
              let currentDistance = 0;
    
              pinchContainer.addEventListener('touchstart', startPinch);
              pinchContainer.addEventListener('touchmove', pinch);
              pinchContainer.addEventListener('touchend', endPinch);
    
              function startPinch(event) {
                const touch1 = event.touches[0];
                const touch2 = event.touches[1];
                initialDistance = getDistance(touch1, touch2);
              }
    
              function pinch(event) {
                const touch1 = event.touches[0];
                const touch2 = event.touches[1];
                currentDistance = getDistance(touch1, touch2);
                const scale = currentDistance / initialDistance;
                pinchImage.style.transform = 'scale(' + scale + ')';
              }
    
              function endPinch() {
                initialDistance = currentDistance;
              }
    
              function getDistance(touch1, touch2) {
                const deltaX = touch2.clientX - touch1.clientX;
                const deltaY = touch2.clientY - touch1.clientY;
                return Math.hypot(deltaX, deltaY);
              }
            </script>
          </body>
        </html>
      `);
      nuevaVentana.document.close();
    }
  }
}