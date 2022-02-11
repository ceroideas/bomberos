import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-carreteras',
  templateUrl: './carreteras.page.html',
  styleUrls: ['./carreteras.page.scss'],
})
export class CarreterasPage implements OnInit {

  data;
  // cities;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.carreteras().subscribe(data=>{
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
    localStorage.setItem('actualEndpoint','carreteras');
    localStorage.setItem('actualCategory','CARRETERAS');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
