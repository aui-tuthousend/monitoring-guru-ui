import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Using Axios for the API call
      const response = await axios.post("/api/login", {
        username,
        password
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      
      // Store token if available (using localStorage as simple example)
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }
      
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      // Axios error handling
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            {/* Replace with your actual university logo */}
            <img 
              src="app/login/IMG_9570.jpeg" 
              alt="University Logo" 
              className="h-20 w-auto rounded-2xl" 
              onError={(e) => {
                // Fallback if logo fails to load
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                // target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YzY4N2EiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idWlsZGluZy0yIj48cGF0aCBkPSJNNiAyMlY0YTIgMiAwIDAgMSAyLTJoOGEyIDIgMCAwIDEgMiAydjE4WiIvPjxwYXRoIGQ9Ik02IDEySDRhMiAyIDAgMCAwLTIgMnYxMGEyIDIgMCAwIDAgMiAyaDIiLz48cGF0aCBkPSJNMTggOXYtMSIvPjxwYXRoIGQ9Ik0xOCAyMmx2LTFhMSAxIDAgMCAwLTEtMWgtMWExIDEgMCAwIDAtMSAxdjEiLz48cGF0aCBkPSJNMTggMTVoLTFhMSAxIDAgMCAwLTEgMXYxIi8+PHBhdGggZD0iTTE0IDloLS4wMSIvPjxwYXRoIGQ9Ik0xNCAxNWgtLjAxIi8+PHBhdGggZD0iTTEwIDloLS4wMSIvPjxwYXRoIGQ9Ik0xMCAxNWgtLjAxIi8+PHBhdGggZD0iTTEwIDIwaC4wMSIvPjwvc3ZnPg==";
                target.src = "app/login/IMG_9570.jpeg"
              }}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Teacher Monitoring System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                autoComplete="username"
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
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/contact-admin" className="font-medium text-primary underline">
              Contact admin
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}