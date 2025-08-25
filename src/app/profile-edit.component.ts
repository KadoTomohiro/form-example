import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageService } from './validation-error-message.service';
import { provideLocalErrorMessages } from './validation-error-message.helpers';

/**
 * プロフィール編集フォームページ - ローカルレベルのメッセージ設定例2
 */
@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    // プロフィール編集フォーム固有のエラーメッセージ
    provideLocalErrorMessages({
      required: '⚠️ プロフィール情報として必須の項目です',
      email: '💌 有効なメールアドレス形式で入力してください',
      minlength: '⏱️ 最低でも{requiredLength}文字は入力してください',
      maxlength: '📏 {maxLength}文字以内で入力してください',
      min: '🔢 {min}以上の数値を入力してください',
      max: '📊 {max}以下の数値を入力してください',
      pattern: '🔤 正しい形式で入力してください（例：03-1234-5678）'
    })
  ],
  template: `
    <div class="page-container">
      <h2>✏️ プロフィール編集フォーム</h2>
      <p class="description">このページではプロフィール編集用のローカルエラーメッセージが表示されます</p>
      
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="profile-form">
        <div class="form-group">
          <label for="displayName">表示名:</label>
          <input 
            id="displayName"
            type="text" 
            formControlName="displayName"
            [class.error]="isFieldInvalid('displayName')"
            placeholder="表示名（2-20文字）"
          >
          <div class="error-message" *ngIf="isFieldInvalid('displayName')">
            {{ getFieldErrorMessage('displayName') }}
          </div>
        </div>

        <div class="form-group">
          <label for="email">連絡先メール:</label>
          <input 
            id="email"
            type="email" 
            formControlName="email"
            [class.error]="isFieldInvalid('email')"
            placeholder="連絡先メールアドレス"
          >
          <div class="error-message" *ngIf="isFieldInvalid('email')">
            {{ getFieldErrorMessage('email') }}
          </div>
        </div>

        <div class="form-group">
          <label for="bio">自己紹介:</label>
          <textarea 
            id="bio"
            formControlName="bio"
            [class.error]="isFieldInvalid('bio')"
            placeholder="自己紹介文（10-200文字）"
            rows="4"
          ></textarea>
          <div class="error-message" *ngIf="isFieldInvalid('bio')">
            {{ getFieldErrorMessage('bio') }}
          </div>
        </div>

        <div class="form-group">
          <label for="age">年齢:</label>
          <input 
            id="age"
            type="number" 
            formControlName="age"
            [class.error]="isFieldInvalid('age')"
            placeholder="年齢（13-120歳）"
          >
          <div class="error-message" *ngIf="isFieldInvalid('age')">
            {{ getFieldErrorMessage('age') }}
          </div>
        </div>

        <div class="form-group">
          <label for="phone">電話番号:</label>
          <input 
            id="phone"
            type="tel" 
            formControlName="phone"
            [class.error]="isFieldInvalid('phone')"
            placeholder="03-1234-5678"
          >
          <div class="error-message" *ngIf="isFieldInvalid('phone')">
            {{ getFieldErrorMessage('phone') }}
          </div>
        </div>

        <button type="submit" [disabled]="profileForm.invalid" class="submit-btn">
          💾 プロフィール更新
        </button>
      </form>

      <div class="message-info">
        <h3>🎨 このページのローカルエラーメッセージ特徴:</h3>
        <ul>
          <li>プロフィール編集に特化した丁寧な文言</li>
          <li>具体的な文字数制限や範囲を明示</li>
          <li>編集作業に配慮した優しいトーン</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 2px solid #2196F3;
      border-radius: 12px;
      background-color: #f3f9ff;
    }

    h2 {
      color: #2196F3;
      margin-bottom: 10px;
    }

    .description {
      background-color: #e3f2fd;
      padding: 10px;
      border-radius: 6px;
      margin-bottom: 20px;
      color: #1565c0;
    }

    .profile-form {
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

    input, textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 16px;
      font-family: inherit;
    }

    input:focus, textarea:focus {
      border-color: #2196F3;
      outline: none;
    }

    input.error, textarea.error {
      border-color: #ff5722;
      background-color: #fff8f7;
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    .error-message {
      color: #ff5722;
      font-size: 14px;
      margin-top: 8px;
      padding: 8px;
      background-color: #fff8f7;
      border-radius: 4px;
      border-left: 4px solid #ff5722;
    }

    .submit-btn {
      background-color: #2196F3;
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
      background-color: #1976d2;
    }

    .message-info {
      margin-top: 30px;
      padding: 15px;
      background-color: #f3e5f5;
      border-radius: 8px;
      border-left: 4px solid #9c27b0;
    }

    .message-info h3 {
      color: #6a1b9a;
      margin-top: 0;
    }

    .message-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .message-info li {
      margin-bottom: 5px;
      color: #4a148c;
    }
  `]
})
export class ProfileEditComponent {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationErrorMessageService: ValidationErrorMessageService
  ) {
    this.profileForm = this.fb.group({
      displayName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      age: ['', [Validators.required, Validators.min(13), Validators.max(120)]],
      phone: ['', [Validators.pattern(/^\d{2,3}-\d{4}-\d{4}$/)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.profileForm.get(fieldName);
    if (!control) {
      return null;
    }

    const ngControl = {
      errors: control.errors
    } as NgControl;

    return this.validationErrorMessageService.getErrorMessage(ngControl);
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('プロフィールデータ:', this.profileForm.value);
      alert('💾 プロフィールが更新されました！');
    } else {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }
}
