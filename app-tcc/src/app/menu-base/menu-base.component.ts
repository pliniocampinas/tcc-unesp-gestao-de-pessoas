import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-base',
  templateUrl: './menu-base.component.html',
  styleUrls: ['./menu-base.component.css']
})
export class MenuBaseComponent implements OnInit {

  usuarioLogado = 'plinioc';

  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.usuarioLogado = 'PlinioC';
  }

}
