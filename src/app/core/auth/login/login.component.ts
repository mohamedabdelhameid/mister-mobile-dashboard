import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthServicesService } from '../../services/authServices/auth-services.service';
import { ToastUtilService } from '../../services/toastrServices/toastr.services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  showPassword = signal(false);
  isLoading = signal(false);
  loginForm!: FormGroup;
  authSubscription!: Subscription;
  private authService = inject(AuthServicesService);
  private plateFormId = inject(PLATFORM_ID);
  toastr = inject(ToastUtilService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.intializeLoginForm();
  }

  intializeLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.loginAdmin(this.loginForm.value).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.plateFormId)) {
          localStorage.setItem('admin_access_token', res.access_token);
          this.authService.decodeAdminData();
        }

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);

        this.toastr.success('تم تسجيل دخولك بنجاح', 'نجحت');
        this.intializeLoginForm();
      },
      error: (err) => {
        const message = err.error?.error.includes('Invalid credentials')
          ? 'الايميل او الباسورد غير صحيح'
          : err.error;

        this.toastr.error(message, 'فشل');
      },
    });
  }

  onSubmit() {
    this.isLoading.set(true);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.login();
      this.isLoading.set(false);
    }
  }
}
