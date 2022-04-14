import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { User } from 'src/datasource/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  title = 'Angular-assignment';
  headers: string[];
  errorMsg: string;
  displayColumns: string[] = [
    'firstname',
    'middlename',
    'lastname',
    'email',
    'phonenumber',
    'address',
    'customer',
    'role',
  ];
  users: User[] = [];
  constructor(private UserService: UsersDataService, private router: Router) {}

  ngOnInit(): void {
    this.UserService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }

  deleteUser(id: number) {
    this.UserService.delete(id).subscribe((res) => {
      this.users = this.users.filter((item) => item.id != id);
    });
  }

  refresh() {
    window.location.reload();
  }

  Update(user) {
    this.UserService.setter(user);
    this.router.navigate(['/users/', user.id, 'edit']);
  }
}
