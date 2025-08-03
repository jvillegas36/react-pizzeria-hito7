import React, { useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { email, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Seguro que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
        Swal.fire("Sesión cerrada", "Hasta pronto!", "success");
      }
    });
  };

  return (
    <section className="my-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black">
              <div className="card-body p-md-1">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-1">
                    <img
                      src="/src/assets/img/imgPizza.avif"
                      className="img-fluid"
                      alt="Imagen Pizza"
                    />
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-6 order-2 order-lg-2">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Perfil del Usuario
                    </p>

                    <form onSubmit={cerrarSesion} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0 text-start">
                          <label htmlFor="ControlInput1" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            value={email}
                            className="form-control"
                            id="ControlInput1"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-5">
                        <button type="submit" className="btn btn-danger btn-lg">
                          Cerrar Sesión
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;