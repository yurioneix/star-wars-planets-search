import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa componente App', () => {
  it('Testa se ao digitar uma letra no campo, aparecem os planetas correspondentes', async () => {
   render(<App/>);

   const inputName = screen.getByTestId('name-filter');
   expect(inputName).toBeInTheDocument();

   await waitFor(() => {
     userEvent.type(inputName, 'oo');

     const alderaan = screen.getByText(/alderaan/i);
   
     expect(alderaan).not.toBeInTheDocument();
   })

  // const tablePlanets = screen.getAllByRole('cell');
})
});
