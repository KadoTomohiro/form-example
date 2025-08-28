import {AfterContentInit, Component, ContentChild, inject, input, signal} from '@angular/core';
import {LabelComponent} from "./label/label.component";
import {NgControl, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ValidationErrorMessageService} from '../validation-error-message.service';

@Component({
    selector: 'app-control-field',
    imports: [
        LabelComponent,
        NgClass,
        ReactiveFormsModule
    ],
    templateUrl: './control-field.component.html',
    styleUrl: './control-field.component.css'
})
export class ControlFieldComponent implements AfterContentInit {
  readonly label = input('');
  readonly readonly = input(false);
  messages = signal<string | null>(null)
  messageService: ValidationErrorMessageService

  constructor() {
    this.messageService = inject(ValidationErrorMessageService);
  }

  @ContentChild(NgControl) controlRef!: NgControl;

  get hasError():boolean {
    return (this.controlRef?.touched && this.controlRef?.invalid) ?? false;
  }

  get loading(): boolean {
    return this.controlRef?.pending ?? false;
  }

  ngAfterContentInit(): void {
    this.controlRef.control?.events.subscribe(() => {
      const errors = this.controlRef.errors
      this.messages.set(this.messageService.getErrorMessage(this.controlRef));
    })
  }
}
