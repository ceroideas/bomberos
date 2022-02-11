import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  providers: [ScreenOrientation]
})
export class InicioPage implements OnInit {

  mod;
  title;
  data;
  query;

  constructor(private screenOrientation: ScreenOrientation, public api: ApiService) { }

  ngOnInit() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  ionViewDidEnter()
  {
    this.mod = localStorage.getItem('mod');
    if (this.mod == 'v') {
      this.title = "VISUALIZACIÓN";

      this.api.getAllData().subscribe(data=>{
        this.data = data;
      });

    }else{
      this.title = "REPASO";
    }
  }

  routerLink(route)
  {
    if (!this.api.calculateSubscription()) {
      return this.api.showAlert();
    }

    this.api.nav.navigateForward('tabs/preguntas/'+route);
  }

  saveCategory(data,endpoint,category)
  {
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }

  saveCategory1(data,r,endpoint,category)
  {
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/map');
  }


  saveCategory2(data,endpoint,category)
  {
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    this.api.nav.navigateForward('/tabs/preguntas/map2');
  }

  saveCategory3(data,r,endpoint,category,name = false)
  {
    if (name) {
      localStorage.setItem('name','1');
    }
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/metro/order');
  }

  saveCategory4(data,r,endpoint,category)
  {
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/municipal/lista');
  }

  saveCategory5(data,r,endpoint,category)
  {
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/metro/order');
  }

  saveCategory6(data,r,endpoint,category)
  {
    localStorage.setItem('actualEndpoint',endpoint);
    localStorage.setItem('actualCategory',category);
    localStorage.setItem('actualSubCategory',JSON.stringify(data));
    localStorage.setItem('actualSelected',JSON.stringify(r));
    this.api.nav.navigateForward('/tabs/preguntas/map2');
  }

}
