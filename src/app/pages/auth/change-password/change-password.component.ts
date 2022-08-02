import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  visible: boolean = false;

  toggleVisibility() {
    this.visible = !this.visible;
  }

  changePassword(formulario: NgForm) {
    
  }


}
