import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LuMenu,
  LuX,
  LuUserPlus,
  LuLogIn,
  LuLogOut,
  LuUser,
  LuUsers,
  LuPlusCircle,
  LuChevronDown
} from 'react-icons/lu';

const Header = () => {
    const { logout, user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    return (
        <header className="relative z-50">
            {/* Gradient Background with Animation */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo Section */}
                        <Link 
                            to="/" 
                            className="flex items-center space-x-2 group"
                        >
                            <LuUsers className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                Contact Manager
                            </h1>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            {isMenuOpen ? (
                                <LuX className="w-6 h-6" />
                            ) : (
                                <LuMenu className="w-6 h-6" />
                            )}
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-6">    
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleProfile}
                                        className="flex items-center space-x-2 bg-white/10 text-white hover:bg-white/20 transition-colors rounded-lg py-2 px-4 font-medium"
                                    >
                                        <LuUser className="w-5 h-5" />
                                        <span>{user.username}</span>
                                        <LuChevronDown className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 text-gray-700">
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-purple-50 transition-colors"
                                            >
                                                <LuLogOut className="w-5 h-5 text-purple-600" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="flex items-center space-x-2 text-white hover:text-purple-200 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-white/10"
                                    >
                                        <LuLogIn className="w-5 h-5" />
                                        <span>Login</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex items-center space-x-2 bg-white text-purple-600 hover:bg-purple-100 transition-all rounded-lg py-2 px-4 font-medium shadow-lg hover:shadow-xl active:shadow-md"
                                    >
                                        <LuUserPlus className="w-5 h-5" />
                                        <span>Register</span>
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
                }`}
            >
                <nav className="container mx-auto px-4 py-4 space-y-3">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-2 text-gray-700 py-2 px-3">
                                <LuUser className="w-5 h-5" />
                                <span className="font-medium">{user.username}</span>
                            </div>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 w-full text-gray-700 hover:text-purple-600 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-purple-50"
                            >
                                <LuLogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors text-lg font-medium py-2 px-3 rounded-lg hover:bg-purple-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LuLogIn className="w-5 h-5" />
                                <span>Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className="flex items-center space-x-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors rounded-lg py-2 px-4 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <LuUserPlus className="w-5 h-5" />
                                <span>Register</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;