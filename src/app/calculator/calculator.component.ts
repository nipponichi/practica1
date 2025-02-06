import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { imc } from './imc.model';

@Component({
  selector: 'app-calculator',
  imports: [SliderComponent, RadioButtonComponent, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent {

  @ViewChild('heightSlider') heightSlider!: SliderComponent;
  @ViewChild('weightSlider') weightSlider!: SliderComponent;

  public imc: imc = {
    name: '',
    isMale: true,
    height: 0,
    weight: 0,
    result: '',
  };

  updateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.imc.name = inputElement.value;
  }

  // Height
  sendData1(value: number) {
    this.imc.height = value / 100;
    this.calculateIMC();
  }

  // Weight
  sendData2(value: number) {
    this.imc.weight = value;
    this.calculateIMC();
  }

  setGender(value: boolean) {
    this.imc.isMale = value;
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
      { max: 18.9, label: "Underweight", class: "color-underweight" },
      { max: 25.9, label: "Normal weight", class: "color-normal" },
      { max: 30.9, label: "Overweight", class: "color-overweight" },
      { max: 35.9, label: "Obesity Grade 1", class: "color-obesity1" },
      { max: 40.9, label: "Obesity Grade 2", class: "color-obesity2" },
      { max: Infinity, label: "Obesity Grade 3", class: "color-obesity3" }
    ] : [
      { max: 18.4, label: "Underweight", class: "color-underweight" },
      { max: 24.4, label: "Normal weight", class: "color-normal" },
      { max: 29.4, label: "Overweight", class: "color-overweight" },
      { max: 34.4, label: "Obesity Grade 1", class: "color-obesity1" },
      { max: 39.4, label: "Obesity Grade 2", class: "color-obesity2" },
      { max: Infinity, label: "Obesity Grade 3", class: "color-obesity3" }
    ];

    for (const range of ranges) {
        if (imc <= range.max) 
          return range.label;
    }
    return "Unknown values, revise them";
  }

  validateIMC(): boolean {
    return (
      this.imc.name.trim() !== '' &&
      this.imc.height > 0 &&
      this.imc.weight > 0 && 
      this.imc.result.trim() !== ''
    );
  }

  saveRegister() {
    if (!this.validateIMC()) {
      alert("All the fields must have values");
      return;
  }
  
    this.imcSave.emit(this.imc);
  }

  resetForm() {
    this.imc = {
      name: '',
      isMale: true,
      height: 0,
      weight: 0,
      result: '',
    };

    if (this.heightSlider) {
      this.heightSlider.resetSlider();
      console.log(this.heightSlider);
    }
    if (this.weightSlider) {
      this.weightSlider.resetSlider();
      console.log(this.heightSlider);
    }
  }

  @Output() imcSave = new EventEmitter<imc>();
}
