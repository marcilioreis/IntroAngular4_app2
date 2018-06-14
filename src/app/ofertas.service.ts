import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';

// import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfertasService {

    constructor (private http: Http) {    }

    public getOfertas(): Promise<Oferta[]> {
        // efetuar uma requisição http
        return this.http.get('http://localhost:3000/ofertas?destaque=true')
            .toPromise()
            .then((resposta: any) => resposta.json());
        // retornar uma promisse OFERTA{}

    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`http://localhost:3000/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: any) => resposta.json());
    }
}
