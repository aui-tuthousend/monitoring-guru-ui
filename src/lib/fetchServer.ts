import { useCookies } from 'react-cookie';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  cache?: RequestCache;
}

export const fetchServer = async (
  url: string,
  options: RequestConfig = {},
  contentType: string = 'application/json'
): Promise<any> => {
  try {
    const [cookies] = useCookies(['authToken']);
    const token = cookies.authToken;

    const fetchOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        authorization: token
          ? token.includes('Bearer')
            ? token
            : `Bearer ${token}`
          : '',
        'Content-Type': contentType,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    // Handle caching only for GET requests
    if (options.method === 'GET' && options.cache) {
      fetchOptions.cache = options.cache;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error instanceof Error ? error : new Error('Unknown error occurred');
  }
};
