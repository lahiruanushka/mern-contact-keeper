import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { logout, user } = useContext(AuthContext);

    console.log(user);
    
    return (
        <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6 lg:px-12">
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                    Contact Manager 
                </h1>
 
                <nav className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
                    >
                        Contacts
                    </Link>
                    <Link
                        to="/contacts/add"
                        className="bg-white text-purple-600 hover:bg-gray-100 transition-colors rounded-lg py-2 px-4 font-medium shadow-md"
                    >
                        Add Contact
                    </Link>
                    {user ? (
                        <>
                            <span className="text-white text-lg font-semibold">{user.username}</span>
                            <button
                                onClick={logout}
                                className="bg-white text-purple-600 hover:bg-gray-100 transition-colors rounded-lg py-2 px-4 font-medium shadow-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-200 transition-colors text-lg font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-purple-600 hover:bg-gray-100 transition-colors rounded-lg py-2 px-4 font-medium shadow-md"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
