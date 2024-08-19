import * as React from "react";
import Typography from "@mui/material/Typography";
import formatRupiah from "../helper/formatRupiah";
import { Link } from "react-router-dom";

export default function Cards({ games }) {
  // console.log(localStorage.token, '<<<<');
  return (
    <>
    
      <div className="container d-flex flex-wrap  mt-10 mb-10 justify-center card card-side  shadow-xl gap-10">
        {games.games.map((item) => (
          <div
            className="card card-compact bg-base-100 w-64 shadow-xl"
            key={item.id}
          >
            <figure>
              <img className="w-50 rounded max-h-72 object-top" src={item.imageUrl} alt="Games" /> 
            </figure>
            <div className="card-body">
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.Genre.name}
              </Typography>
              <h2 className="card-title">{item.title}</h2>
                {item.price === 0 && <h6 className="card-title">Free To Play</h6>}
                {item.price !== 0 && <h6 className="card-title">{formatRupiah(item.price)}</h6>}
           
              <div className="card-actions justify-start">
                {
                  !localStorage.access_token ? (
                    <Link to={`/pub/games/${item.id}`}>
                <button className="btn btn-primary">BUY NOW</button>
                </Link>
                  ) : (
                    <Link to={`/games/${item.id}`}>
                <button className="btn btn-primary">BUY NOW</button>
                </Link>
                  )
                }
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
