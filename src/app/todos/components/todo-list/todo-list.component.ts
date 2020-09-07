import { Component, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ITodo } from '@app/todos/interfaces';
import { ComponentCommunicationService } from '../../services/component-communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnChanges, OnInit {
  @Input() todoValue;
  @Output() public updateCount = new EventEmitter();
  public todoList: Array<ITodo> = [];
  public masterTodoList: any = [...this.todoList];
  private tabStatusSubscription: Subscription;
  private toggleSubscription: Subscription;
  public tabName: string = '';

  constructor(private ccs: ComponentCommunicationService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.todoValue && changes.todoValue.currentValue !== '') {
      this.todoList.unshift({ text: this.todoValue, completed: false, edit: false });
      this.masterTodoList = this.todoList;
      this.updateActiveCount();
    }
  }

  ngOnInit() {
    this.tabStatusSubscription = this.ccs.getTodos().subscribe((val: any) => {
      this.todoList = this.masterTodoList;
      this.tabName = val;
      if (val === 'All') {
        this.todoList = this.masterTodoList;
      } else if (val === 'Active') {
        this.todoList = this.todoList.filter(x => x.completed === false);
      } else if (val === 'clear') {
        this.todoList = this.todoList.filter(x => x.completed === false);
        this.masterTodoList = this.todoList;
      } else {
        this.todoList = this.todoList.filter(x => x.completed === true);
      }
      this.updateActiveCount();
    });

    this.toggleSubscription = this.ccs.getToggleAll().subscribe((val: any) => {
      this.todoList.forEach(x => {
        x.completed = val;
      });
      this.updateActiveCount();
    })
  }

  public deleteTodo(index) {
    this.todoList.splice(index, 1);
    this.masterTodoList = this.todoList;
    this.updateActiveCount();
    this.updateCount.emit(this.todoList.length);
  }

  public todoEdit(index) {
    for (let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].edit = false;
      if (index === i) {
        this.todoList[i].edit = true;
      }
    }
  }

  updateActiveCount() {
    this.updateCount.emit({ 'Active': this.masterTodoList.filter(x => x.completed === false).length, 'Completed': this.masterTodoList.filter(x => x.completed === true).length });
  }

  ngOnDestroy() {
    if (this.tabStatusSubscription) {
      this.tabStatusSubscription.unsubscribe();
    }
    if (this.toggleSubscription) {
      this.toggleSubscription.unsubscribe();
    }
  }
}
