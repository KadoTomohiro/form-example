import { TestBed } from '@angular/core/testing';
import { NgControl } from '@angular/forms';
import { ValidationErrorMessageService } from './validation-error-message.service';
import {ERROR_MESSAGE_LIST, ValidationMessages} from './validation-error-message.token';

describe('ValidationErrorMessageService', () => {
  let service: ValidationErrorMessageService;
  let mockErrorMessageList: ValidationMessages;

  beforeEach(() => {
    mockErrorMessageList = {
      required: 'この項目は必須です',
      email: '有効なメールアドレスを入力してください',
      minlength: '最小{requiredLength}文字で入力してください',
      maxlength: '最大{maxLength}文字で入力してください',
      min: '{min}以上の値を入力してください',
      max: '{max}以下の値を入力してください'
    };

    TestBed.configureTestingModule({
      providers: [
        ValidationErrorMessageService,
        { provide: ERROR_MESSAGE_LIST, useValue: mockErrorMessageList }
      ]
    });

    service = TestBed.inject(ValidationErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when control is null', () => {
    const result = service.getErrorMessage(null as any);
    expect(result).toBeNull();
  });

  it('should return null when control has no errors', () => {
    const mockControl = {
      errors: null
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBeNull();
  });

  it('should return error message for required validation', () => {
    const mockControl = {
      errors: { required: true }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('この項目は必須です');
  });

  it('should return error message for email validation', () => {
    const mockControl = {
      errors: { email: true }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('有効なメールアドレスを入力してください');
  });

  it('should return error message with placeholder replacement for minlength', () => {
    const mockControl = {
      errors: {
        minlength: {
          requiredLength: 5,
          actualLength: 3
        }
      }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('最小5文字で入力してください');
  });

  it('should return error message with placeholder replacement for maxlength', () => {
    const mockControl = {
      errors: {
        maxlength: {
          maxLength: 10,
          actualLength: 15
        }
      }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('最大10文字で入力してください');
  });

  it('should return error message with placeholder replacement for min value', () => {
    const mockControl = {
      errors: {
        min: {
          min: 0,
          actual: -1
        }
      }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('0以上の値を入力してください');
  });

  it('should return error message with placeholder replacement for max value', () => {
    const mockControl = {
      errors: {
        max: {
          max: 100,
          actual: 150
        }
      }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('100以下の値を入力してください');
  });

  it('should return first error message when multiple errors exist', () => {
    const mockControl = {
      errors: {
        required: true,
        email: true
      }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('この項目は必須です');
  });

  it('should return null when error key is not found in message list', () => {
    const mockControl = {
      errors: { unknownError: true }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBeNull();
  });

  it('should handle error message list being null', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ValidationErrorMessageService,
        { provide: ERROR_MESSAGE_LIST, useValue: null }
      ]
    });

    service = TestBed.inject(ValidationErrorMessageService);

    const mockControl = {
      errors: { required: true }
    } as unknown as NgControl;

    const result = service.getErrorMessage(mockControl);
    expect(result).toBeNull();
  });

  it('should handle error value that is not an object', () => {
    const mockControl = {
      errors: {
        customError: 'simple string value'
      }
    } as unknown as NgControl;

    // Add custom error to message list
    mockErrorMessageList['customError'] = 'カスタムエラーメッセージ {value}';

    const result = service.getErrorMessage(mockControl);
    expect(result).toBe('カスタムエラーメッセージ {value}'); // placeholder not replaced
  });
});
