import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent implements OnInit {
@Input() title:string = '';
@Input() sub_title:string = '';
@Input() src:string = '';
@Input() card_content:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
