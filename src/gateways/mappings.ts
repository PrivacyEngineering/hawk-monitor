import { URL_BASE } from "index";
import { AnyMapping } from "types";

export const getMappings = (): Promise<AnyMapping[]> => fetch(`${URL_BASE}/mappings`).then(response => response.json());

export const putMapping = (mapping: AnyMapping): Promise<void> => fetch(`${URL_BASE}/mappings`, { method: 'PUT', body: JSON.stringify(mapping) }).then();
