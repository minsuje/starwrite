// 자주사용되는 tpyes

export type Search = string;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type RootState = import('../src/app/AppStore').RootState;
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  declare type AppDispatch = import('../src/app/AppStore').AppDispatch;
}
export {};
