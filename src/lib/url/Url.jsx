export const getApiUrl = (endpoint = '') => {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (typeof window !== 'undefined') {
    return `/api${clean}`;
  }
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${base}/api${clean}`;
};

export const APIURL =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '/api')
    : (process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api`
        : 'http://localhost:3000/api');

export const IMGURL = process.env.NEXT_PUBLIC_IMG_URL || '/assets/';
