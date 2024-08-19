import { createSlice } from "@reduxjs/toolkit";
import gameRise from "../../helper/axios";

export const gameSlice = createSlice({
  name: "games",
  initialState: {
    loading: false,
    games: [],
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setGames: (state, { payload }) => {
      state.games = payload;
    },
  },
});

export const { setLoading, setGames } = gameSlice.actions;

export default gameSlice.reducer;

export const fetchGames = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      console.log("data", "fetchGames")
      const { data } = await gameRise.get("/pub/games");
      console.log(data)
      dispatch(setGames(data));
    } catch (error) {
      console.log(error, "Error ----");
    } finally {
      dispatch(setLoading(false));
    }
  };
};
export const fetchGamesById = (params) => {
  return async function (dispatch) {
    dispatch(setLoading(true));
    const { data } = await gameRise.get(`/games/${params}`);
    dispatch(setGames(data));
    dispatch(setLoading(false));
  };
};
