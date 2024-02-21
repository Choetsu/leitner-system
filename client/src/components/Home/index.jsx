import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { generateQuizz, answerQuizz } from "../../services/cards";

function Home() {
    const [showDatePickerPopup, setShowDatePickerPopup] = useState(false);
    const [showQuizzPopup, setShowQuizzPopup] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [quizz, setQuizz] = useState([]);
    const [userResponses, setUserResponses] = useState({});
    const userId = localStorage.getItem("userId");

    const handleOpenDatePicker = () => {
        setShowDatePickerPopup(true);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleGenerateQuizz = async () => {
        const formattedDate = selectedDate.toISOString();
        const generatedQuizz = await generateQuizz(userId, formattedDate);
        setQuizz(generatedQuizz);
        setShowQuizzPopup(true);
        setShowDatePickerPopup(false);
        const initialResponses = generatedQuizz.reduce((acc, item) => {
            acc[item.id] = "";
            return acc;
        }, {});
        setUserResponses(initialResponses);
    };

    const handleUserResponseChange = (id, value) => {
        setUserResponses((prevResponses) => ({
            ...prevResponses,
            [id]: value,
        }));
    };

    const validateAnswer = (id, userAnswer) => {
        const correctAnswer = quizz.find((q) => q.id === id)?.answer;
        if (userAnswer === correctAnswer) {
            answerQuizz(id, userId, true);
            alert("La réponse a été validée avec succès");
        } else {
            answerQuizz(id, userId, false);
            alert("La réponse est incorrecte");
        }
        alert(`La réponse correcte est : ${correctAnswer}`);
    };

    const forceValidateAnswer = (id) => {
        answerQuizz(id, userId, true);
        alert("La réponse a été validée avec succès");
    };

    const handleCloseQuizzPopup = () => {
        setShowQuizzPopup(false);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-24 pt-16">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Bienvenue sur notre application de révision
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center">
                Une application pour vous aider à organiser et à réviser vos
                fiches de révision de manière efficace.
            </p>
            <button
                onClick={handleOpenDatePicker}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
                Lancer une révision
            </button>

            {showDatePickerPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-8 rounded-lg shadow-2xl">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                            onClick={handleGenerateQuizz}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Valider
                        </button>
                    </div>
                </div>
            )}

            {showQuizzPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Votre Quizz</h2>
                        {quizz.map((item) => (
                            <div key={item.id} className="mb-6">
                                {console.log(item.id)}
                                <div className="font-semibold text-lg mb-2">
                                    {item.question}
                                </div>
                                <input
                                    type="text"
                                    value={userResponses[item.id]}
                                    onChange={(e) =>
                                        handleUserResponseChange(
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                    className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Votre réponse..."
                                />
                                <button
                                    onClick={() =>
                                        validateAnswer(
                                            item.id,
                                            userResponses[item.id]
                                        )
                                    }
                                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
                                >
                                    Valider Réponse
                                </button>
                                <button
                                    onClick={() => forceValidateAnswer(item.id)}
                                    className="mt-2 ml-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none transition duration-300 ease-in-out"
                                >
                                    Forcer Validation
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleCloseQuizzPopup}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition duration-300 ease-in-out transform hover:-translate-y-1"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
