import { URL_BASE } from "index";
import { Field } from "types";

export const getFields = (): Promise<Field[]> => fetch(`${URL_BASE}/fields`).then(response => response.json());

export const postField = (field: Field): Promise<void> => fetch(`${URL_BASE}/fields`, { method: 'POST', body: JSON.stringify(field) }).then();

export const putField = (field: Field): Promise<void> => fetch(`${URL_BASE}/fields`, { method: 'PUT', body: JSON.stringify(field) }).then();
