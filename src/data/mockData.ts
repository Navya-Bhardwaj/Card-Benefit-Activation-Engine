import type { CreditCard, Benefit, Transaction, ClaimOpportunity, SummaryStat, NotificationItem, UserProfile } from '../types';

export const mockUser: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@prestige.io',
  tier: 'Elite Beneficiary Tier',
  joinedDate: 'Jan 2024'
};

export const mockStats: SummaryStat[] = [
  {
    id: 'active-cards',
    title: 'Active Cards',
    value: 3,
    subtitle: 'Monitored across 3 issuers',
    trend: '+1 card added recently',
    icon: 'CreditCard',
    accent: 'cyan'
  },
  {
    id: 'available-benefits',
    title: 'Available Benefits',
    value: 12,
    subtitle: 'Protections active across cards',
    trend: '100% policy synched',
    icon: 'ShieldCheck',
    accent: 'violet'
  },
  {
    id: 'potential-claims',
    title: 'Potential Claim Opportunities',
    value: 4,
    subtitle: 'Estimated value up to $1,420',
    trend: '2 urgent detection alerts',
    icon: 'AlertCircle',
    accent: 'emerald'
  },
  {
    id: 'claims-in-progress',
    title: 'Claims In Progress',
    value: 2,
    subtitle: '1 awaiting documentation upload',
    trend: 'Updated 2 days ago',
    icon: 'Clock',
    accent: 'amber'
  }
];

export const mockCards: CreditCard[] = [
  {
    id: 'card-1',
    name: 'Platinum Card',
    issuer: 'Apex Prestige Financial',
    cardType: 'Apex Elite Reserve',
    last4: '4821',
    cardholder: 'ALEX MORGAN',
    expDate: '09/28',
    benefitCount: 8,
    gradientClass: 'card-gradient-platinum',
    accentColor: '#45D9F5',
    network: 'VISA INFINITE',
    billingCycle: 'Closes on 18th',
    creditLimit: '$30,000 USD',
    annualFee: '$550 / year',
    apr: '21.49% Variable',
    protectionPerks: [
      '90-Day Purchase Damage & Theft Security',
      'Return Safeguard with Store Refusal Step-In',
      'Extended Warranty Multiplier (+1 Year)',
      'Global Emergency Medical Referral Services'
    ]
  },
  {
    id: 'card-2',
    name: 'Travel Rewards Card',
    issuer: 'AeroVoyage International Bank',
    cardType: 'World Explorer Mastercard',
    last4: '9034',
    cardholder: 'ALEX MORGAN',
    expDate: '11/27',
    benefitCount: 7,
    gradientClass: 'card-gradient-travel',
    accentColor: '#38BDF8',
    network: 'MASTERCARD WORLD',
    billingCycle: 'Closes on 25th',
    creditLimit: '$20,000 USD',
    annualFee: '$95 / year',
    apr: '19.99% Variable',
    protectionPerks: [
      'Trip Delay Essential Reimbursement (6+ hrs)',
      'Baggage Loss & Transit Delay Protection',
      'Auto Rental Collision Damage Waiver',
      'Trip Cancellation & Interruption Safeguard'
    ]
  },
  {
    id: 'card-3',
    name: 'Everyday Cashback Card',
    issuer: 'Horizon Trust Bank',
    cardType: 'Cashback Advantage Pro',
    last4: '6152',
    cardholder: 'ALEX MORGAN',
    expDate: '04/29',
    benefitCount: 5,
    gradientClass: 'card-gradient-cashback',
    accentColor: '#8B7CFF',
    network: 'AMEX REWARD',
    billingCycle: 'Closes on 05th',
    creditLimit: '$12,500 USD',
    annualFee: '$0 (No Annual Fee)',
    apr: '18.24% Variable',
    protectionPerks: [
      'Cellular Wireless Protection ($800 / claim)',
      'Retail Price Drop Guarantee (60 days)',
      'Extended Manufacturer Warranty',
      'Zero Fraud Liability Assurance'
    ]
  }
];

