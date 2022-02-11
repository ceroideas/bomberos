import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.page.html',
  styleUrls: ['./espacios.page.scss'],
})
export class EspaciosPage implements OnInit {

  data;
  // cities;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.espacios().subscribe(data=>{
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
    localStorage.setItem('actualEndpoint','espacios');
    localStorage.setItem('actualCategory','ESPACIOS NATURALES PROTEGIDOS');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
