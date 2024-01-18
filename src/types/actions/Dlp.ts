import { DlpFinding, DlpJob, DlpJobResult } from "types/dlp";

interface FetchDlpJobsRequestAction {
  type: "DLP_JOB_REQUEST";
}

interface FetchDlpJobsSuccessAction {
  type: "DLP_JOB_SUCCESS";
  payload: DlpJob[];
}

interface FetchDlpJobsFailureAction {
  type: "DLP_JOB_FAILURE";
  payload: string;
}

export type FetchDlpJobsActionTypes = FetchDlpJobsRequestAction | FetchDlpJobsSuccessAction | FetchDlpJobsFailureAction;


interface FetchDlpJobResultRequestAction {
  type: "DLP_RESULT_REQUEST";
}

interface FetchDlpJobResultSuccessAction {
  type: "DLP_RESULT_SUCCESS";
  payload: DlpJobResult;
}

interface FetchDlpJobResultFailureAction {
  type: "DLP_RESULT_FAILURE";
  payload: string;
}

export type FetchDlpJobResultActionTypes = FetchDlpJobResultRequestAction | FetchDlpJobResultSuccessAction | FetchDlpJobResultFailureAction;


interface FetchDlpFindingsByFieldRequestAction {
  type: "DLP_FINDINGS_BY_FIELD_REQUEST";
}

interface FetchDlpFindingsByFieldSuccessAction {
  type: "DLP_FINDINGS_BY_FIELD_SUCCESS";
  payload: {
    id: string;
    findings: DlpFinding[];
  };
}

interface FetchDlpFindingsByFieldFailureAction {
  type: "DLP_FINDINGS_BY_FIELD_FAILURE";
  payload: string;
}

export type FetchDlpFindingsByFieldActionTypes = FetchDlpFindingsByFieldRequestAction | FetchDlpFindingsByFieldSuccessAction | FetchDlpFindingsByFieldFailureAction;