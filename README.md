# daign-schedule

[![NPM package][npm]][npm-url]

Utility mechanisms to manage the time-wise execution of functions.

## Installation

```sh
npm install @daign/schedule --save
```

## Usage

```typescript
import {Schedule} from '@daign/schedule';

class TestClass {
  private count: number = 0;

  public increment(): void {
    this.count += 1;
    console.log( this.count );
  }
}
const test = new TestClass();

// Throttle the increment method with a waiting period of 40 milliseconds
const wait = 40;
const throttledFunction = Schedule.deferringThrottle( test.increment, wait, test );

// The first call will be executed immediately
throttledFunction();

// The following calls are blocked temporarily, but there will be a single execution after the
// waiting period has elapsed
throttledFunction();
throttledFunction();
throttledFunction();
```

## Scripts

#### Build

    npm run build

#### Run lint analysis

    npm run lint

#### Run unit tests with code coverage

    npm run test

[npm]: https://img.shields.io/npm/v/@daign/schedule.svg
[npm-url]: https://www.npmjs.com/package/@daign/schedule
