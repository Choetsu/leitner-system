import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/authentication";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [loading, setLoading] = useState(false);

    const postRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await register(
                lastname,
                firstname,
                email,
                password
            );
            if (response.status === 201) {
                const data = response.data;
                localStorage.setItem("userId", data.id);
                window.location = "/login";
            }
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Inscription
                    </h1>
                    <form onSubmit={postRegister} className="max-w-md mx-auto">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    value={firstname}
                                    onChange={(event) =>
                                        setFirstname(event.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label
                                    htmlFor="floating_last_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Nom{" "}
                                </label>
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    id="floating_last_name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    value={lastname}
                                    onChange={(event) =>
                                        setLastname(event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                htmlFor="floating_password"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                name="floating_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
                            {loading ? "Inscription..." : "S'inscrire"}
                        </button>
                    </form>

                    <p className="mt-4 text-center">
                        <span className="text-gray-500">
                            Vous avez déjà un compte ?{" "}
                        </span>
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Connectez-vous
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;
