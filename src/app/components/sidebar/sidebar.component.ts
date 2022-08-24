import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  empresa: Empresa | undefined;

  isAdmin = false;

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this._authService.auth.admin ?? JSON.parse(localStorage.getItem('admin') ?? 'false');
    this.empresa = this._authService.auth.usuario ?? JSON.parse(localStorage.getItem('usuario')!);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['../']);
  }

}
