import React from "react";

const Header = () => {
  return (

    <header className="header-cabecera ">
      <div className="header-content mx-0 row justify-content-center">
        <div className="row align-items-end">
          <h1>¡Pizzería Mamma Mia!</h1>
        </div>

        <div className="row ">
          <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
        </div>
        <hr className="header-hr"/>
      </div>
    </header>
  );
};

export default Header;
