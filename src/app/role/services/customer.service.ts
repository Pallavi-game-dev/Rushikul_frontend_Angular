import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  public genders: string[] = [
    'MALE',
    'FEMALE'
  ]

  constructor() { }
}
