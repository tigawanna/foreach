import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { Oauthproviders, loginUser, oauthSignIn } from "@/src/state/pb/config";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Icons } from "../icons/Icons";
import { useQueryClient } from "@tanstack/react-query";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface LoginFormProps {
  form_props?: UserAuthFormProps;
}

interface LoginFormState {
  email: string;
  password: string;
}

export function LoginForm({ form_props, ...props }: LoginFormProps) {
  const query_client = useQueryClient();

  const [user, setUser] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.id]: e.target.value });
  }

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginFormState) =>
      loginUser({ email, password }),
  });
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log("user",user)
    mutation.mutate(
      { email: user.email, password: user.password },
      {
        onSuccess(data, variables, context) {
          // console.log("logged in data",data)
          query_client.invalidateQueries({ queryKey: ["user"] });
        },
      }
    );
  }

  const oauth_mutation = useMutation({
    mutationFn: ({ provider }: Oauthproviders) => oauthSignIn(provider),
  });

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2"
      )}
      {...props}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[90%] rounded-2xl p-5 md:w-[60%]"
        style={{ border: mutation.isError ? "2px solid #f00" : "" }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <div className="flex w-full flex-col  gap-2">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={handleChange}
              disabled={mutation.isPending}
            />
          </div>
          <div className="flex w-full flex-col  gap-2">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type={checked ? "text" : "password"}
              autoCapitalize="none"
              autoCorrect="off"
              onChange={handleChange}
              disabled={mutation.isPending}
            />
          </div>

          <div className="flex w-full items-center  gap-2">
            <Label className="" htmlFor="show_password">
              Show password
            </Label>
            <Input
              id="show_password"
              type="checkbox"
              onChange={() => setChecked(!checked)}
              disabled={mutation.isPending}
              checked={checked}
              className="w-5"
            />
          </div>

          <Button
            disabled={mutation.isPending}
            type="submit"
            className="text-lg shadow shadow-secondary-foreground hover:brightness-125"
          >
            {mutation.isPending && !mutation.isError && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>

          {mutation.isError && (
            <p className="p-5  text-red-800">{mutation.error.message}</p>
          )}
        </div>
      </form>

      <div className="relative p-10">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        onClick={() => oauth_mutation.mutate({ provider: "github" })}
        variant="outline"
        type="button"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.github className="mr-2 h-8 w-8" />
        )}{" "}
        <h2 className="text-lg">Github</h2>
      </Button>
      <Button
        onClick={() => oauth_mutation.mutate({ provider: "google" })}
        variant="outline"
        type="button"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-8 w-8" />
        )}{" "}
        <h2 className="text-lg">Google</h2>
      </Button>
    </div>
  );
}
