import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockFetch from './mocks/fetch';

describe('Initial tests ', () => {
  const valorMaior = 1000;
  const valorMenor = 100012120;
  test('I am your test',async () => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    render(<App />);
    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();
    const collunFilter = screen.getByTestId('column-filter');
    expect(collunFilter).toBeInTheDocument();
    const comparison = screen.getByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument(); 
    const buton = screen.getByTestId('button-filter');
    expect(buton).toBeInTheDocument();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const tableId = screen.queryAllByTestId(/table-id/i);;
    expect(tableId[0]).toBeInTheDocument();
    userEvent.type(collunFilter, 'population');
    userEvent.type(comparison, 'maior que');
    userEvent.type(valueFilter, '1000');

    expect(comparison ).toHaveValue('maior que');
    expect(collunFilter).toHaveValue('population');
    expect(valueFilter).toHaveValue(valorMaior);
    
    userEvent.click(buton);

    expect(tableId[0]).toBeInTheDocument();

    userEvent.type(collunFilter, 'diameter');
    userEvent.type(comparison, 'menor que');
    userEvent.type(valueFilter, '12120');

    expect(comparison ).toHaveTextContent('menor que');
    expect(collunFilter).toHaveTextContent('diameter');
    expect(valueFilter).toHaveValue(valorMenor);

    userEvent.click(buton);

    expect(tableId[0]).toBeInTheDocument();
    const planetName = screen.getByText('Kamino');
    expect(planetName).toBeInTheDocument();
  });
})
