import { InfoType, InfoTypeType } from "types/dlp";

const infoTypesInitialState = {
  infoTypes: Object.values(InfoType).filter(value => typeof value === 'string') as InfoTypeType[]
}

export const infoTypes = (state: typeof infoTypesInitialState = infoTypesInitialState) => {
  // this reducer doesn't support any actions for now
  return state;
};
