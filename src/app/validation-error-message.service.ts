import { Injectable, Inject, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ERROR_MESSAGE_LIST } from './validation-error-message.token';

/**
 * フォームバリデーションエラーメッセージを集中管理するサービス
 * グローバルとローカルのエラーメッセージリストを統合し、
 * NgControlの状態をチェックして適切なエラーメッセージを返す
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationErrorMessageService {
  
  constructor(
    @Inject(ERROR_MESSAGE_LIST) 
    @Optional() 
    private errorMessageList: Record<string, string> | null
  ) {}

  /**
   * NgControlの状態をチェックし、最初に見つかったバリデーションエラーに対応するメッセージを返す
   * エラーがない場合はnullを返す
   * 
   * @param control チェック対象のNgControl
   * @returns エラーメッセージまたはnull
   */
  getErrorMessage(control: NgControl): string | null {
    // controlがnullまたはundefinedの場合はnullを返す
    if (!control) {
      return null;
    }

    // controlにerrorsプロパティが存在しない、またはerrorsがnullの場合はnullを返す
    if (!control.errors) {
      return null;
    }

    // エラーメッセージリストが存在しない場合はnullを返す
    if (!this.errorMessageList) {
      return null;
    }

    // エラーのキーを取得し、最初のエラーに対するメッセージを検索
    const errorKeys = Object.keys(control.errors);
    
    for (const errorKey of errorKeys) {
      const messageTemplate = this.errorMessageList[errorKey];
      
      if (messageTemplate) {
        // プレースホルダーを実際の値で置換
        return this.replacePlaceholders(messageTemplate, control.errors[errorKey]);
      }
    }

    // 対応するメッセージが見つからない場合はnullを返す
    return null;
  }

  /**
   * メッセージテンプレート内のプレースホルダーを実際の値で置換する
   * 
   * @param template メッセージテンプレート
   * @param errorValue エラーオブジェクトの値
   * @returns プレースホルダーが置換されたメッセージ
   */
  private replacePlaceholders(template: string, errorValue: any): string {
    if (!errorValue || typeof errorValue !== 'object') {
      return template;
    }

    let result = template;
    
    // エラーオブジェクトのプロパティでプレースホルダーを置換
    Object.keys(errorValue).forEach(key => {
      const placeholder = `{${key}}`;
      const value = errorValue[key];
      
      if (typeof value === 'string' || typeof value === 'number') {
        result = result.replace(new RegExp(placeholder, 'g'), String(value));
      }
    });

    return result;
  }
}
