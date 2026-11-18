/**
 * Substituto de `next/navigation` nos testes. A rota atual é controlada por `setPathname`,
 * e `notFound()` lança um erro identificável, como o Next faz em produção.
 */
let currentPathname = "/";

export function setPathname(pathname: string) {
  currentPathname = pathname;
}

export function usePathname() {
  return currentPathname;
}

export function useRouter() {
  return { push: () => {}, replace: () => {}, back: () => {}, forward: () => {}, refresh: () => {}, prefetch: () => {} };
}

export function useSearchParams() {
  return new URLSearchParams();
}

export const NOT_FOUND_ERROR = "NEXT_NOT_FOUND";

export function notFound(): never {
  throw new Error(NOT_FOUND_ERROR);
}

export function redirect(url: string): never {
  throw new Error(`NEXT_REDIRECT:${url}`);
}
