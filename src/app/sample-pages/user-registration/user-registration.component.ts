import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageService } from '../../validation-error-message.service';
import { provideLocalErrorMessages } from '../../validation-error-message.helpers';

/**
 * ユーザー登録フォームページ - ローカルレベルのメッセージ設定例1
 */
@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    // ユーザー登録フォーム固有のエラーメッセージ
    provideLocalErrorMessages({
      required: '🔴 この項目は必ず入力してください',
      email: '📧 正しいメールアドレスを入力してください（例：user@example.com）',
      minlength: '📝 {requiredLength}文字以上で入力してください',
      pattern: '🔒 パスワードは英数字を含む必要があります',
      passwordConfirm: '🔑 パスワードが一致しません'
    })
  ],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationErrorMessageService: ValidationErrorMessageService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)/)]],
      confirmPassword: ['', [Validators.required]]
    });

    // パスワード確認のカスタムバリデーション
    this.registrationForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
    this.registrationForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordMatch();
    });
  }

  private checkPasswordMatch(): void {
    const password = this.registrationForm.get('password')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;

    if (confirmPassword && password !== confirmPassword) {
      this.registrationForm.get('confirmPassword')?.setErrors({ passwordConfirm: true });
    } else {
      const errors = this.registrationForm.get('confirmPassword')?.errors;
      if (errors && errors['passwordConfirm']) {
        delete errors['passwordConfirm'];
        const hasOtherErrors = Object.keys(errors).length > 0;
        this.registrationForm.get('confirmPassword')?.setErrors(hasOtherErrors ? errors : null);
      }
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.registrationForm.get(fieldName);
    if (!control) {
      return null;
    }

    const ngControl = {
      errors: control.errors
    } as NgControl;

    return this.validationErrorMessageService.getErrorMessage(ngControl);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('ユーザー登録データ:', this.registrationForm.value);
      alert('✅ ユーザー登録が完了しました！');
    } else {
      Object.keys(this.registrationForm.controls).forEach(key => {
        this.registrationForm.get(key)?.markAsTouched();
      });
    }
  }
}
