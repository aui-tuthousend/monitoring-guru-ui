import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/auth/useAuth'
import { useAuth } from '@/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const auth = useAuth()
  const {loading, setLoading, login} = useAuthStore()
  const navigate = useNavigate()

  const [nip, setNip] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true)
      const result = await login({ nip: nip, password });
      if (result.token) {
        auth.login(result.user_data.id)
        console.log('Login successful:', result);
        toast.success('Login successful')
        if (result.user_data.jabatan === 'guru') {
          await navigate({ to: '/guru' })
        } else if (result.user_data.jabatan === 'kepala_sekolah') {
          await navigate({ to: '/admin' })
        }
      } else {
        toast.error(result.error)
      }
      // redirect or update UI as needed
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false)
    }
  };


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setError('')
  //   setIsLoading(true)

  //   try {
      
  //     const data = await axios.post('/api/auth/login-guru', formData)

  //     setCookie('authToken', data.token, {
  //       path: '/',
  //       maxAge: 86400,
  //       secure: import.meta.env.PROD,
  //       sameSite: 'strict'
  //     })

  //     setCookie('userData', data.user, {
  //       path: '/',
  //       maxAge: 86400,
  //       secure: import.meta.env.PROD,
  //       sameSite: 'strict'
  //     })

  //     toast.success('Login successful')
  //     navigate({ to: '/guru' })
  //   } catch (err) {
  //     let errorMessage = 'Login failed'

  //     if (axios.isAxiosError(err)) {
  //       errorMessage = err.response?.data?.message || errorMessage
  //     } else if (err instanceof Error) {
  //       errorMessage = err.message
  //     }

  //     setError(errorMessage)
  //     toast.error(errorMessage)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <img
              src="/IMG_9570.jpeg"
              alt="School Logo"
              className="h-16 w-auto rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = '/fallback-logo.png'
              }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Teacher Monitoring System
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nip">NIP</Label>
              <Input
                id="nip"
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="Enter your NIP"
                required
                autoComplete="nip"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center py-2">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Logging in...
                </span>
              ) : 'Login'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            {/* <Link 
              to="/contact-admin" 
              className="font-medium text-blue-600 hover:underline"
            >
              Contact administrator
            </Link> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}