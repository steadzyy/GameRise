import React, { useEffect, useState } from "react";
import gameRise from "../src/helper/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [genre, setGenre] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [getGenre, setGetGenre] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  async function editGames(e) {
    e.preventDefault();
    try {
      // console.log(name, "name" , description, 'desc', price, 'price', stock, 'stock', imgUrl, 'img', categoryId, 'cat');
      let data = await gameRise({
        url: `/games/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          title: title,
          description: description,
          price: price,
          GenreId: genre,
          imageUrl: imageUrl,
        },
      });
      console.log(data, "aaaaaaa");
      navigate("/devpage");
    } catch (error) {
      console.log(error);
    }
  }

  async function getGenreId() {
    try {
      let response = await gameRise({
        url: "/genre",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setGetGenre(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getGamesById() {
    try {
      let { data } = await gameRise({
        url: `/games/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data, "DATA GAMEEE");
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setGenre(data.genre);
      setImageUrl(data.imageUrl);
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
    getGenreId();
    getGamesById();
  }, []);
  
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-5">Edit Your Games!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={editGames}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Genre</span>
                </label>
                <select
                  onChange={(e) => setGenre(e.target.value)}
                  className="form-select"
                  required=""
                  value={genre} 
                >
                  <option disabled>--Pilih Genre Game Anda--</option>
                  {getGenre.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ImageUrl</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Update Your Games!
                </button>
              </div>
              <Link to="/devpage">
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-error">
                    Cancel
                  </button>
                </div>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPage;
