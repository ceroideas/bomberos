import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-municipal',
  templateUrl: './municipal.page.html',
  styleUrls: ['./municipal.page.scss'],
})
export class MunicipalPage implements OnInit {

  data;
  data1;
  data2;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.municipal().subscribe(data=>{
      this.data = data;
      console.log(this.data);

      // if (this.data.length) {
      //   this.saveCategory(data[0],);
      // }
    })
    // this.api.municipios().subscribe(data=>{
    //   this.cities = data;
    // })
  }

  saveCategory(data,r)
  {
    localStorage.setItem('type','consorcio');
    localStorage.setItem('actualEndpoint','municipal');
    localStorage.setItem('actualCategory','Consorcios Serv. Municipales');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/map2');
  }

  saveCategory2(data,r)
  {
    localStorage.setItem('type','servicio');
    localStorage.setItem('actualEndpoint','municipal');
    localStorage.setItem('actualCategory','Consorcios Serv. Municipales');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/municipal/lista');
  }

}
