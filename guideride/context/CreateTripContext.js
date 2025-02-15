import { createContext } from "react";

const CreateTripContext = createContext({
  tripData: [], // Default value: empty array
  setTripData: () => {} // Default function to prevent errors
});

export default CreateTripContext;
