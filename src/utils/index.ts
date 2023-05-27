export function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
