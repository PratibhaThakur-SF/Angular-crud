import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  customerList: { name: string; id: number }[] = [];
  roleList: { name: string; key: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersDataService
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      middlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
    this.userService.getCustomerList().subscribe((data) => {
      this.customerList = data;
    });
    this.userService.getRoleList().subscribe((data) => {
      this.roleList = data;
    });
  }

  onSubmit() {
    this.userService.createUser(this.addForm.value).subscribe((res) => {
      console.log('post created successfully');
      this.router.navigate(['/']);
    });
  }
}
