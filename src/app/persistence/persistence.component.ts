import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persistence',
  templateUrl: './persistence.component.html',
  styleUrls: ['./persistence.component.css']
})
export class PersistenceComponent implements OnInit {
  persistenceRadio: string = '';
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  changePersistence() {
    console.log(this.persistenceRadio);
    this.auth.setPersistence(this.persistenceRadio);
  }

}
