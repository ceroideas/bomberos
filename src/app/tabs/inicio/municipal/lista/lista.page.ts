import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  title;
  data = [];
  data2 = [];
  selected = JSON.parse(localStorage.getItem('actualSelected'));
  categorySelected = JSON.parse(localStorage.getItem('actualSubCategory'));

  // cities = JSON.parse(localStorage.getItem('cities'));
  cities = [
    {id:1 , name:"Oviedo"},
    {id:2 , name:"Santander"},
    {id:3 , name:"Bilbao"},
    {id:4 , name:"San Sebastián"},
    {id:5 , name:"Vitoria-Gasteiz"},
    {id:6 , name:"Pamplona"},
    {id:7 , name:"León"},
    {id:8 , name:"Palencia"},
    {id:9 , name:"Burgos"},
    {id:10, name:"Soria"},
    {id:11, name:"Valladolid"},
    {id:12, name:"Salamanca"},
    {id:13, name:"Ávila"},
    {id:14, name:"Segovia"},
    {id:15, name:"Madrid"},
    {id:16, name:"Cáceres"},
    {id:17, name:"Mérida"},
    {id:18, name:"Ciudad Real"},
    {id:19, name:"Sevilla"},
    {id:20, name:"Jaén"},
    {id:21, name:"Granada"},
    {id:22, name:"Huesca"},
    {id:23, name:"Zaragoza"},
    {id:24, name:"Teruel"},
    {id:25, name:"Lleida"},
    {id:26, name:"Tarragona"},
    {id:27, name:"Barcelona"},
    {id:28, name:"Girona"},
    {id:29, name:"Palma de Mallorca"},
    {id:30, name:"Tenerife"},
    {id:31, name:"La Palma"},
    {id:32, name:"Gran Canaria"},
    {id:33, name:"Fuerteventura"},
    {id:34, name:"Lanzarote"},
    {id:35, name:"Ceuta"},
    {id:36, name:"Melilla"},
  ]
  // provinces = JSON.parse(localStorage.getItem('provinces'));

  mod = localStorage.getItem('mod');

  userSelected = [];

  forceBack

  constructor(public api: ApiService, public toast: ToastController, public alert: AlertController) {
    this.forceBack = localStorage.getItem('retomar');
  }

  ngOnInit() {
    this.init();
  }

  ionViewDidLeave()
  {
    (document.getElementsByTagName('ion-tab-bar')[0] as any).style.display = 'flex';
    (document.getElementById('tab-circle') as any).style.display = 'block';
    localStorage.removeItem('retomar');
  }

  init()
  {
    (document.getElementsByTagName('ion-tab-bar')[0] as any).style.display = 'none';
    (document.getElementById('tab-circle') as any).style.display = 'none';

    this.title = localStorage.getItem('actualCategory')+' - '+this.selected.name;

    this.api[localStorage.getItem('actualEndpoint')](this.selected.id).subscribe(data=>{
      // for (let i of data.cities)
      let j = 0;
      for (let i of this.selected.cities)
      {
      //   let ct = this.provinces.find(x=>x.id == i);
      //   this.data.push({ name:ct.name, id: ct.id});
      //   this.provinces.splice(this.provinces.findIndex(x=>x.id == i),1);
      // }
      // for (let i of data.municipalities)
      // {
        // let ct = this.cities.find(x=>x.id == i);
        // this.data.push({ name:ct.name, id: ct.id});
        this.data.push({ name:i, id: i});
        // this.cities.splice(this.cities.findIndex(x=>x.id == i),1);
        j++;
      }

      if (this.mod == 'r') {
        for (let i = 0; i < this.cities.length; i++) {
          var item = this.cities[i];
          this.data2.push({name:item.name, id: item.name});
        }
      }
      // for (let i = 0; i < /*this.data.length/2*/4; i++) {
      //   var item = this.provinces[Math.floor(Math.random()*this.provinces.length)];
      //   this.data2.push({name:item.name, id: item.id});
      // }

      this.data2 = this.data2.concat(this.data);

      if (this.mod == 'r') {
        this.data2 = this.data2.sort((a, b) => 0.5 - Math.random());
      }else{
        this.data2 = this.data2.sort((a, b) => a.name.toString().localeCompare(b.name));
      }

      let onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
      }

      this.data2 = this.data2.filter(onlyUnique);

      console.log(this.data2);
    });
  }

  refresh()
  {
    this.resolver = false;
    this.userSelected = [];
  }

  bien;
  mal;
  resolver;

  makeCorregir()
  {
    if (this.resolver) {
      return false;
    }

    this.bien = 0;
    this.mal = 0;
    let total = this.data;

    for (let i of this.userSelected) {

      if (this.data.find(x=>x.id == i.id)) {
        this.bien++;
      }else{
        this.mal++;
      }

    }

    // if (this.userSelected.length < total.length) {
    //   return this.alert.create({message:"Debe seleccionar todos los puntos para poder corregir, faltan "+(total.length - this.userSelected.length)}).then(a=>a.present());
    // }

    if (this.bien == total.length && this.mal == 0) {
     this.api.confetti();
     setTimeout(()=>{
        this.siguiente();
      },3000);
     // this.alert.create({message:"¡Has completado ésta pregunta!"}).then(a=>{
     //    a.present();
     //    setTimeout(()=>{
     //      this.siguiente();
     //      a.dismiss();
     //    },3000);
     //  });
    }else{

      this.alert.create({message:this.bien+" BIEN <br> "+this.mal+" MAL <br> "+ (total.length - (this.bien))+" BLANCO"}).then((a)=>{a.present()});

      // this.alert.create({message:"Has seleccionado al menos una opción incorrecta"}).then(a=>{a.present()});

      if (this.mal.length > 0) {
        document.getElementById('main-screen').classList.add('shake-screen');

        setTimeout(()=>{
          document.getElementById('main-screen').classList.remove('shake-screen');
        },300);
      }
    }
  }
  makeResolver()
  {
    this.userSelected = [];

    this.resolver = true;

    setTimeout(()=>{
      for (let a of this.data) {this.userSelected.push({name:a.name,id:a.id}); }
    },100)
  }
  siguiente()
  {
    let idx = this.categorySelected.findIndex(x=>this.selected.id == x.id);
    if (idx == this.categorySelected.length-1) {
      this.api.nav.back();
      if (this.mod == 'v') {
        // return this.alert.create({message:"Fin de la categoría"}).then(a=>{
        //   a.present();
        // });
      }
      // this.alert.create({message:"¡Has completado toda la categoría!"}).then(a=>{
      //   a.present();
      // });
    }else{
      // this.refresh();
      this.userSelected = [];
      this.data = [];
      this.data2 = [];
      this.selected = this.categorySelected[idx+1];
      this.init();
    }
  }

  addRemove(el)
  {
    if (!this.userSelected.find(x=>x.id == el.id)) {
      this.userSelected.push(el);
    }else{
      let idx = this.userSelected.findIndex(x=>x.name ==el.name);
      if (idx != -1) {
        this.userSelected.splice(idx,1);
      }
    }

    console.log(el.id,this.userSelected);
  }

}
