export type NavigationTab = 'overview' | 'cards' | 'benefits' | 'claims' | 'transactions' | 'settings';

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  cardType: string;
  last4: string;
  cardholder: string;
  expDate: string;
  benefitCount: number;
  gradientClass: string;
  accentColor: string;
  network: 'VISA INFINITE' | 'MASTERCARD WORLD' | 'AMEX REWARD';
  billingCycle: string;
  creditLimit?: string;
  annualFee?: string;
  apr?: string;
  protectionPerks?: string[];
}

export interface Benefit {
  id: string;
  title: string;
  iconName: 'ShieldAlert' | 'Undo2' | 'PlaneTakeoff' | 'PhoneCall' | 'Luggage' | 'ReceiptText';
  category: 'Purchase Safeguard' | 'Travel Disruption' | 'Retail & Return' | 'Emergency Assistance';
  shortExplanation: string;
  sampleCoverageLabel: string;
  potEligibleCards: string[];
  maxDaysWindow: string;
  deductible: string;
  fullDescription: string;
  coverageRules: string[];
  requiredDocuments: string[];
  disclaimer: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  category: 'Electronics' | 'Travel' | 'Apparel' | 'Lodging' | 'Dining' | 'Entertainment';
  cardId: string;
  cardName: string;
  cardLast4: string;
  benefitEligibleTag: string;
  potentialBenefitId?: string;
}

export interface ClaimOpportunity {
  id: string;
  benefitType: string;
  benefitId: string;
  relatedPurchaseMerchant: string;
  relatedPurchaseAmount: number;
  purchaseDate: string;
  transactionId: string;
  cardName: string;
  cardLast4: string;
  status: string;
  statusType: 'ready' | 'recommended' | 'review';
  detectedSignal: string;
  potentialEstAmount: string;
  windowDaysLeft: number;
  actionLabel: string;
  requiredProof: string[];
  incidentDetails: string;
}

export interface SummaryStat {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  trend: string;
  icon: 'CreditCard' | 'ShieldCheck' | 'AlertCircle' | 'Clock';
  accent: 'cyan' | 'violet' | 'amber' | 'emerald';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'claim' | 'benefit' | 'transaction' | 'alert';
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  tier: string;
  avatarUrl?: string;
  joinedDate: string;
}
