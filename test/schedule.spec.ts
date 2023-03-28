import { expect } from 'chai';
import { spy } from 'sinon';

import { Schedule } from '../lib';

describe( 'Schedule', (): void => {
  // The waiting time period in milliseconds for all tests.
  const wait = 10;

  describe( 'postpone', (): void => {
    it( 'should call the callback with the passed parameters', ( done: any ): void => {
      // Arrange
      const inputs = [ 1, 2, 3 ];
      const callback = ( ...args: any[] ): void => {
        // Assert
        expect( args ).to.deep.equal( inputs );
        done();
      };

      // Act
      const postponedFunction = Schedule.postpone( callback, wait );
      postponedFunction( ...inputs );
    } );

    it( 'should call with context null if not passed', ( done: any ): void => {
      // Arrange
      class TestClass {
        public method(): void {
          // Assert
          expect( this ).to.be.null;
          done();
        }
      }
      const test = new TestClass();

      // Act
      const postponedFunction = Schedule.postpone( test.method, wait );
      postponedFunction();
    } );

    it( 'should call with context of test class when passed', ( done: any ): void => {
      // Arrange
      class TestClass {
        public method(): void {
          // Assert
          expect( this ).to.be.instanceof( TestClass );
          done();
        }
      }
      const test = new TestClass();

      // Act
      const postponedFunction = Schedule.postpone( test.method, wait, test );
      postponedFunction();
    } );

    it( 'should not call before wait time has elapsed', ( done: any ): void => {
      // Arrange
      const callbackSpy = spy();

      // Act
      const postponedFunction = Schedule.postpone( callbackSpy, wait );
      postponedFunction();

      // Assert
      setTimeout( (): void => {
        expect( callbackSpy.notCalled ).to.be.true;
        done();
      }, wait * 0.5 );
    } );

    it( 'should have called after wait time has elapsed', ( done: any ): void => {
      // Arrange
      const callbackSpy = spy();

      // Act
      const postponedFunction = Schedule.postpone( callbackSpy, wait );
      postponedFunction();

      // Assert
      setTimeout( (): void => {
        expect( callbackSpy.calledOnce ).to.be.true;
        done();
      }, wait * 1.5 );
    } );
  } );

  describe( 'blockingThrottle', (): void => {
    it( 'should call the callback with the passed parameters', ( done: any ): void => {
      // Arrange
      const inputs = [ 1, 2, 3 ];
      const callback = ( ...args: any[] ): void => {
        // Assert
        expect( args ).to.deep.equal( inputs );
        done();
      };

      // Act
      const throttledFunction = Schedule.blockingThrottle( callback, wait );
      throttledFunction( ...inputs );
    } );

    it( 'should call with context null if not passed', ( done: any ): void => {
      // Arrange
      class TestClass {
        public method(): void {
          // Assert
          expect( this ).to.be.null;
          done();
        }
      }
      const test = new TestClass();

      // Act
      const throttledFunction = Schedule.blockingThrottle( test.method, wait );
      throttledFunction();
    } );

    it( 'should call with context of test class when passed', ( done: any ): void => {
      // Arrange
      class TestClass {
        public method(): void {
          // Assert
          expect( this ).to.be.instanceof( TestClass );
          done();
        }
      }
      const test = new TestClass();

      // Act
      const throttledFunction = Schedule.blockingThrottle( test.method, wait, test );
      throttledFunction();
    } );

    it( 'should block calls that come before wait time has elapsed', ( done: any ): void => {
      // Arrange
      const callbackSpy = spy();

      // Act
      const throttledFunction = Schedule.blockingThrottle( callbackSpy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.5 );

      // Assert
      setTimeout( (): void => {
        expect( callbackSpy.calledOnce ).to.be.true;
        done();
      }, wait * 1.5 );
    } );

    it( 'should not block calls that come after wait time has elapsed', ( done: any ): void => {
      // Arrange
      const callbackSpy = spy();

      // Act
      const throttledFunction = Schedule.blockingThrottle( callbackSpy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 1.5 );

      // Assert
      setTimeout( (): void => {
        expect( callbackSpy.callCount ).to.equal( 2 );
        done();
      }, wait * 2 );
    } );
  } );

  describe( 'deferringThrottle', (): void => {
    it( 'should call the callback with the passed parameters', ( done: any ): void => {
      // Arrange
      const inputs = [ 1, 2, 3 ];
      const callback = ( ...args: any[] ): void => {
        // Assert
        expect( args ).to.deep.equal( inputs );
        done();
      };

      // Act
      const throttledFunction = Schedule.deferringThrottle( callback, wait );
      throttledFunction( ...inputs );
    } );

    it( 'should call with context null if not passed', ( done: any ): void => {
      // Arrange
      class TestClass {
        public method(): void {
          // Assert
          expect( this ).to.be.null;
          done();
        }
      }
      const test = new TestClass();

      // Act
      const throttledFunction = Schedule.deferringThrottle( test.method, wait );
      throttledFunction();
    } );

    it( 'should call with context of test class when passed', ( done: any ): void => {
      // Arrange
      class TestClass {
        public method(): void {
          // Assert
          expect( this ).to.be.instanceof( TestClass );
          done();
        }
      }
      const test = new TestClass();

      // Act
      const throttledFunction = Schedule.deferringThrottle( test.method, wait, test );
      throttledFunction();
    } );

    it( 'should block calls that come before wait time has elapsed', ( done: any ): void => {
      // Arrange
      const callbackSpy = spy();

      // Act
      const throttledFunction = Schedule.deferringThrottle( callbackSpy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 0.5 );

      // Assert
      setTimeout( (): void => {
        expect( callbackSpy.calledOnce ).to.be.true;
        done();
      }, wait * 0.75 );
    } );

    it( 'should execute once after wait time has elapsed if calls were blocked',
      ( done: any ): void => {
        // Arrange
        const callbackSpy = spy();

        // Act
        const throttledFunction = Schedule.deferringThrottle( callbackSpy, wait );
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

        // Assert
        setTimeout( (): void => {
          // One for the first call plus one for the deferred calls
          expect( callbackSpy.callCount ).to.equal( 2 );
          done();
        }, wait * 3 );
      }
    );

    it( 'should not block calls that come after wait time has elapsed', ( done: any ): void => {
      // Arrange
      const callbackSpy = spy();

      // Act
      const throttledFunction = Schedule.deferringThrottle( callbackSpy, wait );
      throttledFunction();

      setTimeout( (): void => {
        throttledFunction();
      }, wait * 1.5 );

      // Assert
      setTimeout( (): void => {
        expect( callbackSpy.callCount ).to.equal( 2 );
        done();
      }, wait * 1.75 );
    } );
  } );
} );
