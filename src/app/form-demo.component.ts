import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageService } from './validation-error-message.service';
import { provideLocalErrorMessages } from './validation-error-message.helpers';

/**
 * ValidationErrorMessageServiceの使用例を示すデモコンポーネント
 */
@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    // ローカルレベルでのエラーメッセージ設定例
    provideLocalErrorMessages({
      required: 'この項目への入力は必須です', // グローバルメッセージを上書き
      email: '正しいメールアドレスの形式で入力してください', // グローバルメッセージを上書き
      customValidator: 'カスタムバリデーションエラーです' // ローカル固有のメッセージを追加
    })
  ],
  template: `
    <div class="form-container">
      <h2>🏠 ホームページ - グローバルエラーメッセージデモ</h2>
      <p class="description">このページではグローバルレベルのエラーメッセージが表示されます</p>
      
      <form [formGroup]="demoForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">名前:</label>
          <input 
            id="name"
            type="text" 
            formControlName="name"
            [class.error]="isFieldInvalid('name')"
          >
          <div class="error-message" *ngIf="isFieldInvalid('name')">
            {{ getFieldErrorMessage('name') }}
          </div>
        </div>

        <div class="form-group">
          <label for="email">メールアドレス:</label>
          <input 
            id="email"
            type="email" 
            formControlName="email"
            [class.error]="isFieldInvalid('email')"
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
          >
          <div class="error-message" *ngIf="isFieldInvalid('password')">
            {{ getFieldErrorMessage('password') }}
          </div>
        </div>

        <div class="form-group">
          <label for="age">年齢:</label>
          <input 
            id="age"
            type="number" 
            formControlName="age"
            [class.error]="isFieldInvalid('age')"
          >
          <div class="error-message" *ngIf="isFieldInvalid('age')">
            {{ getFieldErrorMessage('age') }}
          </div>
        </div>

        <button type="submit" [disabled]="demoForm.invalid">送信</button>
      </form>

      <div class="message-info">
        <h3>🌍 グローバルエラーメッセージの特徴:</h3>
        <ul>
          <li>シンプルで汎用的な文言</li>
          <li>どのページでも共通で使用可能</li>
          <li>基本的なバリデーションに対応</li>
        </ul>
        <p><strong>他のページと比較して違いを確認してください！</strong></p>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .description {
      background-color: #e9ecef;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 20px;
      color: #495057;
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    input.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }

    button {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .message-info {
      margin-top: 30px;
      padding: 15px;
      background-color: #d1ecf1;
      border-radius: 8px;
      border-left: 4px solid #17a2b8;
    }

    .message-info h3 {
      color: #0c5460;
      margin-top: 0;
    }

    .message-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .message-info li {
      margin-bottom: 5px;
      color: #0c5460;
    }

    .message-info p {
      margin-bottom: 0;
      font-weight: 500;
      color: #0c5460;
    }
  `]
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
