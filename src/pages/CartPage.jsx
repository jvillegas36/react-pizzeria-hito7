import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const CartPage = () => {
  const {carro,total,sumaPizza, restaPizza} = useContext(CartContext)
  const { token } = useContext(UserContext)

  return (
    <div className="my-3 card container ">
      <div className="d-flex justify-content-center">
        <div className="row col-6 ">
          <h3 className="text-start fw-bold">Detalle del pedido</h3>

          <ul className="ulFormat">
            {carro.map((piz) => (
              <li key={piz.id} className="my-3">
                <img className="imgLi col-2" src={piz.img} alt={piz.name} />
                <label className="col-3 text-start ms-2 text-capitalize fw-semibold">
                  {piz.name}
                </label>
                <label className="col-3 fw-semibold">
                  $ {Intl.NumberFormat().format(piz.price)}
                </label>

                <button
                  className="btn btn-outline-danger btnAncho"
                  onClick={() => restaPizza(piz.id)}
                >
                  -
                </button>
                <label className="col-1 fw-bold">{piz.quantity}</label>
                <button
                  className="btn btn-outline-primary btnAncho"
                  onClick={() => sumaPizza(piz.id)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-start fw-bold">
            Total : $ {Intl.NumberFormat().format(total)}
          </h2>
          <button className="my-5 col-3 btn btn-primary fw-bold" disabled={!token}>Pagar</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
