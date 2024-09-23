import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { UserService } from '../../../services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/notify/custom-toastr-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../services/entites/User';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule ,FormsModule,
    ReactiveFormsModule,PasswordModule,DividerModule,InputGroupModule,InputGroupAddonModule,InputTextModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent {
  constructor(private formBuilder: UntypedFormBuilder,private userService: UserService  ,private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
  }
  frm:FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      firstName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      lastName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return;

    const result: any = await this.userService.create(user);
    debugger
    if (result.succeeded)
      this.toastrService.message(result.message, "Kullanıcı Kaydı Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }
}
