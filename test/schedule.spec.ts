import {expect} from 'chai';

import {Schedule} from '../lib/schedule';

describe( 'Schedule', () => {
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
      const postponedFunction = Schedule.postpone( callback, 40 );
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
      const postponedFunction = Schedule.postpone( test.method, 40 );
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
      const postponedFunction = Schedule.postpone( test.method, 40, test );
      postponedFunction();
    } );
  } );
} );
