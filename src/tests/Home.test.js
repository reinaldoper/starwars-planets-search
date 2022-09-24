import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockFetch from './mocks/fetch';

describe('Testing page "Home"', () => {
  const diametre = 7200;
    it('Testing exit filter', async () => {
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
      const buton1 = screen.getByTestId('button-remove-filters');
      expect(buton1).toBeInTheDocument(); 
      
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      const tableId = screen.queryAllByTestId(/table-id/i);
      expect(tableId[0]).toBeInTheDocument();
      userEvent.selectOptions(collunFilter, 'diameter');
      userEvent.selectOptions(comparison, 'menor que');
      userEvent.type(valueFilter, '7200');

      expect(comparison).toHaveTextContent('menor que');
      expect(collunFilter).toHaveTextContent('diameter');
      expect(valueFilter).toHaveValue(diametre);

      userEvent.click(buton);
      const planet = screen.getByText('Endor');
      expect(planet).toBeInTheDocument();
      const buton2 = screen.getByTestId('filter');
      expect(buton2).toBeInTheDocument();

      userEvent.click(buton2);
      expect(planet).toBeInTheDocument();
      global.fetch.mockClear();
    })
})