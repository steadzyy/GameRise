import React, { useState } from "react";
import Swal from "sweetalert2";
import gameRise from "../helper/axios";
import { useParams } from "react-router-dom";

const ModalAI = ({ gameName }) => {
  const [geminiData, setGeminiData] = useState(null);
  const { id } = useParams();

  const fetchGeminiAI = async () => {
    try {
      document.getElementById("my_modal_4").showModal();
      const { data } = await gameRise({
        url: `/which-is-better/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setGeminiData(data);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error Get Data.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <>
      <button className="btn btn-primary ml-5" onClick={fetchGeminiAI}>
        MORE LIKE THIS
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">{`OTHER GAMES LIKE ${gameName}`}</h3>
          {geminiData ? (
            <div className="flex flex-col gap-2 mt-8">
              {geminiData.map((data) => (
                <div className="grid grid-cols-2 gap-2">
                  <h1 className="font-bold">{data.name}</h1>
                  <p>{data.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                document.getElementById("my_modal_4").close();
                setGeminiData(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalAI;
