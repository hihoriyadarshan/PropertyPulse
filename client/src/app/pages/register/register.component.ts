import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {confirmPasswordValidator} from "../../validators/confirm-password.validators";
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      // phone: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.required],
      address: ['', Validators.required],
      
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  register(): void {
    this.authService.registerService(this.registerForm.value)
      .subscribe({
        next: (res) => {
          alert("Your registration is successfully");
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}