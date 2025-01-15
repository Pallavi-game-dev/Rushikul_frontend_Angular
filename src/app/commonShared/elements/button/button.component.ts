import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttontype:
  | 'mat-raised-button'
  | 'mat-stroked-button'
  | 'mat-button'
  | 'mat-flat-button' = 'mat-raised-button';
@Input() buttonClass = 'primary';
@Input() disabled: boolean = false;
@Input() btnProp!: BtnProp;

@Input() ButtonText = '';

@Input() ButtonIcon = '';
@Input() ButtonAnimation: boolean = false;

@Output() clicked = new EventEmitter();
loading = false;

constructor() {}

onClick(e: any) {
  this.clicked.emit(e);

  this.ButtonAnimation
    ? setTimeout(() => {
        this.loading = false;
      }, 500)
    : null;
}

changePressColor(event: any) {}
}
export class BtnProp {
text!: string;
processingText!: string;
isLoading!: boolean;
constructor(btnTitle: any = null) {
  this.text = btnTitle;
}
}