export const mockBenefits: Benefit[] = [
  {
    id: 'benefit-purchase-protection',
    title: 'Purchase Protection',
    iconName: 'ShieldAlert',
    category: 'Purchase Safeguard',
    shortExplanation: 'Provides reimbursement if eligible items purchased with your card are stolen or accidentally damaged within 90 days.',
    sampleCoverageLabel: 'Potentially eligible up to $10,000 / event',
    potEligibleCards: ['Platinum Card (•••• 4821)', 'Travel Rewards (•••• 9034)'],
    maxDaysWindow: '90 days from date of transaction',
    deductible: '$0 per qualifying incident',
    fullDescription: 'Your card program may automatically reimburse you to repair or replace qualifying personal property purchased entirely with your card within the 90-day protection window. Covers unintentional drops, screen cracks, water damage, and documented theft with police report.',
    coverageRules: [
      'Item must be paid in full with the designated eligible card.',
      'Notification must be submitted within 60 days of the incident.',
      'Loss must be unintentional or verified by an official police theft report within 48 hours.',
      'Items used for commercial or resale purposes are typically excluded.'
    ],
    requiredDocuments: [
      'Original merchant itemized sales receipt',
      'Card monthly statement showing transaction charge',
      'Repair estimate from authorized repair center (if damaged)',
      'Police incident report reference number (if stolen)'
    ],
    disclaimer: 'Coverage terms, exclusions, and limits are subject to issuer cardholder agreements. Antigravity Card Benefit Activation Engine provides informational discovery and does not bind or guarantee insurer payout.'
  },
  {
    id: 'benefit-return-protection',
    title: 'Return Protection',
    iconName: 'Undo2',
    category: 'Retail & Return',
    shortExplanation: 'Step-in protection if a merchant refuses to accept the return of an unused, undamaged eligible item within 90 days.',
    sampleCoverageLabel: 'Potentially eligible up to $300 / item',
    potEligibleCards: ['Platinum Card (•••• 4821)'],
    maxDaysWindow: '90 days from original purchase',
    deductible: '$0 (shipping reimbursement may apply)',
    fullDescription: 'If you attempt to return an eligible retail purchase within 90 days and the merchant declines due to final-sale policies or expiration of their store return window, your card benefit may reimburse the purchase price up to $300 per item (max $1,000 annual limit).',
    coverageRules: [
      'Must have attempted return to original merchant within their stated policy limits or within 90 days of purchase.',
      'Merchant refusal must be documented in writing or attested in the claim narrative.',
      'Items must be in brand-new, functioning, unworn condition.',
      'Motorized vehicles, jewelry, and perishable goods are excluded.'
    ],
    requiredDocuments: [
      'Original merchant sales receipt',
      'Card statement indicating full charge',
      'Written merchant decline verification or formal return refusal statement'
    ],
    disclaimer: 'Coverage terms, exclusions, and limits are subject to issuer cardholder agreements. Antigravity Card Benefit Activation Engine provides informational discovery and does not bind or guarantee insurer payout.'
  },
  {
    id: 'benefit-travel-delay',
    title: 'Travel Delay Coverage',
    iconName: 'PlaneTakeoff',
    category: 'Travel Disruption',
    shortExplanation: 'Reimburses essential expenses such as meals, lodging, toiletries, and medication when common carrier travel is delayed by 6+ hours.',
    sampleCoverageLabel: 'Potentially eligible up to $500 / ticket',
    potEligibleCards: ['Travel Rewards (•••• 9034)', 'Platinum Card (•••• 4821)'],
    maxDaysWindow: '60 days following scheduled departure',
    deductible: '$0 for qualified delays over 6 hours',
    fullDescription: 'When your scheduled flight, passenger train, or cruise trip booked with your card is delayed for more than 6 hours due to severe weather, mechanical breakdown, or carrier labor actions, this benefit helps offset essential unreimbursed expenses up to $500 per passenger.',
    coverageRules: [
      'Common carrier fare must have been paid using the qualifying card.',
      'Delay must exceed 6 consecutive hours or require an unplanned overnight stay.',
      'Covers reasonable unplanned meals, hotel accommodation, ground transit, and essential medications.',
      'Delays announced prior to scheduled departure time may have specific notification parameters.'
    ],
    requiredDocuments: [
      'Airline/carrier booking confirmation and boarding passes',
      'Official carrier statement confirming the specific delay duration and reason',
      'Itemized receipts for all incurred out-of-pocket expenses (hotel, food, transit)'
    ],
    disclaimer: 'Coverage terms, exclusions, and limits are subject to issuer cardholder agreements. Antigravity Card Benefit Activation Engine provides informational discovery and does not bind or guarantee insurer payout.'
  },
  {
    id: 'benefit-extended-warranty',
    title: 'Extended Warranty Protection',
    iconName: 'ReceiptText',
    category: 'Purchase Safeguard',
    shortExplanation: 'Doubles or extends original manufacturer warranties by up to an additional 12 months on eligible retail electronics and appliances.',
    sampleCoverageLabel: 'Potentially eligible up to $10,000 / item',
    potEligibleCards: ['Platinum Card (•••• 4821)', 'Everyday Cashback (•••• 6152)'],
    maxDaysWindow: 'Valid throughout the extension term',
    deductible: '$0 per qualifying incident',
    fullDescription: 'Extends original manufacturer warranties of 3 years or less by up to 1 additional year. If an eligible laptop, television, or household electronic fails due to internal mechanical or electronic defect during the extended term, the card benefit covers certified repair or replacement.',
    coverageRules: [
      'Item must have been paid in whole or in part with the qualifying card.',
      'Original manufacturer US warranty must be 3 years or less.',
      'Repairs must be handled through certified or authorized repair technicians.',
      'Commercial products and pre-owned refurbished items without manufacturer certified warranties are excluded.'
    ],
    requiredDocuments: [
      'Original merchant sales receipt',
      'Card statement showing the purchase transaction',
      'Copy of manufacturer original warranty booklet or certificate',
      'Itemized repair estimate or diagnostic invoice'
    ],
    disclaimer: 'Coverage terms, exclusions, and limits are subject to issuer cardholder agreements. Antigravity Card Benefit Activation Engine provides informational discovery and does not bind or guarantee insurer payout.'
  },
  {
    id: 'benefit-baggage-delay',
    title: 'Baggage Delay & Loss Protection',
    iconName: 'Luggage',
    category: 'Travel Disruption',
    shortExplanation: 'Reimburses necessary emergency personal items if checked luggage is delayed by a carrier for more than 4 hours.',
    sampleCoverageLabel: 'Potentially eligible up to $1,500 / baggage',
    potEligibleCards: ['Travel Rewards (•••• 9034)'],
    maxDaysWindow: '20 days from baggage delivery',
    deductible: '$0 per passenger',
    fullDescription: 'Provides emergency reimbursement for essential purchases like clothing, toiletries, and chargers if your checked bags are misdirected or delayed past 4 hours by a commercial airline, bus, train, or cruise line.',
    coverageRules: [
      'Entire common carrier ticket must be charged to the Travel Rewards card.',
      'Carrier Property Irregularity Report (PIR) must be filed immediately upon arrival.',
      'Eligible expenses must be incurred before luggage is returned to passenger possession.'
    ],
    requiredDocuments: [
      'Carrier boarding pass & luggage claim baggage tags',
      'Airline Property Irregularity Report (PIR) claim form',
      'Receipts for essential emergency items purchased during delay'
    ],
    disclaimer: 'Coverage terms, exclusions, and limits are subject to issuer cardholder agreements. Antigravity Card Benefit Activation Engine provides informational discovery and does not bind or guarantee insurer payout.'
  },
  {
    id: 'benefit-cellphone-protection',
    title: 'Cellular Telephone Protection',
    iconName: 'PhoneCall',
    category: 'Purchase Safeguard',
    shortExplanation: 'Covers cracked screens, water damage, and theft when you pay your monthly wireless bill with your eligible card.',
    sampleCoverageLabel: 'Potentially eligible up to $800 / claim',
    potEligibleCards: ['Everyday Cashback (•••• 6152)'],
    maxDaysWindow: 'Monthly billing cycle continuation',
    deductible: '$50 deductible per occurrence',
    fullDescription: 'By paying your monthly cellular bill with your card, your phone is covered against accidental drop damage, cracked screens, and theft. Allows up to 2 approved claims per 12-month period with a $50 deductible.',
    coverageRules: [
      'Previous month cellular bill must have been charged to the eligible card.',
      'Covers phones on the primary cardholder family wireless plan.',
      'Cosmetic scratches that do not affect functionality are not covered.'
    ],
    requiredDocuments: [
      'Monthly wireless statement showing card payment',
      'Device purchase receipt or IMEI wireless carrier verification',
      'Diagnostic repair quote or police report for theft'
    ],
    disclaimer: 'Coverage terms, exclusions, and limits are subject to issuer cardholder agreements. Antigravity Card Benefit Activation Engine provides informational discovery and does not bind or guarantee insurer payout.'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'tx-101',
    merchant: 'Nordic Audio Gear',
    date: 'Oct 11, 2026',
    amount: 389.00,
    category: 'Electronics',
    cardId: 'card-1',
    cardName: 'Platinum Card',
    cardLast4: '4821',
    benefitEligibleTag: 'Purchase Protection Eligible',
    potentialBenefitId: 'benefit-purchase-protection'
  },
  {
    id: 'tx-102',
    merchant: 'Skyline Airways',
    date: 'Oct 08, 2026',
    amount: 642.50,
    category: 'Travel',
    cardId: 'card-2',
    cardName: 'Travel Rewards',
    cardLast4: '9034',
    benefitEligibleTag: 'Flight Delay Protections',
    potentialBenefitId: 'benefit-travel-delay'
  },
  {
    id: 'tx-103',
    merchant: 'Urban Outfitters Studio',
    date: 'Oct 04, 2026',
    amount: 145.20,
    category: 'Apparel',
    cardId: 'card-3',
    cardName: 'Everyday Cashback',
    cardLast4: '6152',
    benefitEligibleTag: 'Return Protection Window Open',
    potentialBenefitId: 'benefit-return-protection'
  },
  {
    id: 'tx-104',
    merchant: 'Aura Lumina Hotel',
    date: 'Sep 29, 2026',
    amount: 520.00,
    category: 'Lodging',
    cardId: 'card-2',
    cardName: 'Travel Rewards',
    cardLast4: '9034',
    benefitEligibleTag: 'Trip Interruption Safeguard',
    potentialBenefitId: 'benefit-travel-delay'
  },
  {
    id: 'tx-105',
    merchant: 'MacTech Ultrabook Systems',
    date: 'Sep 15, 2026',
    amount: 1250.00,
    category: 'Electronics',
    cardId: 'card-1',
    cardName: 'Platinum Card',
    cardLast4: '4821',
    benefitEligibleTag: 'Extended Warranty Active',
    potentialBenefitId: 'benefit-extended-warranty'
  },
  {
    id: 'tx-106',
    merchant: 'AeroVoyage Flight Transit',
    date: 'Sep 12, 2026',
    amount: 185.00,
    category: 'Travel',
    cardId: 'card-2',
    cardName: 'Travel Rewards',
    cardLast4: '9034',
    benefitEligibleTag: 'Baggage Delay Protection',
    potentialBenefitId: 'benefit-baggage-delay'
  },
  {
    id: 'tx-107',
    merchant: 'Bistro Lumière Dining',
    date: 'Sep 05, 2026',
    amount: 188.50,
    category: 'Dining',
    cardId: 'card-3',
    cardName: 'Everyday Cashback',
    cardLast4: '6152',
    benefitEligibleTag: 'Zero Fraud Liability Active',
    potentialBenefitId: 'benefit-purchase-protection'
  },
  {
    id: 'tx-108',
    merchant: 'Horizon Telecom Cellular',
    date: 'Aug 28, 2026',
    amount: 110.00,
    category: 'Electronics',
    cardId: 'card-3',
    cardName: 'Everyday Cashback',
    cardLast4: '6152',
    benefitEligibleTag: 'Cellular Safeguard Protected',
    potentialBenefitId: 'benefit-cellphone-protection'
  }
];

