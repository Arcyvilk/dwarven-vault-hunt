export const useQueryParams = (key: string) => {
  const params = new URLSearchParams(window.location.search)
  const param = params.get(key)
  return param
}
