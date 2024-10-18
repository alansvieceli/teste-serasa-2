import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UniqueConstraintExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Identifique o código de erro de duplicidade do PostgreSQL (23505 é o código para UNIQUE VIOLATION)
        if ((exception as any).code === '23505') {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                timestamp: new Date().toISOString(),
                path: request.url,
                message:
                    'O documento, nome da fazenda, cidade ou UF já existe no sistema. Por favor, verifique seus dados.',
            });
        }

        // Retorno padrão para outras exceções
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Ocorreu um erro no servidor',
        });
    }
}

@Catch(InternalServerErrorException)
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const message =
            exception instanceof HttpException ? exception.getResponse() : exception.message || 'Bad Request'; // Pegando a mensagem corretamente

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}
