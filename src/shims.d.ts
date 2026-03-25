// Minimal ambient type shims.
// These exist to prevent editor/TS errors when `node_modules` are not installed yet.
// When you install dependencies, these shims should be harmless.

declare namespace JSX {
  // Allow any intrinsic element so JSX parsing doesn't fail.
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module "react" {
  export type ChangeEvent<T = any> = {
    target: { value: any };
  } & any;

  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useState<S>(initial: S | (() => S)): [S, (next: S) => void];
  export function useEffect(
    effect: () => void | (() => void),
    deps?: any[],
  ): void;

  const React: any;
  export default React;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "react-dom/client" {
  export function createRoot(container: any): {
    render: (element: any) => void;
  };
}

declare module "recharts" {
  export const ResponsiveContainer: any;
  export const LineChart: any;
  export const Line: any;
  export const XAxis: any;
  export const YAxis: any;
  export const CartesianGrid: any;
  export const Tooltip: any;
}

