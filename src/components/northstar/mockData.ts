import { MortgageCase, SmeFacility, LineageNode, LivingDoc } from './types';

export const INITIAL_MORTGAGE_CASES: MortgageCase[] = [
  {
    id: 'NS-MTG-8841',
    borrowerName: 'Marcus & Eleanor Vance',
    coBorrower: 'Eleanor Vance',
    propertyAddress: '14 Oakridge Avenue, Harpenden, AL5 2PQ',
    propertyType: 'Residential Detached 4-Bed',
    loanAmount: 485000,
    purchasePrice: 668000,
    ltv: 72.6,
    dti: 34.2,
    creditScore: 812,
    stage: 'closing_package',
    status: 'Closing Ready',
    assignedUnderwriter: 'Sarah Jenkins (Senior Underwriting VP)',
    sourceFeed: 'Open Banking + HMRC Real-Time API (Plaid/Argyle)',
    lineageHash: '0x9f4a88bc3e1290aa7c0411',
    updatedAt: '12 mins ago',
    notes: 'TRID 3-day closing disclosure sent. Title deed clear. Independent AVM confirmed property value.',
    conditions: [
      { id: 'c1', label: 'HMRC Tax Calculation & SA302 Provenance Match', category: 'income', status: 'cleared', clearedBy: 'Auto-Lineage Engine', clearedAt: '2026-10-17 14:22' },
      { id: 'c2', label: 'Primary Deposit Source Trail (6-month bank statement audit)', category: 'income', status: 'cleared', clearedBy: 'Auto-Lineage Engine', clearedAt: '2026-10-17 15:10' },
      { id: 'c3', label: 'Land Registry Title Title Deeds Verification', category: 'collateral', status: 'cleared', clearedBy: 'HM Land Registry Hook', clearedAt: '2026-10-17 16:04' },
      { id: 'c4', label: 'Buildings Insurance Policy with Lender Interest Endorsed', category: 'regulatory', status: 'cleared', clearedBy: 'Sarah Jenkins', clearedAt: '2026-10-18 09:15' },
    ],
  },
  {
    id: 'NS-MTG-9022',
    borrowerName: 'Dr. Tariq Al-Mansoor',
    propertyAddress: '7 Kensington Mews, London, W8 4EL',
    propertyType: 'Prime Central London Mews House',
    loanAmount: 1250000,
    purchasePrice: 2015000,
    ltv: 62.0,
    dti: 38.5,
    creditScore: 789,
    stage: 'underwriting',
    status: 'Conditions Pending',
    assignedUnderwriter: 'David Chen (Commercial & High-Net-Worth Underwriter)',
    sourceFeed: 'NHS Consultant Pay-Slip API + Foreign Asset Registry',
    lineageHash: '0x3c714e88b2a199cd0043ff',
    updatedAt: '34 mins ago',
    notes: 'Complex multi-tier consulting dividend income requires validation across dual accountant certifications.',
    conditions: [
      { id: 'c1', label: 'NHS Trust Special Duty Allowance Verification', category: 'income', status: 'cleared', clearedBy: 'Auto-Lineage Engine', clearedAt: '2026-10-18 08:30' },
      { id: 'c2', label: 'Accountant Certification of 2025/2026 Retained Earnings', category: 'income', status: 'pending' },
      { id: 'c3', label: 'Independent RICS Level 3 Building Survey Audit', category: 'collateral', status: 'cleared', clearedBy: 'RICS CoreLogic Connector', clearedAt: '2026-10-18 09:40' },
      { id: 'c4', label: 'Source of Wealth PEP & Sanctions Screening Dossier', category: 'identity', status: 'cleared', clearedBy: 'LexisNexis / FraudNet API', clearedAt: '2026-10-18 10:11' },
    ],
  },
  {
    id: 'NS-MTG-9104',
    borrowerName: 'Chloe Sutherland',
    propertyAddress: '29 Bayview Terrace, Edinburgh, EH15 1EB',
    propertyType: 'Victorian Tenement Flat',
    loanAmount: 265000,
    purchasePrice: 310000,
    ltv: 85.4,
    dti: 31.8,
    creditScore: 742,
    stage: 'lineage_audit',
    status: 'In Review',
    assignedUnderwriter: 'Fiona MacLeod (Affordable Lending Specialist)',
    sourceFeed: 'Open Banking Plaid + Scottish Land Register Ingestion',
    lineageHash: '0x7e1088ffcc992014ea8b',
    updatedAt: '1 hour ago',
    notes: 'Home Report single survey valuation (£315,000) exceeds contract price. Ingesting Energy Performance Certificate.',
    conditions: [
      { id: 'c1', label: 'Scottish Land Information Service Title Plan Ingestion', category: 'collateral', status: 'cleared', clearedBy: 'ScotLIS API Hook', clearedAt: '2026-10-18 11:02' },
      { id: 'c2', label: 'Continuous Employment History (36 Months PAYE)', category: 'income', status: 'pending' },
      { id: 'c3', label: 'First-Time Buyer Scheme Government Equity Grant Letter', category: 'regulatory', status: 'pending' },
    ],
  },
  {
    id: 'NS-MTG-9150',
    borrowerName: 'Robert & Hannah Sterling',
    coBorrower: 'Hannah Sterling',
    propertyAddress: '88 Meadowbrook Close, Wilmslow, SK9 3TE',
    propertyType: 'Detached Family Residence',
    loanAmount: 540000,
    purchasePrice: 720000,
    ltv: 75.0,
    dti: 29.4,
    creditScore: 830,
    stage: 'collateral_fraud',
    status: 'Underwriting Approved',
    assignedUnderwriter: 'Sarah Jenkins (Senior Underwriting VP)',
    sourceFeed: 'Direct Employer Payroll Sync (Argyle) + Experian Bureau',
    lineageHash: '0xbb110998ea3245cf88910a',
    updatedAt: '2 hours ago',
    notes: 'Underwriting rule passed 100%. Valuation inspection booked with surveyor.',
    conditions: [
      { id: 'c1', label: 'Payroll Source Code Cryptographic Validation', category: 'income', status: 'cleared', clearedBy: 'Auto-Lineage Engine', clearedAt: '2026-10-17 18:20' },
      { id: 'c2', label: 'Credit Bureau Hard Search Zero Discrepancy Attestation', category: 'regulatory', status: 'cleared', clearedBy: 'Experian Connector', clearedAt: '2026-10-17 18:30' },
      { id: 'c3', label: 'Environmental Search & Flood Risk Map Clearance', category: 'collateral', status: 'cleared', clearedBy: 'Groundsure API', clearedAt: '2026-10-18 07:15' },
    ],
  },
];

