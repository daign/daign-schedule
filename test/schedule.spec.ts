import {expect} from 'chai';

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
  } );
} );
