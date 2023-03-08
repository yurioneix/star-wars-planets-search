import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function Table() {
  const starWarsPlanets = useContext(PlanetContext);
  const {
    planetsFilteredByNumber,
    filters,
    setFilters,
  } = starWarsPlanets;

  const [inputPlanets, setInputPlanets] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterStrings, setFilterStrings] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const filterByName = (arrPlanet) => arrPlanet.filter(
    (planet) => planet.name.toLowerCase().includes(inputPlanets.toLowerCase()),
  );

  const handleClick = () => {
    setFilters([...filters, {
      column,
      comparison,
      valueFilter,
    }]);

    const newFilterStrings = filterStrings.filter((filter) => column !== filter);
    setFilterStrings(newFilterStrings);
    setColumn(newFilterStrings[0]);
  };

  const removeAllFilters = () => {
    setFilters([]);
  };

  const removeFilter = (columnToRemove) => {
    const newFilter = filters.filter((filter) => filter.column !== columnToRemove);
    setFilters(newFilter);
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
              filterStrings?.map((filter) => (
                <option value={ filter } key={ filter }>
                  {filter}
                </option>
              ))
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
        <button
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover filtros
        </button>
        {filters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            {`${filter.column} ${filter.comparison} ${filter.valueFilter}`}
            <button onClick={ () => removeFilter(filter.column) }>Remover</button>
          </div>
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
          filterByName(planetsFilteredByNumber).map((filteredPlanet) => (
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
        }
      </table>
    </>
  );
}
