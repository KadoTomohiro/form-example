# ValidationErrorMessageService

Angularフォームバリデーションエラーメッセージを集中管理するサービスです。

## 機能

- NgControlの状態をチェックしてバリデーションエラーメッセージを返す
- プレースホルダー機能でエラー値を動的に挿入
- グローバルとローカルのエラーメッセージリストの統合
- 依存性注入によるエラーメッセージの管理

## インストールと設定

### 1. 基本設定

サービスは`providedIn: 'root'`で設定されているため、自動的にルートレベルで利用可能です。

### 2. グローバルレベルでのエラーメッセージ設定

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { ERROR_MESSAGE_LIST } from './app/validation-error-message.token';

bootstrapApplication(App, {
  providers: [
    {
      provide: ERROR_MESSAGE_LIST,
      useValue: {
        required: 'この項目は必須です',
        email: '有効なメールアドレスを入力してください',
        minlength: '最小{requiredLength}文字で入力してください',
        maxlength: '最大{maxLength}文字で入力してください',
        min: '{min}以上の値を入力してください',
        max: '{max}以下の値を入力してください',
        pattern: '正しい形式で入力してください'
      }
    }
  ]
});
```

### 3. コンポーネントレベルでのエラーメッセージ設定

```typescript
import { Component } from '@angular/core';
import { provideLocalErrorMessages } from './validation-error-message.helpers';

@Component({
  selector: 'app-my-form',
  providers: [
    // ローカルレベルでエラーメッセージを追加・上書き
    provideLocalErrorMessages({
      required: 'この項目への入力は必須です', // グローバルメッセージを上書き
      customValidator: 'カスタムバリデーションエラーです' // ローカル固有のメッセージを追加
    })
  ],
  template: `...`
})
export class MyFormComponent {
  // ...
}
```

## 使用方法

### 基本的な使用

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationErrorMessageService } from './validation-error-message.service';

@Component({
  selector: 'app-form',
  template: \`
    <form [formGroup]="myForm">
      <input formControlName="email" [class.error]="isFieldInvalid('email')">
      <div class="error-message" *ngIf="isFieldInvalid('email')">
        {{ getFieldErrorMessage('email') }}
      </div>
    </form>
  \`
})
export class FormComponent {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validationErrorMessageService: ValidationErrorMessageService
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.myForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldErrorMessage(fieldName: string): string | null {
    const control = this.myForm.get(fieldName);
    if (!control) {
      return null;
    }

    // NgControlインターフェースに適合するオブジェクトを作成
    const ngControl = {
      errors: control.errors
    } as NgControl;

    return this.validationErrorMessageService.getErrorMessage(ngControl);
  }
}
```

## プレースホルダー機能

エラーメッセージにはプレースホルダーを使用でき、バリデーションエラーの値が自動的に置換されます：

```typescript
// エラーメッセージ設定
{
  minlength: '最小{requiredLength}文字で入力してください',
  max: '{max}以下の値を入力してください'
}

// minlengthエラーの場合
// エラーオブジェクト: { requiredLength: 5, actualLength: 3 }
// 結果: "最小5文字で入力してください"

// maxエラーの場合  
// エラーオブジェクト: { max: 100, actual: 150 }
// 結果: "100以下の値を入力してください"
```

## API

### ValidationErrorMessageService

#### getErrorMessage(control: NgControl): string | null

NgControlの状態をチェックして、最初に見つかったバリデーションエラーに対応するメッセージを返します。

**パラメータ:**
- `control`: チェック対象のNgControl

**戻り値:**
- エラーメッセージ（string）またはnull

### ヘルパー関数

#### provideLocalErrorMessages(localMessages: Record<string, string>)

コンポーネントレベルでエラーメッセージを提供するためのプロバイダー関数です。

**パラメータ:**
- `localMessages`: ローカルレベルで追加・上書きするエラーメッセージ

## テスト

```bash
ng test
```

サービスのユニットテストが含まれており、以下の項目をカバーしています：

- 基本的なエラーメッセージの取得
- プレースホルダーの置換
- 複数エラーがある場合の処理
- エラーメッセージが見つからない場合の処理
- nullまたは無効な入力の処理

## デモ

プロジェクトには使用例を示すデモコンポーネント（`FormDemoComponent`）が含まれています。

```bash
ng serve
```

でデモアプリケーションを起動して、サービスの動作を確認できます。
