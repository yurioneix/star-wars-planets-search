import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsFilteredByName, setPlanetsFilteredByName] = useState([]);
  const [planetsFilteredByNumber, setPlanetsFilteredByNumber] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const starWarsPlanets = async () => {
      const url = 'https://swapi.dev/api/planets';
      const fetchPlanets = await fetch(url);
      const response = await fetchPlanets.json();
      const { results } = response;
      results.forEach((result) => delete result.residents);
      setPlanets(results);
      setPlanetsFilteredByName(results);
      setPlanetsFilteredByNumber(results);
    };
    starWarsPlanets();
  }, []);

  const filterPlanetsByNumber = ({ column, comparison,
    valueFilter }, filteredByNumber) => filteredByNumber.filter((planet) => {
    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > Number(valueFilter);
    case 'menor que':
      return Number(planet[column]) < Number(valueFilter);
    case 'igual a':
      return Number(planet[column]) === Number(valueFilter);
    default:
      return true;
    }
  });

  useEffect(() => {
    let filteredByNumber = planets;
    filters.forEach((filter) => {
      filteredByNumber = filterPlanetsByNumber(filter, filteredByNumber);
    });
    setPlanetsFilteredByNumber(filteredByNumber);
  }, [filters]);

  return (
    <PlanetContext.Provider
      value={ {
        planets,
        setPlanets,
        planetsFilteredByName,
        setPlanetsFilteredByName,
        planetsFilteredByNumber,
        setPlanetsFilteredByNumber,
        filters,
        setFilters,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
