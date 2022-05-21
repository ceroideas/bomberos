import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public api: ApiService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
    ) {
    this.api.municipios().subscribe(data=>{
      localStorage.setItem('cities',JSON.stringify(data[0]));
      localStorage.setItem('provinces',JSON.stringify(data[1]));
    });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.statusBar.show();
      this.statusBar.overlaysWebView(false);
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      //
      this.api.startStore();
      setTimeout(()=>{
        this.api.checkSuscripcion();
      },1000);

    });

  }
}
