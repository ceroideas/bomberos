import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-parques',
  templateUrl: './parques.page.html',
  styleUrls: ['./parques.page.scss'],
})
export class ParquesPage implements OnInit {

  data;
  // cities;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.parques().subscribe(data=>{
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
    localStorage.setItem('actualEndpoint','parques');
    localStorage.setItem('actualCategory','PARQUES');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
