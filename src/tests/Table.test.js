import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockFetch from './mocks/fetch';

describe('Testing page "Home"', () => {
    it('Testing exit filter', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
      render(<App />);
      const column = screen.getByTestId('column-sort');
      expect(column).toBeInTheDocument();
      const asc = screen.getByTestId('column-sort-input-asc');
      expect(asc).toBeInTheDocument();
      const desc = screen.getByTestId('column-sort-input-desc');
      expect(desc).toBeInTheDocument();
      const sortButon = screen.getByTestId('column-sort-button');
      expect(sortButon).toBeInTheDocument(); 
      
      await waitFor(() => expect(global.fetch).toHaveBeenCalled());
      const tableId = screen.queryAllByTestId(/table-id/i);
      expect(tableId[0]).toBeInTheDocument();
        userEvent.selectOptions(column, 'diameter');
        expect(column).toHaveTextContent('diameter');
        userEvent.click(asc);

      userEvent.click(sortButon);
      const planet = screen.queryAllByText(/endor/i);                 
        expect(planet[0]).toBeInTheDocument();
        
        userEvent.selectOptions(column, 'population');
        expect(column).toHaveTextContent('population');
        userEvent.click(asc);
        userEvent.click(sortButon);
        const planet1 = screen.queryAllByText(/tatooine/i);;
        expect(planet1[0]).toBeInTheDocument();

        userEvent.selectOptions(column, 'population');
        expect(column).toHaveTextContent('population');
        userEvent.click(desc);
        userEvent.click(sortButon);
        const planet2 = screen.queryAllByText(/coruscant/i);;
        expect(planet2[0]).toBeInTheDocument();

        userEvent.selectOptions(column, 'orbital_period');
        expect(column).toHaveTextContent('orbital_period');
        userEvent.click(asc);
        userEvent.click(sortButon);
        expect(planet1[0]).toBeInTheDocument();

        userEvent.selectOptions(column, 'orbital_period');
        expect(column).toHaveTextContent('orbital_period');
        userEvent.click(desc);
        userEvent.click(sortButon);
        const planet3 = screen.queryAllByText(/bespin/i);;
        expect(planet3[0]).toBeInTheDocument();

        /* diameter */
        userEvent.selectOptions(column, 'diameter');
        expect(column).toHaveTextContent('diameter');
        userEvent.click(asc);
        userEvent.click(sortButon);
        const planet4 = screen.queryAllByText(/endor/i);;
        expect(planet4[0]).toBeInTheDocument();

        userEvent.selectOptions(column, 'diameter');  
        expect(column).toHaveTextContent('diameter');
        userEvent.click(desc);
        userEvent.click(sortButon);
        const planet5 = screen.queryAllByText(/bespin/i);;
        expect(planet5[0]).toBeInTheDocument();
        /* rotation_period */
        userEvent.selectOptions(column, 'rotation_period');
        expect(column).toHaveTextContent('rotation_period');
        userEvent.click(asc);
        userEvent.click(sortButon);
        const planet6 = screen.queryAllByText(/bespin/i);              
        expect(planet6[0]).toBeInTheDocument();

        userEvent.selectOptions(column, 'rotation_period');  
        expect(column).toHaveTextContent('rotation_period');
        userEvent.click(desc);
        userEvent.click(sortButon);
        const planet7 = screen.queryAllByText(/kamino/i);;
        expect(planet7[0]).toBeInTheDocument();

        /* surface_water*/
        userEvent.selectOptions(column, 'surface_water');
        expect(column).toHaveTextContent('surface_water');
        userEvent.click(asc);
        userEvent.click(sortButon);
        const planet11 = screen.queryAllByText(/bespin/i);               
        expect(planet11[0]).toBeInTheDocument();

        userEvent.selectOptions(column, 'surface_water');  
        expect(column).toHaveTextContent('surface_water');
        userEvent.click(desc);
        userEvent.click(sortButon);
        const planet9 = screen.queryAllByText(/kamino/i);;
        expect(planet9[0]).toBeInTheDocument();
    })
})