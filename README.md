# daign-schedule

[![CI][ci-icon]][ci-url]
[![Coverage][coveralls-icon]][coveralls-url]
[![NPM package][npm-icon]][npm-url]

#### Utility mechanisms to manage the time-wise execution of functions.

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

```bash
# Build
npm run build

# Run lint analysis
npm run lint

# Run unit tests with code coverage
npm run test

# Get a full lcov report
npm run coverage
```

[ci-icon]: https://github.com/daign/daign-schedule/workflows/CI/badge.svg
[ci-url]: https://github.com/daign/daign-schedule/actions
[coveralls-icon]: https://coveralls.io/repos/github/daign/daign-schedule/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/daign/daign-schedule?branch=master
[npm-icon]: https://img.shields.io/npm/v/@daign/schedule.svg
[npm-url]: https://www.npmjs.com/package/@daign/schedule
