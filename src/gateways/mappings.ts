import {HEADER_JSON, URL_BASE} from "index";
import {AnyMapping, GroupedUsageField, Mapping} from "types";

export const getMappings = (): Promise<Mapping[]> => fetch(`${URL_BASE}/mappings`).then(response => response.json());

export const getUnmappedEndpoints = (): Promise<String[]> => fetch(`${URL_BASE}/endpoints/unmapped`).then(response => response.json());

export const getMappingFieldSuggestions = (endpointId: string): Promise<GroupedUsageField[]> => fetch(`${URL_BASE}/endpoints/fields/grouped?` + new URLSearchParams({
    endpointId: endpointId
})).then(response => response.json());

export const postMapping = (mapping: AnyMapping): Promise<void> => fetch(`${URL_BASE}/mappings`, {
    method: 'POST',
    headers: HEADER_JSON,
    body: JSON.stringify(mapping)
}).then();

export const putMapping = (mapping: AnyMapping): Promise<void> => fetch(`${URL_BASE}/mappings`, {
    method: 'PUT',
    headers: HEADER_JSON,
    body: JSON.stringify(mapping)
}).then();

export const deleteMapping = (mapping: AnyMapping): Promise<void> => fetch(`${URL_BASE}/mappings/${mapping.id}`, {method: 'DELETE'}).then();