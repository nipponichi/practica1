import { Component, Output, EventEmitter } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { imc } from './imc.model';

@Component({
  selector: 'app-calculator',
  imports: [SliderComponent, RadioButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent {

  public imc: imc = {
    name: '',
    isMale: true,
    date: new Date().toISOString().split('T')[0],
    height: 0,
    weight: 0,
    result: '',
  };

  updateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.imc.name = inputElement.value;
  }

  updateDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.imc.date = inputElement.value;
  }

  recibirDato1(value: number) {
    this.imc.height = value / 100;
    console.log("Altura:", value);
    this.calculateIMC();
  }

  recibirDato2(value: number) {
    this.imc.weight = value;
    console.log("Peso:", value);
    this.calculateIMC();
  }

  setGender(value: boolean) {
    this.imc.isMale = value;
    //console.log("option:", isMale ? "Male" : "Female");
    this.calculateIMC();
  }
  
  calculateIMC() {
    if (this.imc.height > 0 && this.imc.weight > 0) {
      const imcResult = this.imc.weight / Math.pow(this.imc.height, 2);
      this.imc.result = `${imcResult.toFixed(2)} - ${this.getIMCCategory(imcResult)}`;
      console.log(this.imc)
    } else {
      this.imc.result = "0";
    }
  }

  getIMCCategory(imc: number): string {
    const ranges = this.imc.isMale ? [
        { max: 18.9, label: "Bajo peso" },
        { max: 25.9, label: "Peso normal" },
        { max: 30.9, label: "Sobrepeso" },
        { max: 35.9, label: "Obesidad Grado 1" },
        { max: 40.9, label: "Obesidad Grado 2" },
        { max: Infinity, label: "Obesidad Grado 3 (Mórbida)" }
      ] : [
        { max: 18.4, label: "Bajo peso" },
        { max: 24.4, label: "Peso normal" },
        { max: 29.4, label: "Sobrepeso" },
        { max: 34.4, label: "Obesidad Grado 1" },
        { max: 39.4, label: "Obesidad Grado 2" },
        { max: Infinity, label: "Obesidad Grado 3 (Mórbida)" }
      ];
    for (const range of ranges) {
        if (imc <= range.max) return range.label;
    }
    return "Desconocido";
  }

  saveRegister() {
    this.imcSave.emit(this.imc);
  }

  @Output() imcSave = new EventEmitter<imc>();
}
