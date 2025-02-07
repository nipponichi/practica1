import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Imc } from '../calculator/imc.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnChanges {
  @Input() imc!: Imc;

  public imcList: Imc[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imc'] && changes['imc'].currentValue) {
      const newImc = changes['imc'].currentValue;

      if (newImc.name !== "" && newImc.height > 0 && newImc.weight > 0) {
        this.addRegister(newImc);
      }
    }
  }

  addRegister(newImc: Imc) {
    this.imcList = [...this.imcList, { ...newImc }];
  }
}
