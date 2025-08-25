import { InjectionToken } from '@angular/core';

/**
 * エラーメッセージリストを提供するためのInjectionToken
 * Record<string, string>形式で、バリデーションエラーキーとメッセージのマッピングを定義
 */
export const ERROR_MESSAGE_LIST = new InjectionToken<Record<string, string>>('ERROR_MESSAGE_LIST', {
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
