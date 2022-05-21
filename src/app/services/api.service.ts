import { Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { EventsService } from './events.service';

import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

declare var moment:any

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://opositorbomberocm.com/backend/public/';
  apiUrl = this.url+'api/';
  user = JSON.parse(localStorage.getItem('BOMuser'));

  vPro = false;

  constructor(public http: HttpClient, public nav: NavController, public alert: AlertController, private store: InAppPurchase2, public events: EventsService, public loadingCtrl: LoadingController) { }

  back()
  {
    this.nav.back();
  }

  showAlert()
  {
    this.alert.create({message:"Para poder disfrutar de las funcionalidades de Mappa deben de adquirir una licencia mensual.", buttons: [
    {
      text:"Comprar",
      handler: () => {

        this.compraAndroid();
      }
    },{
      text:"Cancelar"
    }]}).then(a=>a.present());
  }

  calculateSubscription()
  {
    // return true // quitar esto luego
    this.user = JSON.parse(localStorage.getItem('BOMuser'));

    if (!this.user.subscription_until) {

      console.log(false);

      return false;
    }else{
      let endline = moment(this.user.subscription_until).format('Y-MM-DD');
      let today = moment().format('Y-MM-DD');

      console.log(endline,today,(endline > today));

      return (endline > today);
    }
  }

  getData()
  {
  	return this.http.get('assets/madrid.json');
  }

  getSpain()
  {
    return this.http.get('assets/spain.json');
  }

  login(data)
  {
    return this.http.post(this.apiUrl+'login',data);
  }
  register(data)
  {
    return this.http.post(this.apiUrl+'register',data);
  }
  sendCode(data)
  {
    return this.http.post(this.apiUrl+'sendCode',data);
  }
  changePassword(data)
  {
    return this.http.post(this.apiUrl+'changePassword',data);
  }

  municipios()
  {
    return this.http.get(this.apiUrl+'municipios');
  }
  rios()
  {
    return this.http.get(this.apiUrl+'rios');
  }
  embalses()
  {
    return this.http.get(this.apiUrl+'embalses');
  }
  parques()
  {
    return this.http.get(this.apiUrl+'parques');
  }
  altitud()
  {
    return this.http.get(this.apiUrl+'altitud');
  }
  poblacion()
  {
    return this.http.get(this.apiUrl+'poblacion');
  }
  espacios()
  {
    return this.http.get(this.apiUrl+'espacios');
  }
  medios()
  {
    return this.http.get(this.apiUrl+'medios');
  }
  carreteras()
  {
    return this.http.get(this.apiUrl+'carreteras');
  }
  metro(id = null)
  {
    if (id) {
      return this.http.get(this.apiUrl+'metro/'+id);
    }else{
      return this.http.get(this.apiUrl+'metro');
    }
  }
  gas()
  {
    return this.http.get(this.apiUrl+'gas');
  }
  numeros()
  {
    return this.http.get(this.apiUrl+'numeros');
  }
  municipal(id = null)
  {
    if (id) {
      return this.http.get(this.apiUrl+'municipal/'+id);
    }else{
      return this.http.get(this.apiUrl+'municipal');
    }
  }
  picos(id = null)
  {
    if (id) {
      return this.http.get(this.apiUrl+'picos/'+id);
    }else{
      return this.http.get(this.apiUrl+'picos');
    }
  }

  getAllData()
  {
    return this.http.get(this.apiUrl+'getAllData');
  }

  logout()
  {
    this.alert.create({message:"¿Desea cerrar sesión?",buttons:[{text:"Si",handler:()=>{
      localStorage.removeItem('BOMuser');
      this.nav.navigateRoot('welcome');
    }},{text:"No"}]}).then(a=>a.present());
  }

  saveSubscription(id)
  {
    return this.http.get(this.apiUrl+'saveSubscription/'+id);
  }






  confetti()
  {
    var canvas = document.getElementById("canvas") as any;
    var ctx = canvas.getContext("2d");

    canvas.style.display = 'block';

    //canvas dimensions
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    //snowflake particles
    var mp = 200; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
        particles.push({
            x: Math.random() * W, //x-coordinate
            y: Math.random() * H, //y-coordinate
            r: Math.random() * 15 + 1, //radius
            d: Math.random() * mp, //density
            color: "rgba(" + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", " + Math.floor((Math.random() * 255)) + ", 0.8)",
            tilt: Math.floor(Math.random() * 5) - 5
        });
    }

    //Lets draw the flakes
    function draw() {
        ctx.clearRect(0, 0, W, H);



        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color; // Green path
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.tilt + p.r / 2, p.y + p.tilt);
            ctx.stroke(); // Draw it
        }

        update();
    }

    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    function update() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = {
                        x: Math.random() * W,
                        y: -10,
                        r: p.r,
                        d: p.d,
                        color: p.color,
                        tilt: p.tilt
                    };
                } else {
                    //If the flake is exitting from the right
                    if (Math.sin(angle) > 0) {
                        //Enter from the left
                        particles[i] = {
                            x: -5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d,
                            color: p.color,
                            tilt: p.tilt
                        };
                    } else {
                        //Enter from the right
                        particles[i] = {
                            x: W + 5,
                            y: Math.random() * H,
                            r: p.r,
                            d: p.d,
                            color: p.color,
                            tilt: p.tilt
                        };
                    }
                }
            }
        }
    }

    //animation loop
    let interval = setInterval(draw, 20);

    setTimeout(()=>{
      clearInterval(interval);
      canvas.style.display = 'none';
    },3000);
  }






  /**/

  type



  showApproved()
  {
    this.loadingCtrl.dismiss();
    // console.log(this.type);
    // if (this.type == 'restore') {
    //   this.events.publish('restoreApprover');
    // } else if (this.type == 'purchase') {
    //   this.events.publish('purchaseApprover');
    // }else{
    //   console.log('se ha restaurado la compra');
    // }

    // this.alert.create({message:"La compra ha sido realizada satisfactoriamente!",buttons: ["ok"]}).then(a=>a.present());
  }

  showError()
  {
    this.loadingCtrl.dismiss();
    console.log(this.type);
    if (this.type == 'restore') {
      this.events.publish('restoreRejected');
    } else if (this.type == 'purchase') {
      this.events.publish('purchaseRejected');
    } else {
      console.log('no se encuentra la compra');
    }
    // this.alert.create({message:"No se ha podido completar la petición", buttons: [{text:"Ok"}]}).then(a=>a.present());
  }

  async startStore()
  {
    return await new Promise(resolve => {
      console.log('iniciando');

      this.store.verbosity = this.store.DEBUG;
      this.store.register({
        id: "mappaspro",
        type: this.store.PAID_SUBSCRIPTION,
      });

      this.store.when("mappaspro").initiated((product: IAPProduct) => {
        console.log("producto inicializado:",product);
      });

      this.store.when("mappaspro").approved((product: IAPProduct) => {
        // download the feature
        console.error('Purchase was Approved');
        localStorage.setItem('mappaspro', new Date().toString());
        
        this.vPro = true;
        // product.finish();

        this.saveSubscription(this.user.id).subscribe((data)=>{
          localStorage.setItem('BOMuser',JSON.stringify(data));
          this.showApproved();
        })
      });

      this.store.when("mappaspro").owned((product: IAPProduct) => {
        // download the feature
        console.error('Purchase was Approved');
        localStorage.setItem('mappaspro', new Date().toString());
        
        this.vPro = true;
        // product.finish();

        this.saveSubscription(this.user.id).subscribe((data)=>{
          localStorage.setItem('BOMuser',JSON.stringify(data));
          this.showApproved();
        })
      });

      this.store.when("mappaspro").updated((product: IAPProduct) => {
        // download the feature
        console.error('Purchase was Updated');

        if (product.loaded && product.valid && (product.state === this.store.OWNED || product.state === this.store.APPROVED)) {
          localStorage.setItem('mappaspro', new Date().toString());
          
          this.vPro = true;
          // product.finish();

          // this.saveSubscription(this.user.id).subscribe((data)=>{
          //   localStorage.setItem('BOMuser',JSON.stringify(data));
          //   this.showApproved();
          // })
        }else{
          this.vPro = false;
        }
      });

      this.store.when("mappaspro").cancelled( (product) => {
        console.error('Purchase was Cancelled');
        this.showError();
        // product.finish();
      });

      this.store.when('mappaspro').error( (err) => {
        console.error('Error del producto ' + JSON.stringify(err));
        this.showError();      
      });

      // Track all store errors
      this.store.error( (err) => {
        console.error('Store Error ' + JSON.stringify(err));
        // this.showError();      
      });

      this.store.autoFinishTransactions = true;

      // this.restauraCompra();

      this.store.refresh();

      /**///////////////**/

    });
  }

  /*************/

  async checkSuscripcion(){

     // return await new Promise(resolve => {
     //   let suscripcion = localStorage.getItem('mappaspro');

     //   if (suscripcion){
     //      let fechaSuscripcion = new Date(suscripcion);

     //      let auxFecha = new Date();
     //      auxFecha.setFullYear(auxFecha.getFullYear() - 1);

     //      if (fechaSuscripcion >= auxFecha){
     //        this.vPro = true;
     //        resolve(true);
     //      } else {
     //        this.consumeAndroid();
     //        resolve(true);
     //      }
     //    }
     // });
  }

  consumeAndroid(){
    this.type = 'default';

    let r = this.store.refresh();

    this.store.update();

    r.finished(()=>{
      console.log('finished');
      this.loadingCtrl.dismiss();
    });
    r.failed(()=>{
      console.log('error');
    });
    r.completed(()=>{
      console.log('completed')
    });
  }

  compraAndroid(){
    
    let r = this.store.refresh();

    this.type = 'purchase';
    // const p = this.store.get('mappaspro');
    // console.log('Se ha ordenado el producto mappaspro',JSON.stringify(p));
    this.store.order('mappaspro');
  }

  restauraCompra(){
    this.type = 'restore';

    let r = this.store.refresh();

    console.log(r,JSON.stringify(r));

    // this.store.update();

    r.finished(()=>{
      console.log('finished');
      this.loadingCtrl.dismiss();
    });
    r.failed(()=>{
      console.log('error');
    });
    r.completed(()=>{
      console.log('completed')
    });
  }

  // async goPro()
  // {
  //   const modal = await this.modal.create({
  //     component: BuyPage,
  //     cssClass: 'modalAF'
  //   })

  //   modal.present();
  // }
}
