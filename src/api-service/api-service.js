const url = 'https://blog.kata.academy/api/';

export async function getArticles (limit) {
  const response = await fetch(`${url}articles/?limit=${limit}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return console.error(response.status);
}

export async function getFullArticle (slug) {
  const response = await fetch(`${url}articles/${slug}`);
  if (response.ok) {
    const json = await response.json();
    return json;
  }
  return console.error(response.status);
}