import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthSigninComponent } from './components/authentication/auth-signin/auth-signin.component';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/notify/custom-toastr-service.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from "./theme/shared/shared.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthSigninComponent, NgxSpinnerModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'proDuck_ERP_Client';
  constructor(
    public authService: AuthService,
    private toastr:CustomToastrService,
    private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  signOut() {
    localStorage.removeItem('accessToken');
    this.authService.identitycheck();
    this.router.navigate(["/"]);
    this.toastr.message("Başarıyla çıkış yaptınız.","Oturum Kapatıldı",{
      messageType:ToastrMessageType.Info,
      position:ToastrPosition.TopRight
    });

  }
}
