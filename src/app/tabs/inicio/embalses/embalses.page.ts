import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-embalses',
  templateUrl: './embalses.page.html',
  styleUrls: ['./embalses.page.scss'],
})
export class EmbalsesPage implements OnInit {

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
    this.api.embalses().subscribe(data=>{
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
    localStorage.setItem('actualEndpoint','embalses');
    localStorage.setItem('actualCategory','EMBALSES / LAGUNAS');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
