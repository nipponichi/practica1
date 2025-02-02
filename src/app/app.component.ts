import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from "./calculator/calculator.component";
import { imc } from './calculator/imc.model';
import { RegisterComponent } from './register/register.component';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CalculatorComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practica1';
  public imc: imc = {
    name: '',
    height: 0,
    weight: 0,
    isMale: true,
    date: '',
    result: ''
  };

  updateIMC(newImc: imc) {
    this.imc = { ...newImc };
  }
}
