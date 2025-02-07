
import { Request, Response } from 'express';
import {ExceptionFilter,Catch,HttpException,ArgumentsHost} from '@nestjs/common';

  
  @Catch(HttpException)

  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {

        //Customize error responses to include the status code, error message, and request path.
      const Geh = host.switchToHttp();
      const response = Geh.getResponse<Response>();
      const request = Geh.getRequest<Request>();
      const status = exception.getStatus();
      const message = exception.message;
  
      response.status(status).json({
        statusCode: status,
        message: message,
        path: request.url,
      });
    }
  }