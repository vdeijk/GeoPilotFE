import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router, public auth: AuthService) {}

  onLogout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  get isEditPage(): boolean {
    return this.router.url.startsWith('/edit/');
  }

  get isAddPage(): boolean {
    return this.router.url === '/add';
  }
}
