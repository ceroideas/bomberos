import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  	setTimeout(()=>{
      if (localStorage.getItem('BOMuser')) {
        return this.nav.navigateRoot('tabs');
      }
  		this.nav.navigateRoot('welcome');
  	},3000)
  }

}
