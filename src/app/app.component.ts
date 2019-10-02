import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p id="property">{{ text }}</p>
    <p id="getter">{{ textLength }}</p>
    <p id="function">{{ getTextLength() }}</p>
    <button id="change-text" (click)="changeText()">
      Change text
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @Input() text = 'hello, world';

  get textLength(): number {
    return this.text.length;
  }

  getTextLength(): number {
    return this.text.length;
  }

  changeText() {
    this.text = 'hi';
  }

}
