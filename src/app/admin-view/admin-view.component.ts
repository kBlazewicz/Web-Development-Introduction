import { map } from 'rxjs';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../user';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  users: AppUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.users = (<AppUser[]>dishes);
    });
  }

  ban(user: AppUser) {
    this.userService.ban(user);
  }
  unban(user: AppUser) {
    this.userService.unban(user);
  }

  makeManager(user: AppUser) {
    this.userService.makeManager(user);
  }

  unmakeManager(user: AppUser) {
    this.userService.unmakeManager(user);
  }

  makeAdmin(user: AppUser) {
    this.userService.makeAdmin(user);
  }

  unmakeAdmin(user: AppUser) {
    this.userService.unmakeAdmin(user);
  }
}
