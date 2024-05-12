import { commonError } from '@/constants/constants';
import { ErrorResponse } from '@/dto/ErrorResponse.dto';

export function verifyErrorResponse(value: string): ErrorResponse {
  const val: ErrorResponse = JSON.parse(value);
  if (typeof val.message === 'string') {
    return val;
  } else if (Array.isArray(val.message)) {
    const object: Array<string> = val.message;
    val.message = object.join('.');
    return val;
  } else {
    return {
      message: commonError,
      path: '',
      statusCode: 400,
      timestamp: '',
    };
  }
}
