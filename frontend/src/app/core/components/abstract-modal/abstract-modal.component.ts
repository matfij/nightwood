import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abstract-modal',
  template: '',
  styleUrls: ['./abstract-modal.component.scss']
})
export class AbstractModalComponent implements OnInit {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.next(true);
  }

}
