import React, { useContext } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { CartContext } from "../context/CartContext";
import { ConxPizzaContext } from "../context/ConxPizzaContext";

const HomePage = () => {
  
  const { addToCart } = useContext(CartContext)
  const { pizzas, loading, error } = useContext(ConxPizzaContext);
  
  if (loading) return <p>Cargando Pizzas...</p>
  if (error) return <p>Error: { error}</p>

  return (
    <>
      <Header />     
      <main className="container">
        <section className="row" >
          {pizzas.map(piz =>
           <article key={piz.id}  className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 my-4"  >
              <CardPizza
                id={piz.id} 
                name={piz.name}
                price={piz.price}
                ingredients={piz.ingredients}
                img={piz.img}
                pizzaAdd={()=> addToCart(piz)}
            />
          </article>
          )
            
        }
        </section>
      </main>
    </>
  );
};

export default HomePage;
