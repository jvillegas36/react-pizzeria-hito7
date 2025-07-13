import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ConxPizzaContext } from "../context/ConxPizzaContext";
import { useParams } from "react-router-dom";

const PizzaPage = () => {

  const { id } = useParams();
  const { fetchById } = useContext(ConxPizzaContext);
  const { addToCart } = useContext(CartContext);
  const [pizza, setPizza] = useState([]);

  useEffect(() => {
    const obtenerPizza = async () => {
      if (!id) return;
      const data = await fetchById(id);
      setPizza(data);
    };
    obtenerPizza();
  }, [id, fetchById]);

  if (!pizza) return <p>No se encontró la pizza.</p>;

  return (
    <div className="d-flex justify-content-center">
      <div className="col-8 card mx-2 my-5 text-dark shadow">
        <div className="d-flex justify-content-center">
          <div className="col-8">
            <div className="row  justify-content-center">
              <img src={pizza.img} className="imgPizza" />
            </div>
            <div className="row text-capitalize fw-semibold mt-3">
              Pizza: {pizza.name}
            </div>

            <div className="row mt-3">
              Precio: $ {Intl.NumberFormat().format(pizza.price)}
            </div>

            <div className="row mt-3 text-capitalize">
              Ingredientes: {pizza.ingredients?.join(", ")}
            </div>
            <div className="row mt-3 text-start fs-6 fw-lighter">
              {pizza.desc}
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="btn btn-success btn-outline-info"
                onClick={() => addToCart(pizza)}
              >
                Añadir a Carrito 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaPage;
