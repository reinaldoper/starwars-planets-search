import React, { useContext, useState } from 'react';
import StarContext from '../context/StarContext';

const Table = () => {
  const { filtered, setFiltered } = useContext(StarContext);
  /* const [filtered, setFiltered] = useState([]); */
  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('');
  const handChange = ({ target }) => {
    setSort((state) => ({
      ...state,
      [target.name]: target.value,
    }));
  };

  const population = () => {
    let updatedPlanets = [...filtered];
    if (sort.sort === 'ASC') {
      updatedPlanets = filtered.sort((a, b) => (a.population
          !== 'unknown' ? a.population : Infinity)
        - (b.population !== 'unknown' ? b.population : Infinity));
    } else {
      updatedPlanets = filtered.sort((a, b) => b.population - a.population);
    }
    return updatedPlanets;
  };
  const orbital = () => {
    let updatedPlanets = [...filtered];
    if (sort.sort === 'ASC') {
      updatedPlanets = filtered.sort((a, b) => a.orbital_period - b.orbital_period);
    } else {
      updatedPlanets = filtered.sort((a, b) => b.orbital_period - a.orbital_period);
    }
    return updatedPlanets;
  };
  const diameter = () => {
    let updatedPlanets = [...filtered];
    if (sort.sort === 'ASC') {
      updatedPlanets = filtered.sort((a, b) => a.diameter - b.diameter);
    } else {
      updatedPlanets = filtered.sort((a, b) => b.diameter - a.diameter);
    }
    return updatedPlanets;
  };

  const renderRanking = () => {
    let updatedPlanets = [...filtered];
    if (filtered.length > 0) {
      switch (column) {
      case 'population':
        updatedPlanets = population();
        break;
      case 'orbital_period':
        updatedPlanets = orbital();
        break;
      case 'diameter':
        updatedPlanets = diameter();
        break;
      case 'rotation_period':
        if (sort.sort === 'ASC') {
          updatedPlanets = filtered.sort((a, b) => a.rotation_period - b.rotation_period);
        } else {
          updatedPlanets = filtered.sort((a, b) => b.rotation_period - a.rotation_period);
        }
        break;
      default:
        if (sort.sort === 'ASC') {
          updatedPlanets = filtered.sort((a, b) => a.surface_water - b.surface_water);
        } else {
          updatedPlanets = filtered.sort((a, b) => b.surface_water - a.surface_water);
        }
        break;
      }
    }
    setFiltered([...updatedPlanets]);
  };

  return (
    <div>
      <select
        name="column"
        value={ column }
        data-testid="column-sort"
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <div onChange={ handChange }>
        <input type="radio" value="ASC" data-testid="column-sort-input-asc" name="sort" />
        ASC
        <input
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          name="sort"
        />
        DESC
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ renderRanking }
      >
        Order
      </button>
    </div>
  );
};

export default Table;
