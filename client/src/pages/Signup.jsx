import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUser } from "@/store/auth-slice"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


const initialFormData = {
  name:"",
  email:"",
  password:""
}

export default function Signup() {
  const [formData , setFormData] = useState(initialFormData)
  const { toast } = useToast();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleRegister(e){
    e.preventDefault()
    dispatch(registerUser(formData)).then((data)=>{
      console.log(data)
      if(data?.payload?.success){
        toast({title:data.payload.message})
        console.log("NAVIGATING NOW")
        navigate("/login")
      }else{
        toast({title:data.payload.message,variant:"destructive"})
      }
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-5">

            
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e)=>setFormData((prev)=>({...prev,name:e.target.value}))}
              />
            </div>

            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e)=>setFormData((prev)=>({...prev,email:e.target.value}))}
              />
            </div>

            
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={(e)=>setFormData((prev)=>({...prev,password:e.target.value}))}
              />
            </div>

            <Button onClick={handleRegister} variant="destructive" className="w-full">
              Create Account
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}
