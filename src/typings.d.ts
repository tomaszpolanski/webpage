/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var Prismic: any;
declare module 'prismic.io' {
  export default Prismic;
}
