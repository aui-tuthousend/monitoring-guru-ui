import { urlBuilder } from '@/lib/utils';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export interface LoginRequest {
  nip: string;
  password: string;
}

export const useAuthStore = () => {
  const [, setCookie, removeCookie] = useCookies(['authToken', 'userData']);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (payload: LoginRequest) => {
    try {
      const response = await fetch(urlBuilder('/auth/login-guru'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data)

      // Set cookies
      setCookie('authToken', data.token, { path: '/' });
      setCookie('userData', JSON.stringify(data.user), { path: '/' });

      return data;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return error;
    }
  };

  const logout = () => {
    removeCookie('authToken', { path: '/' });
    removeCookie('userData', { path: '/' });
  };

  return {loading, setLoading, login, logout};
};

