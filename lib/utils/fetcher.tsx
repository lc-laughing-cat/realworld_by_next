export const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    return res.json();
  });
