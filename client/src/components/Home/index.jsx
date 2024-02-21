import { useState } from "react";
import { Link } from "react-router-dom";
import { generateQuizz } from "../../services/cards";

function Home() {
    const [date, setDate] = useState(new Date().toISOString());
    const userId = localStorage.getItem("userId");

    const handleGenerateQuizz = async () => {
        const quizz = await generateQuizz(userId, date);
        console.log(quizz);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-36">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Bienvenue sur notre application de révision
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center">
                Une application pour vous aider à organiser et à réviser vos
                fiches de révision de manière efficace.
            </p>
            <button
                type="submit"
                onClick={handleGenerateQuizz}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
                Lancer une révision
            </button>
        </div>
    );
}

export default Home;
