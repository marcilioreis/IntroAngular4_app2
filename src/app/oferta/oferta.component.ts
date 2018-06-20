import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

 constructor(
   private route: ActivatedRoute,
   private ofertasService: OfertasService
  ) {  }

  ngOnInit() {
    // smapshot
    // console.log('ID recuperado da rota: ',  this.route.snapshot.params['id']);

    // subscribe
      /* this.route.params.subscribe((parametro: any) => {
        console.log(parametro);
      }); */

      this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
        .then(( oferta: Oferta ) => {
          this.oferta = oferta;
        });
  }

}