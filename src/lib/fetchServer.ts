
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

interface FetchResponse<T> {
  data: T;
  code: number;
  message: string;
  success: boolean;
}

export const fetchServer = async <T = any>(
  token: string,
  url: string,
  options: RequestConfig = {},
  contentType: string = 'application/json'
): Promise<FetchResponse<T>> => {

  const defaultHeaders = {
    'Content-Type': contentType,
    ...(token ? { Authorization: token.includes('Bearer') ? token : `Bearer ${token}` } : {})
  } as const;

  const headers = { ...defaultHeaders, ...options.headers };

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      data,
      code: response.status,
      message: data.message,
      success: true,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}
