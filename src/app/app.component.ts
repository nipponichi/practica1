import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from "./calculator/calculator.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, CalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practica1';
}
