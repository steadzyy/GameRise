import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gameRise from "../src/helper/axios";
import formatRupiah from "../src/helper/formatRupiah";

const PubDetailPage = () => {
  const [details, setDetails] = useState({});
  const {id} = useParams();
  //   console.log(params);

  async function getGamesById() {
    const { data } = await gameRise({
      url: `/pub/games/${id}`,
      method: "GET",
    });
    // console.log(data, '<<<<< DETAIL JOS');
    setDetails(data);
  }
  useEffect(() => {
    getGamesById();
    // console.log(details), 'aaaaa';
  }, [id]);
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={details.imageUrl}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="ml-5">
            <h1 className="text-5xl font-bold">{details.title}</h1>
            <hr className="mt-3" />
            <p className="py-5">{details.description}</p>
            <p className="py-4 mb-5">{formatRupiah(details.price)}</p>
            <Link to='/login' >
              <button className="btn btn-primary">LOGIN FIRST</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PubDetailPage;
