import debug from 'debug';
import util from 'util';

const logger = debug('sequelize-ts-cli:container');

type IProxyTarget = More;

interface CacheEntry<T = any> {
   /**
    * The resolver that resolved the value.
    */
   resolver: any;
   /**
    * The resolved value.
    */
   value: T;
}

const createContainer = () => {
   const registrations = {};

   const inspectCradle = () => '[SequelizeTsCli.Cradle]';

   const proxyTarget: IProxyTarget = {
      [util.inspect.custom]: inspectCradle,
   };

   const proxyHandler: ProxyHandler<IProxyTarget> = {
      get: (target, name) => resolve(name as string),
   };

   const cradle = new Proxy<IProxyTarget>(proxyTarget, proxyHandler);

   const register = (more: More) => Object.assign(registrations, more);

   const resolve = (name: string) => {
      const resolver = registrations[name];

      let resolved: any;

      const cached = container.cache.get(name);

      if (!cached) {
         resolved = resolver(container);

         container.cache.set(name, { resolver, value: resolved });
      } else {
         resolved = cached.value;
      }

      return resolved;
   };

   const container = {
      cradle,
      cache: new Map<string | symbol, CacheEntry>(),
      register,
      get registrations() {
         return registrations;
      },
   };

   return container;
};

const container = createContainer();

container.register({
   count: () => {
      logger('Hola desde count function');
      return 456;
   },
});

export default container;
