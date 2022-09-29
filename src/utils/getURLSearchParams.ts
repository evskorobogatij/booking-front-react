export function getURLSearchParams<T>(params: T): string {
  return new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter((v) => !!v[1]))
  ).toString()
}
