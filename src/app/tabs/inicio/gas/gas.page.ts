import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-gas',
  templateUrl: './gas.page.html',
  styleUrls: ['./gas.page.scss'],
})
export class GasPage implements OnInit {

  data;
  data1;
  data2;
  // cities;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.gas().subscribe(data=>{
      this.data = data;
      console.log(this.data);

      // if (this.data.length) {
      //   this.saveCategory(data[0],data[0][0]);
      // }
    })
    // this.api.municipios().subscribe(data=>{
    //   this.cities = data;
    // })
  }

  saveCategory(data,r)
  {
    localStorage.setItem('actualEndpoint','gas');
    localStorage.setItem('actualCategory','GAS / OLEO');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
