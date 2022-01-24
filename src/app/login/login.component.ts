import { CartService } from './../cart.service';
import { AuthService } from './../auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'firebase/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private cartService: CartService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.auth.login(this.form.get('email')?.value, this.form.get('password')?.value);
    this.cartService.updateCart();
  }
}
