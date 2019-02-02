/**
 * Utility mechanisms to manage the time-wise execution of functions.
 */
export abstract class Schedule {
  /**
   * Gives back a modification of the passed function, that whenever called will only execute after
   * a specified time period has elapsed.
   * @param callback The function to be modified
   * @param wait The waiting time period in milliseconds
   * @param context The this-context of the function
   * @returns The modified function
   */
  public static postpone(
    callback: ( ...p: any[] ) => void, wait: number, context: object | null = null
  ): ( ...q: any[] ) => void {
    return ( ...args: any[] ): void => {
      setTimeout( (): void => {
        callback.apply( context, args );
      }, wait );
    };
  }

  /**
   * Gives back a modification of the passed function, that whenever called will block all following
   * calls from execution for a specified time period.
   * @param callback The function to be modified
   * @param wait The waiting time period in milliseconds, 60ms = 16fps, 40ms = 25fps, 20ms = 50fps
   * @param context The this-context of the function
   * @returns The modified function
   */
  public static blockingThrottle(
    callback: ( ...p: any[] ) => void, wait: number, context: object | null = null
  ): ( ...q: any[] ) => void {
    let blocked = false;

    return ( ...args: any[] ): void => {
      if ( !blocked ) {
        blocked = true;
        callback.apply( context, args );
        setTimeout( (): void => {
          blocked = false;
        }, wait );
      }
    };
  }

  /**
   * Gives back a modification of the passed function, that whenever called will block all following
   * calls from execution for a specified time period, but executes once at the end of the time
   * period if there was a blocked call in the meantime.
   * @param callback The function to be modified
   * @param wait The waiting time period in milliseconds, 60ms = 16fps, 40ms = 25fps, 20ms = 50fps
   * @param context The this-context of the function
   * @returns The modified function
   */
  public static deferringThrottle(
    callback: ( ...p: any[] ) => void, wait: number, context: object | null = null
  ): ( ...q: any[] ) => void {
    let blocked = false;
    let deferredCalls = false;
    let lastArgs: any[];

    const execute = ( args: any[] ): void => {
      callback.apply( context, args );

      setTimeout( (): void => {
        if ( deferredCalls ) {
          deferredCalls = false;
          execute( lastArgs );
        } else {
          blocked = false;
        }
      }, wait );
    };

    return ( ...args: any[] ): void => {
      if ( blocked ) {
        lastArgs = args;
        deferredCalls = true;
      } else {
        blocked = true;
        deferredCalls = false;
        execute( args );
      }
    };
  }
}