export const mockClaims: ClaimOpportunity[] = [
  {
    id: 'claim-01',
    benefitType: 'Travel Delay Coverage',
    benefitId: 'benefit-travel-delay',
    relatedPurchaseMerchant: 'Skyline Airways',
    relatedPurchaseAmount: 642.50,
    purchaseDate: 'Oct 08, 2026',
    transactionId: 'tx-102',
    cardName: 'Travel Rewards Card',
    cardLast4: '9034',
    status: 'Draft Ready • 60 Days Remaining',
    statusType: 'ready',
    detectedSignal: '8h 15m delay detected on Flight #SA-821 (Chicago ORD → London LHR)',
    potentialEstAmount: 'Up to $500.00',
    windowDaysLeft: 56,
    actionLabel: 'Review Details',
    requiredProof: [
      'Boarding pass & e-ticket confirmation',
      'Skyline Airways written delay verification letter',
      'Airport meal & hotel receipts ($245.80 incurred)'
    ],
    incidentDetails: 'Flight departure delayed from 18:30 to 02:45 due to scheduled aircraft mechanical maintenance. Exceeded standard 6-hour threshold required by card policy.'
  },
  {
    id: 'claim-02',
    benefitType: 'Purchase Protection',
    benefitId: 'benefit-purchase-protection',
    relatedPurchaseMerchant: 'Nordic Audio Gear',
    relatedPurchaseAmount: 389.00,
    purchaseDate: 'Oct 11, 2026',
    transactionId: 'tx-101',
    cardName: 'Platinum Card',
    cardLast4: '4821',
    status: 'Action Recommended • Window Closes in 45 Days',
    statusType: 'recommended',
    detectedSignal: 'Recent purchase within active 90-day damage & theft window',
    potentialEstAmount: 'Up to $389.00',
    windowDaysLeft: 45,
    actionLabel: 'Review Details',
    requiredProof: [
      'Nordic Audio Gear itemized digital receipt',
      'Apex Prestige monthly card statement',
      'Diagnostic photo or repair estimate if device has physical defect/drop'
    ],
    incidentDetails: 'High-value audio electronics purchase charged in full on Apex Elite Reserve. Qualifies for complete replacement or certified repair reimbursement in case of accidental damage.'
  },
  {
    id: 'claim-03',
    benefitType: 'Baggage Delay & Loss Protection',
    benefitId: 'benefit-baggage-delay',
    relatedPurchaseMerchant: 'AeroVoyage Flight Transit',
    relatedPurchaseAmount: 185.00,
    purchaseDate: 'Sep 12, 2026',
    transactionId: 'tx-106',
    cardName: 'Travel Rewards Card',
    cardLast4: '9034',
    status: 'Under Review • Carrier PIR Synced',
    statusType: 'review',
    detectedSignal: 'Checked baggage delayed past 5.5 hours at terminal arrival',
    potentialEstAmount: 'Up to $185.00',
    windowDaysLeft: 14,
    actionLabel: 'Review Details',
    requiredProof: [
      'Luggage baggage claim tags and ticket confirmation',
      'Carrier Property Irregularity Report (PIR)',
      'Receipts for essential emergency toiletries and garments'
    ],
    incidentDetails: 'Checked baggage was misrouted during connection in Frankfurt and delivered 18 hours later. Qualifying essential items purchased during the delay are eligible for full offset.'
  },
  {
    id: 'claim-04',
    benefitType: 'Extended Warranty Protection',
    benefitId: 'benefit-extended-warranty',
    relatedPurchaseMerchant: 'MacTech Ultrabook Systems',
    relatedPurchaseAmount: 1250.00,
    purchaseDate: 'Sep 15, 2026',
    transactionId: 'tx-105',
    cardName: 'Platinum Card',
    cardLast4: '4821',
    status: 'Action Recommended • Diagnostic Estimate Needed',
    statusType: 'recommended',
    detectedSignal: 'Hardware purchased with Apex Elite has entered the extended +1 year card protection term',
    potentialEstAmount: 'Up to $1,250.00',
    windowDaysLeft: 120,
    actionLabel: 'Review Details',
    requiredProof: [
      'Original purchase receipt and card transaction statement',
      'Original 1-year manufacturer warranty certificate',
      'Diagnostic invoice from Apple authorized service provider'
    ],
    incidentDetails: 'Laptop motherboard malfunction reported past manufacturer 12-month expiry. Eligible for full repair coverage under cardholder warranty extension terms.'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Travel delay signal detected',
    message: 'Flight #SA-821 incurred an 8h+ delay. Potential claim draft pre-filled for Skyline Airways booking.',
    time: '2 hours ago',
    category: 'claim',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Purchase protection window active',
    message: 'Your recent purchase at Nordic Audio Gear ($389.00) is protected against damage until Jan 09, 2027.',
    time: 'Yesterday',
    category: 'benefit',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Monthly statement analyzed',
    message: 'Apex Prestige Financial statement processed. 4 new purchases scanned for benefit eligibility.',
    time: '3 days ago',
    category: 'transaction',
    read: true
  }
];
