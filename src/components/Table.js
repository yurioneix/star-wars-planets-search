import { useContext, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';
import useInputPlanets from '../hooks/useInputPlanets';

export default function Table() {
  const starWarsPlanets = useContext(PlanetContext);
  const input = useInputPlanets('');
  const { planets, setPlanetsFilteredByName, planetsFilteredByName } = starWarsPlanets;
  const { inputPlanets } = input;

  useEffect(() => {
    const filteredPlanets = planets.filter(
      (planet) => planet.name.includes(inputPlanets),
    );
    setPlanetsFilteredByName(filteredPlanets);
  }, [planets, inputPlanets, setPlanetsFilteredByName]);

  return (
    <>
      <div>
        <label htmlFor="input-planet">
          <input
            type="text"
            id="input-planet"
            value={ input.inputPlanets }
            name="filteredPlanets"
            data-testid="name-filter"
            onChange={ (e) => input.handleChange(e) }
          />
        </label>
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
            )) : planets?.map((planet) => (
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
