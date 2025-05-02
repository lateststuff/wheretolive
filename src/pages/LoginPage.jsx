import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic (API call, etc.)
    alert("Login functionality not implemented yet.");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 sm:px-6 lg:px-8 bg-brand-background">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brand-deep-blue">Member Login</CardTitle>
          <CardDescription>Access the Freedom Collective network.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            {/* Optional: Add Forgot Password link here */}
            <Button type="submit" className="w-full bg-brand-deep-blue hover:bg-opacity-90 text-white">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>Not a member yet? <a href="/join" className="font-medium text-brand-burnt-orange hover:underline">Apply Now</a></p>
        </CardFooter>
      </Card>
    </div>
  );
} 