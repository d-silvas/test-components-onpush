Main thread: https://github.com/angular/angular/issues/12313


- You can trigger updating OnPush component only by changing @Input property from parent component.
- From https://stackoverflow.com/questions/39795634/angular-2-change-detection-and-changedetectionstrategy-onpush#answer-39795679: change detection in an OnPush component will ony be run if a bound event is received (click), an @Input() was updated by change detection, async pipe received an event, change detection is invoked manually. \[TODO: check all of these\]


- Set a dummy click event handler on the component and trigger it every time we want the DOM to be updated:
- Inject `ChangeDetectorRef` in the component and call `markForCheck()` on it on the tests:
https://github.com/angular/angular/issues/12313#issuecomment-263978801
- Override the component on the tests to use `ChangeDetectionStrategy.Default`:
https://github.com/angular/angular/issues/12313#issuecomment-298697327
- Call `fixture.detectChanges()` only once on each test:
https://github.com/angular/angular/issues/12313#issuecomment-301848232


More resources:
- https://stackoverflow.com/questions/40895855/testing-onpush-components-in-angular-2
- https://stackoverflow.com/questions/50137734/detectchanges-not-working-within-angular-test
- https://medium.com/@juliapassynkova/how-to-test-onpush-components-c9b39871fe1e
