declare global {
  interface Window {
    umami?: (event: string) => Promise<void>;
  }
}

export const umami = (event: string) => {
  const umamiFunc = window.umami;
  if (umamiFunc) {
    umamiFunc(event);
  }
};