export const INITIAL_SME_FACILITIES: SmeFacility[] = [
  {
    id: 'NS-SME-4409',
    companyName: 'Aero-Tech Logistics Ltd',
    companyNumber: '11894022',
    industry: 'Specialized Cold-Chain Freight & Aerospace Supply',
    facilityType: 'Term Loan',
    facilityAmount: 650000,
    turnover: 4850000,
    baseDscr: 1.84,
    stressedDscr: 1.42,
    tenorMonths: 36,
    marginBps: 340,
    stage: 'facility_pack',
    status: 'Facility Issued',
    accountingFeed: 'Xero Connected',
    lastFeedSync: 'Synced 8 mins ago',
    directorGuarantor: 'Colin Campbell (Managing Director)',
    covenantStatus: 'Compliant',
    lineageHash: '0x19f2a00c9213efba88102',
  },
  {
    id: 'NS-SME-4412',
    companyName: 'Highfield Precision Engineering Ltd',
    companyNumber: '08942110',
    industry: 'Precision CNC Machining & Medical Device Components',
    facilityType: 'Asset Finance',
    facilityAmount: 1200000,
    turnover: 9200000,
    baseDscr: 1.55,
    stressedDscr: 1.18,
    tenorMonths: 60,
    marginBps: 290,
    stage: 'dscr_modeling',
    status: 'Cashflow Analyzed',
    accountingFeed: 'Sage 50 Sync',
    lastFeedSync: 'Synced 14 mins ago',
    directorGuarantor: 'Eileen Ward & Dr. Arthur Pendelton',
    covenantStatus: 'Compliant',
    lineageHash: '0x77aa4419cb1802da9930',
  },
  {
    id: 'NS-SME-4418',
    companyName: 'Apex Cloud Retail Group Ltd',
    companyNumber: '13098711',
    industry: 'Omnichannel Consumer Brands & Direct Distribution',
    facilityType: 'Revolving Credit',
    facilityAmount: 400000,
    turnover: 3100000,
    baseDscr: 1.28,
    stressedDscr: 0.98,
    tenorMonths: 24,
    marginBps: 450,
    stage: 'feed_harmonize',
    status: 'KYB Cleared',
    accountingFeed: 'QuickBooks Live',
    lastFeedSync: 'Synced 2 hours ago',
    directorGuarantor: 'Kavita Patel (Founder & CEO)',
    covenantStatus: 'Watchlist',
    lineageHash: '0x44dd9901bf6683ec1099',
  },
  {
    id: 'NS-SME-4425',
    companyName: 'Caledonian Maritime Renewables Ltd',
    companyNumber: 'SC599201',
    industry: 'Offshore Wind Fleet Support & Vessel Maintenance',
    facilityType: 'Term Loan',
    facilityAmount: 1850000,
    turnover: 14200000,
    baseDscr: 2.15,
    stressedDscr: 1.74,
    tenorMonths: 84,
    marginBps: 260,
    stage: 'facility_pack',
    status: 'Credit Approved',
    accountingFeed: 'Open Banking API',
    lastFeedSync: 'Synced 4 mins ago',
    directorGuarantor: 'Murdo Mackenzie & Fraser Scott',
    covenantStatus: 'Compliant',
    lineageHash: '0x88ee22bb673199fe0031',
  },
];

