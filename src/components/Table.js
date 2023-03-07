import { useContext, useState, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const starWarsPlanets = useContext(PlanetContext);
  const {
    planets,
    setPlanetsFilteredByName,
    planetsFilteredByName,
    filters,
    setFilters,
    populationFilter,
    orbitalFilter,
    diameterFilter,
    rotationFilter,
    surfaceFilter,
  } = starWarsPlanets;

  console.log(planets);

  const [inputPlanets, setInputPlanets] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  useEffect(() => {
    const filteredPlanets = planets.filter(
      (planet) => planet.name.toLowerCase().includes(inputPlanets.toLowerCase()),
    );
    setPlanetsFilteredByName(filteredPlanets);
  }, [planets, inputPlanets, setPlanetsFilteredByName]);

  const handleClick = () => {
    setFilters([...filters, {
      column,
      comparison,
      valueFilter,
    }]);
  };

  return (
    <>
      <div>
        <label htmlFor="input-planet">
          <input
            type="text"
            id="input-planet"
            value={ inputPlanets }
            name="filteredPlanets"
            data-testid="name-filter"
            onChange={ (e) => setInputPlanets(e.target.value) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="column-filter">
          <select
            id="column-filter"
            data-testid="column-filter"
            onChange={ (e) => setColumn(e.target.value) }
            value={ column }
          >
            {
              !populationFilter
            && (
              <option
                value="population"
              >
                population
              </option>
            )
            }
            {
              !orbitalFilter
              && (
                <option
                  value="orbital_period"
                  disabled={ orbitalFilter }
                >
                  orbital_period
                </option>
              )
            }
            {
              !diameterFilter
              && (
                <option
                  value="diameter"
                  disabled={ diameterFilter }
                >
                  diameter
                </option>
              )
            }
            {
              !rotationFilter
              && (
                <option
                  value="rotation_period"
                  disabled={ rotationFilter }
                >
                  rotation_period
                </option>
              )
            }
            {
              !surfaceFilter
              && (
                <option
                  value="surface_water"
                  disabled={ surfaceFilter }
                >
                  surface_water

                </option>
              )
            }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            onChange={ (e) => setComparison(e.target.value) }
            value={ comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input
            id="value-filter"
            data-testid="value-filter"
            type="number"
            value={ valueFilter }
            onChange={ (e) => setValueFilter(e.target.value) }
          />
        </label>
        <button
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
        {filters.map((filter, index) => (
          <p key={ index }>
            {`${filter.column} ${filter.comparison} ${filter.valueFilter}`}
          </p>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        {
          planetsFilteredByName.length > 0
            ? planetsFilteredByName.map((filteredPlanet) => (
              <tbody key={ filteredPlanet.name }>
                <tr>
                  <td>{filteredPlanet.name}</td>
                  <td>{filteredPlanet.rotation_period}</td>
                  <td>{filteredPlanet.orbital_period}</td>
                  <td>{filteredPlanet.diameter}</td>
                  <td>{filteredPlanet.climate}</td>
                  <td>{filteredPlanet.gravity}</td>
                  <td>{filteredPlanet.terrain}</td>
                  <td>{filteredPlanet.surface_water}</td>
                  <td>{filteredPlanet.population}</td>
                  <td>{filteredPlanet.films}</td>
                  <td>{filteredPlanet.created}</td>
                  <td>{filteredPlanet.edited}</td>
                  <td>{filteredPlanet.url}</td>
                </tr>
              </tbody>
            ))
            : planets?.map((planet) => (
              <tbody key={ planet.name }>
                <tr>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>{planet.films}</td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              </tbody>
            ))
        }
      </table>
    </>
  );
}
