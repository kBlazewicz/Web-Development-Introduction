import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opinion-form',
  templateUrl: './opinion-form.component.html',
  styleUrls: ['./opinion-form.component.css']
})
export class OpinionFormComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    opinion: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    date: new FormControl('', []),
  });
  constructor() { }

  ngOnInit(): void {

  }

  submit(f: any) {
    console.log(f);
  }

}