export const INITIAL_LINEAGE_NODES: LineageNode[] = [
  {
    id: 'LN-01',
    field: 'Gross Annual Verified Income',
    category: 'Income Provenance',
    originSystem: 'HMRC Real-Time Information (RTI) PAYE Feed',
    transformation: 'Tax Band Normalization + Benefit Exclusion Vectorizer',
    targetConsumer: 'Automated Underwriting Engine & DTI Ruleset',
    hash: '0x8a9e22ff110099bc32',
    validationStatus: 'Verified',
    lastSynced: '2 mins ago',
  },
  {
    id: 'LN-02',
    field: 'Historical 24-Month Operating Cashflow',
    category: 'Commercial Provenance',
    originSystem: 'Xero General Ledger API + Open Banking Bank Feed',
    transformation: 'VAT Reconciliation Filter + Non-Recurring CapEx Stripper',
    targetConsumer: 'Dynamic DSCR Stress Engine (Basel III / IV)',
    hash: '0x3344cc998811eefa07',
    validationStatus: 'Verified',
    lastSynced: '5 mins ago',
  },
  {
    id: 'LN-03',
    field: 'Collateral Property Title & Encumbrances',
    category: 'Collateral Provenance',
    originSystem: 'HM Land Registry Direct Gateway (HMLR)',
    transformation: 'Proprietary Title Deed Parser & Charge Priority Sorter',
    targetConsumer: 'First-Legal-Charge Security Schedule Generator',
    hash: '0x12ff00aa338877dd91',
    validationStatus: 'Verified',
    lastSynced: '18 mins ago',
  },
  {
    id: 'LN-04',
    field: 'KYB Beneficial Ownership (>25% Shares)',
    category: 'Compliance & Fraud',
    originSystem: 'Companies House PSC Registry + OpenCorporates API',
    transformation: 'Sanctions & PEP Cross-Index Vector Matcher',
    targetConsumer: 'Credit Committee Identity & AML Sign-off Dossier',
    hash: '0xfe9988112233aabbcc',
    validationStatus: 'Verified',
    lastSynced: '22 mins ago',
  },
  {
    id: 'LN-05',
    field: 'Independent Automated Valuation (AVM)',
    category: 'Valuation Lineage',
    originSystem: 'Rightmove / CoreLogic Historical Sales Regression Feed',
    transformation: 'Confidence Score Decay Function + Postcode Hedonic Index',
    targetConsumer: 'LTV Margin Calculator & Capital Adequacy Weighting',
    hash: '0x718293aabbccddeeff',
    validationStatus: 'Verified',
    lastSynced: '30 mins ago',
  },
];

