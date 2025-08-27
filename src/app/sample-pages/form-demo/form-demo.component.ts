import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageService } from '../../validation-error-message.service';
import { provideLocalErrorMessages, provideValidationErrorMessageService } from '../../validation-error-message.helpers';

/**
 * ValidationErrorMessageServiceの使用例を示すデモコンポーネント
 */
@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
  ],
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.css']
})
export class FormDemoComponent {
  demoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationErrorMessageService: ValidationErrorMessageService
  ) {
    this.demoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]]
    });
  }

  /**
   * フィールドが無効かどうかをチェック
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.demoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * フィールドのエラーメッセージを取得
   */
  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.demoForm.get(fieldName);
    if (!control) {
      return null;
    }

    // NgControlインターフェースに適合するオブジェクトを作成
    const ngControl = {
      errors: control.errors
    } as NgControl;

    return this.validationErrorMessageService.getErrorMessage(ngControl);
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      console.log('Form submitted:', this.demoForm.value);
    } else {
      console.log('Form is invalid');
      // すべてのフィールドをtouchedにしてエラーを表示
      Object.keys(this.demoForm.controls).forEach(key => {
        this.demoForm.get(key)?.markAsTouched();
      });
    }
  }
}
