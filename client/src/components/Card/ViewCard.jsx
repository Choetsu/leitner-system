import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCards } from "../../services/cards";
import { fetchTagsByUserId, createTag } from "../../services/tags";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import CreateCard from "./CreateCard";

function ViewCard() {
    const userId = localStorage.getItem("userId");
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [cards, setCards] = useState([]);
    const [showTagModal, setShowTagModal] = useState(false);
    const [showCreateCardModal, setShowCreateCardModal] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandedCards, setExpandedCards] = useState([]);

    const handleExpand = (cardId) => {
        if (expandedCards.includes(cardId)) {
            setExpandedCards(expandedCards.filter((id) => id !== cardId));
        } else {
            setExpandedCards([...expandedCards, cardId]);
        }
    };

    useEffect(() => {
        const getTags = async () => {
            const fetchedTags = await fetchTagsByUserId(userId);
            setTags(fetchedTags);
        };
        getTags();
    }, [userId]);

    useEffect(() => {
        const getCards = async () => {
            setLoading(true);
            const fetchedCards = await fetchCards(
                selectedTags.join(","),
                userId
            );
            setCards(fetchedCards);
            setLoading(false);
        };
        getCards();
    }, [selectedTags, userId]);

    const handleTagClick = (tag) => {
        const isSelected = selectedTags.includes(tag);
        if (isSelected) {
            setSelectedTags(
                selectedTags.filter((selectedTag) => selectedTag !== tag)
            );
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleAddTag = () => {
        setShowTagModal(true);
    };

    const handleCreateCard = () => {
        setShowCreateCardModal(true);
    };

    const handleCloseTagModal = () => {
        setShowTagModal(false);
    };

    const handleCloseCreateCardModal = () => {
        setShowCreateCardModal(false);
    };

    const handleSaveTag = async () => {
        await createTag(newTagName, userId);
        setNewTagName("");
        setShowTagModal(false);
        const fetchedTags = await fetchTagsByUserId(userId);
        setTags(fetchedTags);
    };

    return (
        <div className="container mx-auto p-6 relative">
            <div className="mb-4 text-center">
                <h2 className="text-lg font-semibold mb-2 mt-6">
                    Filtrer par tags
                </h2>
                <div className="flex justify-center items-center">
                    <div className="flex flex-wrap justify-center">
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                onClick={() => handleTagClick(tag.name)}
                                className={`px-4 py-2 m-2 text-sm font-semibold rounded-full ${
                                    selectedTags.includes(tag.name)
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleAddTag}
                        className="ml-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    >
                        <PlusCircleIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex items-center justify-center mt-4">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center">
                    {cards.map((card) => (
                        // <Link to={`/cards/${card.id}`} key={card.id}>
                        <div key={card.id} className="m-4">
                            <div className="bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="p-4 leading-normal w-full">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {card.question}
                                    </h5>
                                    <p
                                        className={`mb-3 text-gray-700 dark:text-gray-400 ${
                                            expandedCards.includes(card.id)
                                                ? ""
                                                : "overflow-hidden h-20"
                                        }`}
                                    >
                                        {card.answer}
                                    </p>
                                    {card.answer.length > 100 && (
                                        <button
                                            className="text-blue-500 hover:underline focus:outline-none"
                                            onClick={() =>
                                                handleExpand(card.id)
                                            }
                                        >
                                            {expandedCards.includes(card.id)
                                                ? "Réduire"
                                                : "Lire la suite"}
                                        </button>
                                    )}
                                    <Link
                                        to={`/cards/${card.id}`}
                                        key={card.id}
                                        className="block mt-4 text-blue-500 hover:underline focus:outline-none"
                                    >
                                        Voir la fiche
                                    </Link>
                                </div>
                            </div>
                        </div>
                        // </Link>
                    ))}
                </div>
            )}
            <div className="flex justify-center">
                <button
                    onClick={handleCreateCard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-4"
                >
                    Ajouter une fiche
                </button>
            </div>
            {showTagModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">
                            Ajouter un tag
                        </h2>
                        <input
                            type="text"
                            value={newTagName}
                            onChange={(e) => setNewTagName(e.target.value)}
                            placeholder="Nom du tag"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseTagModal}
                                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSaveTag}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showCreateCardModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
                    <div className="bg-white rounded-lg shadow-md w-full max-w-md">
                        <div className="p-6">
                            <CreateCard
                                userId={userId}
                                setShowCreateCardModal={setShowCreateCardModal}
                                cards={cards}
                                setCards={setCards}
                            />
                        </div>
                        <div className="bg-gray-100 px-6 py-4 flex justify-end">
                            <button
                                onClick={handleCloseCreateCardModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewCard;
