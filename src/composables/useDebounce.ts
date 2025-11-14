export function useDebounce<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>

  const debouncedFn = (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn
}
