import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }
  private scrollSubject = new Subject<void>();

  scrollToFooter() {
    this.scrollSubject.next();
  }

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }
}
