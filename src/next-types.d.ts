// Workaround for Next 15.5 generated .next/types/validator.ts importing
// "next/types.js" — the bundled module ships without a resolvable .d.ts in
// this version, which trips the build-time type check. Declaring the two
// types it uses here keeps the project type-clean without altering runtime
// behaviour.
declare module 'next/types.js' {
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
}
