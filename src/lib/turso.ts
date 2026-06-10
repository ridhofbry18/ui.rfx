// Client-side API helpers for fetching data from our Express backend
// This ensures that database details and credentials remain secure on the server

export async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('API reported an error');
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.warn("Failed to fetch products from backend API", error);
    return [];
  }
}

export async function fetchArticles() {
  try {
    const res = await fetch('/api/articles');
    if (!res.ok) throw new Error('API reported an error');
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.warn("Failed to fetch articles from backend API", error);
    return [];
  }
}
