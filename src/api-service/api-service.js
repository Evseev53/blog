const url = 'https://blog.kata.academy/api/';

export async function getArticles (limit, token) {
  const response = await fetch(`${url}articles/?limit=${limit}`,{
    headers: {Authorization: `Token ${token}`}
  });
  const json = await response.json();
  return json;
}

export async function getFullArticle (slug, token) {
  const response = await fetch(`${url}articles/${slug}`,{
    headers: {Authorization: `Token ${token}`}
  });
  const json = await response.json();
  return json;
}

export async function createArticle (newArticle, token) {
  const response = await fetch(`${url}articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({ article: newArticle })
  })
  const json = await response.json();
  return json;
}

export async function updateArticle (newArticle, token, slug) {
  const response = await fetch(`${url}articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({ article: newArticle })
  })
  const json = await response.json();
  return json;
}

export async function deleteArticle (token, slug) {
  try {
    const response = await fetch(`${url}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
    const json = await response.json();
    return json;
  } catch (e) {
    return e;
  }
}

export async function sendNewUser (newUser) {
  const response = await fetch(`${url}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newUser)
  })
  const json = await response.json();
  return json;
}

export async function userLogin (userObj) {
  const response = await fetch(`${url}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(userObj)
  })
  const json = await response.json();
  return json;
}

export async function getCurrentUser (token) {
  const response = await fetch(`${url}user`, {
    headers: {Authorization: `Token ${token}`}
  })
  const json = await response.json();
  return json;
}

export async function updateUser (token, updatedUser) {
  const response = await fetch(`${url}user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({ user: updatedUser })
  })
  const json = await response.json();
  return json;
};

export async function sendLike (token, slug) {
  const response = await fetch(`${url}articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
  const json = await response.json();
  return json;
}

export async function sendDislike (token, slug) {
  const response = await fetch(`${url}articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  })
  const json = await response.json();
  return json;
}