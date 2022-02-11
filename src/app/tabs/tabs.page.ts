import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  retomar()
  {
    localStorage.setItem('mod','r');


    this.api.nav.navigateForward('/tabs/preguntas');

    setTimeout(()=>{
      if (localStorage.getItem('actualEndpoint')) {

        let a = localStorage.getItem('actualEndpoint');

        localStorage.setItem('retomar','1');
        
        //map2

        if (a == 'numeros') {
          this.api.nav.navigateForward('/tabs/preguntas/map2');
        }

        if (a == 'municipal') {
          if (localStorage.getItem('type') == 'consorcio') {
            this.api.nav.navigateForward('/tabs/preguntas/map2');
          }else{
            this.api.nav.navigateForward('/tabs/preguntas/municipal/lista');
          }
        }

        //lista
        if (a == 'metro') {
          this.api.nav.navigateForward('/tabs/preguntas/metro/order');
        }

        //map

        if (a != 'numeros' && a != 'municipal' && a != 'metro') {
          this.api.nav.navigateForward('/tabs/preguntas/map');
        }
      }
    },500)
  }

}
