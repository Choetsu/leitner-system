import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { fetchCardById, deleteCard } from "../../services/cards";
import {
    fetchTagsByUserId,
    addTagsByCard,
    removeTagsByCard,
} from "../../services/tags";

function DetailCard() {
    const [card, setCard] = useState({});
    const [tags, setTags] = useState([]);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showRemovePopup, setShowRemovePopup] = useState(false);
    const [selectedTagId, setSelectedTagId] = useState(null);
    const cardId = useParams().id;
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            const fetchedCard = await fetchCardById(cardId);
            setCard(fetchedCard);
            const tags = await fetchTagsByUserId(userId);
            const newTags = tags.filter(
                (tag) => !fetchedCard.tags.map((t) => t.id).includes(tag.id)
            );
            setTags(newTags);
        };

        fetchData();
    }, [cardId, userId]);

    const handleAddTag = async () => {
        const tagsAfterAddition = await fetchTagsByUserId(userId);
        const newTags = tagsAfterAddition.filter(
            (tag) => !card.tags.map((t) => t.id).includes(tag.id)
        );
        setTags(newTags);
        setShowAddPopup(true);
    };

    const handleRemoveTag = () => {
        setShowRemovePopup(true);
    };

    const handleCloseAddPopup = () => {
        setShowAddPopup(false);
    };

    const handleCloseRemovePopup = () => {
        setShowRemovePopup(false);
    };

    const handleTagSelection = async (selectedTag) => {
        await addTagsByCard(cardId, selectedTag);
        setShowAddPopup(false);
        const fetchedCard = await fetchCardById(cardId);
        setCard(fetchedCard);
    };

    const handleTagRemoval = async () => {
        await removeTagsByCard(cardId, selectedTagId);
        setShowRemovePopup(false);
        const updatedCard = await fetchCardById(cardId);
        setCard(updatedCard);
        setSelectedTagId(null);
    };

    const handleCardDeletion = async () => {
        await deleteCard(cardId);
        window.location.replace("/cards");
    };

    return (
        <div className="mx-auto mt-8 p-4 bg-white rounded-lg shadow max-w-5xl">
            <div className="flex items-center mb-4">
                <Link
                    to="/cards"
                    className="flex items-center text-blue-500 hover:underline focus:outline-none"
                >
                    <ArrowLeftIcon className="w-6 h-6 mr-2" />
                    Retour
                </Link>
                <button
                    onClick={handleCardDeletion}
                    className="ml-auto bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                >
                    <TrashIcon className="w-full h-5" />
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4 break-words">
                Question :<span className="max-w-xl">{card.question}</span>
            </h1>
            <p className="mb-4 break-words">
                Réponse :<span className="max-w-xl">{card.answer}</span>
            </p>

            <p className="mb-4">Catégorie : {card.category}</p>
            <p className="mb-4">Dernière révision : {card.lastReviewedAt}</p>
            <div className="mb-4">
                {card.tags ? (
                    card.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                            {tag.name}
                        </span>
                    ))
                ) : (
                    <span>Pas de tags disponibles</span>
                )}
            </div>
            <button
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-4"
            >
                Ajouter un tag
            </button>
            <button
                onClick={handleRemoveTag}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none mr-4"
            >
                Supprimer un tag
            </button>

            {showAddPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            Sélectionner un tag à ajouter
                        </h2>
                        <select
                            onChange={(e) =>
                                handleTagSelection(e.target.value)
                            }
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
                        >
                            <option value="">Sélectionner un tag</option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleCloseAddPopup}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {showRemovePopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            Sélectionner un tag à supprimer
                        </h2>
                        <select
                            onChange={(e) => setSelectedTagId(e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm mb-4"
                        >
                            <option value="">Sélectionner un tag</option>
                            {card.tags &&
                                card.tags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </option>
                                ))}
                        </select>
                        <button
                            onClick={handleTagRemoval}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                        >
                            Supprimer
                        </button>
                        <button
                            onClick={handleCloseRemovePopup}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none ml-2"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailCard;
