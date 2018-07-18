import { Component, OnInit } from '@angular/core';

declare function init_plugins();
declare function init_plugin_footable();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
    init_plugin_footable();
  }

}
