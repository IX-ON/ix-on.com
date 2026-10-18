export type NorthStarTab = 'mortgage' | 'sme' | 'lineage' | 'doc-vault' | 'admin';

export type MortgageStage = 
  | 'intake' 
  | 'lineage_audit' 
  | 'underwriting' 
  | 'collateral_fraud' 
  | 'closing_package' 
  | 'completed';

export interface UnderwritingCondition {
  id: string;
  label: string;
  category: 'income' | 'collateral' | 'regulatory' | 'identity';
  status: 'cleared' | 'pending' | 'flagged';
  clearedBy?: string;
  clearedAt?: string;
}

export interface MortgageCase {
  id: string;
  borrowerName: string;
  coBorrower?: string;
  propertyAddress: string;
  propertyType: string;
  loanAmount: number;
  purchasePrice: number;
  ltv: number;
  dti: number;
  creditScore: number;
  stage: MortgageStage;
  status: 'In Review' | 'Underwriting Approved' | 'Conditions Pending' | 'Closing Ready' | 'Funded';
  assignedUnderwriter: string;
  sourceFeed: string;
  lineageHash: string;
  updatedAt: string;
  conditions: UnderwritingCondition[];
  notes: string;
}

export type SmeStage = 
  | 'kyb_verify' 
  | 'feed_harmonize' 
  | 'dscr_modeling' 
  | 'guarantee_check' 
  | 'facility_pack' 
  | 'disbursed';

export interface SmeFacility {
  id: string;
  companyName: string;
  companyNumber: string;
  industry: string;
  facilityType: 'Term Loan' | 'Asset Finance' | 'Revolving Credit' | 'Invoice Discounting';
  facilityAmount: number;
  turnover: number;
  baseDscr: number;
  stressedDscr: number;
  tenorMonths: number;
  marginBps: number;
  stage: SmeStage;
  status: 'KYB Cleared' | 'Cashflow Analyzed' | 'Credit Approved' | 'Facility Issued' | 'Active Monitoring';
  accountingFeed: 'Xero Connected' | 'QuickBooks Live' | 'Sage 50 Sync' | 'Open Banking API';
  lastFeedSync: string;
  directorGuarantor: string;
  covenantStatus: 'Compliant' | 'Watchlist' | 'Alert';
  lineageHash: string;
}

export interface LineageNode {
  id: string;
  field: string;
  category: string;
  originSystem: string;
  transformation: string;
  targetConsumer: string;
  hash: string;
  validationStatus: 'Verified' | 'Warning' | 'Pending';
  lastSynced: string;
}

export interface LivingDoc {
  id: string;
  title: string;
  caseRef: string;
  type: 'TRID Closing Package' | 'MISMO 3.4 Payload' | 'Credit Committee Pack' | 'Facility Agreement' | 'Covenant Schedule';
  standard: string;
  generatedAt: string;
  hash: string;
  fileSize: string;
  content: string;
}

export interface IssuedLicense {
  id: string;
  companyName: string;
  contactEmail: string;
  token: string;
  tier: 'Enterprise Production' | 'Pilot Sandbox' | 'Institutional White-Label';
  status: 'active' | 'revoked' | 'expired';
  issuedAt: string;
  expiresAt: string;
  allowedSeats: number;
}
