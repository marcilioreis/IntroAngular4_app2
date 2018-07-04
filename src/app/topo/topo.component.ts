import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subject, of } from 'rxjs';

import '../util/rxjs.extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  private ofertas: Observable<Oferta[]>;
  private ofertas2: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // retorno Oferta[]
      .pipe(
        debounceTime(1000), // executa a ação do switchMap após 1 segundo
        distinctUntilChanged(),
        switchMap((termo: string) => {
          console.log('request api');

          if (termo.trim() === '') {
            // retornar um observable de array de ofertas vazio
            return of<Oferta[]>([]);
          }
          return this.ofertasService.pesquisaOfertas(termo);
        }),
        catchError((err: any) => {
          console.log(err);
          return of<Oferta[]>([]);
        })
      );

      this.ofertas.subscribe((ofertas: Oferta[]) => {
        this.ofertas2 = ofertas;
      });
  }

  public pesquisa(termoDaBusca: string): void {
    console.log('keyup char', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

}
