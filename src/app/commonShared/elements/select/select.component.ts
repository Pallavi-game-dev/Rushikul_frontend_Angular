import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() focused: boolean = false;
  @Input() items: Array<any> = [];
  @Input() disabled: boolean = false;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() placeholder: string = 'Select an option';
  @Input() bindValueKey: string = '';
  @Input() bindLabelKey: string = '';
  @Input() searchPlaceholder: string = 'Search your item...';
  @Output() selectChange = new EventEmitter<any>();

  private _selected: any;

  @Input()
  set selected(value: any) {
    this._selected = value;
    this.writeValue(value); // Sync with ControlValueAccessor
  }
  get selected(): any {
    return this._selected;
  }

  private innerValue: any;
  private onChange = (value: any) => { };
  private onTouched = () => { };

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    // Validate and process inputs
    if (changes['items'] && Array.isArray(this.items)) {
      // Process items if needed
    }
  }

  selection(event: any): void {
    const selectedValue = this.bindValueKey
      ? event.value
      : event; // Choose between raw object or a key-based value
    this.innerValue = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
    this.selectChange.emit(selectedValue);
  }

  writeValue(value: any): void {
    this.innerValue = value;
    this._selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
