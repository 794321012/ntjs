import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
// import { execPath } from 'process';
@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse;
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message;

      if (validatorMessage instanceof Array) {
        validatorMessage = validatorMessage[0];
      }
    }
    Logger.log({ exception });
    response.status(status).json({
      code: status,
      message: validatorMessage || message,
    });
  }
}
