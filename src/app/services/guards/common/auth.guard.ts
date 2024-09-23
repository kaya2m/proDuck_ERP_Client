import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../notify/custom-toastr-service.service';
import { SpinnerType } from '../../base/base.component';
import { AuthService } from '../../common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,  // AuthService'i enjekte ediyoruz
    private router: Router,
    private toastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.spinner.show(SpinnerType.ballAtom);

    if (!this.authService.isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      });
      this.spinner.hide(SpinnerType.ballAtom);
      return false;
    }

    this.spinner.hide(SpinnerType.ballAtom);
    return true;
  }
}
