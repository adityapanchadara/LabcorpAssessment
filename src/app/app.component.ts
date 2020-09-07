import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComponentCommunicationService } from './todos/services/component-communication.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public todoValue: string = '';
  public updatedTodoValue: string = '';
  public filterHeaders: Array<any> = [{ active: true, heading: 'All' }, { active: false, heading: 'Active' }, { active: false, heading: 'Completed' }];
  public todoCount: Number = 0;
  public statusCount: any;

  constructor(private ccs: ComponentCommunicationService) {

  }

  onEnter(e, value) {
    this.updatedTodoValue = value;
    this.todoValue = '';
  }

  filterData(index) {
    for (let i = 0; i < this.filterHeaders.length; i++) {
      this.filterHeaders[i].active = false;
      if (i === index) {
        this.filterHeaders[i].active = true;
      }
    }
    this.ccs.updateTodos(this.filterHeaders[index].heading);
  }

  clearCompleted() {
    this.ccs.updateTodos('clear');
  }

  getCount(e) {
    this.statusCount = e;
  }
}
