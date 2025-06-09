import { urlBuilder } from '@/lib/utils';
import { useCookies } from 'react-cookie';

export interface LoginRequest {
  nip: string;
  password: string;
}

export const useAuthLogin = () => {
  const [, setCookie] = useCookies(['authToken', 'userData']);

  const login = async (payload: LoginRequest) => {
    try {
      const response = await fetch(urlBuilder('/auth/login-guru'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `Login failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data)

      // Set cookies
      setCookie('authToken', data.token, { path: '/' });
    //   setCookie('userData', JSON.stringify(data.user), { path: '/' });

      return data;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return error;
    }
  };

  return login;
};

export const useAuthLogout = () => {
    const [, , removeCookie] = useCookies(['authToken', 'userData']);
  
    const logout = () => {
      removeCookie('authToken', { path: '/' });
      removeCookie('userData', { path: '/' });
    };
  
    return logout;
};
