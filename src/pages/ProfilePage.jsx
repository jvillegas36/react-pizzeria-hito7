import React, { useState } from "react";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const [email, setEmail] = useState("");

  const validarDatos = (e) => {
    e.preventDefault();
    if (!email.trim() ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe Ingresar todos los campos, para continuar!",
      });
      return
    
    } else {     
      Swal.fire({
        title: "Salida con exito!",
        icon: "success",
        draggable: true,
      });
            
      setEmail('');
      return
    }
    

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
                      Cierre de sesión
                    </p>

                    <form onSubmit={validarDatos} className="mx-1 mx-md-4">
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
                            placeholder="name@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 mt-5">
                        <button type="submit" className="btn btn-primary btn-lg">
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
