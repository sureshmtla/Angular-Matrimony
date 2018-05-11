import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, ModulesService } from '../shared';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  modules:any;
  constructor(private route: ActivatedRoute,private modulesService:ModulesService) { }
  ngOnInit() {

    this.route.data.subscribe(
      (data) => {
        this.modules = data.modules.modules;
        //console.log(this.modules);
      })
   }

}
