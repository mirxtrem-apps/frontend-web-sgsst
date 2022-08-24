import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-mi-empresa',
  templateUrl: './mi-empresa.component.html',
  styleUrls: ['./mi-empresa.component.scss']
})
export class MiEmpresaComponent implements OnInit {

  empresa: Empresa | undefined;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.empresa = this._authService.auth.usuario ?? JSON.parse(localStorage.getItem('usuario')!);
  }

}
