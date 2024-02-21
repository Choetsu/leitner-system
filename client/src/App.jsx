import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "./assets/images/logo.png";
import Home from "./components/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ViewCard from "./components/Card/ViewCard";
import DetailCard from "./components/Card/DetailCard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setIsLoggedIn(!!userId);
    }, []);

    return (
        <Router>
            <div className="flex relative flex-col min-h-screen">
                <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img src={logo} className="h-16 w-16" alt="Logo" />
                        </Link>
                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            {isLoggedIn ? (
                                <Link
                                    onClick={() => {
                                        localStorage.removeItem("userId");
                                        setIsLoggedIn(false);
                                    }}
                                    to="/"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Déconnexion
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/register"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
                                    >
                                        Inscription
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Connexion
                                    </Link>
                                </>
                            )}
                        </div>
                        <div
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                            id="navbar-cta"
                        >
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link
                                        to="/"
                                        className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                        aria-current="page"
                                    >
                                        Accueil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/cards"
                                        className="block py-2 px-3 md:p-0 text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-100"
                                    >
                                        Fiches
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/login"
                            element={<Login setIsLoggedIn={setIsLoggedIn} />}
                        />
                        <Route path="/" element={<Home />} />
                        <Route path="/cards" element={<ViewCard />} />
                        <Route path="/cards/:id" element={<DetailCard />} />
                    </Routes>
                </div>

                {/* <footer className="bg-white rounded-lg shadow dark:bg-gray-900 fixed bottom-0 left-0 right-0 z-50">
                    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <a
                                href="https://flowbite.com/"
                                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                            >
                                <img
                                    src={logo}
                                    className="h-24 w-24"
                                    alt="Logo"
                                />
                            </a>
                            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                                <li>
                                    <Link
                                        to="/login"
                                        className="hover:underline me-4 md:me-6"
                                    >
                                        Connexion
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="hover:underline me-4 md:me-6"
                                    >
                                        Inscription
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                            © 2023{" "}
                            <a
                                href="https://flowbite.com/"
                                className="hover:underline"
                            >
                                Leitner
                            </a>
                            . Tous droits réservés.
                        </span>
                    </div>
                </footer> */}
            </div>
        </Router>
    );
}

export default App;
