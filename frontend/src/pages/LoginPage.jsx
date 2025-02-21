
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore"

function LoginPage() {
  // const [showPassword,setShowPassword] = useState();
  const {login, isLoggingIn} = useAuthStore();
  const [formData,setFormData] = useState({
    email: "",
    password:""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={(e)=>{setFormData({...formData,email: e.target.value })}}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e)=>{setFormData({...formData,password: e.target.value})}}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoggingIn}
            onClick={handleSubmit}
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {
              isLoggingIn? "Loading...":"Log in"
            }
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          If you do not have an account, <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage