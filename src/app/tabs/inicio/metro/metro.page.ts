import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-metro',
  templateUrl: './metro.page.html',
  styleUrls: ['./metro.page.scss'],
})
export class MetroPage implements OnInit {

  data;
  data1;
  data2;
  data3;
  // cities;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.metro().subscribe(data=>{
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

  saveCategory(data,r,name = false)
  {
    if (name) {
      localStorage.setItem('name','1');
    }
    localStorage.setItem('actualEndpoint','metro');
    localStorage.setItem('actualCategory','CERCANÍAS / METRO');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/metro/order');
  }

}
