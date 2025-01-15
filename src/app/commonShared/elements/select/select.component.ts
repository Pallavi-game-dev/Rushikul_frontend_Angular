import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements  OnInit,OnChanges {
  @Input() focused:Boolean = false;
  @Input() items: Array<any>  = [];
  @Input() disabled:Boolean = false;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() placeholder: string = "Select X";
  @Output() selectChange = new EventEmitter();
  @Input() bindValueKey: string = "";
  @Input() bindLabelKey: string = "";
  @Input() searchPlaceholder: string = "Search your item ...";
  @Input() selected: string = "";
  private currentStaticItems: Array<any> = [];
  constructor() { }

  selection(option: any) {
    // this.model = option;


    this.selectChange.emit(option.value);
  }


  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.items instanceof Array) {
      this.currentStaticItems = this.items;
    }
  }

}
