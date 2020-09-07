import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { TodosService } from '@app/todos/services/todos.service';
import { ComponentCommunicationService } from '../../services/component-communication.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-complete-all',
  styleUrls: [
    './complete-all.component.scss',
  ],
  templateUrl: './complete-all.component.html',
})
export class CompleteAllComponent implements OnInit, OnChanges, OnDestroy {

  multipleTodosExist = false;
  subscription: Subscription;
  @Input() todoCount: any;
  public allChecked: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private todosService: TodosService, private ccs: ComponentCommunicationService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.todoCount) {
      if (this.todoCount && (this.todoCount.Active > 0 || this.todoCount.Completed > 0)) {
        this.multipleTodosExist = true;
        this.allChecked = false;
        if (this.todoCount.Active === 0 && this.todoCount.Completed > 0) {
          this.allChecked = true;
        }
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleCompleteAll(): void {
    this.allChecked = !this.allChecked;
    this.ccs.toggleAllChecked(this.allChecked);
  }

}
