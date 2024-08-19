import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gameRise from "../src/helper/axios";
import formatRupiah from "../src/helper/formatRupiah";
import ModalAI from "../src/components/ModalAI";
import Swal from "sweetalert2";

const DetailPage = () => {
  const [details, setDetails] = useState({});
  const [buy, setBuy] = useState({});
  const { id } = useParams();
  //   console.log(params);

  async function getGamesById() {
    try {
      const { data } = await gameRise({
        url: `/games/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      // console.log(data.product);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(id);
  // async function buyGames(){
  //   try {
  //     const { data } = await gameRise({
  //       url: `/games/${id}`,
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },data:{
  //         id:id
  //       }
  //     });
  //     // setBuy(data)
  //     console.log(data, 'DAAAATAA');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handlePayment = async () => {
    // console.log(`masookkk-----------`);
    // console.log(id, "FARELLLLLLL");
    const { data } = await gameRise({
      url: `/payment`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }, data: {
        id: id,

      }
    });
    console.log(data, "<< data");

    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    // window.snap.pay(data.transactionToken, {
    // console.log(window.snap);
    window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
            try {
              const { data } = await gameRise({
                url: `/payment/${id}`,
                method: "PATCH",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                }, data: {
                  id: id,
                  status: status,
                }
              });
                // console.log(data);
                // handleGetMyTicket()
            } catch (error) {
                console.log(error);
            }
        },

        onPending: function (result) {
          /* You may add your own implementation here */
          Swal.fire({
              title: "Close!",
              text: "waiting your payment!",
              icon: "error",
              confirmButtonText: "ok",
          });
          console.log(result);
      },
      onError: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          Swal.fire({
              title: "Close!",
              text: "payment failed!",
              icon: "error",
              confirmButtonText: "ok",
          });
      },
      onClose: function () {
          /* You may add your own implementation here */
          Swal.fire({
              title: "Close!",
              text: "you closed the popup without finishing the payment",
              icon: "error",
              confirmButtonText: "ok",
          });
      }
  });
};

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
            <button className="btn btn-primary" onClick={() => handlePayment()}>BUY NOW $</button>
            <ModalAI gameName={details.title} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
