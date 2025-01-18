import { getAllCards, getCardById } from "../../../services/cardsService";






export async function likesAnalyst() {
    try {
        let response = await getAllCards()
        let cards = await response.data

        const topCards = cards
            .sort((a: any, b: any) => b.likes.length - a.likes.length)
            .slice(0, 3)


        return topCards

    } catch (error) {
        console.log(error);
    }
}