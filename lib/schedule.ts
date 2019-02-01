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
}
