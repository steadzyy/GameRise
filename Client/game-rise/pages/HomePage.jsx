import React, { useEffect, useState } from "react";
import Cards from "../src/components/Cards";
import gameRise from "../src/helper/axios";
import SquareButton from "../src/components/SquareButton";
import Swal from "sweetalert2";

const HomePage = () => {
  const [games, setGames] = useState([]);

  async function getDataGames() {
    try {
      const { data } = await gameRise({
        url: "/games",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data, "<<<<");
      setGames(data);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }
  useEffect(() => {
    getDataGames();
  }, []);

  return (
    <>
      
      <div className="flex justify-center">
        <Cards games={{ games: games }} />
      </div>
    </>
  );
};

export default HomePage;
