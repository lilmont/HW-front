import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSubmittedSource = new Subject<void>();
  transactionSubmitted$ = this.transactionSubmittedSource.asObservable();

  emitTransactionSubmitted() {
    this.transactionSubmittedSource.next();
  }
}
