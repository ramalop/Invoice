import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";

import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const [formdata, setFormdata] = useState(initialFormData);
  const { toast } = useToast();
  const dispatch = useDispatch();
  function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser(formdata)).then((data) => {
      console.log(data, "daaataaa");

      if (data?.payload?.success) {
        toast({ title: "Login success" });
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }
  console.log(formdata);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Login to Invoice App
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">
           
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formdata.email}
                onChange={(e) =>
                  setFormdata((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>

            
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formdata.password}
                onChange={(e) =>
                  setFormdata((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full  bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
