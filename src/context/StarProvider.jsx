import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import StarContext from './StarContext';

const StarProvider = ({ children }) => {
  const [star, setStar] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getStar = async () => {
      const endPoint = 'https://swapi.dev/api/planets';
      const result = await fetch(endPoint);
      const { results } = await result.json();
      const returnStar = await results.map((item) => {
        delete item.residents;
        return item;
      });
      setStar(returnStar);
    };
    getStar();
  }, []);
  const contextValue = {
    star,
    filtered,
    setFiltered,
  };
  return (
    <StarContext.Provider value={ contextValue }>
      {children}
    </StarContext.Provider>
  );
};

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
