import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  ngOnInit(): void {}

  login(email: string, password: string) {
    this._auth.login(email, password).subscribe((data) => {
      console.log(data);
    });
  }
}
