import { ValidationErrorMessageService } from './validation-error-message.service';
import { ERROR_MESSAGE_LIST } from './validation-error-message.token';

/**
 * 複数のエラーメッセージリストをマージするヘルパー関数
 * 後から提供されるリストが前のリストを上書きする
 * 
 * @param globalMessages グローバルレベルのエラーメッセージ
 * @param localMessages ローカルレベルのエラーメッセージ
 * @returns マージされたエラーメッセージリスト
 */
export function mergeErrorMessages(
  globalMessages: Record<string, string>, 
  localMessages: Record<string, string>
): Record<string, string> {
  return { ...globalMessages, ...localMessages };
}

/**
 * コンポーネントレベルでエラーメッセージを提供するためのプロバイダー関数
 * グローバルのメッセージリストとローカルのメッセージリストをマージする
 * 
 * @param localMessages ローカルレベルで追加・上書きするエラーメッセージ
 * @returns プロバイダー設定
 */
export function provideLocalErrorMessages(localMessages: Record<string, string>) {
  return [{
    provide: ERROR_MESSAGE_LIST,
    useFactory: (globalMessages: Record<string, string>) => 
      mergeErrorMessages(globalMessages, localMessages),
  }, 
  { provide: ValidationErrorMessageService}
  ];
}
