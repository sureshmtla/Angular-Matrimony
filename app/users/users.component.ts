import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService } from '../shared';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users :Array<Object>;
  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data) => {
        this.users = data.users.users;
          //console.log(data);
      });
  }

}
