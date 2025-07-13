import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section id="container-noPage">
      <h1 className="notPage"> 404</h1>
      <h3 className="sub-notPage">¡Ups! página no encontrada</h3>
      <article className="art-notPage">
        {" "}
        Lo sentimos, la página que estas buscando no fue encontrada.
      </article>

      <div className="buttons">
        <Link
          className="btn btn-lg btn-warning btn-outline-success my-3"
          to="/"
        >
          Regresar
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
