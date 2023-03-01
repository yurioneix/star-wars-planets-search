import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const starWarsPlanets = async () => {
      const url = 'https://swapi.dev/api/planets';
      const fetchPlanets = await fetch(url);
      const response = await fetchPlanets.json();
      const { results } = response;
      results.forEach((result) => delete result.residents);
      setPlanets(results);
    };
    starWarsPlanets();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets, setPlanets } }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
