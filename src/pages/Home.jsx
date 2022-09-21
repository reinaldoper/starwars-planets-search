import React, { useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

const Home = () => {
  const [name, setName] = useState('');
  const { star } = useContext(StarContext);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState('population');
  const [igualdate, setIgualdate] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [myForm, setMyForm] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water',
  ]);
  const [listFilter, setListFilter] = useState({
    filterede: [],
  });
  useEffect(() => {
    setFiltered(star.filter((item) => item.name.includes(name)));
  }, [name, star]);

  const filteredValue = () => {
    const valor = { igualdate, selected, number };
    if (igualdate === 'maior que') {
      const ver = filtered.filter((item) => Number(item[selected]) > Number(number));
      setFiltered(ver);
      setListFilter((state) => ({
        ...state,
        filterede: [...state.filterede, valor],
      }));
    } if (igualdate === 'menor que') {
      const ver = filtered.filter((item) => Number(item[selected]) < Number(number));
      setFiltered(ver);
      setListFilter((state) => ({
        ...state,
        filterede: [...state.filterede, valor],
      }));
    }
    if (igualdate === 'igual a') {
      const ver = filtered.filter((item) => Number(item[selected]) === Number(number));
      setFiltered(ver);
      setListFilter((state) => ({
        ...state,
        filterede: [...state.filterede, valor],
      }));
    }
    switch (selected) {
    case 'population':
      setMyForm(() => (['orbital_period',
        'diameter', 'rotation_period', 'surface_water']));
      break;
    case 'orbital_period':
      setMyForm(() => ([
        'diameter', 'rotation_period', 'surface_water']));
      break;
    case 'diameter':
      setMyForm(() => ([
        'rotation_period', 'surface_water']));
      break;
    case 'rotation_period':
      setMyForm(() => (['surface_water']));
      break;
    case 'surface_water':
      setMyForm(() => ([]));
      break;
    default:
      break;
    }
  };

  const startReturn = filtered.map((item, index) => (
    <tbody key={ index } data-testid="table-id">
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
  const result = [listFilter];
  let newResult = [];
  if (result[0].filterede.length > 0) {
    newResult = result[0].filterede.map((item, index) => (
      <div key={ index } data-testid="filter">
        <p>{item.selected}</p>
        <button type="button">X</button>
      </div>
    ));
  }
  return (
    <div>
      <select
        name="selected"
        data-testid="column-filter"
        value={ selected }
        onChange={ (e) => setSelected(e.target.value) }
      >
        {myForm.map((item, index) => (
          <option key={ index }>
            {item}
          </option>
        ))}
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
      {newResult}
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
