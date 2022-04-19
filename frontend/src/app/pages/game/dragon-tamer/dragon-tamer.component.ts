import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dragon-tamer',
  templateUrl: './dragon-tamer.component.html',
  styleUrls: ['./dragon-tamer.component.scss']
})
export class DragonTamerComponent implements OnInit {

  actionLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
