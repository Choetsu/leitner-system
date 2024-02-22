import axios from "axios";

export const fetchCards = async (tags, userId) => {
    try {
        const response = await axios.get("http://localhost:8080/cards", {
            params: {
                tags,
                userId,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des cartes :", error);
        throw error;
    }
};

export const createCard = async (card) => {
    try {
        const response = await axios.post("http://localhost:8080/cards", card);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création de la carte :", error);
        throw error;
    }
};

export const fetchCardById = async (cardId) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/cards/card/${cardId}`
        );
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la carte :", error);
        throw error;
    }
};

export const generateQuizz = async (userId, date) => {
    try {
        const response = await axios.get("http://localhost:8080/cards/quizz", {
            params: {
                userId,
                date,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la génération du quizz :", error);
        throw error;
    }
};

export const deleteCard = async (cardId) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/cards/${cardId}`
        );
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression de la carte :", error);
        throw error;
    }
};

export const answerQuizz = async (cardId, userId, isValid) => {
    try {
        const response = await axios.patch(
            `http://localhost:8080/cards/${cardId}/answer`,
            {
                userId,
                isValid,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la réponse au quizz :", error);
        throw error;
    }
};
