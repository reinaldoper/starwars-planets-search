import React, { useContext } from 'react';
import StarContext from '../context/StarContext';

const Home = () => {
  const { star } = useContext(StarContext);
  const startReturn = star.map((item, index) => (
    <tbody key={ index }>
      <tr>
        <td>{item.name}</td>
        <td>{item.rotation_period}</td>
        <td>{item.orbital_period}</td>
        <td>{item.diameter}</td>
        <td>{item.climate}</td>
        <td>{item.gravity}</td>
        <td>{item.terrain}</td>
        <td>{item.surface_water}</td>
        <td>{item.population}</td>
        <td>{item.films}</td>
        <td>{item.created}</td>
        <td>{item.edited}</td>
        <td>{item.url}</td>
      </tr>
    </tbody>
  ));
  return (
    <div>
      <table border="1">
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
            <th>URL</th>
          </tr>
        </thead>
        {startReturn}
      </table>
    </div>
  );
};

export default Home;
/* return (
        <tbody key={ id }>
          <tr>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{valor}</td>
            <td>{name}</td>
            <td>{convertMoeda}</td>
            <td>{convertReal}</td>
            <td>Real</td>
            <td> */
