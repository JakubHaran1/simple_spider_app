import { useState, type SetStateAction } from "react";
import type { LoginFormType } from "../api/types";
import { AuthService } from "../services/AuthService.ts";
import { isAxiosError } from "axios";

type LoginPopUpProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
};

export default function LoginPopUp({ isOpen, setIsOpen }: LoginPopUpProps) {
  const [login, setLogin] = useState<LoginFormType>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLoginForm = <K extends keyof LoginFormType>(
    name: K,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value;
    setLogin((prev) => ({ ...prev, [name]: val }));
  };

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await AuthService.login(login).then((resp) => console.log(resp));
    } catch (err) {
      if (isAxiosError(err)) setError(err.response?.data.detail);
    }
  };
  if (isOpen)
    return (
      <div className="p-6 bg-gray-950 min-h-[400px] flex items-center justify-center">
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 transform transition-all">
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-150"
              aria-label="Close modal"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h3>
              {error ? <p className="text-sm text-red-400">{error}</p> : ""}

              <p className="text-sm text-gray-400">
                Log in to manage your spiders
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label
                  className="block text-sm font-medium text-gray-400 mb-1.5"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-500 transition duration-150"
                    required
                    onChange={(e) => handleLoginForm("username", e)}
                    value={login.username}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label
                    className="text-sm font-medium text-gray-400"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 text-white placeholder-gray-500 transition duration-150"
                  required
                  onChange={(e) => handleLoginForm("password", e)}
                  value={login.password}
                />
              </div>

              {/* Przycisk zatwierdzający */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition duration-200 shadow-md shadow-emerald-900/10 mt-2"
              >
                Sign In
              </button>
            </form>

            {/* Footer popupu */}
            <div className="text-center mt-6 pt-5 border-t border-gray-700/60 text-sm text-gray-400">
              Don't have an account?{" "}
              <a
                href="#register"
                className="text-emerald-400 font-medium hover:underline"
              >
                Create one
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}
