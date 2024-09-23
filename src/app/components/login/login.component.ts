import { Component } from '@angular/core';
import { UserService } from '../../services/common/models/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent, SpinnerType } from '../../services/base/base.component';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [PasswordModule, FormsModule, FloatLabelModule, ButtonModule]
})
export class LoginComponent extends BaseComponent {
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
      this.authService.identitycheck();
      this.activeRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
        else {
          this.router.navigate(["/"]);
        }
      })
      this.hideSpinner(SpinnerType.ballAtom)
    });
  }
}
