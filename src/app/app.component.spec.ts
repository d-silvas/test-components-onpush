import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent - Without a host component', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let propertyP: HTMLParagraphElement;
  let getterP: HTMLParagraphElement;
  let functionP: HTMLParagraphElement;
  let changeTextButton: HTMLButtonElement;
  const reassignElements = () => {
    propertyP = fixture.debugElement.query(By.css('#property')).nativeElement;
    getterP = fixture.debugElement.query(By.css('#getter')).nativeElement;
    functionP = fixture.debugElement.query(By.css('#function')).nativeElement;
    changeTextButton = fixture.debugElement.query(By.css('#change-text')).nativeElement;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    reassignElements();

    expect(component.text).toBe('hello, world');
    expect(component.textLength).toBe(12);
    expect(component.getTextLength()).toBe(12);
    expect(propertyP.textContent).toBe('hello, world');
    expect(getterP.textContent).toBe('12');
    expect(functionP.textContent).toBe('12');
  });

  it('properties and functions should change when changing the input property', () => {
    component.text = 'a';
    expect(component.textLength).toBe(1);
    expect(component.getTextLength()).toBe(1);
  });

  it('DOM does not change when changing the input property', () => {
    component.text = 'a';
    fixture.detectChanges(); // Won't work
    reassignElements();

    expect(propertyP.textContent).toBe('hello, world');
    expect(getterP.textContent).toBe('12');
    expect(functionP.textContent).toBe('12');
  });

  it('DOM does not change when changing the input property through a function', () => {
    component.changeText();
    fixture.detectChanges(); // Won't work
    reassignElements();

    expect(propertyP.textContent).toBe('hello, world');
    expect(getterP.textContent).toBe('12');
    expect(functionP.textContent).toBe('12');
  });

  it('after clicking a button, fixture.detectChanges() will trigger change detection and update the DOM', () => {
    changeTextButton.click();
    fixture.detectChanges();
    reassignElements();

    expect(propertyP.textContent).toBe('hi');
    expect(getterP.textContent).toBe('2');
    expect(functionP.textContent).toBe('2');
  });

});

@Component({
  template: `<app-root [text]="text"></app-root>`
})
class TestHostComponent {
  text: string;
}

describe('AppComponent - Using a host component', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: AppComponent;

  let propertyP: HTMLParagraphElement;
  let getterP: HTMLParagraphElement;
  let functionP: HTMLParagraphElement;
  let changeTextButton: HTMLButtonElement;
  const reassignElements = () => {
    propertyP = hostFixture.debugElement.query(By.css('#property')).nativeElement;
    getterP = hostFixture.debugElement.query(By.css('#getter')).nativeElement;
    functionP = hostFixture.debugElement.query(By.css('#function')).nativeElement;
    changeTextButton = hostFixture.debugElement.query(By.css('#change-text')).nativeElement;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestHostComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostFixture.debugElement.query(By.directive(AppComponent)).componentInstance;

    // We need to initialize the property on the test host component.
    // Otherwise, "undefined" would be passed down to the child component.
    hostComponent.text = 'hello, world';
    hostFixture.detectChanges();
    reassignElements();

    expect(component.text).toBe('hello, world');
    expect(component.textLength).toBe(12);
    expect(component.getTextLength()).toBe(12);
    expect(propertyP.textContent).toBe('hello, world');
    expect(getterP.textContent).toBe('12');
    expect(functionP.textContent).toBe('12');
  });

  it('DOM does not change when changing the input property', () => {
    hostComponent.text = 'a';
    hostFixture.detectChanges();
    reassignElements();

    expect(propertyP.textContent).toBe('a');
    expect(getterP.textContent).toBe('1');
    expect(functionP.textContent).toBe('1');
  });

  it('DOM does not change when changing the input property through a function', () => {
    component.changeText();
    hostFixture.detectChanges();
    reassignElements();

    expect(propertyP.textContent).toBe('hello, world');
    expect(getterP.textContent).toBe('12');
    expect(functionP.textContent).toBe('12');
  });

});
