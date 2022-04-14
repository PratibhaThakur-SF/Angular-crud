import { Component } from '@angular/core';
import { UserDataComponent } from './user-data/user-data.component';
import { User } from 'src/datasource/user.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-assignment';
  constructor() {}

  ngOnInit(): void {}
}
