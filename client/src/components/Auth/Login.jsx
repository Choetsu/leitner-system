import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/authentication";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const postLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(email, password);
            console.log(response.status);
            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("userId", data.id);
                setIsLoggedIn(true);
                window.location = "/";
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Connexion
                    </h1>
                    <form onSubmit={postLogin} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@gmail.com"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                loading
                                    ? "bg-blue-400"
                                    : "bg-blue-600 hover:bg-blue-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        <span className="text-gray-500">
                            Vous n'avez pas de compte ?{" "}
                        </span>
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
