import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockFetch from './mocks/fetch';

describe('Initial tests ', () => {
  const valorMaior = 1000;
  const valorMenor = 12120;
  const igual = 12;
  it('I am your test "maior"',async () => {
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
    const tableId = screen.queryAllByTestId(/table-id/i);
    expect(tableId[0]).toBeInTheDocument();
    userEvent.selectOptions(collunFilter, 'population');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(valueFilter, '1000');

    expect(comparison ).toHaveValue('maior que');
    expect(collunFilter).toHaveValue('population');
    expect(valueFilter).toHaveValue(valorMaior);
    
    userEvent.click(buton);

    expect(tableId[0]).toBeInTheDocument();
    const planet = screen.getByText('Tatooine');
    expect(planet).toBeInTheDocument();
    global.fetch.mockClear();

  });
  it('Testing i am "menor"', async () => {
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
    const tableId = screen.queryAllByTestId(/table-id/i);
    expect(tableId[0]).toBeInTheDocument();
    userEvent.selectOptions(collunFilter, 'diameter');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(valueFilter, '12120');

    expect(comparison).toHaveTextContent('menor que');
    expect(collunFilter).toHaveTextContent('diameter');
    expect(valueFilter).toHaveValue(valorMenor);

    userEvent.click(buton);
    const planet1 = screen.queryAllByText(/tatooine/i);
    expect(planet1[0]).toBeInTheDocument();
    global.fetch.mockClear();
  });
  it('Testing i am "igual"', async () => {
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
    const tableId = screen.queryAllByTestId(/table-id/i);
    expect(tableId[0]).toBeInTheDocument();
    userEvent.selectOptions(collunFilter, 'rotation_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(valueFilter, '12');

    expect(comparison).toHaveTextContent('igual a');
    expect(collunFilter).toHaveTextContent('rotation_period');
    expect(valueFilter).toHaveValue(igual);

    userEvent.click(buton);
    const planet1 = screen.queryAllByText(/bespin/i);
    expect(planet1[0]).toBeInTheDocument();
    global.fetch.mockClear();
  })
})
