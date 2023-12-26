type debouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 1000
): debouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function debounce(...args: Parameters<T>): ReturnType<T> {
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        resolve(await func(...args));
      }, delay);
    }) as ReturnType<T>;
  };
}
