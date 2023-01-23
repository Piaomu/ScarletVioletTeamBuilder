import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: '[mobileTable]',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mobile-table.component.css'],
})
export class MobileTableComponent implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    const tableEl = this.elRef.nativeElement;
    const thEls = tableEl.querySelectorAll('thead th');
    const tdLabels = Array.from(thEls).map((el: any) => el.innerText);
    tableEl.querySelectorAll('tbody tr').forEach((tr: any) => {
      Array.from(tr.children).forEach((td: any, ndx) =>
        td.setAttribute('label', tdLabels[ndx])
      );
    });
  }
}