export const INITIAL_LIVING_DOCS: LivingDoc[] = [
  {
    id: 'DOC-901',
    title: 'North Star Automated Underwriting Memo & TRID Manifest',
    caseRef: 'NS-MTG-8841 (Oakridge Residential)',
    type: 'TRID Closing Package',
    standard: 'TRID / CFPB & MISMO 3.4',
    generatedAt: '2026-10-18 10:45:12',
    hash: '0x9f4a88bc3e1290aa7c0411',
    fileSize: '142 KB',
    content: `================================================================================
NORTH STAR MORTGAGE CASE MANAGEMENT // LIVING DOCUMENTATION ENGINE
CASE REFERENCE: NS-MTG-8841 | CLIENT: MARCUS & ELEANOR VANCE
SYSTEM INSTANCE: ns-cloud-prod-eu1 | JURISDICTION: ENGLAND & WALES
================================================================================

1. EXECUTIVE UNDERWRITING DECISION:
   Status: APPROVED_FOR_DISBURSAL
   Loan Amount: £485,000.00 | Purchase Price: £668,000.00 | LTV: 72.60%
   Product: 5-Year Fixed Institutional Residential Prime @ 3.84% APRC
   Monthly Repayment: £2,412.30 (Capital & Interest)

2. VERIFIED DATA LINEAGE RECORD (BCBS 239 ATTESTATION):
   [+] Income Source: HMRC RTI API Stream verified without manual touch.
   [+] Bank Deposit Provenance: Open Banking API 6-Month Liquidity Trace: PASS.
   [+] Title & Encumbrance: HM Land Registry First Legal Charge confirmed clear.
   [+] Fraud & Sanctions: Zero matches across OFAC, HM Treasury, PEP lists.

3. UNDERWRITING CONDITIONS MANIFEST:
   [X] Condition 1: HMRC Tax Calculation SA302 Matched (Auto-Cleared)
   [X] Condition 2: 6-Month Statement Bank Trail Confirmed (Auto-Cleared)
   [X] Condition 3: Land Registry Title Registration Received (Auto-Cleared)
   [X] Condition 4: Buildings Insurance Endorsed (Cleared by Sarah Jenkins)

4. TRID & TILA COMPLIANCE DISCLOSURE:
   Closing Disclosure issued 72 hours prior to completion window.
   APR accuracy verified within 0.05% tolerance boundary.
   Cryptographic Audit Hash: 0x9f4a88bc3e1290aa7c0411
================================================================================`,
  },
  {
    id: 'DOC-902',
    title: 'North Star Commercial Facility Agreement & Covenant Schedule',
    caseRef: 'NS-SME-4409 (Aero-Tech Logistics Ltd)',
    type: 'Facility Agreement',
    standard: 'LMA Standard Commercial Facility (UK)',
    generatedAt: '2026-10-18 11:15:30',
    hash: '0x19f2a00c9213efba88102',
    fileSize: '210 KB',
    content: `================================================================================
NORTH STAR SME COMMERCIAL CREDIT ENGINE // FACILITY AGREEMENT SPEC
FACILITY REF: NS-SME-4409 | BORROWER: AERO-TECH LOGISTICS LTD (CO. #11894022)
DOCUMENT HASH: 0x19f2a00c9213efba88102 | SECURITY: COMPOSITE DEBENTURE
================================================================================

1. FACILITY PARTICULARS:
   Principal Sum: £650,000.00
   Facility Type: Senior Secured Commercial Term Loan
   Tenor: 36 Months Amortizing
   Interest Rate: Bank of England Base Rate + 3.40% per annum
   Security: Floating Debenture over all Company Assets + Director Personal Guarantee

2. CASH-FLOW LINEAGE & DEBT SERVICE PROVENANCE:
   • 24-Month Operating Revenue: £4,850,000 verified via direct Xero API ledger.
   • Historical DSCR: 1.84x (Tested against £38,400 monthly debt service).
   • Stressed DSCR (+250 bps rate hike scenario): 1.42x (Comfortably above 1.20x trigger).
   • Customer Concentration: Top 5 accounts represent 21.8% of aggregate invoicing.

3. DYNAMIC LIVING COVENANTS (REAL-TIME API MONITORING):
   Covenant 1: Minimum Debt Service Coverage Ratio (DSCR) >= 1.20x tested monthly.
   Covenant 2: Leverage Ratio (Total Senior Debt to EBITDA) <= 2.80x.
   Covenant 3: Continuous Open Banking Read-Access must be maintained active.

Executed on behalf of North Star Lending Suite syndicate.
================================================================================`,
  },
  {
    id: 'DOC-903',
    title: 'MISMO 3.4 Canonical Loan Data Package (XML Payload)',
    caseRef: 'NS-MTG-8841 (Oakridge Residential)',
    type: 'MISMO 3.4 Payload',
    standard: 'MISMO Version 3.4 Reference Model',
    generatedAt: '2026-10-18 11:30:00',
    hash: '0x44ab771029ccefa10822',
    fileSize: '78 KB',
    content: `<?xml version="1.0" encoding="UTF-8"?>
<MESSAGE xmlns="http://www.mismo.org/residential/2009/schemas"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         MISMOVersionID="3.4">
  <ABOUT_VERSIONS>
    <ABOUT_VERSION>
      <DataVersionIdentifier>NorthStar-Cloud-v2.4</DataVersionIdentifier>
    </ABOUT_VERSION>
  </ABOUT_VERSIONS>
  <DEAL_SETS>
    <DEAL_SET>
      <DEALS>
        <DEAL>
          <COLLATERALS>
            <COLLATERAL>
              <SUBJECT_PROPERTY>
                <ADDRESS>
                  <AddressLineText>14 Oakridge Avenue</AddressLineText>
                  <CityName>Harpenden</CityName>
                  <PostalCode>AL5 2PQ</PostalCode>
                  <CountryCode>GBR</CountryCode>
                </ADDRESS>
                <PROPERTY_DETAIL>
                  <PropertyEstimatedValueAmount>668000.00</PropertyEstimatedValueAmount>
                  <PropertyUsageType>PrimaryResidence</PropertyUsageType>
                </PROPERTY_DETAIL>
              </SUBJECT_PROPERTY>
            </COLLATERAL>
          </COLLATERALS>
          <LOANS>
            <LOAN LoanRoleType="SubjectLoan">
              <TERMS_OF_LOAN>
                <BaseLoanAmount>485000.00</BaseLoanAmount>
                <LoanAmortizationPeriodCount>300</LoanAmortizationPeriodCount>
                <NoteRatePercent>3.840</NoteRatePercent>
              </TERMS_OF_LOAN>
              <UNDERWRITING>
                <UnderwritingDecisionType>ApprovedWithConditions</UnderwritingDecisionType>
                <AutomatedUnderwritingSystemType>NorthStarRulesEngine</AutomatedUnderwritingSystemType>
              </UNDERWRITING>
            </LOAN>
          </LOANS>
        </DEAL>
      </DEALS>
    </DEAL_SET>
  </DEAL_SETS>
</MESSAGE>`,
  },
];
