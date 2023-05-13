import { MyCardsPageCard } from "./MyCardsPageCard";
import axios, { all } from "axios";
import { useState, useEffect, useCallback } from "react";

export const MyCardsPage = ({ user }) => {
  const [allUserCards, setAllUserCards] = useState([]);

  const fetchAllUserCards = useCallback(async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user-cards/allusercards",
        { params: { userId } }
      );
      setAllUserCards(response.data.data);
    } catch (error) {
      console.error("Error fetching available players:", error);
    }
  });

  useEffect(() => {
    user && fetchAllUserCards(user.id);
  }, [user]);

  useEffect(() => {
    console.log(allUserCards);
  }, [allUserCards]);

  return allUserCards ? (
    <div className="card-container">
      {allUserCards.map((card) => (
        <div key={card.id}>
          <MyCardsPageCard cardId={card.card_id} />
        </div>
      ))}
    </div>
  ) : null;
};
