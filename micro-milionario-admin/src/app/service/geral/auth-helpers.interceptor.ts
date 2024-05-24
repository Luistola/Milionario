import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class AuthHelpers implements HttpInterceptor {
    constructor(private auth: AuthService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const usuarioActual = this.auth.pegarUsuario;
        if (usuarioActual) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${Object(usuarioActual).token}`,
                    Accept: 'application/json',
                 /*   'Content-Type': 'application/json' */
                },
});
        }


        return next.handle(request);
    }

}
