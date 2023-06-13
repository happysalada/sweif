export enum KycDocumentType {
  PASSPORT = 'passport', // CARD
  DRIVERS_LICENSE = 'drivers_license', // CARD
  RESIDENCE_PERMIT = 'residence_permit', // CARD
  ID_CARD = 'id_card', // CARD
  VOTER_ID = 'voter_id', // CARD
  WORK_PERMIT = 'work_permit', // CARD
  VISA = 'visa', // CARD
  BANK_STATEMENT = 'bank_statement', // A4
  PROOF_OF_BUSINESS_TAX_ID = 'proof_of_business_tax_id', // A4
  OPERATING_LICENSE = 'operating_license', // A4
  BUSINESS_REGISTRATION = 'business_registration', // A4
  SELFIE = 'selfie',
};

export enum OverlayType {
  CARD = 'card',
  PASSPORT = 'passport',
  A4 = 'a4',
  SELFIE = 'selfie',
}

export enum Flow {
  Questionaire = "questionaire",
  DocumentUpload = "document_upload",
  SelfieUpload = "selfie_upload",
  ThankYou = "thank_you",
}

export enum UploadType {
  ID_CARD = "id_card",
  PASSPORT = "passport",
}

export enum IdCardStep {
  FRONT = "front",
  BACK = "back",
}

