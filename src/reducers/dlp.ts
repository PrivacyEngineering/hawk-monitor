import { FetchDlpFindingsByFieldActionTypes, FetchDlpJobResultActionTypes, FetchDlpJobsActionTypes } from "types/actions/Dlp";
import { DlpFinding, DlpJob, DlpJobResult } from "types/dlp";


export const dlpJobs = (state: DlpJob[] = [], action: FetchDlpJobsActionTypes) => {
  switch (action.type) {
    case "DLP_JOB_SUCCESS":
      return action.payload;
    default:
      return state;
  }
}

export const dlpResults = (state: {[k: string]: DlpJobResult} = {}, action: FetchDlpJobResultActionTypes) => {
  switch (action.type) {
    case "DLP_RESULT_SUCCESS":
      return {...state, [action.payload.id]: action.payload};
    default:
      return state;
  }
}


export const dlpFindingsByField = (state: {[k: string]: DlpFinding[]} = {}, action: FetchDlpFindingsByFieldActionTypes) => {
  switch (action.type) {
    case "DLP_FINDINGS_BY_FIELD_SUCCESS":
      return {...state, [action.payload.id]: action.payload.findings};
    default:
      return state;
  }
}