import { AnyAction } from 'redux';

import { Dispatch } from "react";
import { getDlpFindingsForField, getJobs, getResult } from 'gateways/dlp';

export const fetchDlpJobs = (dispatch: Dispatch<AnyAction>) => {
  dispatch({ type: "DLP_JOB_REQUEST" });
  getJobs()
    .then(jobs => dispatch({ type: "DLP_JOB_SUCCESS", payload: jobs }))
    .catch(error => dispatch({ type: "DLP_JOB_FAILURE", payload: error }))
}


export const fetchDlpResults = (dispatch: Dispatch<AnyAction>, resultId: string) => {
  dispatch({ type: "DLP_RESULT_REQUEST" });
  getResult(resultId)
    .then(result => dispatch({ type: "DLP_RESULT_SUCCESS", payload: result }))
    .catch(error => dispatch({ type: "DLP_RESULT_FAILURE", payload: error }))
}

export const fetchDlpFindingsByField = (dispatch: Dispatch<AnyAction>, fieldId: string) => {
  dispatch({ type: "DLP_FINDINGS_BY_FIELD_REQUEST" });
  getDlpFindingsForField(fieldId)
    .then(findings => dispatch({ type: "DLP_FINDINGS_BY_FIELD_SUCCESS", payload: { id: fieldId, findings } }))
    .catch(error => dispatch({ type: "DLP_FINDINGS_BY_FIELD_FAILURE", payload: error }))
}