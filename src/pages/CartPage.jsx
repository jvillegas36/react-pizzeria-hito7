import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const CartPage = () => {
  const { carro, total, sumaPizza, restaPizza, limpiarCarro } =
    useContext(CartContext);
  const { token, createCheckout } = useContext(UserContext);

  const handlePagar = async () => {
    const pedido = {
      items: carro.map((p) => ({
        id: p.id,
        cantidad: p.quantity,
      })),
      total,
    };

    const exito = await createCheckout(pedido);

    if (exito) {
      Swal.fire({
        title: "¡Pedido realizado con éxito!",
        icon: "success",
        draggable: true,
      });

      limpiarCarro();
    }
  };

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
          <button
            className="my-5 col-3 btn btn-primary fw-bold"
            onClick={handlePagar}
            disabled={!token || total === 0}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
