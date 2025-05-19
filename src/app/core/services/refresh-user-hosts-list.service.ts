import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshUserHostsListService {

  private refreshHostsSubject = new Subject<void>();
  refreshHosts$ = this.refreshHostsSubject.asObservable();

  triggerRefreshHosts() {
    this.refreshHostsSubject.next();
  }
}
