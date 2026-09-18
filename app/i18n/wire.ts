// Server components cannot hand functions to client components, and copy
// such as `perWeek(price, base)` is a function. On the server each function
// is called once with numbered slots to become a template; the client turns
// the template back into a function. Only the page's own language travels.

const slot = (index: number) => `\u0001${index}\u0001`;

type Template = { $t: string };

export type Wire<T> = T extends (...args: never[]) => string
  ? Template
  : T extends readonly unknown[]
    ? { [K in keyof T]: Wire<T[K]> }
    : T extends object
      ? { [K in keyof T]: Wire<T[K]> }
      : T;

export function toWire<T>(value: T): Wire<T> {
  if (typeof value === 'function') {
    const fn = value as unknown as (...args: string[]) => string;
    return { $t: fn(...Array.from({ length: fn.length }, (_, index) => slot(index))) } as Wire<T>;
  }
  if (Array.isArray(value)) return value.map((item) => toWire(item)) as Wire<T>;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, toWire(item)])) as Wire<T>;
  }
  return value as Wire<T>;
}

function isTemplate(value: unknown): value is Template {
  return Boolean(value) && typeof value === 'object' && typeof (value as Template).$t === 'string' && Object.keys(value as object).length === 1;
}

export function fromWire<T>(wire: Wire<T>): T {
  if (isTemplate(wire)) {
    const template = wire.$t;
    return ((...args: unknown[]) => template.replace(/\u0001(\d+)\u0001/g, (_, index: string) => String(args[Number(index)] ?? ''))) as T;
  }
  if (Array.isArray(wire)) return wire.map((item) => fromWire(item)) as T;
  if (wire && typeof wire === 'object') {
    return Object.fromEntries(Object.entries(wire).map(([key, item]) => [key, fromWire(item as Wire<unknown>)])) as T;
  }
  return wire as T;
}
