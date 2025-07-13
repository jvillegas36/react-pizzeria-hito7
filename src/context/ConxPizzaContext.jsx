import { createContext, useCallback, useEffect, useState } from "react";

export const ConxPizzaContext = createContext();

const ConxPizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectPizzaId, setSelectPizzaId] = useState(null);

  const fetchPizzas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/pizzas");
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      setError(error.mesage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  const fetchById = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (!response.ok) throw new Error("Error al buscar pizza");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  const selectPizza = (id) => {
    setSelectPizzaId(id);
  };

  return (
    <ConxPizzaContext.Provider
      value={{
        pizzas,
        loading,
        error,
        fetchPizzas,
        fetchById,
        selectPizzaId,
        selectPizza,
      }}
    >
      {children}
    </ConxPizzaContext.Provider>
  );
};

export default ConxPizzaProvider;
