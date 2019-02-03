import {expect} from 'chai';
import * as sinon from 'sinon';

import {Schedule} from '../lib/schedule';

describe( 'Schedule', () => {
  // The waiting time period in milliseconds for all tests.
  const wait = 10;

  describe( 'postpone', () => {
    it( 'should call the callback with the passed parameters', ( done: any ) => {
      // arrange
      const inputs = [ 1, 2, 3 ];
      const callback = ( ...args: any[] ): void => {
        // assert
        expect( args ).to.deep.equal( inputs );
        done();
      };

      // act
      const postponedFunction = Schedule.postpone( callback, wait );
      postponedFunction( ...inputs );
    } );

    it( 'should call with context null if not passed', ( done: any ) => {
      // arrange
      class TestClass {
        public method(): void {
          // assert
          expect( this ).to.be.null;
          done();
        }
      }
      const test = new TestClass();

      // act
      const postponedFunction = Schedule.postpone( test.method, wait );
      postponedFunction();
    } );

    it( 'should call with context of test class when passed', ( done: any ) => {
      // arrange
      class TestClass {
        public method(): void {
          // assert
          expect( this ).to.be.instanceof( TestClass );
          done();
        }
      }
      const test = new TestClass();

      // act
      const postponedFunction = Schedule.postpone( test.method, wait, test );
      postponedFunction();
    } );

    it( 'should not call before wait time has elapsed', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const postponedFunction = Schedule.postpone( spy, wait );
      postponedFunction();

      // assert
      setTimeout( (): void => {
        expect( spy.notCalled ).to.be.true;
        done();
      }, wait * 0.5 );
    } );

    it( 'should have called after wait time has elapsed', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const postponedFunction = Schedule.postpone( spy, wait );
      postponedFunction();

      // assert
      setTimeout( (): void => {
        expect( spy.calledOnce ).to.be.true;
        done();
      }, wait * 1.5 );
    } );
  } );

  describe( 'blockingThrottle', () => {
    it( 'should call the callback with the passed parameters', ( done: any ) => {
      // arrange
      const inputs = [ 1, 2, 3 ];
      const callback = ( ...args: any[] ): void => {
        // assert
        expect( args ).to.deep.equal( inputs );
        done();
      };

      // act
      const throttledFunction = Schedule.blockingThrottle( callback, wait );
      throttledFunction( ...inputs );
    } );

    it( 'should call with context null if not passed', ( done: any ) => {
      // arrange
      class TestClass {
        public method(): void {
          // assert
          expect( this ).to.be.null;
          done();
        }
      }
      const test = new TestClass();

      // act
      const throttledFunction = Schedule.blockingThrottle( test.method, wait );
      throttledFunction();
    } );

    it( 'should call with context of test class when passed', ( done: any ) => {
      // arrange
      class TestClass {
        public method(): void {
          // assert
          expect( this ).to.be.instanceof( TestClass );
          done();
        }
      }
      const test = new TestClass();

      // act
      const throttledFunction = Schedule.blockingThrottle( test.method, wait, test );
      throttledFunction();
    } );

    it( 'should block calls that come before wait time has elapsed', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const throttledFunction = Schedule.blockingThrottle( spy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.5 );

      // assert
      setTimeout( (): void => {
        expect( spy.calledOnce ).to.be.true;
        done();
      }, wait * 1.5 );
    } );

    it( 'should not block calls that come after wait time has elapsed', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const throttledFunction = Schedule.blockingThrottle( spy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 1.5 );

      // assert
      setTimeout( (): void => {
        expect( spy.callCount ).to.equal( 2 );
        done();
      }, wait * 2 );
    } );
  } );

  describe( 'deferringThrottle', () => {
    it( 'should call the callback with the passed parameters', ( done: any ) => {
      // arrange
      const inputs = [ 1, 2, 3 ];
      const callback = ( ...args: any[] ): void => {
        // assert
        expect( args ).to.deep.equal( inputs );
        done();
      };

      // act
      const throttledFunction = Schedule.deferringThrottle( callback, wait );
      throttledFunction( ...inputs );
    } );

    it( 'should call with context null if not passed', ( done: any ) => {
      // arrange
      class TestClass {
        public method(): void {
          // assert
          expect( this ).to.be.null;
          done();
        }
      }
      const test = new TestClass();

      // act
      const throttledFunction = Schedule.deferringThrottle( test.method, wait );
      throttledFunction();
    } );

    it( 'should call with context of test class when passed', ( done: any ) => {
      // arrange
      class TestClass {
        public method(): void {
          // assert
          expect( this ).to.be.instanceof( TestClass );
          done();
        }
      }
      const test = new TestClass();

      // act
      const throttledFunction = Schedule.deferringThrottle( test.method, wait, test );
      throttledFunction();
    } );

    it( 'should block calls that come before wait time has elapsed', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const throttledFunction = Schedule.deferringThrottle( spy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.5 );

      // assert
      setTimeout( (): void => {
        expect( spy.calledOnce ).to.be.true;
        done();
      }, wait * 0.75 );
    } );

    it( 'should execute once after wait time has elapsed if calls were blocked', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const throttledFunction = Schedule.deferringThrottle( spy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.5 );

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.6 );

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.7 );

      // assert
      setTimeout( (): void => {
        // one for the first call plus one for the deferred calls
        expect( spy.callCount ).to.equal( 2 );
        done();
      }, wait * 3 );
    } );

    it( 'should not block calls that come after wait time has elapsed', ( done: any ) => {
      // arrange
      const spy = sinon.spy();

      // act
      const throttledFunction = Schedule.deferringThrottle( spy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 1.5 );

      // assert
      setTimeout( (): void => {
        expect( spy.callCount ).to.equal( 2 );
        done();
      }, wait * 1.75 );
    } );
  } );
} );
