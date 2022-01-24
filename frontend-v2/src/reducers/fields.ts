import { Field } from "../types";

const fieldsInitialState = [
  { id: 'city', description: 'City name with Alpha-2 country code', personalData: false, specialCategoryPersonalData: false },
  { id: 'user', description: 'User data', personalData: true, specialCategoryPersonalData: false },
  { id: 'blood-test', description: 'Blood test results', personalData: true, specialCategoryPersonalData: true },
];

export const fields = (state: Field[] = fieldsInitialState, action: any) => {
  switch (action) {
    // case actions.FETCH_MAPPINGS_SUCCESS:
    //   return action.mappings.map(mapping => ...);
    default:
      return state;
  }
};
