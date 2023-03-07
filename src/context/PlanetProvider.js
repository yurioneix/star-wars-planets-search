import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsFilteredByName, setPlanetsFilteredByName] = useState([]);
  const [planetsFilteredByNumber, setPlanetsFilteredByNumber] = useState([]);
  const [filters, setFilters] = useState([]);

  const [populationFilter, setPopulationFilter] = useState(false);
  const [orbitalFilter, setOrbitalFilter] = useState(false);
  const [diameterFilter, setDiameterFilter] = useState(false);
  const [rotationFilter, setRotationFilter] = useState(false);
  const [surfaceFilter, setsurfaceFilter] = useState(false);

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

  const filterPlanetsByNumber = ({ column, comparison, valueFilter }) => {
    const filteredByNumber = planetsFilteredByNumber.filter((planet) => {
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
    return filteredByNumber;
  };

  useEffect(() => {
    console.log(filters);
    filters.forEach((filter) => {
      setPlanetsFilteredByNumber(filterPlanetsByNumber(filter));
      setPlanets(filterPlanetsByNumber(filter));

      switch (filter.column) {
      case 'population':
        setPopulationFilter(true);
        break;
      case 'orbital_period':
        setOrbitalFilter(true);
        break;
      case 'diameter':
        setDiameterFilter(true);
        break;
      case 'rotation_period':
        setRotationFilter(true);
        break;
      case 'surface_water':
        setsurfaceFilter(true);
        break;
      default:
        return true;
      }
    });
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
        populationFilter,
        orbitalFilter,
        diameterFilter,
        rotationFilter,
        surfaceFilter,
      } }
    >
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
