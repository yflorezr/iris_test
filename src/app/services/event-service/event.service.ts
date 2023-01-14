import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public _subject = new BehaviorSubject<any>(null)

  emit<T>() {
    this._subject.next(null)
  }

  on<T>() {
    return this._subject.asObservable()
  }

  constructor() { }
}
