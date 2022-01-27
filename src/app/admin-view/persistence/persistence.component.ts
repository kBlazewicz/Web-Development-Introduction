import { AuthService } from '../../authorization/auth.service';
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
    this.auth.setPersistence(this.persistenceRadio);
  }

}
