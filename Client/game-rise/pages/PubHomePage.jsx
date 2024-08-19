import React, { useEffect, useState } from "react";
import Cards from "../src/components/Cards";
import { useSelector, useDispatch } from 'react-redux';
import {fetchGames} from '../src/features/game/gameSlice'
import Carousel from "../src/components/Carousel";

const PubHomePage = () => {
  const game = useSelector((state) => state.game);
  // console.log(game, "TESTTT");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGames());
  }, []);
  if (game.loading) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      <Carousel games={game}/>

      <div className="flex justify-center">
        <Cards games={game} />
      </div>
    </>
  );
};

export default PubHomePage;
