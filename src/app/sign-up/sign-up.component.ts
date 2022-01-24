import { CartService } from './../cart.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email = "";
  password = "";
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.auth.
      signUp(this.form.get('email')?.value, this.form.get('password')?.value)
      .then(() => {
        this.router.navigate(['']);
        this.auth.login(this.form.get('email')?.value, this.form.get('password')?.value)
          .then(() => {
            this.cartService.createCart();
          })
      }
      )
      .catch((e) => console.log(e.message));
  }
}
