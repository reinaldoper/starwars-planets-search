import React, { useCallback, useContext, useEffect, useState } from 'react';
import StarContext from '../context/StarContext';

const Home = () => {
  const [name, setName] = useState('');
  const { star } = useContext(StarContext);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState('population');
  const [igualdate, setIgualdate] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [columms] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [myForm, setMyForm] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const [filtList, setListFilter] = useState([]);
  const myFilter = useCallback(() => {
    const colun = filtList.map((item) => item.selected);
    const colunFilter = columms.filter((item) => !colun.some((col) => col === item));
    setMyForm(colunFilter);
    setSelected(colunFilter[0]);
  }, [filtList, columms]);
  useEffect(() => {
    myFilter();
  }, [myFilter, filtList]);
  useEffect(() => {
    setFiltered(star.filter((item) => item.name.includes(name)));
  }, [name, star]);

  const filteredValue = () => {
    let updatedPlanets = [...star];
    console.log(filtList);
    if (filtList.length > 0) {
      filtList.forEach((filter) => {
        switch (filter.igualdate) {
        case 'maior que':
          updatedPlanets = updatedPlanets
            .filter((planet) => Number(planet[filter.selected]) > Number(filter.number));
          break;
        case 'menor que':
          updatedPlanets = updatedPlanets
            .filter((planet) => Number(planet[filter.selected]) < Number(filter.number));
          break;
        case 'igual a':
          updatedPlanets = updatedPlanets
            .filter((item) => Number(item[filter.selected]) === Number(filter.number));
          break;
        default: break;
        }
      });
    }
    setFiltered(updatedPlanets);
  };

  useEffect(() => {
    filteredValue();
  }, [filtList]);
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

  const handClick = (item) => {
    const result = filtList.filter((element) => element.selected !== item);
    setListFilter(result);
  };

  const removeFilters = () => {
    setListFilter([]);
  };
  let newResult = [];
  if (filtList.length > 0) {
    newResult = filtList.map((item, index) => (
      <div key={ index } data-testid="filter">
        <p>{item.selected}</p>
        <p>{item.igualdate}</p>
        <p>{item.number}</p>
        <button
          type="button"
          onClick={ () => handClick(item.selected) }
        >
          X
        </button>
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
        onClick={ () => {
          setListFilter((state) => [...state, { igualdate, selected, number }]);
        } }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeFilters }
      >
        Remover todas filtragens
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
