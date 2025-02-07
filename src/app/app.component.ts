import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from "./calculator/calculator.component";
import { Imc } from './calculator/imc.model';
import { RegisterComponent } from './register/register.component';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CalculatorComponent, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practica1';
  public imc: Imc = {
    name: '',
    height: 0,
    weight: 0,
    isMale: true,
    result: ''
  };

  updateIMC(newImc: Imc) {
    this.imc = { ...newImc };
  }
}
