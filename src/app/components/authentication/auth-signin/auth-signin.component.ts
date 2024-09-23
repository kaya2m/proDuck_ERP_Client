import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { BaseComponent, SpinnerType } from '../../../services/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { UserService } from '../../../services/common/models/user.service';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,PasswordModule,DividerModule,InputGroupModule,InputGroupAddonModule,InputTextModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent extends BaseComponent {
  constructor(private userService: UserService
    , spinner: NgxSpinnerService
    , private authService: AuthService
    , private activeRoute: ActivatedRoute
    , private router: Router,
    ) {
    super(spinner);
}

  async login(UsernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.ballAtom);
    await this.userService.login(UsernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activeRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
        else {
          this.router.navigate(["/dashboard"]);
        }
      })
      this.hideSpinner(SpinnerType.ballAtom)
    });

  }
}
