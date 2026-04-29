import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach auth token if present
client.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — global error logging
client.interceptors.response.use(
  response => response,
  error => {
    console.error('[API Error]', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// ─── API Modules ──────────────────────────────────────────────
export const inventoryApi = {
  getAll:        ()             => client.get('/api/inventory'),
  getByCategory: (cat)          => client.get(`/api/inventory/category/${cat}`),
  checkStock:    (sku, qty)     => client.get(`/api/inventory/check?skuCode=${sku}&quantity=${qty}`),
};

export const ordersApi = {
  place:       (data)   => client.post('/api/orders', data),
  getByEmail:  (email)  => client.get(`/api/orders/customer/${email}`),
  getByNumber: (num)    => client.get(`/api/orders/${num}`),
};

export default client;
