import { useCookies } from 'react-cookie'
import { urlBuilder } from './utils';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

export const fetchServer = async (
  url: string,
  options: RequestConfig = {},
  contentType: string = 'application/json'
): Promise<any> => {
  const [cookies] = useCookies(['authToken']);
  const token = cookies.authToken;

  const headers = {
    Authorization: token?.includes('Bearer') ? token : `Bearer ${token}`,
    'Content-Type': contentType,
  }

  try {
    const response = await fetch(urlBuilder(url), {
      method: options.method || 'GET',
      headers,
      // body: JSON.stringify(options.body),
    });

    const data = await response.json();
    console.log(data)

    return data
  } catch (error: any) {
    console.error('Error fetching data:', error)
    throw new Error(error?.response?.data?.message || 'Unknown error occurred')
  }
}
