
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Site
 * 
 */
export type Site = $Result.DefaultSelection<Prisma.$SitePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model GlobalSettings
 * 
 */
export type GlobalSettings = $Result.DefaultSelection<Prisma.$GlobalSettingsPayload>
/**
 * Model Wallpaper
 * 
 */
export type Wallpaper = $Result.DefaultSelection<Prisma.$WallpaperPayload>
/**
 * Model CustomFont
 * 
 */
export type CustomFont = $Result.DefaultSelection<Prisma.$CustomFontPayload>
/**
 * Model Todo
 * 
 */
export type Todo = $Result.DefaultSelection<Prisma.$TodoPayload>
/**
 * Model Countdown
 * 
 */
export type Countdown = $Result.DefaultSelection<Prisma.$CountdownPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Sites
 * const sites = await prisma.site.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Sites
   * const sites = await prisma.site.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.site`: Exposes CRUD operations for the **Site** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sites
    * const sites = await prisma.site.findMany()
    * ```
    */
  get site(): Prisma.SiteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.globalSettings`: Exposes CRUD operations for the **GlobalSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalSettings
    * const globalSettings = await prisma.globalSettings.findMany()
    * ```
    */
  get globalSettings(): Prisma.GlobalSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallpaper`: Exposes CRUD operations for the **Wallpaper** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallpapers
    * const wallpapers = await prisma.wallpaper.findMany()
    * ```
    */
  get wallpaper(): Prisma.WallpaperDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customFont`: Exposes CRUD operations for the **CustomFont** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CustomFonts
    * const customFonts = await prisma.customFont.findMany()
    * ```
    */
  get customFont(): Prisma.CustomFontDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.todo`: Exposes CRUD operations for the **Todo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Todos
    * const todos = await prisma.todo.findMany()
    * ```
    */
  get todo(): Prisma.TodoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.countdown`: Exposes CRUD operations for the **Countdown** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countdowns
    * const countdowns = await prisma.countdown.findMany()
    * ```
    */
  get countdown(): Prisma.CountdownDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.1.0
   * Query Engine version: ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Site: 'Site',
    Category: 'Category',
    User: 'User',
    GlobalSettings: 'GlobalSettings',
    Wallpaper: 'Wallpaper',
    CustomFont: 'CustomFont',
    Todo: 'Todo',
    Countdown: 'Countdown'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "site" | "category" | "user" | "globalSettings" | "wallpaper" | "customFont" | "todo" | "countdown"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Site: {
        payload: Prisma.$SitePayload<ExtArgs>
        fields: Prisma.SiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          findFirst: {
            args: Prisma.SiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          findMany: {
            args: Prisma.SiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>[]
          }
          create: {
            args: Prisma.SiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          createMany: {
            args: Prisma.SiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>[]
          }
          delete: {
            args: Prisma.SiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          update: {
            args: Prisma.SiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          deleteMany: {
            args: Prisma.SiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>[]
          }
          upsert: {
            args: Prisma.SiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SitePayload>
          }
          aggregate: {
            args: Prisma.SiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSite>
          }
          groupBy: {
            args: Prisma.SiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteCountArgs<ExtArgs>
            result: $Utils.Optional<SiteCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      GlobalSettings: {
        payload: Prisma.$GlobalSettingsPayload<ExtArgs>
        fields: Prisma.GlobalSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findFirst: {
            args: Prisma.GlobalSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          findMany: {
            args: Prisma.GlobalSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          create: {
            args: Prisma.GlobalSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          createMany: {
            args: Prisma.GlobalSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GlobalSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          delete: {
            args: Prisma.GlobalSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          update: {
            args: Prisma.GlobalSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GlobalSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>[]
          }
          upsert: {
            args: Prisma.GlobalSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalSettingsPayload>
          }
          aggregate: {
            args: Prisma.GlobalSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalSettings>
          }
          groupBy: {
            args: Prisma.GlobalSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalSettingsCountAggregateOutputType> | number
          }
        }
      }
      Wallpaper: {
        payload: Prisma.$WallpaperPayload<ExtArgs>
        fields: Prisma.WallpaperFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WallpaperFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WallpaperFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>
          }
          findFirst: {
            args: Prisma.WallpaperFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WallpaperFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>
          }
          findMany: {
            args: Prisma.WallpaperFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>[]
          }
          create: {
            args: Prisma.WallpaperCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>
          }
          createMany: {
            args: Prisma.WallpaperCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WallpaperCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>[]
          }
          delete: {
            args: Prisma.WallpaperDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>
          }
          update: {
            args: Prisma.WallpaperUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>
          }
          deleteMany: {
            args: Prisma.WallpaperDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WallpaperUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WallpaperUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>[]
          }
          upsert: {
            args: Prisma.WallpaperUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WallpaperPayload>
          }
          aggregate: {
            args: Prisma.WallpaperAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallpaper>
          }
          groupBy: {
            args: Prisma.WallpaperGroupByArgs<ExtArgs>
            result: $Utils.Optional<WallpaperGroupByOutputType>[]
          }
          count: {
            args: Prisma.WallpaperCountArgs<ExtArgs>
            result: $Utils.Optional<WallpaperCountAggregateOutputType> | number
          }
        }
      }
      CustomFont: {
        payload: Prisma.$CustomFontPayload<ExtArgs>
        fields: Prisma.CustomFontFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomFontFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomFontFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          findFirst: {
            args: Prisma.CustomFontFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomFontFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          findMany: {
            args: Prisma.CustomFontFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>[]
          }
          create: {
            args: Prisma.CustomFontCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          createMany: {
            args: Prisma.CustomFontCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomFontCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>[]
          }
          delete: {
            args: Prisma.CustomFontDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          update: {
            args: Prisma.CustomFontUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          deleteMany: {
            args: Prisma.CustomFontDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomFontUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomFontUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>[]
          }
          upsert: {
            args: Prisma.CustomFontUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomFontPayload>
          }
          aggregate: {
            args: Prisma.CustomFontAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomFont>
          }
          groupBy: {
            args: Prisma.CustomFontGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomFontGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomFontCountArgs<ExtArgs>
            result: $Utils.Optional<CustomFontCountAggregateOutputType> | number
          }
        }
      }
      Todo: {
        payload: Prisma.$TodoPayload<ExtArgs>
        fields: Prisma.TodoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TodoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TodoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          findFirst: {
            args: Prisma.TodoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TodoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          findMany: {
            args: Prisma.TodoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          create: {
            args: Prisma.TodoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          createMany: {
            args: Prisma.TodoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TodoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          delete: {
            args: Prisma.TodoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          update: {
            args: Prisma.TodoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          deleteMany: {
            args: Prisma.TodoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TodoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TodoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>[]
          }
          upsert: {
            args: Prisma.TodoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodoPayload>
          }
          aggregate: {
            args: Prisma.TodoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTodo>
          }
          groupBy: {
            args: Prisma.TodoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TodoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TodoCountArgs<ExtArgs>
            result: $Utils.Optional<TodoCountAggregateOutputType> | number
          }
        }
      }
      Countdown: {
        payload: Prisma.$CountdownPayload<ExtArgs>
        fields: Prisma.CountdownFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountdownFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountdownFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          findFirst: {
            args: Prisma.CountdownFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountdownFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          findMany: {
            args: Prisma.CountdownFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>[]
          }
          create: {
            args: Prisma.CountdownCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          createMany: {
            args: Prisma.CountdownCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountdownCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>[]
          }
          delete: {
            args: Prisma.CountdownDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          update: {
            args: Prisma.CountdownUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          deleteMany: {
            args: Prisma.CountdownDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountdownUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountdownUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>[]
          }
          upsert: {
            args: Prisma.CountdownUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountdownPayload>
          }
          aggregate: {
            args: Prisma.CountdownAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountdown>
          }
          groupBy: {
            args: Prisma.CountdownGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountdownGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountdownCountArgs<ExtArgs>
            result: $Utils.Optional<CountdownCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    site?: SiteOmit
    category?: CategoryOmit
    user?: UserOmit
    globalSettings?: GlobalSettingsOmit
    wallpaper?: WallpaperOmit
    customFont?: CustomFontOmit
    todo?: TodoOmit
    countdown?: CountdownOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Site
   */

  export type AggregateSite = {
    _count: SiteCountAggregateOutputType | null
    _avg: SiteAvgAggregateOutputType | null
    _sum: SiteSumAggregateOutputType | null
    _min: SiteMinAggregateOutputType | null
    _max: SiteMaxAggregateOutputType | null
  }

  export type SiteAvgAggregateOutputType = {
    titleSize: number | null
    descSize: number | null
    order: number | null
  }

  export type SiteSumAggregateOutputType = {
    titleSize: number | null
    descSize: number | null
    order: number | null
  }

  export type SiteMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    desc: string | null
    category: string | null
    color: string | null
    icon: string | null
    iconType: string | null
    customIconUrl: string | null
    titleFont: string | null
    descFont: string | null
    titleColor: string | null
    descColor: string | null
    titleSize: number | null
    descSize: number | null
    isHidden: boolean | null
    order: number | null
    type: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    desc: string | null
    category: string | null
    color: string | null
    icon: string | null
    iconType: string | null
    customIconUrl: string | null
    titleFont: string | null
    descFont: string | null
    titleColor: string | null
    descColor: string | null
    titleSize: number | null
    descSize: number | null
    isHidden: boolean | null
    order: number | null
    type: string | null
    parentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiteCountAggregateOutputType = {
    id: number
    name: number
    url: number
    desc: number
    category: number
    color: number
    icon: number
    iconType: number
    customIconUrl: number
    titleFont: number
    descFont: number
    titleColor: number
    descColor: number
    titleSize: number
    descSize: number
    isHidden: number
    order: number
    type: number
    parentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SiteAvgAggregateInputType = {
    titleSize?: true
    descSize?: true
    order?: true
  }

  export type SiteSumAggregateInputType = {
    titleSize?: true
    descSize?: true
    order?: true
  }

  export type SiteMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    desc?: true
    category?: true
    color?: true
    icon?: true
    iconType?: true
    customIconUrl?: true
    titleFont?: true
    descFont?: true
    titleColor?: true
    descColor?: true
    titleSize?: true
    descSize?: true
    isHidden?: true
    order?: true
    type?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    desc?: true
    category?: true
    color?: true
    icon?: true
    iconType?: true
    customIconUrl?: true
    titleFont?: true
    descFont?: true
    titleColor?: true
    descColor?: true
    titleSize?: true
    descSize?: true
    isHidden?: true
    order?: true
    type?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiteCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    desc?: true
    category?: true
    color?: true
    icon?: true
    iconType?: true
    customIconUrl?: true
    titleFont?: true
    descFont?: true
    titleColor?: true
    descColor?: true
    titleSize?: true
    descSize?: true
    isHidden?: true
    order?: true
    type?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Site to aggregate.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sites
    **/
    _count?: true | SiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteMaxAggregateInputType
  }

  export type GetSiteAggregateType<T extends SiteAggregateArgs> = {
        [P in keyof T & keyof AggregateSite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSite[P]>
      : GetScalarType<T[P], AggregateSite[P]>
  }




  export type SiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteWhereInput
    orderBy?: SiteOrderByWithAggregationInput | SiteOrderByWithAggregationInput[]
    by: SiteScalarFieldEnum[] | SiteScalarFieldEnum
    having?: SiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteCountAggregateInputType | true
    _avg?: SiteAvgAggregateInputType
    _sum?: SiteSumAggregateInputType
    _min?: SiteMinAggregateInputType
    _max?: SiteMaxAggregateInputType
  }

  export type SiteGroupByOutputType = {
    id: string
    name: string
    url: string
    desc: string | null
    category: string
    color: string | null
    icon: string | null
    iconType: string | null
    customIconUrl: string | null
    titleFont: string | null
    descFont: string | null
    titleColor: string | null
    descColor: string | null
    titleSize: number | null
    descSize: number | null
    isHidden: boolean
    order: number
    type: string
    parentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: SiteCountAggregateOutputType | null
    _avg: SiteAvgAggregateOutputType | null
    _sum: SiteSumAggregateOutputType | null
    _min: SiteMinAggregateOutputType | null
    _max: SiteMaxAggregateOutputType | null
  }

  type GetSiteGroupByPayload<T extends SiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteGroupByOutputType[P]>
            : GetScalarType<T[P], SiteGroupByOutputType[P]>
        }
      >
    >


  export type SiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    desc?: boolean
    category?: boolean
    color?: boolean
    icon?: boolean
    iconType?: boolean
    customIconUrl?: boolean
    titleFont?: boolean
    descFont?: boolean
    titleColor?: boolean
    descColor?: boolean
    titleSize?: boolean
    descSize?: boolean
    isHidden?: boolean
    order?: boolean
    type?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["site"]>

  export type SiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    desc?: boolean
    category?: boolean
    color?: boolean
    icon?: boolean
    iconType?: boolean
    customIconUrl?: boolean
    titleFont?: boolean
    descFont?: boolean
    titleColor?: boolean
    descColor?: boolean
    titleSize?: boolean
    descSize?: boolean
    isHidden?: boolean
    order?: boolean
    type?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["site"]>

  export type SiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    desc?: boolean
    category?: boolean
    color?: boolean
    icon?: boolean
    iconType?: boolean
    customIconUrl?: boolean
    titleFont?: boolean
    descFont?: boolean
    titleColor?: boolean
    descColor?: boolean
    titleSize?: boolean
    descSize?: boolean
    isHidden?: boolean
    order?: boolean
    type?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["site"]>

  export type SiteSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    desc?: boolean
    category?: boolean
    color?: boolean
    icon?: boolean
    iconType?: boolean
    customIconUrl?: boolean
    titleFont?: boolean
    descFont?: boolean
    titleColor?: boolean
    descColor?: boolean
    titleSize?: boolean
    descSize?: boolean
    isHidden?: boolean
    order?: boolean
    type?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "desc" | "category" | "color" | "icon" | "iconType" | "customIconUrl" | "titleFont" | "descFont" | "titleColor" | "descColor" | "titleSize" | "descSize" | "isHidden" | "order" | "type" | "parentId" | "createdAt" | "updatedAt", ExtArgs["result"]["site"]>

  export type $SitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Site"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      desc: string | null
      category: string
      color: string | null
      icon: string | null
      iconType: string | null
      customIconUrl: string | null
      titleFont: string | null
      descFont: string | null
      titleColor: string | null
      descColor: string | null
      titleSize: number | null
      descSize: number | null
      isHidden: boolean
      order: number
      type: string
      parentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["site"]>
    composites: {}
  }

  type SiteGetPayload<S extends boolean | null | undefined | SiteDefaultArgs> = $Result.GetResult<Prisma.$SitePayload, S>

  type SiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteCountAggregateInputType | true
    }

  export interface SiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Site'], meta: { name: 'Site' } }
    /**
     * Find zero or one Site that matches the filter.
     * @param {SiteFindUniqueArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteFindUniqueArgs>(args: SelectSubset<T, SiteFindUniqueArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Site that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteFindUniqueOrThrowArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Site that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteFindFirstArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteFindFirstArgs>(args?: SelectSubset<T, SiteFindFirstArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Site that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteFindFirstOrThrowArgs} args - Arguments to find a Site
     * @example
     * // Get one Site
     * const site = await prisma.site.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sites
     * const sites = await prisma.site.findMany()
     * 
     * // Get first 10 Sites
     * const sites = await prisma.site.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteWithIdOnly = await prisma.site.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteFindManyArgs>(args?: SelectSubset<T, SiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Site.
     * @param {SiteCreateArgs} args - Arguments to create a Site.
     * @example
     * // Create one Site
     * const Site = await prisma.site.create({
     *   data: {
     *     // ... data to create a Site
     *   }
     * })
     * 
     */
    create<T extends SiteCreateArgs>(args: SelectSubset<T, SiteCreateArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sites.
     * @param {SiteCreateManyArgs} args - Arguments to create many Sites.
     * @example
     * // Create many Sites
     * const site = await prisma.site.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteCreateManyArgs>(args?: SelectSubset<T, SiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sites and returns the data saved in the database.
     * @param {SiteCreateManyAndReturnArgs} args - Arguments to create many Sites.
     * @example
     * // Create many Sites
     * const site = await prisma.site.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sites and only return the `id`
     * const siteWithIdOnly = await prisma.site.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Site.
     * @param {SiteDeleteArgs} args - Arguments to delete one Site.
     * @example
     * // Delete one Site
     * const Site = await prisma.site.delete({
     *   where: {
     *     // ... filter to delete one Site
     *   }
     * })
     * 
     */
    delete<T extends SiteDeleteArgs>(args: SelectSubset<T, SiteDeleteArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Site.
     * @param {SiteUpdateArgs} args - Arguments to update one Site.
     * @example
     * // Update one Site
     * const site = await prisma.site.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteUpdateArgs>(args: SelectSubset<T, SiteUpdateArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sites.
     * @param {SiteDeleteManyArgs} args - Arguments to filter Sites to delete.
     * @example
     * // Delete a few Sites
     * const { count } = await prisma.site.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteDeleteManyArgs>(args?: SelectSubset<T, SiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sites
     * const site = await prisma.site.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteUpdateManyArgs>(args: SelectSubset<T, SiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sites and returns the data updated in the database.
     * @param {SiteUpdateManyAndReturnArgs} args - Arguments to update many Sites.
     * @example
     * // Update many Sites
     * const site = await prisma.site.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sites and only return the `id`
     * const siteWithIdOnly = await prisma.site.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Site.
     * @param {SiteUpsertArgs} args - Arguments to update or create a Site.
     * @example
     * // Update or create a Site
     * const site = await prisma.site.upsert({
     *   create: {
     *     // ... data to create a Site
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Site we want to update
     *   }
     * })
     */
    upsert<T extends SiteUpsertArgs>(args: SelectSubset<T, SiteUpsertArgs<ExtArgs>>): Prisma__SiteClient<$Result.GetResult<Prisma.$SitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteCountArgs} args - Arguments to filter Sites to count.
     * @example
     * // Count the number of Sites
     * const count = await prisma.site.count({
     *   where: {
     *     // ... the filter for the Sites we want to count
     *   }
     * })
    **/
    count<T extends SiteCountArgs>(
      args?: Subset<T, SiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Site.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteAggregateArgs>(args: Subset<T, SiteAggregateArgs>): Prisma.PrismaPromise<GetSiteAggregateType<T>>

    /**
     * Group by Site.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteGroupByArgs['orderBy'] }
        : { orderBy?: SiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Site model
   */
  readonly fields: SiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Site.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Site model
   */
  interface SiteFieldRefs {
    readonly id: FieldRef<"Site", 'String'>
    readonly name: FieldRef<"Site", 'String'>
    readonly url: FieldRef<"Site", 'String'>
    readonly desc: FieldRef<"Site", 'String'>
    readonly category: FieldRef<"Site", 'String'>
    readonly color: FieldRef<"Site", 'String'>
    readonly icon: FieldRef<"Site", 'String'>
    readonly iconType: FieldRef<"Site", 'String'>
    readonly customIconUrl: FieldRef<"Site", 'String'>
    readonly titleFont: FieldRef<"Site", 'String'>
    readonly descFont: FieldRef<"Site", 'String'>
    readonly titleColor: FieldRef<"Site", 'String'>
    readonly descColor: FieldRef<"Site", 'String'>
    readonly titleSize: FieldRef<"Site", 'Int'>
    readonly descSize: FieldRef<"Site", 'Int'>
    readonly isHidden: FieldRef<"Site", 'Boolean'>
    readonly order: FieldRef<"Site", 'Int'>
    readonly type: FieldRef<"Site", 'String'>
    readonly parentId: FieldRef<"Site", 'String'>
    readonly createdAt: FieldRef<"Site", 'DateTime'>
    readonly updatedAt: FieldRef<"Site", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Site findUnique
   */
  export type SiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site findUniqueOrThrow
   */
  export type SiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site findFirst
   */
  export type SiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sites.
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sites.
     */
    distinct?: SiteScalarFieldEnum | SiteScalarFieldEnum[]
  }

  /**
   * Site findFirstOrThrow
   */
  export type SiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * Filter, which Site to fetch.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sites.
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sites.
     */
    distinct?: SiteScalarFieldEnum | SiteScalarFieldEnum[]
  }

  /**
   * Site findMany
   */
  export type SiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * Filter, which Sites to fetch.
     */
    where?: SiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sites to fetch.
     */
    orderBy?: SiteOrderByWithRelationInput | SiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sites.
     */
    cursor?: SiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sites.
     */
    skip?: number
    distinct?: SiteScalarFieldEnum | SiteScalarFieldEnum[]
  }

  /**
   * Site create
   */
  export type SiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * The data needed to create a Site.
     */
    data: XOR<SiteCreateInput, SiteUncheckedCreateInput>
  }

  /**
   * Site createMany
   */
  export type SiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sites.
     */
    data: SiteCreateManyInput | SiteCreateManyInput[]
  }

  /**
   * Site createManyAndReturn
   */
  export type SiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * The data used to create many Sites.
     */
    data: SiteCreateManyInput | SiteCreateManyInput[]
  }

  /**
   * Site update
   */
  export type SiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * The data needed to update a Site.
     */
    data: XOR<SiteUpdateInput, SiteUncheckedUpdateInput>
    /**
     * Choose, which Site to update.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site updateMany
   */
  export type SiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sites.
     */
    data: XOR<SiteUpdateManyMutationInput, SiteUncheckedUpdateManyInput>
    /**
     * Filter which Sites to update
     */
    where?: SiteWhereInput
    /**
     * Limit how many Sites to update.
     */
    limit?: number
  }

  /**
   * Site updateManyAndReturn
   */
  export type SiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * The data used to update Sites.
     */
    data: XOR<SiteUpdateManyMutationInput, SiteUncheckedUpdateManyInput>
    /**
     * Filter which Sites to update
     */
    where?: SiteWhereInput
    /**
     * Limit how many Sites to update.
     */
    limit?: number
  }

  /**
   * Site upsert
   */
  export type SiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * The filter to search for the Site to update in case it exists.
     */
    where: SiteWhereUniqueInput
    /**
     * In case the Site found by the `where` argument doesn't exist, create a new Site with this data.
     */
    create: XOR<SiteCreateInput, SiteUncheckedCreateInput>
    /**
     * In case the Site was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteUpdateInput, SiteUncheckedUpdateInput>
  }

  /**
   * Site delete
   */
  export type SiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
    /**
     * Filter which Site to delete.
     */
    where: SiteWhereUniqueInput
  }

  /**
   * Site deleteMany
   */
  export type SiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sites to delete
     */
    where?: SiteWhereInput
    /**
     * Limit how many Sites to delete.
     */
    limit?: number
  }

  /**
   * Site without action
   */
  export type SiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Site
     */
    select?: SiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Site
     */
    omit?: SiteOmit<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    order: number | null
  }

  export type CategorySumAggregateOutputType = {
    order: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    isHidden: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    color: string | null
    isHidden: boolean | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    color: number
    isHidden: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    order?: true
  }

  export type CategorySumAggregateInputType = {
    order?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    isHidden?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    isHidden?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    isHidden?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    color: string | null
    isHidden: boolean
    order: number
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    isHidden?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    isHidden?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    isHidden?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    isHidden?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "isHidden" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      color: string | null
      isHidden: boolean
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly isHidden: FieldRef<"Category", 'Boolean'>
    readonly order: FieldRef<"Category", 'Int'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    username: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    username: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    username: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    username?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    username?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    username?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    username: string
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    username?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"username" | "passwordHash" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      username: string
      passwordHash: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `username`
     * const userWithUsernameOnly = await prisma.user.findMany({ select: { username: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `username`
     * const userWithUsernameOnly = await prisma.user.createManyAndReturn({
     *   select: { username: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `username`
     * const userWithUsernameOnly = await prisma.user.updateManyAndReturn({
     *   select: { username: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model GlobalSettings
   */

  export type AggregateGlobalSettings = {
    _count: GlobalSettingsCountAggregateOutputType | null
    _avg: GlobalSettingsAvgAggregateOutputType | null
    _sum: GlobalSettingsSumAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  export type GlobalSettingsAvgAggregateOutputType = {
    id: number | null
  }

  export type GlobalSettingsSumAggregateOutputType = {
    id: number | null
  }

  export type GlobalSettingsMinAggregateOutputType = {
    id: number | null
    layout: string | null
    config: string | null
    theme: string | null
    searchEngine: string | null
    bingCacheMode: string | null
    privatePasswordHash: string | null
    updatedAt: Date | null
  }

  export type GlobalSettingsMaxAggregateOutputType = {
    id: number | null
    layout: string | null
    config: string | null
    theme: string | null
    searchEngine: string | null
    bingCacheMode: string | null
    privatePasswordHash: string | null
    updatedAt: Date | null
  }

  export type GlobalSettingsCountAggregateOutputType = {
    id: number
    layout: number
    config: number
    theme: number
    searchEngine: number
    bingCacheMode: number
    privatePasswordHash: number
    updatedAt: number
    _all: number
  }


  export type GlobalSettingsAvgAggregateInputType = {
    id?: true
  }

  export type GlobalSettingsSumAggregateInputType = {
    id?: true
  }

  export type GlobalSettingsMinAggregateInputType = {
    id?: true
    layout?: true
    config?: true
    theme?: true
    searchEngine?: true
    bingCacheMode?: true
    privatePasswordHash?: true
    updatedAt?: true
  }

  export type GlobalSettingsMaxAggregateInputType = {
    id?: true
    layout?: true
    config?: true
    theme?: true
    searchEngine?: true
    bingCacheMode?: true
    privatePasswordHash?: true
    updatedAt?: true
  }

  export type GlobalSettingsCountAggregateInputType = {
    id?: true
    layout?: true
    config?: true
    theme?: true
    searchEngine?: true
    bingCacheMode?: true
    privatePasswordHash?: true
    updatedAt?: true
    _all?: true
  }

  export type GlobalSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to aggregate.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalSettings
    **/
    _count?: true | GlobalSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GlobalSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GlobalSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GetGlobalSettingsAggregateType<T extends GlobalSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalSettings[P]>
      : GetScalarType<T[P], AggregateGlobalSettings[P]>
  }




  export type GlobalSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalSettingsWhereInput
    orderBy?: GlobalSettingsOrderByWithAggregationInput | GlobalSettingsOrderByWithAggregationInput[]
    by: GlobalSettingsScalarFieldEnum[] | GlobalSettingsScalarFieldEnum
    having?: GlobalSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalSettingsCountAggregateInputType | true
    _avg?: GlobalSettingsAvgAggregateInputType
    _sum?: GlobalSettingsSumAggregateInputType
    _min?: GlobalSettingsMinAggregateInputType
    _max?: GlobalSettingsMaxAggregateInputType
  }

  export type GlobalSettingsGroupByOutputType = {
    id: number
    layout: string
    config: string
    theme: string
    searchEngine: string
    bingCacheMode: string
    privatePasswordHash: string | null
    updatedAt: Date
    _count: GlobalSettingsCountAggregateOutputType | null
    _avg: GlobalSettingsAvgAggregateOutputType | null
    _sum: GlobalSettingsSumAggregateOutputType | null
    _min: GlobalSettingsMinAggregateOutputType | null
    _max: GlobalSettingsMaxAggregateOutputType | null
  }

  type GetGlobalSettingsGroupByPayload<T extends GlobalSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GlobalSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    layout?: boolean
    config?: boolean
    theme?: boolean
    searchEngine?: boolean
    bingCacheMode?: boolean
    privatePasswordHash?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    layout?: boolean
    config?: boolean
    theme?: boolean
    searchEngine?: boolean
    bingCacheMode?: boolean
    privatePasswordHash?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    layout?: boolean
    config?: boolean
    theme?: boolean
    searchEngine?: boolean
    bingCacheMode?: boolean
    privatePasswordHash?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["globalSettings"]>

  export type GlobalSettingsSelectScalar = {
    id?: boolean
    layout?: boolean
    config?: boolean
    theme?: boolean
    searchEngine?: boolean
    bingCacheMode?: boolean
    privatePasswordHash?: boolean
    updatedAt?: boolean
  }

  export type GlobalSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "layout" | "config" | "theme" | "searchEngine" | "bingCacheMode" | "privatePasswordHash" | "updatedAt", ExtArgs["result"]["globalSettings"]>

  export type $GlobalSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      layout: string
      config: string
      theme: string
      searchEngine: string
      bingCacheMode: string
      privatePasswordHash: string | null
      updatedAt: Date
    }, ExtArgs["result"]["globalSettings"]>
    composites: {}
  }

  type GlobalSettingsGetPayload<S extends boolean | null | undefined | GlobalSettingsDefaultArgs> = $Result.GetResult<Prisma.$GlobalSettingsPayload, S>

  type GlobalSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GlobalSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GlobalSettingsCountAggregateInputType | true
    }

  export interface GlobalSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalSettings'], meta: { name: 'GlobalSettings' } }
    /**
     * Find zero or one GlobalSettings that matches the filter.
     * @param {GlobalSettingsFindUniqueArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalSettingsFindUniqueArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GlobalSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GlobalSettingsFindUniqueOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalSettingsFindFirstArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindFirstOrThrowArgs} args - Arguments to find a GlobalSettings
     * @example
     * // Get one GlobalSettings
     * const globalSettings = await prisma.globalSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GlobalSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany()
     * 
     * // Get first 10 GlobalSettings
     * const globalSettings = await prisma.globalSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalSettingsFindManyArgs>(args?: SelectSubset<T, GlobalSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GlobalSettings.
     * @param {GlobalSettingsCreateArgs} args - Arguments to create a GlobalSettings.
     * @example
     * // Create one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.create({
     *   data: {
     *     // ... data to create a GlobalSettings
     *   }
     * })
     * 
     */
    create<T extends GlobalSettingsCreateArgs>(args: SelectSubset<T, GlobalSettingsCreateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GlobalSettings.
     * @param {GlobalSettingsCreateManyArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalSettingsCreateManyArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GlobalSettings and returns the data saved in the database.
     * @param {GlobalSettingsCreateManyAndReturnArgs} args - Arguments to create many GlobalSettings.
     * @example
     * // Create many GlobalSettings
     * const globalSettings = await prisma.globalSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GlobalSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GlobalSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GlobalSettings.
     * @param {GlobalSettingsDeleteArgs} args - Arguments to delete one GlobalSettings.
     * @example
     * // Delete one GlobalSettings
     * const GlobalSettings = await prisma.globalSettings.delete({
     *   where: {
     *     // ... filter to delete one GlobalSettings
     *   }
     * })
     * 
     */
    delete<T extends GlobalSettingsDeleteArgs>(args: SelectSubset<T, GlobalSettingsDeleteArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GlobalSettings.
     * @param {GlobalSettingsUpdateArgs} args - Arguments to update one GlobalSettings.
     * @example
     * // Update one GlobalSettings
     * const globalSettings = await prisma.globalSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalSettingsUpdateArgs>(args: SelectSubset<T, GlobalSettingsUpdateArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GlobalSettings.
     * @param {GlobalSettingsDeleteManyArgs} args - Arguments to filter GlobalSettings to delete.
     * @example
     * // Delete a few GlobalSettings
     * const { count } = await prisma.globalSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalSettingsDeleteManyArgs>(args?: SelectSubset<T, GlobalSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalSettingsUpdateManyArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalSettings and returns the data updated in the database.
     * @param {GlobalSettingsUpdateManyAndReturnArgs} args - Arguments to update many GlobalSettings.
     * @example
     * // Update many GlobalSettings
     * const globalSettings = await prisma.globalSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GlobalSettings and only return the `id`
     * const globalSettingsWithIdOnly = await prisma.globalSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GlobalSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, GlobalSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GlobalSettings.
     * @param {GlobalSettingsUpsertArgs} args - Arguments to update or create a GlobalSettings.
     * @example
     * // Update or create a GlobalSettings
     * const globalSettings = await prisma.globalSettings.upsert({
     *   create: {
     *     // ... data to create a GlobalSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalSettings we want to update
     *   }
     * })
     */
    upsert<T extends GlobalSettingsUpsertArgs>(args: SelectSubset<T, GlobalSettingsUpsertArgs<ExtArgs>>): Prisma__GlobalSettingsClient<$Result.GetResult<Prisma.$GlobalSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsCountArgs} args - Arguments to filter GlobalSettings to count.
     * @example
     * // Count the number of GlobalSettings
     * const count = await prisma.globalSettings.count({
     *   where: {
     *     // ... the filter for the GlobalSettings we want to count
     *   }
     * })
    **/
    count<T extends GlobalSettingsCountArgs>(
      args?: Subset<T, GlobalSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalSettingsAggregateArgs>(args: Subset<T, GlobalSettingsAggregateArgs>): Prisma.PrismaPromise<GetGlobalSettingsAggregateType<T>>

    /**
     * Group by GlobalSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GlobalSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalSettings model
   */
  readonly fields: GlobalSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalSettings model
   */
  interface GlobalSettingsFieldRefs {
    readonly id: FieldRef<"GlobalSettings", 'Int'>
    readonly layout: FieldRef<"GlobalSettings", 'String'>
    readonly config: FieldRef<"GlobalSettings", 'String'>
    readonly theme: FieldRef<"GlobalSettings", 'String'>
    readonly searchEngine: FieldRef<"GlobalSettings", 'String'>
    readonly bingCacheMode: FieldRef<"GlobalSettings", 'String'>
    readonly privatePasswordHash: FieldRef<"GlobalSettings", 'String'>
    readonly updatedAt: FieldRef<"GlobalSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GlobalSettings findUnique
   */
  export type GlobalSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findUniqueOrThrow
   */
  export type GlobalSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings findFirst
   */
  export type GlobalSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findFirstOrThrow
   */
  export type GlobalSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalSettings.
     */
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings findMany
   */
  export type GlobalSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter, which GlobalSettings to fetch.
     */
    where?: GlobalSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalSettings to fetch.
     */
    orderBy?: GlobalSettingsOrderByWithRelationInput | GlobalSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalSettings.
     */
    cursor?: GlobalSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalSettings.
     */
    skip?: number
    distinct?: GlobalSettingsScalarFieldEnum | GlobalSettingsScalarFieldEnum[]
  }

  /**
   * GlobalSettings create
   */
  export type GlobalSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a GlobalSettings.
     */
    data: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
  }

  /**
   * GlobalSettings createMany
   */
  export type GlobalSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
  }

  /**
   * GlobalSettings createManyAndReturn
   */
  export type GlobalSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many GlobalSettings.
     */
    data: GlobalSettingsCreateManyInput | GlobalSettingsCreateManyInput[]
  }

  /**
   * GlobalSettings update
   */
  export type GlobalSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
    /**
     * Choose, which GlobalSettings to update.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings updateMany
   */
  export type GlobalSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings updateManyAndReturn
   */
  export type GlobalSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The data used to update GlobalSettings.
     */
    data: XOR<GlobalSettingsUpdateManyMutationInput, GlobalSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GlobalSettings to update
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to update.
     */
    limit?: number
  }

  /**
   * GlobalSettings upsert
   */
  export type GlobalSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the GlobalSettings to update in case it exists.
     */
    where: GlobalSettingsWhereUniqueInput
    /**
     * In case the GlobalSettings found by the `where` argument doesn't exist, create a new GlobalSettings with this data.
     */
    create: XOR<GlobalSettingsCreateInput, GlobalSettingsUncheckedCreateInput>
    /**
     * In case the GlobalSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalSettingsUpdateInput, GlobalSettingsUncheckedUpdateInput>
  }

  /**
   * GlobalSettings delete
   */
  export type GlobalSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
    /**
     * Filter which GlobalSettings to delete.
     */
    where: GlobalSettingsWhereUniqueInput
  }

  /**
   * GlobalSettings deleteMany
   */
  export type GlobalSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalSettings to delete
     */
    where?: GlobalSettingsWhereInput
    /**
     * Limit how many GlobalSettings to delete.
     */
    limit?: number
  }

  /**
   * GlobalSettings without action
   */
  export type GlobalSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalSettings
     */
    select?: GlobalSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalSettings
     */
    omit?: GlobalSettingsOmit<ExtArgs> | null
  }


  /**
   * Model Wallpaper
   */

  export type AggregateWallpaper = {
    _count: WallpaperCountAggregateOutputType | null
    _avg: WallpaperAvgAggregateOutputType | null
    _sum: WallpaperSumAggregateOutputType | null
    _min: WallpaperMinAggregateOutputType | null
    _max: WallpaperMaxAggregateOutputType | null
  }

  export type WallpaperAvgAggregateOutputType = {
    size: number | null
  }

  export type WallpaperSumAggregateOutputType = {
    size: number | null
  }

  export type WallpaperMinAggregateOutputType = {
    id: string | null
    url: string | null
    type: string | null
    filename: string | null
    size: number | null
    createdAt: Date | null
  }

  export type WallpaperMaxAggregateOutputType = {
    id: string | null
    url: string | null
    type: string | null
    filename: string | null
    size: number | null
    createdAt: Date | null
  }

  export type WallpaperCountAggregateOutputType = {
    id: number
    url: number
    type: number
    filename: number
    size: number
    createdAt: number
    _all: number
  }


  export type WallpaperAvgAggregateInputType = {
    size?: true
  }

  export type WallpaperSumAggregateInputType = {
    size?: true
  }

  export type WallpaperMinAggregateInputType = {
    id?: true
    url?: true
    type?: true
    filename?: true
    size?: true
    createdAt?: true
  }

  export type WallpaperMaxAggregateInputType = {
    id?: true
    url?: true
    type?: true
    filename?: true
    size?: true
    createdAt?: true
  }

  export type WallpaperCountAggregateInputType = {
    id?: true
    url?: true
    type?: true
    filename?: true
    size?: true
    createdAt?: true
    _all?: true
  }

  export type WallpaperAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallpaper to aggregate.
     */
    where?: WallpaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallpapers to fetch.
     */
    orderBy?: WallpaperOrderByWithRelationInput | WallpaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WallpaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallpapers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallpapers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallpapers
    **/
    _count?: true | WallpaperCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WallpaperAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WallpaperSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WallpaperMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WallpaperMaxAggregateInputType
  }

  export type GetWallpaperAggregateType<T extends WallpaperAggregateArgs> = {
        [P in keyof T & keyof AggregateWallpaper]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallpaper[P]>
      : GetScalarType<T[P], AggregateWallpaper[P]>
  }




  export type WallpaperGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WallpaperWhereInput
    orderBy?: WallpaperOrderByWithAggregationInput | WallpaperOrderByWithAggregationInput[]
    by: WallpaperScalarFieldEnum[] | WallpaperScalarFieldEnum
    having?: WallpaperScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WallpaperCountAggregateInputType | true
    _avg?: WallpaperAvgAggregateInputType
    _sum?: WallpaperSumAggregateInputType
    _min?: WallpaperMinAggregateInputType
    _max?: WallpaperMaxAggregateInputType
  }

  export type WallpaperGroupByOutputType = {
    id: string
    url: string
    type: string
    filename: string
    size: number | null
    createdAt: Date
    _count: WallpaperCountAggregateOutputType | null
    _avg: WallpaperAvgAggregateOutputType | null
    _sum: WallpaperSumAggregateOutputType | null
    _min: WallpaperMinAggregateOutputType | null
    _max: WallpaperMaxAggregateOutputType | null
  }

  type GetWallpaperGroupByPayload<T extends WallpaperGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WallpaperGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WallpaperGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WallpaperGroupByOutputType[P]>
            : GetScalarType<T[P], WallpaperGroupByOutputType[P]>
        }
      >
    >


  export type WallpaperSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
    filename?: boolean
    size?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["wallpaper"]>

  export type WallpaperSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
    filename?: boolean
    size?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["wallpaper"]>

  export type WallpaperSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    type?: boolean
    filename?: boolean
    size?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["wallpaper"]>

  export type WallpaperSelectScalar = {
    id?: boolean
    url?: boolean
    type?: boolean
    filename?: boolean
    size?: boolean
    createdAt?: boolean
  }

  export type WallpaperOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "type" | "filename" | "size" | "createdAt", ExtArgs["result"]["wallpaper"]>

  export type $WallpaperPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallpaper"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      type: string
      filename: string
      size: number | null
      createdAt: Date
    }, ExtArgs["result"]["wallpaper"]>
    composites: {}
  }

  type WallpaperGetPayload<S extends boolean | null | undefined | WallpaperDefaultArgs> = $Result.GetResult<Prisma.$WallpaperPayload, S>

  type WallpaperCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WallpaperFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WallpaperCountAggregateInputType | true
    }

  export interface WallpaperDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallpaper'], meta: { name: 'Wallpaper' } }
    /**
     * Find zero or one Wallpaper that matches the filter.
     * @param {WallpaperFindUniqueArgs} args - Arguments to find a Wallpaper
     * @example
     * // Get one Wallpaper
     * const wallpaper = await prisma.wallpaper.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WallpaperFindUniqueArgs>(args: SelectSubset<T, WallpaperFindUniqueArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallpaper that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WallpaperFindUniqueOrThrowArgs} args - Arguments to find a Wallpaper
     * @example
     * // Get one Wallpaper
     * const wallpaper = await prisma.wallpaper.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WallpaperFindUniqueOrThrowArgs>(args: SelectSubset<T, WallpaperFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallpaper that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperFindFirstArgs} args - Arguments to find a Wallpaper
     * @example
     * // Get one Wallpaper
     * const wallpaper = await prisma.wallpaper.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WallpaperFindFirstArgs>(args?: SelectSubset<T, WallpaperFindFirstArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallpaper that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperFindFirstOrThrowArgs} args - Arguments to find a Wallpaper
     * @example
     * // Get one Wallpaper
     * const wallpaper = await prisma.wallpaper.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WallpaperFindFirstOrThrowArgs>(args?: SelectSubset<T, WallpaperFindFirstOrThrowArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallpapers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallpapers
     * const wallpapers = await prisma.wallpaper.findMany()
     * 
     * // Get first 10 Wallpapers
     * const wallpapers = await prisma.wallpaper.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wallpaperWithIdOnly = await prisma.wallpaper.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WallpaperFindManyArgs>(args?: SelectSubset<T, WallpaperFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallpaper.
     * @param {WallpaperCreateArgs} args - Arguments to create a Wallpaper.
     * @example
     * // Create one Wallpaper
     * const Wallpaper = await prisma.wallpaper.create({
     *   data: {
     *     // ... data to create a Wallpaper
     *   }
     * })
     * 
     */
    create<T extends WallpaperCreateArgs>(args: SelectSubset<T, WallpaperCreateArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallpapers.
     * @param {WallpaperCreateManyArgs} args - Arguments to create many Wallpapers.
     * @example
     * // Create many Wallpapers
     * const wallpaper = await prisma.wallpaper.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WallpaperCreateManyArgs>(args?: SelectSubset<T, WallpaperCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallpapers and returns the data saved in the database.
     * @param {WallpaperCreateManyAndReturnArgs} args - Arguments to create many Wallpapers.
     * @example
     * // Create many Wallpapers
     * const wallpaper = await prisma.wallpaper.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallpapers and only return the `id`
     * const wallpaperWithIdOnly = await prisma.wallpaper.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WallpaperCreateManyAndReturnArgs>(args?: SelectSubset<T, WallpaperCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallpaper.
     * @param {WallpaperDeleteArgs} args - Arguments to delete one Wallpaper.
     * @example
     * // Delete one Wallpaper
     * const Wallpaper = await prisma.wallpaper.delete({
     *   where: {
     *     // ... filter to delete one Wallpaper
     *   }
     * })
     * 
     */
    delete<T extends WallpaperDeleteArgs>(args: SelectSubset<T, WallpaperDeleteArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallpaper.
     * @param {WallpaperUpdateArgs} args - Arguments to update one Wallpaper.
     * @example
     * // Update one Wallpaper
     * const wallpaper = await prisma.wallpaper.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WallpaperUpdateArgs>(args: SelectSubset<T, WallpaperUpdateArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallpapers.
     * @param {WallpaperDeleteManyArgs} args - Arguments to filter Wallpapers to delete.
     * @example
     * // Delete a few Wallpapers
     * const { count } = await prisma.wallpaper.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WallpaperDeleteManyArgs>(args?: SelectSubset<T, WallpaperDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallpapers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallpapers
     * const wallpaper = await prisma.wallpaper.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WallpaperUpdateManyArgs>(args: SelectSubset<T, WallpaperUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallpapers and returns the data updated in the database.
     * @param {WallpaperUpdateManyAndReturnArgs} args - Arguments to update many Wallpapers.
     * @example
     * // Update many Wallpapers
     * const wallpaper = await prisma.wallpaper.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallpapers and only return the `id`
     * const wallpaperWithIdOnly = await prisma.wallpaper.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WallpaperUpdateManyAndReturnArgs>(args: SelectSubset<T, WallpaperUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallpaper.
     * @param {WallpaperUpsertArgs} args - Arguments to update or create a Wallpaper.
     * @example
     * // Update or create a Wallpaper
     * const wallpaper = await prisma.wallpaper.upsert({
     *   create: {
     *     // ... data to create a Wallpaper
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallpaper we want to update
     *   }
     * })
     */
    upsert<T extends WallpaperUpsertArgs>(args: SelectSubset<T, WallpaperUpsertArgs<ExtArgs>>): Prisma__WallpaperClient<$Result.GetResult<Prisma.$WallpaperPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallpapers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperCountArgs} args - Arguments to filter Wallpapers to count.
     * @example
     * // Count the number of Wallpapers
     * const count = await prisma.wallpaper.count({
     *   where: {
     *     // ... the filter for the Wallpapers we want to count
     *   }
     * })
    **/
    count<T extends WallpaperCountArgs>(
      args?: Subset<T, WallpaperCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WallpaperCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallpaper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WallpaperAggregateArgs>(args: Subset<T, WallpaperAggregateArgs>): Prisma.PrismaPromise<GetWallpaperAggregateType<T>>

    /**
     * Group by Wallpaper.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WallpaperGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WallpaperGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WallpaperGroupByArgs['orderBy'] }
        : { orderBy?: WallpaperGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WallpaperGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWallpaperGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallpaper model
   */
  readonly fields: WallpaperFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallpaper.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WallpaperClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallpaper model
   */
  interface WallpaperFieldRefs {
    readonly id: FieldRef<"Wallpaper", 'String'>
    readonly url: FieldRef<"Wallpaper", 'String'>
    readonly type: FieldRef<"Wallpaper", 'String'>
    readonly filename: FieldRef<"Wallpaper", 'String'>
    readonly size: FieldRef<"Wallpaper", 'Int'>
    readonly createdAt: FieldRef<"Wallpaper", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallpaper findUnique
   */
  export type WallpaperFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * Filter, which Wallpaper to fetch.
     */
    where: WallpaperWhereUniqueInput
  }

  /**
   * Wallpaper findUniqueOrThrow
   */
  export type WallpaperFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * Filter, which Wallpaper to fetch.
     */
    where: WallpaperWhereUniqueInput
  }

  /**
   * Wallpaper findFirst
   */
  export type WallpaperFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * Filter, which Wallpaper to fetch.
     */
    where?: WallpaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallpapers to fetch.
     */
    orderBy?: WallpaperOrderByWithRelationInput | WallpaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallpapers.
     */
    cursor?: WallpaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallpapers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallpapers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallpapers.
     */
    distinct?: WallpaperScalarFieldEnum | WallpaperScalarFieldEnum[]
  }

  /**
   * Wallpaper findFirstOrThrow
   */
  export type WallpaperFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * Filter, which Wallpaper to fetch.
     */
    where?: WallpaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallpapers to fetch.
     */
    orderBy?: WallpaperOrderByWithRelationInput | WallpaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallpapers.
     */
    cursor?: WallpaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallpapers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallpapers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallpapers.
     */
    distinct?: WallpaperScalarFieldEnum | WallpaperScalarFieldEnum[]
  }

  /**
   * Wallpaper findMany
   */
  export type WallpaperFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * Filter, which Wallpapers to fetch.
     */
    where?: WallpaperWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallpapers to fetch.
     */
    orderBy?: WallpaperOrderByWithRelationInput | WallpaperOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallpapers.
     */
    cursor?: WallpaperWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallpapers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallpapers.
     */
    skip?: number
    distinct?: WallpaperScalarFieldEnum | WallpaperScalarFieldEnum[]
  }

  /**
   * Wallpaper create
   */
  export type WallpaperCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * The data needed to create a Wallpaper.
     */
    data: XOR<WallpaperCreateInput, WallpaperUncheckedCreateInput>
  }

  /**
   * Wallpaper createMany
   */
  export type WallpaperCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallpapers.
     */
    data: WallpaperCreateManyInput | WallpaperCreateManyInput[]
  }

  /**
   * Wallpaper createManyAndReturn
   */
  export type WallpaperCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * The data used to create many Wallpapers.
     */
    data: WallpaperCreateManyInput | WallpaperCreateManyInput[]
  }

  /**
   * Wallpaper update
   */
  export type WallpaperUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * The data needed to update a Wallpaper.
     */
    data: XOR<WallpaperUpdateInput, WallpaperUncheckedUpdateInput>
    /**
     * Choose, which Wallpaper to update.
     */
    where: WallpaperWhereUniqueInput
  }

  /**
   * Wallpaper updateMany
   */
  export type WallpaperUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallpapers.
     */
    data: XOR<WallpaperUpdateManyMutationInput, WallpaperUncheckedUpdateManyInput>
    /**
     * Filter which Wallpapers to update
     */
    where?: WallpaperWhereInput
    /**
     * Limit how many Wallpapers to update.
     */
    limit?: number
  }

  /**
   * Wallpaper updateManyAndReturn
   */
  export type WallpaperUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * The data used to update Wallpapers.
     */
    data: XOR<WallpaperUpdateManyMutationInput, WallpaperUncheckedUpdateManyInput>
    /**
     * Filter which Wallpapers to update
     */
    where?: WallpaperWhereInput
    /**
     * Limit how many Wallpapers to update.
     */
    limit?: number
  }

  /**
   * Wallpaper upsert
   */
  export type WallpaperUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * The filter to search for the Wallpaper to update in case it exists.
     */
    where: WallpaperWhereUniqueInput
    /**
     * In case the Wallpaper found by the `where` argument doesn't exist, create a new Wallpaper with this data.
     */
    create: XOR<WallpaperCreateInput, WallpaperUncheckedCreateInput>
    /**
     * In case the Wallpaper was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WallpaperUpdateInput, WallpaperUncheckedUpdateInput>
  }

  /**
   * Wallpaper delete
   */
  export type WallpaperDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
    /**
     * Filter which Wallpaper to delete.
     */
    where: WallpaperWhereUniqueInput
  }

  /**
   * Wallpaper deleteMany
   */
  export type WallpaperDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallpapers to delete
     */
    where?: WallpaperWhereInput
    /**
     * Limit how many Wallpapers to delete.
     */
    limit?: number
  }

  /**
   * Wallpaper without action
   */
  export type WallpaperDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallpaper
     */
    select?: WallpaperSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallpaper
     */
    omit?: WallpaperOmit<ExtArgs> | null
  }


  /**
   * Model CustomFont
   */

  export type AggregateCustomFont = {
    _count: CustomFontCountAggregateOutputType | null
    _min: CustomFontMinAggregateOutputType | null
    _max: CustomFontMaxAggregateOutputType | null
  }

  export type CustomFontMinAggregateOutputType = {
    id: string | null
    name: string | null
    family: string | null
    url: string | null
    provider: string | null
    createdAt: Date | null
  }

  export type CustomFontMaxAggregateOutputType = {
    id: string | null
    name: string | null
    family: string | null
    url: string | null
    provider: string | null
    createdAt: Date | null
  }

  export type CustomFontCountAggregateOutputType = {
    id: number
    name: number
    family: number
    url: number
    provider: number
    createdAt: number
    _all: number
  }


  export type CustomFontMinAggregateInputType = {
    id?: true
    name?: true
    family?: true
    url?: true
    provider?: true
    createdAt?: true
  }

  export type CustomFontMaxAggregateInputType = {
    id?: true
    name?: true
    family?: true
    url?: true
    provider?: true
    createdAt?: true
  }

  export type CustomFontCountAggregateInputType = {
    id?: true
    name?: true
    family?: true
    url?: true
    provider?: true
    createdAt?: true
    _all?: true
  }

  export type CustomFontAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFont to aggregate.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CustomFonts
    **/
    _count?: true | CustomFontCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomFontMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomFontMaxAggregateInputType
  }

  export type GetCustomFontAggregateType<T extends CustomFontAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomFont]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomFont[P]>
      : GetScalarType<T[P], AggregateCustomFont[P]>
  }




  export type CustomFontGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomFontWhereInput
    orderBy?: CustomFontOrderByWithAggregationInput | CustomFontOrderByWithAggregationInput[]
    by: CustomFontScalarFieldEnum[] | CustomFontScalarFieldEnum
    having?: CustomFontScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomFontCountAggregateInputType | true
    _min?: CustomFontMinAggregateInputType
    _max?: CustomFontMaxAggregateInputType
  }

  export type CustomFontGroupByOutputType = {
    id: string
    name: string
    family: string
    url: string
    provider: string
    createdAt: Date
    _count: CustomFontCountAggregateOutputType | null
    _min: CustomFontMinAggregateOutputType | null
    _max: CustomFontMaxAggregateOutputType | null
  }

  type GetCustomFontGroupByPayload<T extends CustomFontGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomFontGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomFontGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomFontGroupByOutputType[P]>
            : GetScalarType<T[P], CustomFontGroupByOutputType[P]>
        }
      >
    >


  export type CustomFontSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    family?: boolean
    url?: boolean
    provider?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customFont"]>

  export type CustomFontSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    family?: boolean
    url?: boolean
    provider?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customFont"]>

  export type CustomFontSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    family?: boolean
    url?: boolean
    provider?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customFont"]>

  export type CustomFontSelectScalar = {
    id?: boolean
    name?: boolean
    family?: boolean
    url?: boolean
    provider?: boolean
    createdAt?: boolean
  }

  export type CustomFontOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "family" | "url" | "provider" | "createdAt", ExtArgs["result"]["customFont"]>

  export type $CustomFontPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CustomFont"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      family: string
      url: string
      provider: string
      createdAt: Date
    }, ExtArgs["result"]["customFont"]>
    composites: {}
  }

  type CustomFontGetPayload<S extends boolean | null | undefined | CustomFontDefaultArgs> = $Result.GetResult<Prisma.$CustomFontPayload, S>

  type CustomFontCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomFontFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomFontCountAggregateInputType | true
    }

  export interface CustomFontDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CustomFont'], meta: { name: 'CustomFont' } }
    /**
     * Find zero or one CustomFont that matches the filter.
     * @param {CustomFontFindUniqueArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomFontFindUniqueArgs>(args: SelectSubset<T, CustomFontFindUniqueArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CustomFont that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomFontFindUniqueOrThrowArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomFontFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomFontFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomFont that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontFindFirstArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomFontFindFirstArgs>(args?: SelectSubset<T, CustomFontFindFirstArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CustomFont that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontFindFirstOrThrowArgs} args - Arguments to find a CustomFont
     * @example
     * // Get one CustomFont
     * const customFont = await prisma.customFont.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomFontFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomFontFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CustomFonts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CustomFonts
     * const customFonts = await prisma.customFont.findMany()
     * 
     * // Get first 10 CustomFonts
     * const customFonts = await prisma.customFont.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customFontWithIdOnly = await prisma.customFont.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomFontFindManyArgs>(args?: SelectSubset<T, CustomFontFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CustomFont.
     * @param {CustomFontCreateArgs} args - Arguments to create a CustomFont.
     * @example
     * // Create one CustomFont
     * const CustomFont = await prisma.customFont.create({
     *   data: {
     *     // ... data to create a CustomFont
     *   }
     * })
     * 
     */
    create<T extends CustomFontCreateArgs>(args: SelectSubset<T, CustomFontCreateArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CustomFonts.
     * @param {CustomFontCreateManyArgs} args - Arguments to create many CustomFonts.
     * @example
     * // Create many CustomFonts
     * const customFont = await prisma.customFont.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomFontCreateManyArgs>(args?: SelectSubset<T, CustomFontCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CustomFonts and returns the data saved in the database.
     * @param {CustomFontCreateManyAndReturnArgs} args - Arguments to create many CustomFonts.
     * @example
     * // Create many CustomFonts
     * const customFont = await prisma.customFont.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CustomFonts and only return the `id`
     * const customFontWithIdOnly = await prisma.customFont.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomFontCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomFontCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CustomFont.
     * @param {CustomFontDeleteArgs} args - Arguments to delete one CustomFont.
     * @example
     * // Delete one CustomFont
     * const CustomFont = await prisma.customFont.delete({
     *   where: {
     *     // ... filter to delete one CustomFont
     *   }
     * })
     * 
     */
    delete<T extends CustomFontDeleteArgs>(args: SelectSubset<T, CustomFontDeleteArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CustomFont.
     * @param {CustomFontUpdateArgs} args - Arguments to update one CustomFont.
     * @example
     * // Update one CustomFont
     * const customFont = await prisma.customFont.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomFontUpdateArgs>(args: SelectSubset<T, CustomFontUpdateArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CustomFonts.
     * @param {CustomFontDeleteManyArgs} args - Arguments to filter CustomFonts to delete.
     * @example
     * // Delete a few CustomFonts
     * const { count } = await prisma.customFont.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomFontDeleteManyArgs>(args?: SelectSubset<T, CustomFontDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFonts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CustomFonts
     * const customFont = await prisma.customFont.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomFontUpdateManyArgs>(args: SelectSubset<T, CustomFontUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CustomFonts and returns the data updated in the database.
     * @param {CustomFontUpdateManyAndReturnArgs} args - Arguments to update many CustomFonts.
     * @example
     * // Update many CustomFonts
     * const customFont = await prisma.customFont.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CustomFonts and only return the `id`
     * const customFontWithIdOnly = await prisma.customFont.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomFontUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomFontUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CustomFont.
     * @param {CustomFontUpsertArgs} args - Arguments to update or create a CustomFont.
     * @example
     * // Update or create a CustomFont
     * const customFont = await prisma.customFont.upsert({
     *   create: {
     *     // ... data to create a CustomFont
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CustomFont we want to update
     *   }
     * })
     */
    upsert<T extends CustomFontUpsertArgs>(args: SelectSubset<T, CustomFontUpsertArgs<ExtArgs>>): Prisma__CustomFontClient<$Result.GetResult<Prisma.$CustomFontPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CustomFonts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontCountArgs} args - Arguments to filter CustomFonts to count.
     * @example
     * // Count the number of CustomFonts
     * const count = await prisma.customFont.count({
     *   where: {
     *     // ... the filter for the CustomFonts we want to count
     *   }
     * })
    **/
    count<T extends CustomFontCountArgs>(
      args?: Subset<T, CustomFontCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomFontCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CustomFont.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomFontAggregateArgs>(args: Subset<T, CustomFontAggregateArgs>): Prisma.PrismaPromise<GetCustomFontAggregateType<T>>

    /**
     * Group by CustomFont.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomFontGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomFontGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomFontGroupByArgs['orderBy'] }
        : { orderBy?: CustomFontGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomFontGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomFontGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CustomFont model
   */
  readonly fields: CustomFontFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CustomFont.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomFontClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CustomFont model
   */
  interface CustomFontFieldRefs {
    readonly id: FieldRef<"CustomFont", 'String'>
    readonly name: FieldRef<"CustomFont", 'String'>
    readonly family: FieldRef<"CustomFont", 'String'>
    readonly url: FieldRef<"CustomFont", 'String'>
    readonly provider: FieldRef<"CustomFont", 'String'>
    readonly createdAt: FieldRef<"CustomFont", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CustomFont findUnique
   */
  export type CustomFontFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont findUniqueOrThrow
   */
  export type CustomFontFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont findFirst
   */
  export type CustomFontFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFonts.
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFonts.
     */
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * CustomFont findFirstOrThrow
   */
  export type CustomFontFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Filter, which CustomFont to fetch.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CustomFonts.
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CustomFonts.
     */
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * CustomFont findMany
   */
  export type CustomFontFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Filter, which CustomFonts to fetch.
     */
    where?: CustomFontWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CustomFonts to fetch.
     */
    orderBy?: CustomFontOrderByWithRelationInput | CustomFontOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CustomFonts.
     */
    cursor?: CustomFontWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CustomFonts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CustomFonts.
     */
    skip?: number
    distinct?: CustomFontScalarFieldEnum | CustomFontScalarFieldEnum[]
  }

  /**
   * CustomFont create
   */
  export type CustomFontCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The data needed to create a CustomFont.
     */
    data: XOR<CustomFontCreateInput, CustomFontUncheckedCreateInput>
  }

  /**
   * CustomFont createMany
   */
  export type CustomFontCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CustomFonts.
     */
    data: CustomFontCreateManyInput | CustomFontCreateManyInput[]
  }

  /**
   * CustomFont createManyAndReturn
   */
  export type CustomFontCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The data used to create many CustomFonts.
     */
    data: CustomFontCreateManyInput | CustomFontCreateManyInput[]
  }

  /**
   * CustomFont update
   */
  export type CustomFontUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The data needed to update a CustomFont.
     */
    data: XOR<CustomFontUpdateInput, CustomFontUncheckedUpdateInput>
    /**
     * Choose, which CustomFont to update.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont updateMany
   */
  export type CustomFontUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CustomFonts.
     */
    data: XOR<CustomFontUpdateManyMutationInput, CustomFontUncheckedUpdateManyInput>
    /**
     * Filter which CustomFonts to update
     */
    where?: CustomFontWhereInput
    /**
     * Limit how many CustomFonts to update.
     */
    limit?: number
  }

  /**
   * CustomFont updateManyAndReturn
   */
  export type CustomFontUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The data used to update CustomFonts.
     */
    data: XOR<CustomFontUpdateManyMutationInput, CustomFontUncheckedUpdateManyInput>
    /**
     * Filter which CustomFonts to update
     */
    where?: CustomFontWhereInput
    /**
     * Limit how many CustomFonts to update.
     */
    limit?: number
  }

  /**
   * CustomFont upsert
   */
  export type CustomFontUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * The filter to search for the CustomFont to update in case it exists.
     */
    where: CustomFontWhereUniqueInput
    /**
     * In case the CustomFont found by the `where` argument doesn't exist, create a new CustomFont with this data.
     */
    create: XOR<CustomFontCreateInput, CustomFontUncheckedCreateInput>
    /**
     * In case the CustomFont was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomFontUpdateInput, CustomFontUncheckedUpdateInput>
  }

  /**
   * CustomFont delete
   */
  export type CustomFontDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
    /**
     * Filter which CustomFont to delete.
     */
    where: CustomFontWhereUniqueInput
  }

  /**
   * CustomFont deleteMany
   */
  export type CustomFontDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CustomFonts to delete
     */
    where?: CustomFontWhereInput
    /**
     * Limit how many CustomFonts to delete.
     */
    limit?: number
  }

  /**
   * CustomFont without action
   */
  export type CustomFontDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFont
     */
    select?: CustomFontSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CustomFont
     */
    omit?: CustomFontOmit<ExtArgs> | null
  }


  /**
   * Model Todo
   */

  export type AggregateTodo = {
    _count: TodoCountAggregateOutputType | null
    _min: TodoMinAggregateOutputType | null
    _max: TodoMaxAggregateOutputType | null
  }

  export type TodoMinAggregateOutputType = {
    id: string | null
    text: string | null
    done: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TodoMaxAggregateOutputType = {
    id: string | null
    text: string | null
    done: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TodoCountAggregateOutputType = {
    id: number
    text: number
    done: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TodoMinAggregateInputType = {
    id?: true
    text?: true
    done?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TodoMaxAggregateInputType = {
    id?: true
    text?: true
    done?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TodoCountAggregateInputType = {
    id?: true
    text?: true
    done?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TodoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Todo to aggregate.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Todos
    **/
    _count?: true | TodoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TodoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TodoMaxAggregateInputType
  }

  export type GetTodoAggregateType<T extends TodoAggregateArgs> = {
        [P in keyof T & keyof AggregateTodo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodo[P]>
      : GetScalarType<T[P], AggregateTodo[P]>
  }




  export type TodoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TodoWhereInput
    orderBy?: TodoOrderByWithAggregationInput | TodoOrderByWithAggregationInput[]
    by: TodoScalarFieldEnum[] | TodoScalarFieldEnum
    having?: TodoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TodoCountAggregateInputType | true
    _min?: TodoMinAggregateInputType
    _max?: TodoMaxAggregateInputType
  }

  export type TodoGroupByOutputType = {
    id: string
    text: string
    done: boolean
    createdAt: Date
    updatedAt: Date
    _count: TodoCountAggregateOutputType | null
    _min: TodoMinAggregateOutputType | null
    _max: TodoMaxAggregateOutputType | null
  }

  type GetTodoGroupByPayload<T extends TodoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TodoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TodoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TodoGroupByOutputType[P]>
            : GetScalarType<T[P], TodoGroupByOutputType[P]>
        }
      >
    >


  export type TodoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    done?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    done?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    done?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["todo"]>

  export type TodoSelectScalar = {
    id?: boolean
    text?: boolean
    done?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TodoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "done" | "createdAt" | "updatedAt", ExtArgs["result"]["todo"]>

  export type $TodoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Todo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      text: string
      done: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["todo"]>
    composites: {}
  }

  type TodoGetPayload<S extends boolean | null | undefined | TodoDefaultArgs> = $Result.GetResult<Prisma.$TodoPayload, S>

  type TodoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TodoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TodoCountAggregateInputType | true
    }

  export interface TodoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Todo'], meta: { name: 'Todo' } }
    /**
     * Find zero or one Todo that matches the filter.
     * @param {TodoFindUniqueArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TodoFindUniqueArgs>(args: SelectSubset<T, TodoFindUniqueArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Todo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TodoFindUniqueOrThrowArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TodoFindUniqueOrThrowArgs>(args: SelectSubset<T, TodoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindFirstArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TodoFindFirstArgs>(args?: SelectSubset<T, TodoFindFirstArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Todo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindFirstOrThrowArgs} args - Arguments to find a Todo
     * @example
     * // Get one Todo
     * const todo = await prisma.todo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TodoFindFirstOrThrowArgs>(args?: SelectSubset<T, TodoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Todos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Todos
     * const todos = await prisma.todo.findMany()
     * 
     * // Get first 10 Todos
     * const todos = await prisma.todo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const todoWithIdOnly = await prisma.todo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TodoFindManyArgs>(args?: SelectSubset<T, TodoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Todo.
     * @param {TodoCreateArgs} args - Arguments to create a Todo.
     * @example
     * // Create one Todo
     * const Todo = await prisma.todo.create({
     *   data: {
     *     // ... data to create a Todo
     *   }
     * })
     * 
     */
    create<T extends TodoCreateArgs>(args: SelectSubset<T, TodoCreateArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Todos.
     * @param {TodoCreateManyArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todo = await prisma.todo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TodoCreateManyArgs>(args?: SelectSubset<T, TodoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Todos and returns the data saved in the database.
     * @param {TodoCreateManyAndReturnArgs} args - Arguments to create many Todos.
     * @example
     * // Create many Todos
     * const todo = await prisma.todo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Todos and only return the `id`
     * const todoWithIdOnly = await prisma.todo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TodoCreateManyAndReturnArgs>(args?: SelectSubset<T, TodoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Todo.
     * @param {TodoDeleteArgs} args - Arguments to delete one Todo.
     * @example
     * // Delete one Todo
     * const Todo = await prisma.todo.delete({
     *   where: {
     *     // ... filter to delete one Todo
     *   }
     * })
     * 
     */
    delete<T extends TodoDeleteArgs>(args: SelectSubset<T, TodoDeleteArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Todo.
     * @param {TodoUpdateArgs} args - Arguments to update one Todo.
     * @example
     * // Update one Todo
     * const todo = await prisma.todo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TodoUpdateArgs>(args: SelectSubset<T, TodoUpdateArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Todos.
     * @param {TodoDeleteManyArgs} args - Arguments to filter Todos to delete.
     * @example
     * // Delete a few Todos
     * const { count } = await prisma.todo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TodoDeleteManyArgs>(args?: SelectSubset<T, TodoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TodoUpdateManyArgs>(args: SelectSubset<T, TodoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Todos and returns the data updated in the database.
     * @param {TodoUpdateManyAndReturnArgs} args - Arguments to update many Todos.
     * @example
     * // Update many Todos
     * const todo = await prisma.todo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Todos and only return the `id`
     * const todoWithIdOnly = await prisma.todo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TodoUpdateManyAndReturnArgs>(args: SelectSubset<T, TodoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Todo.
     * @param {TodoUpsertArgs} args - Arguments to update or create a Todo.
     * @example
     * // Update or create a Todo
     * const todo = await prisma.todo.upsert({
     *   create: {
     *     // ... data to create a Todo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Todo we want to update
     *   }
     * })
     */
    upsert<T extends TodoUpsertArgs>(args: SelectSubset<T, TodoUpsertArgs<ExtArgs>>): Prisma__TodoClient<$Result.GetResult<Prisma.$TodoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Todos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoCountArgs} args - Arguments to filter Todos to count.
     * @example
     * // Count the number of Todos
     * const count = await prisma.todo.count({
     *   where: {
     *     // ... the filter for the Todos we want to count
     *   }
     * })
    **/
    count<T extends TodoCountArgs>(
      args?: Subset<T, TodoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TodoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Todo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TodoAggregateArgs>(args: Subset<T, TodoAggregateArgs>): Prisma.PrismaPromise<GetTodoAggregateType<T>>

    /**
     * Group by Todo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TodoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TodoGroupByArgs['orderBy'] }
        : { orderBy?: TodoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TodoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTodoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Todo model
   */
  readonly fields: TodoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Todo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TodoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Todo model
   */
  interface TodoFieldRefs {
    readonly id: FieldRef<"Todo", 'String'>
    readonly text: FieldRef<"Todo", 'String'>
    readonly done: FieldRef<"Todo", 'Boolean'>
    readonly createdAt: FieldRef<"Todo", 'DateTime'>
    readonly updatedAt: FieldRef<"Todo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Todo findUnique
   */
  export type TodoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo findUniqueOrThrow
   */
  export type TodoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo findFirst
   */
  export type TodoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Todos.
     */
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo findFirstOrThrow
   */
  export type TodoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todo to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Todos.
     */
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo findMany
   */
  export type TodoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter, which Todos to fetch.
     */
    where?: TodoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Todos to fetch.
     */
    orderBy?: TodoOrderByWithRelationInput | TodoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Todos.
     */
    cursor?: TodoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Todos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Todos.
     */
    skip?: number
    distinct?: TodoScalarFieldEnum | TodoScalarFieldEnum[]
  }

  /**
   * Todo create
   */
  export type TodoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data needed to create a Todo.
     */
    data: XOR<TodoCreateInput, TodoUncheckedCreateInput>
  }

  /**
   * Todo createMany
   */
  export type TodoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Todos.
     */
    data: TodoCreateManyInput | TodoCreateManyInput[]
  }

  /**
   * Todo createManyAndReturn
   */
  export type TodoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data used to create many Todos.
     */
    data: TodoCreateManyInput | TodoCreateManyInput[]
  }

  /**
   * Todo update
   */
  export type TodoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data needed to update a Todo.
     */
    data: XOR<TodoUpdateInput, TodoUncheckedUpdateInput>
    /**
     * Choose, which Todo to update.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo updateMany
   */
  export type TodoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Todos.
     */
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyInput>
    /**
     * Filter which Todos to update
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to update.
     */
    limit?: number
  }

  /**
   * Todo updateManyAndReturn
   */
  export type TodoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The data used to update Todos.
     */
    data: XOR<TodoUpdateManyMutationInput, TodoUncheckedUpdateManyInput>
    /**
     * Filter which Todos to update
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to update.
     */
    limit?: number
  }

  /**
   * Todo upsert
   */
  export type TodoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * The filter to search for the Todo to update in case it exists.
     */
    where: TodoWhereUniqueInput
    /**
     * In case the Todo found by the `where` argument doesn't exist, create a new Todo with this data.
     */
    create: XOR<TodoCreateInput, TodoUncheckedCreateInput>
    /**
     * In case the Todo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TodoUpdateInput, TodoUncheckedUpdateInput>
  }

  /**
   * Todo delete
   */
  export type TodoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
    /**
     * Filter which Todo to delete.
     */
    where: TodoWhereUniqueInput
  }

  /**
   * Todo deleteMany
   */
  export type TodoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Todos to delete
     */
    where?: TodoWhereInput
    /**
     * Limit how many Todos to delete.
     */
    limit?: number
  }

  /**
   * Todo without action
   */
  export type TodoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Todo
     */
    select?: TodoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Todo
     */
    omit?: TodoOmit<ExtArgs> | null
  }


  /**
   * Model Countdown
   */

  export type AggregateCountdown = {
    _count: CountdownCountAggregateOutputType | null
    _min: CountdownMinAggregateOutputType | null
    _max: CountdownMaxAggregateOutputType | null
  }

  export type CountdownMinAggregateOutputType = {
    id: string | null
    label: string | null
    date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountdownMaxAggregateOutputType = {
    id: string | null
    label: string | null
    date: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CountdownCountAggregateOutputType = {
    id: number
    label: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CountdownMinAggregateInputType = {
    id?: true
    label?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountdownMaxAggregateInputType = {
    id?: true
    label?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CountdownCountAggregateInputType = {
    id?: true
    label?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CountdownAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countdown to aggregate.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countdowns
    **/
    _count?: true | CountdownCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountdownMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountdownMaxAggregateInputType
  }

  export type GetCountdownAggregateType<T extends CountdownAggregateArgs> = {
        [P in keyof T & keyof AggregateCountdown]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountdown[P]>
      : GetScalarType<T[P], AggregateCountdown[P]>
  }




  export type CountdownGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountdownWhereInput
    orderBy?: CountdownOrderByWithAggregationInput | CountdownOrderByWithAggregationInput[]
    by: CountdownScalarFieldEnum[] | CountdownScalarFieldEnum
    having?: CountdownScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountdownCountAggregateInputType | true
    _min?: CountdownMinAggregateInputType
    _max?: CountdownMaxAggregateInputType
  }

  export type CountdownGroupByOutputType = {
    id: string
    label: string
    date: string
    createdAt: Date
    updatedAt: Date
    _count: CountdownCountAggregateOutputType | null
    _min: CountdownMinAggregateOutputType | null
    _max: CountdownMaxAggregateOutputType | null
  }

  type GetCountdownGroupByPayload<T extends CountdownGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountdownGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountdownGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountdownGroupByOutputType[P]>
            : GetScalarType<T[P], CountdownGroupByOutputType[P]>
        }
      >
    >


  export type CountdownSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["countdown"]>

  export type CountdownSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["countdown"]>

  export type CountdownSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["countdown"]>

  export type CountdownSelectScalar = {
    id?: boolean
    label?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CountdownOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "label" | "date" | "createdAt" | "updatedAt", ExtArgs["result"]["countdown"]>

  export type $CountdownPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Countdown"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      date: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["countdown"]>
    composites: {}
  }

  type CountdownGetPayload<S extends boolean | null | undefined | CountdownDefaultArgs> = $Result.GetResult<Prisma.$CountdownPayload, S>

  type CountdownCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountdownFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountdownCountAggregateInputType | true
    }

  export interface CountdownDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Countdown'], meta: { name: 'Countdown' } }
    /**
     * Find zero or one Countdown that matches the filter.
     * @param {CountdownFindUniqueArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountdownFindUniqueArgs>(args: SelectSubset<T, CountdownFindUniqueArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Countdown that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountdownFindUniqueOrThrowArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountdownFindUniqueOrThrowArgs>(args: SelectSubset<T, CountdownFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Countdown that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownFindFirstArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountdownFindFirstArgs>(args?: SelectSubset<T, CountdownFindFirstArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Countdown that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownFindFirstOrThrowArgs} args - Arguments to find a Countdown
     * @example
     * // Get one Countdown
     * const countdown = await prisma.countdown.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountdownFindFirstOrThrowArgs>(args?: SelectSubset<T, CountdownFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Countdowns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countdowns
     * const countdowns = await prisma.countdown.findMany()
     * 
     * // Get first 10 Countdowns
     * const countdowns = await prisma.countdown.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const countdownWithIdOnly = await prisma.countdown.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CountdownFindManyArgs>(args?: SelectSubset<T, CountdownFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Countdown.
     * @param {CountdownCreateArgs} args - Arguments to create a Countdown.
     * @example
     * // Create one Countdown
     * const Countdown = await prisma.countdown.create({
     *   data: {
     *     // ... data to create a Countdown
     *   }
     * })
     * 
     */
    create<T extends CountdownCreateArgs>(args: SelectSubset<T, CountdownCreateArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Countdowns.
     * @param {CountdownCreateManyArgs} args - Arguments to create many Countdowns.
     * @example
     * // Create many Countdowns
     * const countdown = await prisma.countdown.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountdownCreateManyArgs>(args?: SelectSubset<T, CountdownCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countdowns and returns the data saved in the database.
     * @param {CountdownCreateManyAndReturnArgs} args - Arguments to create many Countdowns.
     * @example
     * // Create many Countdowns
     * const countdown = await prisma.countdown.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countdowns and only return the `id`
     * const countdownWithIdOnly = await prisma.countdown.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountdownCreateManyAndReturnArgs>(args?: SelectSubset<T, CountdownCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Countdown.
     * @param {CountdownDeleteArgs} args - Arguments to delete one Countdown.
     * @example
     * // Delete one Countdown
     * const Countdown = await prisma.countdown.delete({
     *   where: {
     *     // ... filter to delete one Countdown
     *   }
     * })
     * 
     */
    delete<T extends CountdownDeleteArgs>(args: SelectSubset<T, CountdownDeleteArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Countdown.
     * @param {CountdownUpdateArgs} args - Arguments to update one Countdown.
     * @example
     * // Update one Countdown
     * const countdown = await prisma.countdown.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountdownUpdateArgs>(args: SelectSubset<T, CountdownUpdateArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Countdowns.
     * @param {CountdownDeleteManyArgs} args - Arguments to filter Countdowns to delete.
     * @example
     * // Delete a few Countdowns
     * const { count } = await prisma.countdown.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountdownDeleteManyArgs>(args?: SelectSubset<T, CountdownDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countdowns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countdowns
     * const countdown = await prisma.countdown.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountdownUpdateManyArgs>(args: SelectSubset<T, CountdownUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countdowns and returns the data updated in the database.
     * @param {CountdownUpdateManyAndReturnArgs} args - Arguments to update many Countdowns.
     * @example
     * // Update many Countdowns
     * const countdown = await prisma.countdown.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countdowns and only return the `id`
     * const countdownWithIdOnly = await prisma.countdown.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CountdownUpdateManyAndReturnArgs>(args: SelectSubset<T, CountdownUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Countdown.
     * @param {CountdownUpsertArgs} args - Arguments to update or create a Countdown.
     * @example
     * // Update or create a Countdown
     * const countdown = await prisma.countdown.upsert({
     *   create: {
     *     // ... data to create a Countdown
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Countdown we want to update
     *   }
     * })
     */
    upsert<T extends CountdownUpsertArgs>(args: SelectSubset<T, CountdownUpsertArgs<ExtArgs>>): Prisma__CountdownClient<$Result.GetResult<Prisma.$CountdownPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Countdowns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownCountArgs} args - Arguments to filter Countdowns to count.
     * @example
     * // Count the number of Countdowns
     * const count = await prisma.countdown.count({
     *   where: {
     *     // ... the filter for the Countdowns we want to count
     *   }
     * })
    **/
    count<T extends CountdownCountArgs>(
      args?: Subset<T, CountdownCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountdownCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Countdown.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountdownAggregateArgs>(args: Subset<T, CountdownAggregateArgs>): Prisma.PrismaPromise<GetCountdownAggregateType<T>>

    /**
     * Group by Countdown.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountdownGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountdownGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountdownGroupByArgs['orderBy'] }
        : { orderBy?: CountdownGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountdownGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountdownGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Countdown model
   */
  readonly fields: CountdownFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Countdown.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountdownClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Countdown model
   */
  interface CountdownFieldRefs {
    readonly id: FieldRef<"Countdown", 'String'>
    readonly label: FieldRef<"Countdown", 'String'>
    readonly date: FieldRef<"Countdown", 'String'>
    readonly createdAt: FieldRef<"Countdown", 'DateTime'>
    readonly updatedAt: FieldRef<"Countdown", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Countdown findUnique
   */
  export type CountdownFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown findUniqueOrThrow
   */
  export type CountdownFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown findFirst
   */
  export type CountdownFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countdowns.
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countdowns.
     */
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * Countdown findFirstOrThrow
   */
  export type CountdownFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Filter, which Countdown to fetch.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countdowns.
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countdowns.
     */
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * Countdown findMany
   */
  export type CountdownFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Filter, which Countdowns to fetch.
     */
    where?: CountdownWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countdowns to fetch.
     */
    orderBy?: CountdownOrderByWithRelationInput | CountdownOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countdowns.
     */
    cursor?: CountdownWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countdowns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countdowns.
     */
    skip?: number
    distinct?: CountdownScalarFieldEnum | CountdownScalarFieldEnum[]
  }

  /**
   * Countdown create
   */
  export type CountdownCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The data needed to create a Countdown.
     */
    data: XOR<CountdownCreateInput, CountdownUncheckedCreateInput>
  }

  /**
   * Countdown createMany
   */
  export type CountdownCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Countdowns.
     */
    data: CountdownCreateManyInput | CountdownCreateManyInput[]
  }

  /**
   * Countdown createManyAndReturn
   */
  export type CountdownCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The data used to create many Countdowns.
     */
    data: CountdownCreateManyInput | CountdownCreateManyInput[]
  }

  /**
   * Countdown update
   */
  export type CountdownUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The data needed to update a Countdown.
     */
    data: XOR<CountdownUpdateInput, CountdownUncheckedUpdateInput>
    /**
     * Choose, which Countdown to update.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown updateMany
   */
  export type CountdownUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Countdowns.
     */
    data: XOR<CountdownUpdateManyMutationInput, CountdownUncheckedUpdateManyInput>
    /**
     * Filter which Countdowns to update
     */
    where?: CountdownWhereInput
    /**
     * Limit how many Countdowns to update.
     */
    limit?: number
  }

  /**
   * Countdown updateManyAndReturn
   */
  export type CountdownUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The data used to update Countdowns.
     */
    data: XOR<CountdownUpdateManyMutationInput, CountdownUncheckedUpdateManyInput>
    /**
     * Filter which Countdowns to update
     */
    where?: CountdownWhereInput
    /**
     * Limit how many Countdowns to update.
     */
    limit?: number
  }

  /**
   * Countdown upsert
   */
  export type CountdownUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * The filter to search for the Countdown to update in case it exists.
     */
    where: CountdownWhereUniqueInput
    /**
     * In case the Countdown found by the `where` argument doesn't exist, create a new Countdown with this data.
     */
    create: XOR<CountdownCreateInput, CountdownUncheckedCreateInput>
    /**
     * In case the Countdown was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountdownUpdateInput, CountdownUncheckedUpdateInput>
  }

  /**
   * Countdown delete
   */
  export type CountdownDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
    /**
     * Filter which Countdown to delete.
     */
    where: CountdownWhereUniqueInput
  }

  /**
   * Countdown deleteMany
   */
  export type CountdownDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countdowns to delete
     */
    where?: CountdownWhereInput
    /**
     * Limit how many Countdowns to delete.
     */
    limit?: number
  }

  /**
   * Countdown without action
   */
  export type CountdownDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Countdown
     */
    select?: CountdownSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Countdown
     */
    omit?: CountdownOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SiteScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    desc: 'desc',
    category: 'category',
    color: 'color',
    icon: 'icon',
    iconType: 'iconType',
    customIconUrl: 'customIconUrl',
    titleFont: 'titleFont',
    descFont: 'descFont',
    titleColor: 'titleColor',
    descColor: 'descColor',
    titleSize: 'titleSize',
    descSize: 'descSize',
    isHidden: 'isHidden',
    order: 'order',
    type: 'type',
    parentId: 'parentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SiteScalarFieldEnum = (typeof SiteScalarFieldEnum)[keyof typeof SiteScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    isHidden: 'isHidden',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const UserScalarFieldEnum: {
    username: 'username',
    passwordHash: 'passwordHash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GlobalSettingsScalarFieldEnum: {
    id: 'id',
    layout: 'layout',
    config: 'config',
    theme: 'theme',
    searchEngine: 'searchEngine',
    bingCacheMode: 'bingCacheMode',
    privatePasswordHash: 'privatePasswordHash',
    updatedAt: 'updatedAt'
  };

  export type GlobalSettingsScalarFieldEnum = (typeof GlobalSettingsScalarFieldEnum)[keyof typeof GlobalSettingsScalarFieldEnum]


  export const WallpaperScalarFieldEnum: {
    id: 'id',
    url: 'url',
    type: 'type',
    filename: 'filename',
    size: 'size',
    createdAt: 'createdAt'
  };

  export type WallpaperScalarFieldEnum = (typeof WallpaperScalarFieldEnum)[keyof typeof WallpaperScalarFieldEnum]


  export const CustomFontScalarFieldEnum: {
    id: 'id',
    name: 'name',
    family: 'family',
    url: 'url',
    provider: 'provider',
    createdAt: 'createdAt'
  };

  export type CustomFontScalarFieldEnum = (typeof CustomFontScalarFieldEnum)[keyof typeof CustomFontScalarFieldEnum]


  export const TodoScalarFieldEnum: {
    id: 'id',
    text: 'text',
    done: 'done',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TodoScalarFieldEnum = (typeof TodoScalarFieldEnum)[keyof typeof TodoScalarFieldEnum]


  export const CountdownScalarFieldEnum: {
    id: 'id',
    label: 'label',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CountdownScalarFieldEnum = (typeof CountdownScalarFieldEnum)[keyof typeof CountdownScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SiteWhereInput = {
    AND?: SiteWhereInput | SiteWhereInput[]
    OR?: SiteWhereInput[]
    NOT?: SiteWhereInput | SiteWhereInput[]
    id?: StringFilter<"Site"> | string
    name?: StringFilter<"Site"> | string
    url?: StringFilter<"Site"> | string
    desc?: StringNullableFilter<"Site"> | string | null
    category?: StringFilter<"Site"> | string
    color?: StringNullableFilter<"Site"> | string | null
    icon?: StringNullableFilter<"Site"> | string | null
    iconType?: StringNullableFilter<"Site"> | string | null
    customIconUrl?: StringNullableFilter<"Site"> | string | null
    titleFont?: StringNullableFilter<"Site"> | string | null
    descFont?: StringNullableFilter<"Site"> | string | null
    titleColor?: StringNullableFilter<"Site"> | string | null
    descColor?: StringNullableFilter<"Site"> | string | null
    titleSize?: IntNullableFilter<"Site"> | number | null
    descSize?: IntNullableFilter<"Site"> | number | null
    isHidden?: BoolFilter<"Site"> | boolean
    order?: IntFilter<"Site"> | number
    type?: StringFilter<"Site"> | string
    parentId?: StringNullableFilter<"Site"> | string | null
    createdAt?: DateTimeFilter<"Site"> | Date | string
    updatedAt?: DateTimeFilter<"Site"> | Date | string
  }

  export type SiteOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    desc?: SortOrderInput | SortOrder
    category?: SortOrder
    color?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    iconType?: SortOrderInput | SortOrder
    customIconUrl?: SortOrderInput | SortOrder
    titleFont?: SortOrderInput | SortOrder
    descFont?: SortOrderInput | SortOrder
    titleColor?: SortOrderInput | SortOrder
    descColor?: SortOrderInput | SortOrder
    titleSize?: SortOrderInput | SortOrder
    descSize?: SortOrderInput | SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    type?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SiteWhereInput | SiteWhereInput[]
    OR?: SiteWhereInput[]
    NOT?: SiteWhereInput | SiteWhereInput[]
    name?: StringFilter<"Site"> | string
    url?: StringFilter<"Site"> | string
    desc?: StringNullableFilter<"Site"> | string | null
    category?: StringFilter<"Site"> | string
    color?: StringNullableFilter<"Site"> | string | null
    icon?: StringNullableFilter<"Site"> | string | null
    iconType?: StringNullableFilter<"Site"> | string | null
    customIconUrl?: StringNullableFilter<"Site"> | string | null
    titleFont?: StringNullableFilter<"Site"> | string | null
    descFont?: StringNullableFilter<"Site"> | string | null
    titleColor?: StringNullableFilter<"Site"> | string | null
    descColor?: StringNullableFilter<"Site"> | string | null
    titleSize?: IntNullableFilter<"Site"> | number | null
    descSize?: IntNullableFilter<"Site"> | number | null
    isHidden?: BoolFilter<"Site"> | boolean
    order?: IntFilter<"Site"> | number
    type?: StringFilter<"Site"> | string
    parentId?: StringNullableFilter<"Site"> | string | null
    createdAt?: DateTimeFilter<"Site"> | Date | string
    updatedAt?: DateTimeFilter<"Site"> | Date | string
  }, "id">

  export type SiteOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    desc?: SortOrderInput | SortOrder
    category?: SortOrder
    color?: SortOrderInput | SortOrder
    icon?: SortOrderInput | SortOrder
    iconType?: SortOrderInput | SortOrder
    customIconUrl?: SortOrderInput | SortOrder
    titleFont?: SortOrderInput | SortOrder
    descFont?: SortOrderInput | SortOrder
    titleColor?: SortOrderInput | SortOrder
    descColor?: SortOrderInput | SortOrder
    titleSize?: SortOrderInput | SortOrder
    descSize?: SortOrderInput | SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    type?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteCountOrderByAggregateInput
    _avg?: SiteAvgOrderByAggregateInput
    _max?: SiteMaxOrderByAggregateInput
    _min?: SiteMinOrderByAggregateInput
    _sum?: SiteSumOrderByAggregateInput
  }

  export type SiteScalarWhereWithAggregatesInput = {
    AND?: SiteScalarWhereWithAggregatesInput | SiteScalarWhereWithAggregatesInput[]
    OR?: SiteScalarWhereWithAggregatesInput[]
    NOT?: SiteScalarWhereWithAggregatesInput | SiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Site"> | string
    name?: StringWithAggregatesFilter<"Site"> | string
    url?: StringWithAggregatesFilter<"Site"> | string
    desc?: StringNullableWithAggregatesFilter<"Site"> | string | null
    category?: StringWithAggregatesFilter<"Site"> | string
    color?: StringNullableWithAggregatesFilter<"Site"> | string | null
    icon?: StringNullableWithAggregatesFilter<"Site"> | string | null
    iconType?: StringNullableWithAggregatesFilter<"Site"> | string | null
    customIconUrl?: StringNullableWithAggregatesFilter<"Site"> | string | null
    titleFont?: StringNullableWithAggregatesFilter<"Site"> | string | null
    descFont?: StringNullableWithAggregatesFilter<"Site"> | string | null
    titleColor?: StringNullableWithAggregatesFilter<"Site"> | string | null
    descColor?: StringNullableWithAggregatesFilter<"Site"> | string | null
    titleSize?: IntNullableWithAggregatesFilter<"Site"> | number | null
    descSize?: IntNullableWithAggregatesFilter<"Site"> | number | null
    isHidden?: BoolWithAggregatesFilter<"Site"> | boolean
    order?: IntWithAggregatesFilter<"Site"> | number
    type?: StringWithAggregatesFilter<"Site"> | string
    parentId?: StringNullableWithAggregatesFilter<"Site"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Site"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Site"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    color?: StringNullableFilter<"Category"> | string | null
    isHidden?: BoolFilter<"Category"> | boolean
    order?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrderInput | SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    color?: StringNullableFilter<"Category"> | string | null
    isHidden?: BoolFilter<"Category"> | boolean
    order?: IntFilter<"Category"> | number
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrderInput | SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    color?: StringNullableWithAggregatesFilter<"Category"> | string | null
    isHidden?: BoolWithAggregatesFilter<"Category"> | boolean
    order?: IntWithAggregatesFilter<"Category"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    username?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "username">

  export type UserOrderByWithAggregationInput = {
    username?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type GlobalSettingsWhereInput = {
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    id?: IntFilter<"GlobalSettings"> | number
    layout?: StringFilter<"GlobalSettings"> | string
    config?: StringFilter<"GlobalSettings"> | string
    theme?: StringFilter<"GlobalSettings"> | string
    searchEngine?: StringFilter<"GlobalSettings"> | string
    bingCacheMode?: StringFilter<"GlobalSettings"> | string
    privatePasswordHash?: StringNullableFilter<"GlobalSettings"> | string | null
    updatedAt?: DateTimeFilter<"GlobalSettings"> | Date | string
  }

  export type GlobalSettingsOrderByWithRelationInput = {
    id?: SortOrder
    layout?: SortOrder
    config?: SortOrder
    theme?: SortOrder
    searchEngine?: SortOrder
    bingCacheMode?: SortOrder
    privatePasswordHash?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    OR?: GlobalSettingsWhereInput[]
    NOT?: GlobalSettingsWhereInput | GlobalSettingsWhereInput[]
    layout?: StringFilter<"GlobalSettings"> | string
    config?: StringFilter<"GlobalSettings"> | string
    theme?: StringFilter<"GlobalSettings"> | string
    searchEngine?: StringFilter<"GlobalSettings"> | string
    bingCacheMode?: StringFilter<"GlobalSettings"> | string
    privatePasswordHash?: StringNullableFilter<"GlobalSettings"> | string | null
    updatedAt?: DateTimeFilter<"GlobalSettings"> | Date | string
  }, "id">

  export type GlobalSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    layout?: SortOrder
    config?: SortOrder
    theme?: SortOrder
    searchEngine?: SortOrder
    bingCacheMode?: SortOrder
    privatePasswordHash?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: GlobalSettingsCountOrderByAggregateInput
    _avg?: GlobalSettingsAvgOrderByAggregateInput
    _max?: GlobalSettingsMaxOrderByAggregateInput
    _min?: GlobalSettingsMinOrderByAggregateInput
    _sum?: GlobalSettingsSumOrderByAggregateInput
  }

  export type GlobalSettingsScalarWhereWithAggregatesInput = {
    AND?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    OR?: GlobalSettingsScalarWhereWithAggregatesInput[]
    NOT?: GlobalSettingsScalarWhereWithAggregatesInput | GlobalSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GlobalSettings"> | number
    layout?: StringWithAggregatesFilter<"GlobalSettings"> | string
    config?: StringWithAggregatesFilter<"GlobalSettings"> | string
    theme?: StringWithAggregatesFilter<"GlobalSettings"> | string
    searchEngine?: StringWithAggregatesFilter<"GlobalSettings"> | string
    bingCacheMode?: StringWithAggregatesFilter<"GlobalSettings"> | string
    privatePasswordHash?: StringNullableWithAggregatesFilter<"GlobalSettings"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"GlobalSettings"> | Date | string
  }

  export type WallpaperWhereInput = {
    AND?: WallpaperWhereInput | WallpaperWhereInput[]
    OR?: WallpaperWhereInput[]
    NOT?: WallpaperWhereInput | WallpaperWhereInput[]
    id?: StringFilter<"Wallpaper"> | string
    url?: StringFilter<"Wallpaper"> | string
    type?: StringFilter<"Wallpaper"> | string
    filename?: StringFilter<"Wallpaper"> | string
    size?: IntNullableFilter<"Wallpaper"> | number | null
    createdAt?: DateTimeFilter<"Wallpaper"> | Date | string
  }

  export type WallpaperOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    size?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type WallpaperWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WallpaperWhereInput | WallpaperWhereInput[]
    OR?: WallpaperWhereInput[]
    NOT?: WallpaperWhereInput | WallpaperWhereInput[]
    url?: StringFilter<"Wallpaper"> | string
    type?: StringFilter<"Wallpaper"> | string
    filename?: StringFilter<"Wallpaper"> | string
    size?: IntNullableFilter<"Wallpaper"> | number | null
    createdAt?: DateTimeFilter<"Wallpaper"> | Date | string
  }, "id">

  export type WallpaperOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    size?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WallpaperCountOrderByAggregateInput
    _avg?: WallpaperAvgOrderByAggregateInput
    _max?: WallpaperMaxOrderByAggregateInput
    _min?: WallpaperMinOrderByAggregateInput
    _sum?: WallpaperSumOrderByAggregateInput
  }

  export type WallpaperScalarWhereWithAggregatesInput = {
    AND?: WallpaperScalarWhereWithAggregatesInput | WallpaperScalarWhereWithAggregatesInput[]
    OR?: WallpaperScalarWhereWithAggregatesInput[]
    NOT?: WallpaperScalarWhereWithAggregatesInput | WallpaperScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wallpaper"> | string
    url?: StringWithAggregatesFilter<"Wallpaper"> | string
    type?: StringWithAggregatesFilter<"Wallpaper"> | string
    filename?: StringWithAggregatesFilter<"Wallpaper"> | string
    size?: IntNullableWithAggregatesFilter<"Wallpaper"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Wallpaper"> | Date | string
  }

  export type CustomFontWhereInput = {
    AND?: CustomFontWhereInput | CustomFontWhereInput[]
    OR?: CustomFontWhereInput[]
    NOT?: CustomFontWhereInput | CustomFontWhereInput[]
    id?: StringFilter<"CustomFont"> | string
    name?: StringFilter<"CustomFont"> | string
    family?: StringFilter<"CustomFont"> | string
    url?: StringFilter<"CustomFont"> | string
    provider?: StringFilter<"CustomFont"> | string
    createdAt?: DateTimeFilter<"CustomFont"> | Date | string
  }

  export type CustomFontOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    family?: SortOrder
    url?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomFontWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomFontWhereInput | CustomFontWhereInput[]
    OR?: CustomFontWhereInput[]
    NOT?: CustomFontWhereInput | CustomFontWhereInput[]
    name?: StringFilter<"CustomFont"> | string
    family?: StringFilter<"CustomFont"> | string
    url?: StringFilter<"CustomFont"> | string
    provider?: StringFilter<"CustomFont"> | string
    createdAt?: DateTimeFilter<"CustomFont"> | Date | string
  }, "id">

  export type CustomFontOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    family?: SortOrder
    url?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
    _count?: CustomFontCountOrderByAggregateInput
    _max?: CustomFontMaxOrderByAggregateInput
    _min?: CustomFontMinOrderByAggregateInput
  }

  export type CustomFontScalarWhereWithAggregatesInput = {
    AND?: CustomFontScalarWhereWithAggregatesInput | CustomFontScalarWhereWithAggregatesInput[]
    OR?: CustomFontScalarWhereWithAggregatesInput[]
    NOT?: CustomFontScalarWhereWithAggregatesInput | CustomFontScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CustomFont"> | string
    name?: StringWithAggregatesFilter<"CustomFont"> | string
    family?: StringWithAggregatesFilter<"CustomFont"> | string
    url?: StringWithAggregatesFilter<"CustomFont"> | string
    provider?: StringWithAggregatesFilter<"CustomFont"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CustomFont"> | Date | string
  }

  export type TodoWhereInput = {
    AND?: TodoWhereInput | TodoWhereInput[]
    OR?: TodoWhereInput[]
    NOT?: TodoWhereInput | TodoWhereInput[]
    id?: StringFilter<"Todo"> | string
    text?: StringFilter<"Todo"> | string
    done?: BoolFilter<"Todo"> | boolean
    createdAt?: DateTimeFilter<"Todo"> | Date | string
    updatedAt?: DateTimeFilter<"Todo"> | Date | string
  }

  export type TodoOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TodoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TodoWhereInput | TodoWhereInput[]
    OR?: TodoWhereInput[]
    NOT?: TodoWhereInput | TodoWhereInput[]
    text?: StringFilter<"Todo"> | string
    done?: BoolFilter<"Todo"> | boolean
    createdAt?: DateTimeFilter<"Todo"> | Date | string
    updatedAt?: DateTimeFilter<"Todo"> | Date | string
  }, "id">

  export type TodoOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TodoCountOrderByAggregateInput
    _max?: TodoMaxOrderByAggregateInput
    _min?: TodoMinOrderByAggregateInput
  }

  export type TodoScalarWhereWithAggregatesInput = {
    AND?: TodoScalarWhereWithAggregatesInput | TodoScalarWhereWithAggregatesInput[]
    OR?: TodoScalarWhereWithAggregatesInput[]
    NOT?: TodoScalarWhereWithAggregatesInput | TodoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Todo"> | string
    text?: StringWithAggregatesFilter<"Todo"> | string
    done?: BoolWithAggregatesFilter<"Todo"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Todo"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Todo"> | Date | string
  }

  export type CountdownWhereInput = {
    AND?: CountdownWhereInput | CountdownWhereInput[]
    OR?: CountdownWhereInput[]
    NOT?: CountdownWhereInput | CountdownWhereInput[]
    id?: StringFilter<"Countdown"> | string
    label?: StringFilter<"Countdown"> | string
    date?: StringFilter<"Countdown"> | string
    createdAt?: DateTimeFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeFilter<"Countdown"> | Date | string
  }

  export type CountdownOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CountdownWhereInput | CountdownWhereInput[]
    OR?: CountdownWhereInput[]
    NOT?: CountdownWhereInput | CountdownWhereInput[]
    label?: StringFilter<"Countdown"> | string
    date?: StringFilter<"Countdown"> | string
    createdAt?: DateTimeFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeFilter<"Countdown"> | Date | string
  }, "id">

  export type CountdownOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CountdownCountOrderByAggregateInput
    _max?: CountdownMaxOrderByAggregateInput
    _min?: CountdownMinOrderByAggregateInput
  }

  export type CountdownScalarWhereWithAggregatesInput = {
    AND?: CountdownScalarWhereWithAggregatesInput | CountdownScalarWhereWithAggregatesInput[]
    OR?: CountdownScalarWhereWithAggregatesInput[]
    NOT?: CountdownScalarWhereWithAggregatesInput | CountdownScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Countdown"> | string
    label?: StringWithAggregatesFilter<"Countdown"> | string
    date?: StringWithAggregatesFilter<"Countdown"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Countdown"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Countdown"> | Date | string
  }

  export type SiteCreateInput = {
    id?: string
    name: string
    url: string
    desc?: string | null
    category: string
    color?: string | null
    icon?: string | null
    iconType?: string | null
    customIconUrl?: string | null
    titleFont?: string | null
    descFont?: string | null
    titleColor?: string | null
    descColor?: string | null
    titleSize?: number | null
    descSize?: number | null
    isHidden?: boolean
    order?: number
    type?: string
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    desc?: string | null
    category: string
    color?: string | null
    icon?: string | null
    iconType?: string | null
    customIconUrl?: string | null
    titleFont?: string | null
    descFont?: string | null
    titleColor?: string | null
    descColor?: string | null
    titleSize?: number | null
    descSize?: number | null
    isHidden?: boolean
    order?: number
    type?: string
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    iconType?: NullableStringFieldUpdateOperationsInput | string | null
    customIconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    titleFont?: NullableStringFieldUpdateOperationsInput | string | null
    descFont?: NullableStringFieldUpdateOperationsInput | string | null
    titleColor?: NullableStringFieldUpdateOperationsInput | string | null
    descColor?: NullableStringFieldUpdateOperationsInput | string | null
    titleSize?: NullableIntFieldUpdateOperationsInput | number | null
    descSize?: NullableIntFieldUpdateOperationsInput | number | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    iconType?: NullableStringFieldUpdateOperationsInput | string | null
    customIconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    titleFont?: NullableStringFieldUpdateOperationsInput | string | null
    descFont?: NullableStringFieldUpdateOperationsInput | string | null
    titleColor?: NullableStringFieldUpdateOperationsInput | string | null
    descColor?: NullableStringFieldUpdateOperationsInput | string | null
    titleSize?: NullableIntFieldUpdateOperationsInput | number | null
    descSize?: NullableIntFieldUpdateOperationsInput | number | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteCreateManyInput = {
    id?: string
    name: string
    url: string
    desc?: string | null
    category: string
    color?: string | null
    icon?: string | null
    iconType?: string | null
    customIconUrl?: string | null
    titleFont?: string | null
    descFont?: string | null
    titleColor?: string | null
    descColor?: string | null
    titleSize?: number | null
    descSize?: number | null
    isHidden?: boolean
    order?: number
    type?: string
    parentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    iconType?: NullableStringFieldUpdateOperationsInput | string | null
    customIconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    titleFont?: NullableStringFieldUpdateOperationsInput | string | null
    descFont?: NullableStringFieldUpdateOperationsInput | string | null
    titleColor?: NullableStringFieldUpdateOperationsInput | string | null
    descColor?: NullableStringFieldUpdateOperationsInput | string | null
    titleSize?: NullableIntFieldUpdateOperationsInput | number | null
    descSize?: NullableIntFieldUpdateOperationsInput | number | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    iconType?: NullableStringFieldUpdateOperationsInput | string | null
    customIconUrl?: NullableStringFieldUpdateOperationsInput | string | null
    titleFont?: NullableStringFieldUpdateOperationsInput | string | null
    descFont?: NullableStringFieldUpdateOperationsInput | string | null
    titleColor?: NullableStringFieldUpdateOperationsInput | string | null
    descColor?: NullableStringFieldUpdateOperationsInput | string | null
    titleSize?: NullableIntFieldUpdateOperationsInput | number | null
    descSize?: NullableIntFieldUpdateOperationsInput | number | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    color?: string | null
    isHidden?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    color?: string | null
    isHidden?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    color?: string | null
    isHidden?: boolean
    order?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    isHidden?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    username: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    username: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    username: string
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateInput = {
    id?: number
    layout: string
    config: string
    theme: string
    searchEngine?: string
    bingCacheMode?: string
    privatePasswordHash?: string | null
    updatedAt?: Date | string
  }

  export type GlobalSettingsUncheckedCreateInput = {
    id?: number
    layout: string
    config: string
    theme: string
    searchEngine?: string
    bingCacheMode?: string
    privatePasswordHash?: string | null
    updatedAt?: Date | string
  }

  export type GlobalSettingsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    searchEngine?: StringFieldUpdateOperationsInput | string
    bingCacheMode?: StringFieldUpdateOperationsInput | string
    privatePasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    searchEngine?: StringFieldUpdateOperationsInput | string
    bingCacheMode?: StringFieldUpdateOperationsInput | string
    privatePasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsCreateManyInput = {
    id?: number
    layout: string
    config: string
    theme: string
    searchEngine?: string
    bingCacheMode?: string
    privatePasswordHash?: string | null
    updatedAt?: Date | string
  }

  export type GlobalSettingsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    searchEngine?: StringFieldUpdateOperationsInput | string
    bingCacheMode?: StringFieldUpdateOperationsInput | string
    privatePasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GlobalSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    layout?: StringFieldUpdateOperationsInput | string
    config?: StringFieldUpdateOperationsInput | string
    theme?: StringFieldUpdateOperationsInput | string
    searchEngine?: StringFieldUpdateOperationsInput | string
    bingCacheMode?: StringFieldUpdateOperationsInput | string
    privatePasswordHash?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WallpaperCreateInput = {
    id?: string
    url: string
    type: string
    filename: string
    size?: number | null
    createdAt?: Date | string
  }

  export type WallpaperUncheckedCreateInput = {
    id?: string
    url: string
    type: string
    filename: string
    size?: number | null
    createdAt?: Date | string
  }

  export type WallpaperUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WallpaperUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WallpaperCreateManyInput = {
    id?: string
    url: string
    type: string
    filename: string
    size?: number | null
    createdAt?: Date | string
  }

  export type WallpaperUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WallpaperUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    size?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontCreateInput = {
    id?: string
    name: string
    family: string
    url: string
    provider?: string
    createdAt?: Date | string
  }

  export type CustomFontUncheckedCreateInput = {
    id?: string
    name: string
    family: string
    url: string
    provider?: string
    createdAt?: Date | string
  }

  export type CustomFontUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontCreateManyInput = {
    id?: string
    name: string
    family: string
    url: string
    provider?: string
    createdAt?: Date | string
  }

  export type CustomFontUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomFontUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoCreateInput = {
    id?: string
    text: string
    done?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TodoUncheckedCreateInput = {
    id?: string
    text: string
    done?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TodoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoCreateManyInput = {
    id?: string
    text: string
    done?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TodoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TodoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownCreateInput = {
    id?: string
    label: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownUncheckedCreateInput = {
    id?: string
    label: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownCreateManyInput = {
    id?: string
    label: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CountdownUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CountdownUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SiteCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    desc?: SortOrder
    category?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    iconType?: SortOrder
    customIconUrl?: SortOrder
    titleFont?: SortOrder
    descFont?: SortOrder
    titleColor?: SortOrder
    descColor?: SortOrder
    titleSize?: SortOrder
    descSize?: SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    type?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteAvgOrderByAggregateInput = {
    titleSize?: SortOrder
    descSize?: SortOrder
    order?: SortOrder
  }

  export type SiteMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    desc?: SortOrder
    category?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    iconType?: SortOrder
    customIconUrl?: SortOrder
    titleFont?: SortOrder
    descFont?: SortOrder
    titleColor?: SortOrder
    descColor?: SortOrder
    titleSize?: SortOrder
    descSize?: SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    type?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    desc?: SortOrder
    category?: SortOrder
    color?: SortOrder
    icon?: SortOrder
    iconType?: SortOrder
    customIconUrl?: SortOrder
    titleFont?: SortOrder
    descFont?: SortOrder
    titleColor?: SortOrder
    descColor?: SortOrder
    titleSize?: SortOrder
    descSize?: SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    type?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSumOrderByAggregateInput = {
    titleSize?: SortOrder
    descSize?: SortOrder
    order?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    isHidden?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    username?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    username?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    username?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    layout?: SortOrder
    config?: SortOrder
    theme?: SortOrder
    searchEngine?: SortOrder
    bingCacheMode?: SortOrder
    privatePasswordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GlobalSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    layout?: SortOrder
    config?: SortOrder
    theme?: SortOrder
    searchEngine?: SortOrder
    bingCacheMode?: SortOrder
    privatePasswordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    layout?: SortOrder
    config?: SortOrder
    theme?: SortOrder
    searchEngine?: SortOrder
    bingCacheMode?: SortOrder
    privatePasswordHash?: SortOrder
    updatedAt?: SortOrder
  }

  export type GlobalSettingsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type WallpaperCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type WallpaperAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type WallpaperMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type WallpaperMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    type?: SortOrder
    filename?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type WallpaperSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type CustomFontCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    family?: SortOrder
    url?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomFontMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    family?: SortOrder
    url?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomFontMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    family?: SortOrder
    url?: SortOrder
    provider?: SortOrder
    createdAt?: SortOrder
  }

  export type TodoCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TodoMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TodoMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    done?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CountdownMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}