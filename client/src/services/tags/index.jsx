import axios from "axios";

export const fetchTagsByUserId = async (userId) => {
    try {
        const response = await axios.get(
            `http://localhost:8080/tags/${userId}`
        );
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tags :", error);
        throw error;
    }
};

export const createTag = async (tagName, userId) => {
    try {
        const response = await axios.post("http://localhost:8080/tags", {
            name: tagName,
            userId: userId,
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du tag :", error);
        throw error;
    }
};

export const addTagsByCard = async (cardId, tagId) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/cards/add-card-tag",
            {
                cardId,
                tagId,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du tag à la carte :", error);
        throw error;
    }
};

export const removeTagsByCard = async (cardId, tagId) => {
    try {
        const response = await axios.delete(
            `http://localhost:8080/cards/remove-card-tag/${tagId}`,
            {
                data: {
                    cardId,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la suppression du tag de la carte :",
            error
        );
        throw error;
    }
};
