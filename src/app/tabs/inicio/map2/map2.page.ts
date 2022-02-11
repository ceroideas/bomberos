import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { ApiService } from '../../../services/api.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

declare var google:any;

@Component({
  selector: 'app-map2',
  templateUrl: './map2.page.html',
  styleUrls: ['./map2.page.scss'],
  providers: [ScreenOrientation]
})
export class Map2Page implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map;
  arrayMap:any = [];
  title;
  data;
  selected = JSON.parse(localStorage.getItem('actualSubCategory'));
  cities = JSON.parse(localStorage.getItem('provinces'));

  corregir;
  resolver;

  userSelected = [];

  bien = [];
  mal = [];
  blanco = [];

  mod = localStorage.getItem('mod');

  showRest;

  forceBack;

  constructor(public api: ApiService, public toast: ToastController, private screenOrientation: ScreenOrientation, public alert: AlertController) {
    this.forceBack = localStorage.getItem('retomar');
  }

  ionViewDidLeave()
  {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

    (document.getElementsByTagName('ion-tab-bar')[0] as any).style.display = 'flex';
    (document.getElementById('tab-circle') as any).style.display = 'block';
    localStorage.removeItem('retomar');
  }

  ngOnInit() {

    this.init();
  }

  init()
  {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);

    (document.getElementsByTagName('ion-tab-bar')[0] as any).style.display = 'none';
    (document.getElementById('tab-circle') as any).style.display = 'none';

    this.title = localStorage.getItem('actualCategory')/*+' - '+this.selected.name*/;

    if (localStorage.getItem('actualEndpoint')) {

      if (localStorage.getItem('actualEndpoint') == 'picos') {
        this.api[localStorage.getItem('actualEndpoint')](this.selected.id).subscribe(data=>{
          this.data = data[3];
        })
      } else if (localStorage.getItem('actualEndpoint') == 'rios' || localStorage.getItem('actualEndpoint') == 'embalses' || localStorage.getItem('actualEndpoint') == 'gas' || localStorage.getItem('actualEndpoint') == 'metro' || localStorage.getItem('actualEndpoint') == 'municipal') {

        this.selected = JSON.parse(localStorage.getItem('actualSelected'));
        this.title = localStorage.getItem('actualCategory')/*+' - '+this.selected.name*/;

        this.api[localStorage.getItem('actualEndpoint')]().subscribe(data=>{

          let type = 0;

          if (localStorage.getItem('actualEndpoint') == 'rios') {
            type = this.selected.category == 'Río' ? 0 : 1;}
          if (localStorage.getItem('actualEndpoint') == 'embalses') {
            type = this.selected.category == 'Embalse' ? 0 : 1;}
          if (localStorage.getItem('actualEndpoint') == 'gas') {
            type = this.selected.category == 'Gas' ? 0 : 1;}
          if (localStorage.getItem('actualEndpoint') == 'metro') {
            type = this.selected.category == 'Cercanía' ? 0 : 1;}


          this.data = data[type];
        })
      } else {
        this.api[localStorage.getItem('actualEndpoint')]().subscribe(data=>{
          this.data = data;
        })
      }
    }
  }

  ionViewDidEnter()
  {
    let _main = this;
    function showArrays(event) {

      if (/*_main.corregir || */_main.resolver) {
        return false;
      }
      // Since this polygon has only one path, we can call getPath() to return the
      // MVCArray of LatLngs.
      const polygon = this;
      // const vertices = polygon.getPath();
      let actualPoly = _main.arrayMap.filter(x=>x.id == polygon.id);
      let action;


      for(let i in actualPoly) {
        if (actualPoly[i].fillColor == '#d3d3d3' || actualPoly[i].fillColor == 'yellow') {
            actualPoly[i].setOptions({fillColor:'#076d07'});
            action = {'color':'success','a':'s'};
            let nm = actualPoly[0].name;
            let id = _main.cities.find(x=>x.name == nm).id;

            if (!_main.userSelected.find(x=>x.id == id)) {
              _main.userSelected.push({name:nm,id:id});  
            }

        }else{
            actualPoly[i].setOptions({fillColor:'#d3d3d3'});
            action = {'color':'danger','a':'d'};


            let idx = _main.userSelected.findIndex(x=>x.name == actualPoly[0].name);
            if (idx != -1) {
              _main.userSelected.splice(idx,1);
            }
        }
      }
      

      _main.toast.create({message: ( action.a == 's' ? actualPoly[0].name : '<strike>'+actualPoly[0].name+'</strike>'), color: action.color, duration: 1500, position: 'top'}).then(t=>t.present());
      // console.log(event.latLng.lat(),event.latLng.lng(),vertices);
      // event.latLng.lat()
      // event.latLng.lng()
      
    }

    // let latLng = new google.maps.LatLng(40.5186622,-3.7631015);
    let latLng = new google.maps.LatLng(40.4381311,-3.8196194);

    // console.log(latLng);

    let mapOptions = {
      center: latLng,
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      zoomControl: false,
      fullscreenControl: false,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "off"
              // "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              // "color": "#8a8a8a",
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              // "color": "#373737",
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "labels",
          "stylers": [
            { "visibility": "off" }
          ]
          },{
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
          },{
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              { "visibility": "off" }
            ]
          },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              // "color": "#3c3c3c"
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.api.getSpain().subscribe((spain:any)=>{

      console.log(spain);

      for(let i in spain.Folder.Placemark){

        let a = spain.Folder.Placemark[i];

        if (a.MultiGeometry.Polygon.outerBoundaryIs !== undefined) {
        let b = a.MultiGeometry.Polygon.outerBoundaryIs.LinearRing.coordinates;
        let c = b.split(" ");
        let triangleCoords = [];
        for(let j in c) {
          let d = c[j].split(",");
          triangleCoords.push({lat: parseFloat(d[1]),lng:parseFloat(d[0])});
        }
        // console.log(triangleCoords);
        // Construct the polygon.
        let polygon = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: "#333333",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#d3d3d3",
          fillOpacity: 1,
        });
        polygon.setMap(this.map);
        polygon.addListener("click", showArrays);
        polygon.set('id', i);
        polygon.set('name', a.ExtendedData.SchemaData.SimpleData[2]['__text']);
        this.arrayMap.push(polygon)

        } else if(typeof a.MultiGeometry.Polygon.length === 'number') {

          let p = [];
          for(let k in a.MultiGeometry.Polygon)
          {
            if (a.MultiGeometry.Polygon[k] !== undefined) {

              let b = a.MultiGeometry.Polygon[k].outerBoundaryIs.LinearRing.coordinates;
            let c = b.split(" ");
            let triangleCoords = [];
            for(let j in c) {
              let d = c[j].split(",");
              triangleCoords.push({lat: parseFloat(d[1]),lng:parseFloat(d[0])});
              }
            // console.log(triangleCoords);
            // Construct the polygon.
            let polygon = new google.maps.Polygon({
              paths: triangleCoords,
              strokeColor: "#333333",
              strokeOpacity: 1,
              strokeWeight: 2,
              fillColor: "#d3d3d3",
              fillOpacity: 1,
            });
            polygon.setMap(this.map);
            polygon.addListener("click", showArrays);
            polygon.set('id', i);
            polygon.set('name', a.ExtendedData.SchemaData.SimpleData[2]['__text']);
            this.arrayMap.push(polygon)
            // p.push(polygon);
          }
          }
        // arrayMap.push({name: a.ExtendedData.SchemaData.SimpleData[4]['#text'],polygon:p})
        }
      }

    //
    })

    if (this.mod == 'v') {
      setTimeout(()=>{
        this.makeResolver();
      },1000)
    }

  }

  makeCorregir() {

    if (/*this.corregir || */this.resolver) {
      return false;
    }

    // console.log(this.userSelected);
    // console.log(this.arrayMap);

    this.bien = [];
    this.mal = [];
    this.blanco = [];

    for (let i of this.userSelected)
    {
      let actual = this.selected.cities.findIndex(x => x == i.id);
      if (actual != -1) {
        this.bien.push(i);
      }else{
        this.mal.push(i);
      }
    }

    // console.log(this.blanco)

    for(let h of this.arrayMap)
    {
      h.setOptions({fillColor:'#d3d3d3'});
    }


    for(let i of this.bien)
    {
      let actualPoly = this.arrayMap.filter(x=>x.name == i.name);

      for(let i in actualPoly) {
        actualPoly[i].setOptions({fillColor:'#076d07'});
      }
    }

    for(let i of this.mal)
    {
      let actualPoly = this.arrayMap.filter(x=>x.name == i.name);

      for(let i in actualPoly) {
        actualPoly[i].setOptions({fillColor:'#076d07'});
      }
    }

    if (this.mal.length > 0) {
      document.getElementById('main-screen').classList.add('shake-screen');

      setTimeout(()=>{
        document.getElementById('main-screen').classList.remove('shake-screen');
      },300);
    }

    console.log(this.mal.length,this.bien.length, this.selected.cities.length == this.bien.length);

    if (this.selected.cities.length == this.bien.length && this.mal.length == 0) {
      this.api.confetti();
      setTimeout(()=>{
        this.siguiente();
      },3000);
      // this.alert.create({message:"¡Has completado ésta pregunta!"}).then(a=>{
      //   a.present();
      //   setTimeout(()=>{
      //     this.siguiente();
      //     a.dismiss();
      //   },3000);

      // });
    }

    this.corregir = true;

    // this.mal = [];
  }

  makeResolver() {

    if (/*this.corregir || */this.resolver) {
      return false;
    }

    if (this.mod == 'v') {
      this.userSelected = [];
    }

    // console.log(this.userSelected);
    // console.log(this.arrayMap);

    this.bien = [];
    this.mal = [];
    this.blanco = [];

    for (let i of this.userSelected)
    {
      let actual = this.selected.cities.findIndex(x => x == i.id);
      if (actual != -1) {
        this.bien.push(i);
      }else{
        this.mal.push(i);
      }
    }

    for (let i of this.selected.cities) {
      if (this.bien.findIndex(x => x.id == i) == -1 && this.mal.findIndex(x => x.id == i) == -1) {
        this.blanco.push({name:this.cities.find(x=>x.id == i).name,id:i});
      }
    }

    // console.log(this.blanco)

    for(let h of this.arrayMap)
    {
      h.setOptions({fillColor:'#d3d3d3'});
    }

    for(let j of this.blanco)
    {
      let actualPoly = this.arrayMap.filter(x=>x.name == j.name);

      for(let i in actualPoly) {
        if (this.mod == 'v') {
          actualPoly[i].setOptions({fillColor:'#076d07'});
        }else{
          actualPoly[i].setOptions({fillColor:'yellow'});
        }
      }

    }

    // if (this.bien.length == 0 && this.mal.length == 0 && this.blanco.length == 0) {
    //   this.resolver = false;
    // }else{
      this.resolver = true;
    // }

    // console.log(this.bien,this.mal);

    for(let i of this.bien)
    {
      let actualPoly = this.arrayMap.filter(x=>x.name == i.name);

      for(let i in actualPoly) {
        actualPoly[i].setOptions({fillColor:'#076d07'});
      }
    }

    if (this.mod == 'v') {
      return false;
    }

    for(let i of this.mal)
    {
      let actualPoly = this.arrayMap.filter(x=>x.name == i.name);

      for(let i in actualPoly) {
        actualPoly[i].setOptions({fillColor:'crimson'});
      }
    }
  }

  refresh()
  {
    for(let h of this.arrayMap)
    {
      h.setOptions({fillColor:'#d3d3d3'});
    }
    this.resolver = null;
    this.corregir = null;
    this.bien = [];
    this.mal = [];
    this.blanco = [];
    this.userSelected = [];
  }

  select(i)
  {
    this.refresh();
    this.showRest = false;
    if (localStorage.getItem('actualEndpoint') == 'rios' || localStorage.getItem('actualEndpoint') == 'embalses' || localStorage.getItem('actualEndpoint') == 'gas' || localStorage.getItem('actualEndpoint') == 'metro' || localStorage.getItem('actualEndpoint') == 'municipal')
    {
      this.selected = i;
      localStorage.setItem('actualSelected',JSON.stringify(i));
    }
    else
    {
      this.selected = i;
    }
    this.init();
  }

  siguiente()
  {
    let idx = this.data.findIndex(x=>this.selected.id == x.id);
    if (idx == this.data.length-1) {
      this.api.nav.back();
      if (this.mod == 'v') {
        // this.alert.create({message:"Fin de la categoría"}).then(a=>{
        //   a.present();
        // });
      }else{
        // this.alert.create({message:"¡Has completado toda la categoría!"}).then(a=>{
        //   a.present();
        // });
      }
    }else{
      this.refresh();
      console.log(this.data,idx);
      if (localStorage.getItem('actualEndpoint') == 'rios' || localStorage.getItem('actualEndpoint') == 'embalses' || localStorage.getItem('actualEndpoint') == 'gas' || localStorage.getItem('actualEndpoint') == 'metro'  || localStorage.getItem('actualEndpoint') == 'municipal')
      {
        this.selected = this.data[idx+1];
        localStorage.setItem('actualSelected',JSON.stringify(this.data[idx+1]));
      }
      else
      {
        this.selected = this.data[idx+1];
      }
      this.init();

      if (this.mod == 'v') {
        this.makeResolver();
      }
    }
  }

}
