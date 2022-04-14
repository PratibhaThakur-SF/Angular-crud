import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/datasource/user.model';
import { UsersDataService } from '../services/users-data.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id: number;
  user: User;
  editForm: FormGroup;
  data: any;
  customerList: { name: string; id: number }[] = [];
  roleList: { name: string; key: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['userId'];
    this.user = this.userService.getter();

    this.editForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      middlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      role: ['', [Validators.required]],
      address: ['', [Validators.required]],
      customer: ['', [Validators.required]],
    });
    this.userService.getCustomerList().subscribe((data) => {
      this.customerList = data;
    });
    this.userService.getRoleList().subscribe((data) => {
      this.roleList = data;
    });
    this.userService.getUser(this.id).subscribe((value) => {
      if (value) {
        this.data = value[0];
        Object.keys(this.data).forEach((Key) => {
          this.editForm.patchValue({ [Key]: this.data[Key] });
        });
      }
    });
  }

  onSubmit() {
    this.userService.updateUser(this.id, this.editForm.value).subscribe(() => {
      console.log('Post updated successfully');
      this.router.navigate(['/']);
    });
  }

  CancelChanges() {
    this.userService
      .getUser(this.id)
      .subscribe((x) => this.editForm.patchValue(x));
    this.router.navigate(['/user']);
  }
}
