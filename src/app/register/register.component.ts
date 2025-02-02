import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { imc } from '../calculator/imc.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnChanges {
  @Input() imc!: imc;

  public imcList: imc[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imc'] && changes['imc'].currentValue) {
      const newImc = changes['imc'].currentValue;

      if (newImc.name !== "" && newImc.height > 0 && newImc.weight > 0) {
        this.addRegister(newImc);
      }
    }
  }

  addRegister(newImc: imc) {
    this.imcList = [...this.imcList, { ...newImc }];
    console.log("Lista actualizada:", this.imcList);
  }
}
