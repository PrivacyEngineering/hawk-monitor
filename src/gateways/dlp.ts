import { URL_BASE } from "index";
import { DlpFinding, DlpJob, DlpJobResult } from "types/dlp";

export const getJobs = (): Promise<DlpJob[]> => fetch(`${URL_BASE}/api/dlp`).then(response => response.json());

export const getResult = (resultId: string): Promise<DlpJobResult> => fetch(`${URL_BASE}/api/dlp/results/${resultId}`).then(response => response.json());

export const getDlpFindingsForField= (fieldId: string): Promise<DlpFinding[]> => fetch(`${URL_BASE}/api/fields/${fieldId}/dlp`).then(response => response.json());