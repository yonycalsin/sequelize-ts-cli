import node from 'deasync';

// Wait for a promise without using the await
function waitPromise<T extends any = any>(promise: Promise<any>): T {
   let done = 0;

   let result = null;

   promise.then(
      // on value
      function (value) {
         done = 1;
         result = value;
         return value;
      },
      // on exception
      function (reason) {
         done = 1;
         throw reason;
      },
   );

   while (!done) node.runLoopOnce();

   return result as T;
}

export default waitPromise;
