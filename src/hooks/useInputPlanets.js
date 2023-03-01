import { useState } from 'react';

function useInputPlanets(initialInput) {
  const [inputPlanets, setInputPlanets] = useState(initialInput);

  const handleChange = (e) => {
    setInputPlanets(e.target.value);
  };

  return {
    inputPlanets,
    handleChange,
  };
}

export default useInputPlanets;
