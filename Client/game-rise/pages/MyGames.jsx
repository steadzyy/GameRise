import React, { useEffect } from 'react'
import gameRise from '../src/helper/axios';
import Cards from '../src/components/Cards';

const MyGames = ({game}) => {
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
        <Cards games={{ games: game }} />
      </div>
    </>
  );
};

export default MyGames