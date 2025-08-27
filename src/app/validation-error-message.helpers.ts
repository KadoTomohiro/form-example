import { InjectionToken, Optional, Provider } from '@angular/core';
import { ValidationErrorMessageService } from './validation-error-message.service';

export type ValidationMessages = Record<string, string>;

/**
 * エラーメッセージリストを提供するためのInjectionToken
 * ValidationMessages形式で、バリデーションエラーキーとメッセージのマッピングを定義
 */
export const ERROR_MESSAGE_LIST = new InjectionToken<ValidationMessages>('ERROR_MESSAGE_LIST', {
  providedIn: 'root',
  factory: () => ({
    // デフォルトのエラーメッセージ
    required: 'この項目は必須です',
    email: '有効なメールアドレスを入力してください',
    minlength: '最小{requiredLength}文字で入力してください',
    maxlength: '最大{maxLength}文字で入力してください',
    min: '{min}以上の値を入力してください',
    max: '{max}以下の値を入力してください',
    pattern: '正しい形式で入力してください'
  })
});


export const CUSTOM_ERROR_MESSAGE_LIST = new InjectionToken<ValidationMessages>('CUSTOM_ERROR_MESSAGE_LIST');



/**
 * コンポーネントレベルでエラーメッセージを提供するためのプロバイダー関数
 * グローバルのメッセージリストとローカルのメッセージリストをマージする
 *
 * @param customMessages ローカルレベルで追加・上書きするエラーメッセージ
 * @returns プロバイダー設定
 */
export function provideLocalErrorMessages(customMessages: ValidationMessages) {
  return [{
    provide: CUSTOM_ERROR_MESSAGE_LIST,
    useValue: customMessages
  }];
}

export function mergeErrorMessages(
  globalMessages: ValidationMessages | null,
  localMessages: ValidationMessages | null
): ValidationMessages | null {
  if (!globalMessages && !localMessages) {
    return null;
  }
  return { ...globalMessages, ...localMessages };
}

export function validationErrorMessageServiceFactory(
  globalMessages: ValidationMessages | null,
  localMessages: ValidationMessages | null
): ValidationErrorMessageService | null {

  return new ValidationErrorMessageService(mergeErrorMessages(globalMessages, localMessages))
}

export function provideValidationErrorMessageService(customErrormessage?: ValidationMessages): Provider[] {
  console.log('provideValidationErrorMessageService called with:', customErrormessage);
  const providers: Provider[] = [{
    provide: ValidationErrorMessageService,
    useFactory: validationErrorMessageServiceFactory,
    deps: [
      ERROR_MESSAGE_LIST,
      [new Optional(), CUSTOM_ERROR_MESSAGE_LIST]
    ],
  }];
  if(customErrormessage) {
    providers.push({
      provide: CUSTOM_ERROR_MESSAGE_LIST,
      useValue: customErrormessage
      })
  }
       
  return providers
}