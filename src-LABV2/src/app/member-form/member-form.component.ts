import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Member } from 'src/modeles/member';
import { MemberService } from 'src/services/member.service';
import { GLOBAL } from '../app-config';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  form!: FormGroup;
  MembreGlobal!: Member;

  //injection de dépendance
  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //if path contient id : je suis dans edit
    const currentID = this.activatedRoute.snapshot.params['id'];
    if (!!currentID) {
      //recuperer member by id
      this.MS.getMemberById(currentID).subscribe((item) => {
        this.MembreGlobal = item;
        this.initForm2(item);
      }); ////
    }

    //initForm(member) //je suis dans create
    else this.initForm();
  }

  //initialiser le form pour route /id/edit
  initForm2(item: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(item.cin, [Validators.required]),
      name: new FormControl(item.name, [Validators.required]),
      cv: new FormControl(item.cv, [Validators.required]),
      type: new FormControl(item.type, [Validators.required]),
    });
  }
  //initialiser le form pour route /create
  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }

  Onsub(): void {
    console.log(this.form.value);
    const member = { ...this.MembreGlobal, ...this.form.value };

    //():retour de l'observalble , {} : action à faire après le travail du thread
    this.MS.saveMember(member).subscribe(() => {
      this.router.navigate(['/members']);
    }); /////redirect vers /member
  }
}
