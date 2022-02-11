import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  
  validations_form: FormGroup;
  validation_messages: any;
  errorMessage: string = '';

  show_password_0 = 'password';

  user = JSON.parse(localStorage.getItem('BOMuser'));

  constructor(public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public nav: NavController, public api: ApiService) { }

  ngOnInit() {
    this.validation_messages = {
      'password': [
        // { type: 'required', message: 'El campo contraseña es requerido' },
        { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
        { type: 'pattern', message: 'La contraseña debe contener al menos un caracter en mayúscula y un número' }
      ],
      'name': [
        { type: 'required', message: 'El campo nombre es requerido' },
      ],
      'email': [
        { type: 'required', message: 'El campo email es requerido' },
        { type: 'pattern', message: 'El email debe tener un formato correcto' }
      ],
    };

    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    this.validations_form = this.formBuilder.group({
      id: new FormControl(this.user.id),
      password: new FormControl(null, Validators.compose([
        Validators.minLength(8),
        Validators.pattern('\^.*(?=.{8,})((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$'),
        // Validators.required
      ])),
      email: new FormControl(this.user.email, Validators.compose([
        Validators.required,
        Validators.pattern(regexp)
      ])),
      name: new FormControl(this.user.name, Validators.compose([
        Validators.required
      ])),
    });
  }

  registerUser(value)
  {
    this.loadingCtrl.create().then(a=>{

      a.present();

      this.api.register(value)
        .subscribe((data:any)=>{

        a.dismiss();

        this.alertCtrl.create({message:"Datos guardados"}).then(a=>{a.present()});

        this.validations_form.patchValue({
          password: null
        });

      },err=>{
        a.dismiss();
        console.log(err);
        var arr = Object.keys(err.error.errors).map(function(k) { return err.error.errors[k] });
        let errorMessage = arr[0][0];
        this.alertCtrl.create({message:errorMessage}).then(al=>{al.present();/*setTimeout(()=>{al.dismiss()},3000)*/});
      })

    })
  }

  changeView(i)
  {
    if (this['show_password_'+i] == 'password') {
      this['show_password_'+i] = 'text';
    }else{
      this['show_password_'+i] = 'password';
    }
  }

}
