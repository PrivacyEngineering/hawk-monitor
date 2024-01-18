import {HEADER_JSON, URL_BASE} from "index";
import { Field } from "types/types";

export const getFields = (): Promise<Field[]> => fetch(`${URL_BASE}/api/fields`).then(response => response.json());

export const postField = (field: Field): Promise<void> => fetch(`${URL_BASE}/api/fields`, { method: 'POST', headers: HEADER_JSON, body: JSON.stringify(field) }).then();

export const putField = (field: Field): Promise<void> => fetch(`${URL_BASE}/api/fields`, { method: 'PUT', headers: HEADER_JSON, body: JSON.stringify(field) }).then();

export const deleteField = (field: Field): Promise<void> => fetch(`${URL_BASE}/api/fields/${field.name}`, { method: 'DELETE' }).then();
