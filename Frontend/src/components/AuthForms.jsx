import React, { useState } from "react";
import { BookOpen, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { registerUser, loginUser } from "../features/authSlicer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AuthWrapper() {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get("form") || "login";
  return <AuthForms initialForm={formType} />;
}

function AuthForms({ initialForm = "login" }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialForm === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSubmitError("");
    setFormData({
      userName: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    try {
      if (isLogin) {
        const resultAction = await dispatch(
          loginUser({
            userName: formData.userName,
            password: formData.password,
          })
        );
        if (loginUser.fulfilled.match(resultAction)) {
          setFormData({ username: "", password: "" });
          navigate("/");
        } else {
          setSubmitError(resultAction.payload || "Login failed");
        }
      } else {
        const resultAction = await dispatch(registerUser(formData));

        if (registerUser.fulfilled.match(resultAction)) {
          setFormData({
            userName: "",
            password: "",
            email: "",
          });
          setIsLogin(true);
          navigate("/auth?form=login");
        } else {
          setSubmitError(resultAction.payload || "Signup failed");
        }
      }
    } catch (error) {
      console.error("error occured", error);
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "Username is required";
        } else if (value.length < 3) {
          error = "Username must be at least 3 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = "Username can only contain letters, numbers, and underscores";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (!isLogin && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error =
            "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.username = validateField("userName", formData.userName);

    if (!isLogin) {
      newErrors.email = validateField("email", formData.email);
    }
    newErrors.password = validateField("password", formData.password);

    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-slate-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-600">
            {isLogin
              ? "Sign in to your BlogSpace account"
              : "Join BlogSpace community today"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-200 p-8">
          {/* Submit Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{submitError}</p>
            </div>
          )}
          <div className="space-y-6">
            {/* Username Field (for both login and signup) */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                </div>
                <input
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  type="text"
                  required
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg 
                           bg-white dark:bg-slate-50 text-gray-900 dark:text-slate-900 placeholder-gray-500 dark:placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           transition-all duration-300 text-sm ${
                             errors.userName
                               ? "border-red-300 dark:border-red-400 focus:ring-red-500 focus:border-red-500"
                               : "border-gray-300 dark:border-slate-300"
                           }`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email Field (only for signup) */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg 
                             bg-white dark:bg-slate-50 text-gray-900 dark:text-slate-900 placeholder-gray-500 dark:placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition-all duration-300 text-sm ${
                               errors.email
                                 ? "border-red-300 dark:border-red-400 focus:ring-red-500 focus:border-red-500"
                                 : "border-gray-300 dark:border-slate-300"
                             }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
            )}

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? "text" : "password"}
                  required
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg 
                           bg-white dark:bg-slate-50 text-gray-900 dark:text-slate-900 placeholder-gray-500 dark:placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           transition-all duration-300 text-sm ${
                             errors.password
                               ? "border-red-300 dark:border-red-400 focus:ring-red-500 focus:border-red-500"
                               : "border-gray-300 dark:border-slate-300"
                           }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-slate-400 
                           hover:text-gray-600 dark:hover:text-slate-600 transition-colors duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me / Forgot Password (only for login) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700 dark:text-slate-700"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-500 
                           transition-colors duration-300 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg 
                         text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                         transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  </div>
                ) : isLogin ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </div>

          {/* Toggle Form Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleForm}
                className="ml-1 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-500 
                         transition-colors duration-300"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Terms and Privacy (only for signup) */}
        {!isLogin && (
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-slate-500">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
