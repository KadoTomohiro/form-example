import { Component } from '@angular/core';
import {ControlFieldComponent} from '../../control-field/control-field.component';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-control-field-sample',
  imports: [
    ControlFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './control-field-sample.html',
  styleUrl: './control-field-sample.css'
})
export class ControlFieldSample {
  control = new FormControl<string>('', [Validators.required, Validators.maxLength(5)]);
}
