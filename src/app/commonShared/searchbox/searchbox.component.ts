import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  @Input() searchText: any;
  @Input() placeholder: string = '';
  @Output() onSearch = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange(e: any) {
    this.onSearch.emit(e);
  }

}
