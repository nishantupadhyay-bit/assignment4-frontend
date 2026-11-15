const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || errorBody?.error || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role?: string;
}

interface UserListResponse {
  users?: User[];
  data?: User[];
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
}

export async function getUsers(): Promise<User[]> {
  const result = await request<User[] | UserListResponse>('/api/users');
  if (Array.isArray(result)) {
    return result;
  }
  return result.users ?? result.data ?? [];
}

export function getUser(userId: number): Promise<User> {
  return request<User>(`/api/users/${userId}`);
}

export function createUser(user: CreateUserRequest): Promise<User> {
  return request<User>('/api/users', {
    method: 'POST',
    body: JSON.stringify(user)
  });
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  currency: string;
  stockQuantity: number;
}

export interface UpdateStockRequest {
  stockQuantity: number;
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('/api/products');
}

export function getProduct(productId: number): Promise<Product> {
  return request<Product>(`/api/products/${productId}`);
}

export function createProduct(product: CreateProductRequest): Promise<Product> {
  return request<Product>('/api/products', {
    method: 'POST',
    body: JSON.stringify(product)
  });
}

export function updateProductStock(productId: number, stock: UpdateStockRequest): Promise<Product> {
  return request<Product>(`/api/products/${productId}/stock`, {
    method: 'PATCH',
    body: JSON.stringify(stock)
  });
}

export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  userId: number;
  productId: number;
  quantity: number;
}

export function getOrders(): Promise<Order[]> {
  return request<Order[]>('/api/orders');
}

export function getOrder(orderId: number): Promise<Order> {
  return request<Order>(`/api/orders/${orderId}`);
}

export function createOrder(order: CreateOrderRequest): Promise<Order> {
  return request<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order)
  });
}
