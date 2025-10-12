const API_URL = 'https://api.tuapp.com/products';

export const getAllProducts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener productos');
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Producto no encontrado');
  return await response.json();
};

export const createProduct = async (productData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return await response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return true;
};