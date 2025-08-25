import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageService } from './validation-error-message.service';
import { provideLocalErrorMessages } from './validation-error-message.helpers';

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
  template: `
    <div class="page-container">
      <h2>👤 ユーザー登録フォーム</h2>
      <p class="description">このページではユーザー登録用のローカルエラーメッセージが表示されます</p>
      
      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()" class="registration-form">
        <div class="form-group">
          <label for="username">ユーザー名:</label>
          <input 
            id="username"
            type="text" 
            formControlName="username"
            [class.error]="isFieldInvalid('username')"
            placeholder="ユーザー名を入力"
          >
          <div class="error-message" *ngIf="isFieldInvalid('username')">
            {{ getFieldErrorMessage('username') }}
          </div>
        </div>

        <div class="form-group">
          <label for="email">メールアドレス:</label>
          <input 
            id="email"
            type="email" 
            formControlName="email"
            [class.error]="isFieldInvalid('email')"
            placeholder="user@example.com"
          >
          <div class="error-message" *ngIf="isFieldInvalid('email')">
            {{ getFieldErrorMessage('email') }}
          </div>
        </div>

        <div class="form-group">
          <label for="password">パスワード:</label>
          <input 
            id="password"
            type="password" 
            formControlName="password"
            [class.error]="isFieldInvalid('password')"
            placeholder="8文字以上の英数字"
          >
          <div class="error-message" *ngIf="isFieldInvalid('password')">
            {{ getFieldErrorMessage('password') }}
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">パスワード確認:</label>
          <input 
            id="confirmPassword"
            type="password" 
            formControlName="confirmPassword"
            [class.error]="isFieldInvalid('confirmPassword')"
            placeholder="パスワードを再入力"
          >
          <div class="error-message" *ngIf="isFieldInvalid('confirmPassword')">
            {{ getFieldErrorMessage('confirmPassword') }}
          </div>
        </div>

        <button type="submit" [disabled]="registrationForm.invalid" class="submit-btn">
          ✅ ユーザー登録
        </button>
      </form>

      <div class="message-info">
        <h3>🎯 このページのローカルエラーメッセージ特徴:</h3>
        <ul>
          <li>絵文字付きで視覚的に分かりやすい</li>
          <li>具体的な入力例を含む</li>
          <li>ユーザー登録に特化した文言</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 2px solid #4CAF50;
      border-radius: 12px;
      background-color: #f9fff9;
    }

    h2 {
      color: #4CAF50;
      margin-bottom: 10px;
    }

    .description {
      background-color: #e8f5e8;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 20px;
      color: #2e7d32;
    }

    .registration-form {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
      color: #333;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 16px;
    }

    input:focus {
      border-color: #4CAF50;
      outline: none;
    }

    input.error {
      border-color: #f44336;
      background-color: #fff5f5;
    }

    .error-message {
      color: #f44336;
      font-size: 14px;
      margin-top: 8px;
      padding: 8px;
      background-color: #fff5f5;
      border-radius: 4px;
      border-left: 4px solid #f44336;
    }

    .submit-btn {
      background-color: #4CAF50;
      color: white;
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
    }

    .submit-btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .submit-btn:hover:not(:disabled) {
      background-color: #45a049;
    }

    .message-info {
      margin-top: 30px;
      padding: 15px;
      background-color: #fff3e0;
      border-radius: 8px;
      border-left: 4px solid #ff9800;
    }

    .message-info h3 {
      color: #e65100;
      margin-top: 0;
    }

    .message-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .message-info li {
      margin-bottom: 5px;
      color: #bf360c;
    }
  `]
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
