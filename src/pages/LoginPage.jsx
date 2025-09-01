import React from 'react';
import { Mail, EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReslabLogo from '../assets/reslablogo.png';

export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        navigate('/dashboard')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 font-sans">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl rounded-2xl overflow-hidden shadow-xl">

                {/* Formulir Login */}
                <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12 flex flex-col justify-center">
                    <div className="flex items-center mb-6 md:mb-10">
                        <img src={ReslabLogo} alt="Reslab Logo" className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4" />
                        <div className="text-sm">
                            <p className="font-semibold text-gray-700">ROBOTIC AND EMBEDDED SYSTEM LABORATORY</p>
                            <p className="text-gray-500">TEKNIK KOMPUTER</p>
                        </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Login</h2>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-4 md:space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full pr-10 pl-4 py-2 rounded-md border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm md:text-base"
                                    placeholder="Enter your email"
                                />
                                <Mail size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                {showPassword ? (
                                    <Eye size={20} onClick={() => setShowPassword(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                                ) : (
                                    <EyeOff size={20} onClick={() => setShowPassword(true)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
                                )}
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="w-full pr-10 pl-4 py-2 rounded-md border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm md:text-base"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-500">Lupa Password?</a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 md:py-3 px-4 rounded-full bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Log in
                        </button>
                    </form>
                </div>

                {/* Ilustrasi Samping */}
                <div className="hidden lg:flex lg:w-1/2 bg-orange-500 relative justify-center items-center">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-orange-400 opacity-50 transform -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-orange-400 opacity-50 transform translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    <div className="relative z-10 text-white text-center p-8">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-2">Sistem Absensi</h1>
                        <h2 className="text-5xl md:text-7xl font-extrabold tracking-wide">RESLAB</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};