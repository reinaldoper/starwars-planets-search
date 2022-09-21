import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

const Home = () => {
  const [name, setName] = useState('');
  const { star } = useContext(StarContext);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState('population');
  const [igualdate, setIgualdate] = useState('maior que');
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setFiltered(star.filter((item) => item.name.includes(name)));
  }, [name, star]);

  const filteredValue = () => {
    if (igualdate === 'maior que') {
      const ver = star.filter((item) => Number(item[selected]) > Number(number));
      setFiltered(ver);
    } if (igualdate === 'menor que') {
      const ver1 = star.filter((item) => Number(item[selected]) < Number(number));
      setFiltered(ver1);
    }
    if (igualdate === 'igual a') {
      const ver2 = star.filter((item) => Number(item[selected]) === Number(number));
      setFiltered(ver2);
    }
  };

  const startReturn = filtered.map((item, index) => (
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
      <select
        name="selected"
        value={ selected }
        data-testid="column-filter"
        onChange={ (e) => setSelected(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="igualdate"
        value={ igualdate }
        data-testid="comparison-filter"
        onChange={ (e) => setIgualdate(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        max="10000000"
        name="number"
        value={ number }
        onChange={ (e) => setNumber(e.target.value) }
      />
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        value={ name }
        onChange={ (e) => setName(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filteredValue }
      >
        Filtrar
      </button>
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
