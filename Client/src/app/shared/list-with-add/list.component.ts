import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// Though this is a simple component, its template will only be checked for updates
// should a new list of instructors arrive.
// This is especially helpful when other portions of the application are undergoing
// frequent updates.
@Component({
  selector: 'drafter-add-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() collection: any[] = [];
  currentOjb: any;
  addToCollection() {
    this.collection.push(this.currentOjb);
  }
}
