import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isOpenSubject = new BehaviorSubject<boolean>(window.innerWidth >= 1024);
  isOpen$ = this.isOpenSubject.asObservable();

  toggle(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  open(): void {
    this.isOpenSubject.next(true);
  }

  close(): void {
    this.isOpenSubject.next(false);
  }

  set(value: boolean): void {
    this.isOpenSubject.next(value);
  }

  get currentState(): boolean {
    return this.isOpenSubject.value;
  }
}
