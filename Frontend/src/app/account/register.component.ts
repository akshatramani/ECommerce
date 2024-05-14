import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "../core/_services/account.service";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    form!: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router,
        private toastr: ToastrService) { };

    pattern1 = "^[0-9_-]{10,10}";

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: [''],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            gender: ['', Validators.required],
            birthDate: ['', Validators.required],
            mobileNo: ['', [Validators.pattern(this.pattern1)]],
            role: ['', Validators.required]
        });
    }

    get f() {
        return this.form.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid)
            return;
        let x = {
            // "FirstName": this.form.controls['firstName'].value,
            // "LastName": this.form.controls['lastName'].value,
            // "Username": this.form.controls['userName'].value,
            // "Password": this.form.controls['password'].value,
            // "Gender": this.form.controls['gender'].value,
            // "Role": this.form.controls['role'].value,
            // "mobileNo": this.form.controls['role'].value,
            // "BirthDate": new Date(this.form.controls['birthDate'].value)
        }
        this.accountService.register(this.form.value)
            .subscribe({
                next: (response) => {
                    if (response.statusCode == 200) {
                        this.router.navigate(['']);
                        this.toastr.success(response.message);
                    }
                    else {
                        this.toastr.error(response.message);
                    }
                },
                error: (error) => {
                    console.log(error);
                }
            })
    }
};