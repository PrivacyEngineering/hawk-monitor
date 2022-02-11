import { LegalBaseExtended } from "types";

const legalBasesInitialState = [
  { requirement: "GDPR-6-1-a", regulation: "GDPR", article: "6", paragraph: "1a", description: "Consent" },
  { requirement: "GDPR-6-1-b", regulation: "GDPR", article: "6", paragraph: "1b", description: "Performance of a contract" },
  { requirement: "GDPR-6-1-c", regulation: "GDPR", article: "6", paragraph: "1c", description: "Legal obligation" },
  { requirement: "GDPR-6-1-d", regulation: "GDPR", article: "6", paragraph: "1d", description: "Vital interest" },
  { requirement: "GDPR-6-1-e", regulation: "GDPR", article: "6", paragraph: "1e", description: "Public interest" },
  { requirement: "GDPR-6-1-f", regulation: "GDPR", article: "6", paragraph: "1f", description: "Legitimate interest" },
  { requirement: "GDPR-6-2", regulation: "GDPR", article: "6", paragraph: "2", description: "Specific provisions" },
]

export const legalBases = (state: LegalBaseExtended[] = legalBasesInitialState) => {
  // this reducer doesn't support any actions for now
  return state;
};
