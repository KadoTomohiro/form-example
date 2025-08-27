import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationErrorMessageService } from '../../validation-error-message.service';
import { provideValidationErrorMessageService } from '../../validation-error-message.helpers';

/**
 * プロフィール編集フォームページ - ローカルレベルのメッセージ設定例2
 */
@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    // プロフィール編集フォーム固有のエラーメッセージ
    provideValidationErrorMessageService({
      required: '⚠️ プロフィール情報として必須の項目です',
      email: '💌 有効なメールアドレス形式で入力してください',
      minlength: '⏱️ 最低でも{requiredLength}文字は入力してください',
      maxlength: '📏 {maxLength}文字以内で入力してください',
      min: '🔢 {min}以上の数値を入力してください',
      max: '📊 {max}以下の数値を入力してください',
      pattern: '🔤 正しい形式で入力してください（例：03-1234-5678）'
    })
  ],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
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
