import { LoginInputs, logInSchema } from "@/types/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Github } from "lucide-react";
const LogIn = () => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<LoginInputs>({
    resolver: zodResolver(logInSchema),
  });
  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    try {
      setLoading(true);
      console.table(values);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 rounded-xl shadow-md w-full sm:w-1/2">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold">Welcome Back👋</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Log In"}
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline" className="w-full">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button type="button" className="text-sm text-primary hover:underline">
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default LogIn;
