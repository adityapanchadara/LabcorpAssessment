import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  private todoData = new Subject<any>();
  private toggleAll = new Subject<any>();
  constructor() { }

  updateTodos(message: any) {
    this.todoData.next(message);
  }

  clearTodos() {
    this.todoData.next();
  }

  getTodos(): Observable<any> {
    return this.todoData.asObservable();
  }

  toggleAllChecked(msg: any) {
    this.toggleAll.next(msg);
  }

  getToggleAll(): Observable<any> {
    return this.toggleAll.asObservable();
  }

}
