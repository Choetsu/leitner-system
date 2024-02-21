import { useState } from "react";
import { createCard } from "../../services/cards";

function CreateCard(props) {
    const [card, setCard] = useState({
        category: "FIRST",
        question: "",
        answer: "",
        userId: props.userId,
    });

    const handleChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCard(card);
        setCard({ ...card, question: "", answer: "" });
        props.setShowCreateCardModal(false);
        props.setCards([...props.cards, card]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label
                    htmlFor="question"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Question
                </label>
                <input
                    type="text"
                    id="question"
                    name="question"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={card.question}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="answer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Réponse
                </label>
                <input
                    type="text"
                    id="answer"
                    name="answer"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={card.answer}
                    onChange={handleChange}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Créer la fiche
            </button>
        </form>
    );
}

export default CreateCard;
