import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../../../services/api.service';
declare var $:any;

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  title;
  selected = JSON.parse(localStorage.getItem('actualSelected'));
  categorySelected = JSON.parse(localStorage.getItem('actualSubCategory'));
  shuffledArray = [];
  correct = [];
  data;
  bien;
  mal;

  mod = localStorage.getItem('mod');

  name = localStorage.getItem('name');

  forceBack;

  constructor(public api: ApiService, public alert: AlertController) {
    console.log(this.name);
    this.forceBack = localStorage.getItem('retomar');
  }

  ionViewDidLeave()
  {
    localStorage.removeItem('name');
    (document.getElementsByTagName('ion-tab-bar')[0] as any).style.display = 'flex';
    (document.getElementById('tab-circle') as any).style.display = 'block';
    localStorage.removeItem('retomar');
  }

  ngOnInit() {

    this.title = localStorage.getItem('actualCategory')/*+' - '+this.selected.name*/;
    
    (document.getElementsByTagName('ion-tab-bar')[0] as any).style.display = 'none';
    (document.getElementById('tab-circle') as any).style.display = 'none';

    if (this.mod == 'r') {
      $( "#sortable1, #sortable2" ).sortable({
        connectWith: ".connectedSortable",
        placeholder: "ui-state-highlight"
      }).disableSelection();
    }

    this.init();

  }

  init()
  {
    this.api[localStorage.getItem('actualEndpoint')](this.selected.id).subscribe(data=>{
      this.data = data;

      let new_order = [];

      for (let a of data.points) {new_order.push({name:a,color:'white',text:'black'}); }

      if (this.mod == 'v' && !this.name) {
        for (let a of data.start_end) { if(a != '-') new_order.push({name:a,color:'white',text:'black'}); }
      }

      if (this.mod == 'r')
      {
        for (let a of data.start_end) { if(a != '-' && a != null) new_order.push({name:a,color:'white',text:'black'}); }
      }

      if (this.mod == 'r') {
        this.shuffledArray = new_order.sort((a, b) => 0.5 - Math.random());
      }else{
        this.shuffledArray = new_order/*.sort((a, b) => a.name.toString().localeCompare(b.name))*/;
      }

      setTimeout(()=>{
        let h = document.getElementById('sortable1').offsetHeight;
        document.getElementById('sortable2-1').style.minHeight = h+'px';
        (document.querySelector('#sortable2-1 ul') as any).style.minHeight = (h - 38.19)+'px';
      },100)

    })
  }

  allPoints = [];

  makeCorregir()
  {
    this.bien = 0;
    this.mal = 0;
    console.log(this.shuffledArray)
    let total = Array.from(document.querySelectorAll('#sortable2 > li'));
    let total2 = Array.from(document.querySelectorAll('#sortable1 > li'));

    let control = 0;

    if (this.name) {
      control = this.data.start_end.length;
    }

    let length;

    if (this.name) {
      length = this.shuffledArray.length - this.data.start_end.length;

    }else{
      length = this.shuffledArray.length;
    }

    console.log(length);

    // if (length > total.length) {
    //   return this.alert.create({message:"Debe arrastrar todos los puntos para poder corregir"}).then(a=>a.present());
    // }else{

      this.allPoints = [];

      if (this.name) {
        for(let i of this.data.points) {this.allPoints.push(i)}
        // for(let i of this.data.start_end) {this.allPoints.push(i)}
      }else{
        (this.data.start_end[0] != '-' ? this.allPoints.push(this.data.start_end[0]) : null);
        for(let i of this.data.points) {this.allPoints.push(i)}
        (this.data.start_end[1] != '-' ? this.allPoints.push(this.data.start_end[1]) : null);
      }

      console.log(this.allPoints);

      for (let i in total)
      {
        // console.log((total[i] as any).textContent,this.data.points[i], (total[i] as any).textContent==this.data.points[i])
        if ((total[i] as any).textContent == this.allPoints[i]) {
          this.shuffledArray.find(x=>x.name == this.allPoints[i]).color = 'green';
          this.shuffledArray.find(x=>x.name == this.allPoints[i]).text = 'white';
          this.bien++;
        }else{
          // if (!this.name) {
            this.shuffledArray.find(x=>x.name == this.allPoints[i]).color = 'white' ;// 'crimson';
            this.shuffledArray.find(x=>x.name == this.allPoints[i]).text = 'black' ;// 'white';
          // }
          this.mal++;
        }
      }
    // }

    if (this.bien == total.length && total2.length == control && this.bien > 0) {
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
      this.alert.create({message:"Has seleccionado al menos una opción incorrecta", buttons: [{text:"OK"}]}).then(a=>{a.present()});

        document.getElementById('main-screen').classList.add('shake-screen');

        setTimeout(()=>{
          document.getElementById('main-screen').classList.remove('shake-screen');
        },300);
    }
  }

  makeResolver()
  {
    this.shuffledArray = [];
    this.correct = [];

    setTimeout(()=>{
      if (this.name) {
        for (let a of this.data.points) {this.correct.push({name:a,color:'white',text:'black'}); }
      }else{
        (this.data.start_end[0] != '-' ? this.correct.push({name:this.data.start_end[0],color:'white', text:'black'}) : null);
        for (let a of this.data.points) {this.correct.push({name:a,color:'white',text:'black'}); }
        (this.data.start_end[1] != '-' ? this.correct.push({name:this.data.start_end[1],color:'white', text:'black'}) : null);
      }
    },100)
  }

  refresh()
  {
    this.shuffledArray = [];
    this.correct = [];

    let new_order = [];

    for (let a of this.data.points) {new_order.push({name:a,color:'white',text:'black'}); }
      
    for (let a of this.data.start_end) { if(a != '-') new_order.push({name:a,color:'white',text:'black'}); }

    if (this.mod == 'r') {
      this.shuffledArray = new_order.sort((a, b) => 0.5 - Math.random());
    }else{
      this.shuffledArray = new_order/*.sort((a, b) => a.name.toString().localeCompare(b.name))*/;
    }
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
      this.shuffledArray = [];
      this.correct = [];
      this.selected = this.categorySelected[idx+1];
      this.init();
    }
  }

}
