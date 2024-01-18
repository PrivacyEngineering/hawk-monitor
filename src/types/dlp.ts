// from https://github.com/PrivacyEngineering/hawk-dlp/blob/master/hawk-dlp-common/src/main/kotlin/io/hawk/dlp/common/InfoType.kt

/**
 * Represents a type of data identified, e.g. E-Mail address or a last name.
 * In Google Cloud DLP terms, this is equivalent to an Info Type.
 * In AWS Macie terms, this would be a (managed) data identifier.
 */
export enum InfoType {
    // G = Google Cloud DLP
    // A = AWS Macie
    ADVERTISING_ID, // G
    AGE, // G
    AUTH_TOKEN, // G
    CREDENTIALS, // G[AWS_CREDENTIALS, GCP_CREDENTIALS, AZURE_CREDENTIALS]; A[AWS_CREDENTIALS]
    CREDIT_CARD_NUMBER, // G, A
    CREDIT_CARD_EXPIRATION, // A
    CREDIT_CARD_SECURITY_CODE, // A
    DATE, // G
    DATE_OF_BIRTH, // G, A
    DOMAIN_NAME, // G
    EMAIL_ADDRESS, // G
    ENCRYPTION_KEY, // G, A[OPENSSH_PRIVATE_KEY, PGP_PRIVATE_KEY, PKCS, PUTTY_PRIVATE_KEY]
    ETHNIC_GROUP, // G
    GENDER, // G
    GENERIC_ID, // G
    IBAN_CODE, // G
    IMEI_NUMBER, // G
    IP_ADDRESS, // G
    JSON_WEB_TOKEN, // G, A
    LOCATION, // G[LOCATION, LOCATION_COORDINATES], A[LATITUDE_LONGITUDE]
    MAC_ADDRESS, // G
    MEDICAL_TERM, // G
    NAME, // G[FEMALE_NAME, FIRST_NAME, MALE_NAME, LAST_NAME]
    ORGANIZATION_NAME, // G
    PASSPORT_NUMBER, // G, A[ends with _PASSPORT_NUMBER]
    PASSWORD, // G
    PHONE_NUMBER, // G, A[ends with _PHONE_NUMBER]
    ADDRESS, // G[STREET_ADDRESS], A
    SWIFT_CODE, // G
    TIME, // G
    URL, // G
    VEHICLE_IDENTIFICATION_NUMBER, // G
    WEAK_PASSWORD_HASH, // G
    UNKNOWN // Fallback InfoType, if InfoType can't be mapped
}

export enum JobStatus {
    /**
     * This is the default status, when a job is created.
     */
    CREATED,

    /**
     * The job is in progress.
     * The integration implementation has found this job and is processing it.
     */
    IN_PROGRESS,

    /**
     * This status is set, when a job is finished.
     */
    COMPLETED,

    /**
     * This status is set, when a job is failed.
     */
    FAILED
}

export type JobStatusType = keyof typeof JobStatus;
export type InfoTypeType = keyof typeof InfoType;


export interface DlpJob {
  id: string;
  status: JobStatusType;
  error?: string;
  results: DlpJobResult[];
}

export interface DlpJobResult {
  id: string;
  timestamp: string;
  findings: DlpFinding[];
}


export interface DlpFinding {
  id: string;
  infoType: InfoTypeType;
  likelihood: number;
  occurrences: DlpOccurence[];
}

export interface DlpOccurence {
  type: string;
  container: string;
  volume?: string;
  filePath?: string;
  database?: string;
  table?: string;
  column?: string;
}