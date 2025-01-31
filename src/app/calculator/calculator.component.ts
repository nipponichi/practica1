import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'app-calculator',
  imports: [SliderComponent, RadioButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  result: string = '';
  altura: number = 0;
  peso: number = 0;

  recibirDato1(valor: number) {
    this.altura = valor/100;
    console.log("Altura:", valor);
    this.calculateIMC();
  }

  recibirDato2(valor: number) {
    this.peso = valor;
    console.log("Peso:", valor);
    this.calculateIMC();
  }

  calculateIMC() {
    if (this.altura > 0) {
      const imc = this.peso / Math.pow(this.altura, 2);
      this.result = imc.toFixed(2);
    } else {
      this.result = "Altura inválida";
    }
  }
}
