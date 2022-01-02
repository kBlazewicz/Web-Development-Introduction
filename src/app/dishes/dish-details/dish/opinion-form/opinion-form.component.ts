import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private route: ActivatedRoute, private router: Router) { }
  dishID!: number | null;


  ngOnInit(): void {
    this.dishID = this.route.snapshot.params['id'];
  }

  submit() {
    console.log(this.form);
    this.form.reset();
  }

  goBack() {
    this.router.navigate(['/dishes/dish', this.dishID])
  }

}
