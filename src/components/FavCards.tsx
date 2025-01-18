import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import CustomPagination from "./tools/CustomPagination";
import { UserTools, useUser } from "../hooks/useUser";
import LikeButton from "./tools/LikeButton";
import { userLikes } from "../services/cardsService";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface FavCardsProps {

}

const FavCards: FunctionComponent<FavCardsProps> = () => {
    let userTools = useContext(UserTools);
    let { user } = useUser()
    let [isLoading, setIsLoading] = useState<boolean>(true)
    const [likedCards, setLikedCards] = useState<Card[]>([]);
    const navigate: NavigateFunction = useNavigate()


    // Pagenation
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCards = likedCards.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchLikedCards = async () => {
            const liked: Card[] = await userLikes(user?._id as string);
            setLikedCards(liked);
            setTimeout(() => {
                if (liked.length == 0) {
                    setIsLoading(false)
                }
            }, 3000)

        };
        fetchLikedCards();
    }, [user?._id]);






    return (<section className="text-center">
        <h2><span className="logo">{user?.name.first} {user?.name.last}</span> Favorite Cards</h2>
        {likedCards.length > 5 && <div className="topPageNav mt-5">< CustomPagination
            totalItems={likedCards.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
        /></div>}
        <div className="cards">
            {currentCards.length > 0 ? currentCards.map((card: Card) => {
                isLoading && setIsLoading(false)
                return <div className="card" key={card._id}>
                    <i onClick={() => navigate(`/card-data/${card._id}`)} className="fa-solid fa-eye"></i>
                    <div className="cardTools">
                        <a className="phone" href={`tel:${card.phone}`}><i className="fa-solid fa-phone"></i></a>
                        {userTools.user.loggedIn && <LikeButton cardId={card._id as string} userId={user?._id as string} />}
                    </div>

                    <img
                        src={card.image.url}
                        alt={card.image.alt}
                        title={card.title}
                        onError={(e) => {
                            e.currentTarget.src = "/Images/CardDefaultPerson.png";
                        }}
                    />
                    <div className="card-data">
                        <h3>{card.title}</h3>
                        <h5>{card.subtitle}</h5>
                        <hr />
                        <p><strong>Phone:</strong> {card.phone}</p>
                        <p><strong>Address:</strong> {card.address.country}, {card.address.city}, {card.address.street}</p>
                        <p><strong>Card Number: </strong>{card.bizNumber}</p>
                    </div>
                </div>
            }) : isLoading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>}

            {!isLoading && likedCards.length <= 0 && currentCards.length <= 0 && <div className=" mt-5 container" id="searchError"><h1 className="text-warning">You Have No Favorites! You should Like some business to see them here :\</h1></div>}
        </div>

        {likedCards.length > 5 && < CustomPagination
            totalItems={likedCards.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
        />}
    </section>);


}

export default FavCards;