import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  mod(m)
  {
    localStorage.setItem('mod',m);
  }

}
