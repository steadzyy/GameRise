import React, { useEffect, useState } from "react";
import gameRise from "../helper/axios";
import formatRupiah from "../helper/formatRupiah";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DevCards = () => {
  const [game, setGame] = useState([]);

  async function getGames() {
    const { data } = await gameRise({
      url: "/games",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    // console.log(data);
    setGame(data);
  }

  async function deleteProduct(id) {
    try {
      let { data } = await gameRise({
        url: `/games/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      getGames()

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
    getGames();
  }, []);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Price</th>
              <th>Genre</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {game.map((item) => {
              return (
                <tr key={item.id}>
                  <th></th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.imageUrl} alt="foto" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.price === 0 && (
                      <p className="card-title">Free To Play</p>
                    )}
                    {item.price !== 0 && (
                      <p className="card-title">{formatRupiah(item.price)}</p>
                    )}
                  </td>
                  <td>{item.Genre.name}</td>
                  <th>
                    <Link to={`/editgames/${item.id}`}>
                      <button className="btn btn-primary btn-xs">Edit</button>
                    </Link>
                    <button className="btn btn-error btn-xs ml-3" onClick={()=>{
                      deleteProduct(item.id)
                    }}>
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DevCards;
