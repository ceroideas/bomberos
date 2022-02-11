import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-picos',
  templateUrl: './picos.page.html',
  styleUrls: ['./picos.page.scss'],
})
export class PicosPage implements OnInit {

  data;

  show;
  show2;
  show3;

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  getData()
  {
    this.api.picos().subscribe(data=>{
      this.data = data;
      console.log(this.data);

      // if (this.data.length) {
      //   this.saveCategory(data[0][0]['hijos'][0]['hijos'][0]);
      // }
    })
    // this.api.municipios().subscribe(data=>{
    //   this.cities = data;
    // })
  }

  saveCategory(data)
  {
    localStorage.setItem('actualEndpoint','picos');
    localStorage.setItem('actualCategory','PICOS');
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

}
