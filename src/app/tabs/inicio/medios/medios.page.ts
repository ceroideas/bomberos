import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-medios',
  templateUrl: './medios.page.html',
  styleUrls: ['./medios.page.scss'],
})
export class MediosPage implements OnInit {

  data;
  // cities;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.medios().subscribe(data=>{
      this.data = data;
      console.log(this.data);

      // if (this.data.length) {
      //   this.saveCategory(data[0]);
      // }
    })
    // this.api.municipios().subscribe(data=>{
    //   this.cities = data;
    // })
  }

  saveCategory(data)
  {
    localStorage.setItem('actualEndpoint','medios');
    localStorage.setItem('actualCategory','MEDIOS ADICIONALES');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
