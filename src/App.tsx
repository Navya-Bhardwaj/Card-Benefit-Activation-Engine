import React, { useState, useMemo } from 'react';
import { 
  mockUser, 
  mockStats, 
  mockCards, 
  mockBenefits, 
  mockTransactions, 
  mockClaims, 
  mockNotifications 
} from './data/mockData';
import type { 
  NavigationTab, 
  Benefit, 
  Transaction, 
  ClaimOpportunity, 
  NotificationItem 
} from './types';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { HeroBanner } from './components/HeroBanner';
import { StatCard } from './components/StatCard';
import { PaymentCard } from './components/PaymentCard';
import { BenefitCard } from './components/BenefitCard';
import { TransactionList } from './components/TransactionList';
import { ClaimCard } from './components/ClaimCard';
import { DetailModal } from './components/DetailModal';
import { CardsPage } from './pages/CardsPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { SettingsPage } from './pages/SettingsPage';
import { 
  CreditCard as CreditCardIcon, 
  ShieldCheck, 
  AlertCircle, 
  Filter, 
  RotateCcw, 
  Search,
  ArrowRight
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    benefit?: Benefit | null;
    claim?: ClaimOpportunity | null;
    transaction?: Transaction | null;
  }>({
    isOpen: false,
    benefit: null,
    claim: null,
    transaction: null,
  });

  // Handle Mark all notifications as read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Handle Notification selection
  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );

    if (item.category === 'claim') {
      const relatedClaim = mockClaims[0];
      setModalState({ isOpen: true, claim: relatedClaim });
    } else if (item.category === 'benefit') {
      const relatedBenefit = mockBenefits[0];
      setModalState({ isOpen: true, benefit: relatedBenefit });
    }
  };

  // Card filter toggle
  const handleCardSelect = (cardId: string) => {
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(cardId);
    }
  };

  // Filtered Benefits for the Overview dashboard
  const filteredBenefits = useMemo(() => {
    return mockBenefits.filter((b) => {
      const matchesSearch =
        searchTerm === '' ||
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.shortExplanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCard =
        !selectedCardId ||
        (selectedCardId === 'card-1' && b.potEligibleCards.some((c) => c.includes('Platinum'))) ||
        (selectedCardId === 'card-2' && b.potEligibleCards.some((c) => c.includes('Travel'))) ||
        (selectedCardId === 'card-3' && b.potEligibleCards.some((c) => c.includes('Everyday') || c.includes('Platinum')));

      return matchesSearch && matchesCard;
    });
  }, [searchTerm, selectedCardId]);

  // Filtered Transactions for the Overview dashboard
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const matchesSearch =
        searchTerm === '' ||
        tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.benefitEligibleTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.cardName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCard = !selectedCardId || tx.cardId === selectedCardId;

      return matchesSearch && matchesCard;
    });
  }, [searchTerm, selectedCardId]);

  // Filtered Claims for the Overview dashboard
  const filteredClaims = useMemo(() => {
    return mockClaims.filter((claim) => {
      const matchesSearch =
        searchTerm === '' ||
        claim.benefitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.relatedPurchaseMerchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.detectedSignal.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCard =
        !selectedCardId ||
        (selectedCardId === 'card-1' && claim.cardLast4 === '4821') ||
        (selectedCardId === 'card-2' && claim.cardLast4 === '9034') ||
        (selectedCardId === 'card-3' && claim.cardLast4 === '6152');

      return matchesSearch && matchesCard;
    });
  }, [searchTerm, selectedCardId]);

  const selectedCard = mockCards.find((c) => c.id === selectedCardId);

  return (
    <div className="min-h-screen bg-[#080D1B] text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* 1. Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        claimOpportunityCount={mockClaims.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* 2. Top Navigation */}
        <Topbar
          user={mockUser}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllNotificationsRead}
          onSelectNotification={handleSelectNotification}
          onNavigateSettings={() => setActiveTab('settings')}
        />

        {/* Main Dashboard Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Active Card Filter Banner (shown on overview when filtering by card) */}
          {activeTab === 'overview' && selectedCard && (
            <div className="p-3.5 rounded-2xl bg-[#111A2E]/90 border border-[#45D9F5]/30 flex items-center justify-between shadow-lg shadow-[#45D9F5]/5 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3">
                <span className="p-1.5 rounded-lg bg-[#45D9F5]/10 text-[#45D9F5]">
                  <Filter className="w-4 h-4" />
                </span>
                <p className="text-xs text-slate-300">
                  Filtering views for <strong className="text-white">{selectedCard.name}</strong> (•••• {selectedCard.last4})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCardId(null)}
                className="text-xs text-[#45D9F5] hover:text-cyan-300 flex items-center gap-1 font-semibold px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All Cards</span>
              </button>
            </div>
          )}

          {/* Search Result Bar (shown on overview when active) */}
          {activeTab === 'overview' && searchTerm && (
            <div className="p-3.5 rounded-2xl bg-[#111A2E]/90 border border-white/[0.1] flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-[#45D9F5]" />
                <span>
                  Filtering results for: <strong className="text-white font-mono">"{searchTerm}"</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-xs text-[#45D9F5] hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* VIEW 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <>
              {/* Section C: Hero Section */}
              <section aria-label="Welcome overview">
                <HeroBanner
                  onExploreBenefits={() => setActiveTab('benefits')}
                  activeCardCount={mockCards.length}
                  availableBenefitCount={mockStats[1].value as number}
                />
              </section>

              {/* Section D: Summary Cards */}
              <section aria-label="Summary statistics">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {mockStats.map((stat) => (
                    <StatCard
                      key={stat.id}
                      stat={stat}
                      onClick={() => {
                        if (stat.id === 'active-cards') setActiveTab('cards');
                        else if (stat.id === 'available-benefits') setActiveTab('benefits');
                        else if (stat.id === 'potential-claims' || stat.id === 'claims-in-progress') setActiveTab('claims');
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* Section E: My Cards Section */}
              <section aria-label="My Cards" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <CreditCardIcon className="w-5 h-5 text-[#45D9F5]" />
                      <span>My Cards</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Select any card below to filter its associated protection policies and transactions.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('cards')}
                    className="text-xs font-semibold text-[#45D9F5] hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Full Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {mockCards.map((card) => (
                    <PaymentCard
                      key={card.id}
                      card={card}
                      isSelected={selectedCardId === card.id}
                      onSelect={handleCardSelect}
                    />
                  ))}
                </div>
              </section>

              {/* Section F: Benefit Discovery Section */}
              <section aria-label="Benefit Discovery" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#8B7CFF]" />
                      <span>Benefit Discovery</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Potentially eligible protections identified across your portfolio.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab('benefits')}
                    className="text-xs font-semibold text-[#45D9F5] hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Explore All {mockBenefits.length} Policies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {filteredBenefits.length === 0 ? (
                  <div className="glass-panel rounded-2xl p-8 text-center text-slate-400 text-sm">
                    No benefits found matching your filter criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredBenefits.slice(0, 3).map((benefit) => (
                      <BenefitCard
                        key={benefit.id}
                        benefit={benefit}
                        onViewDetails={(b) =>
                          setModalState({ isOpen: true, benefit: b })
                        }
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Section H & G: Split Grid for Potential Claims & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Section H: Potential Claims (5 cols on lg) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-emerald-400" />
                        <span>Potential Claims Radar</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Detected opportunities ready for simulated claim review
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('claims')}
                      className="text-xs font-semibold text-[#45D9F5] hover:text-cyan-300 flex items-center gap-1"
                    >
                      <span>Radar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {filteredClaims.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-6 text-center text-slate-400 text-sm">
                      No active claim opportunities match your selected filter.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredClaims.slice(0, 2).map((claim) => (
                        <ClaimCard
                          key={claim.id}
                          claim={claim}
                          onReviewDetails={(c) =>
                            setModalState({ isOpen: true, claim: c })
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Section G: Recent Activity (7 cols on lg) */}
                <div className="lg:col-span-7 space-y-4">
                  <TransactionList
                    transactions={filteredTransactions.slice(0, 4)}
                    onSelectTransaction={(tx) => {
                      setModalState({ isOpen: true, transaction: tx });
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* VIEW 2: MY CARDS PAGE */}
          {activeTab === 'cards' && (
            <CardsPage
              cards={mockCards}
              benefits={mockBenefits}
              transactions={mockTransactions}
              onViewBenefitDetails={(b) => setModalState({ isOpen: true, benefit: b })}
              onViewTransactionDetails={(t) => setModalState({ isOpen: true, transaction: t })}
            />
          )}

          {/* VIEW 3: BENEFITS PAGE */}
          {activeTab === 'benefits' && (
            <BenefitsPage
              benefits={mockBenefits}
              cards={mockCards}
              onViewDetails={(b) => setModalState({ isOpen: true, benefit: b })}
            />
          )}

          {/* VIEW 4: CLAIMS PAGE */}
          {activeTab === 'claims' && (
            <ClaimsPage
              claims={mockClaims}
              onReviewDetails={(c) => setModalState({ isOpen: true, claim: c })}
            />
          )}

          {/* VIEW 5: TRANSACTIONS PAGE */}
          {activeTab === 'transactions' && (
            <TransactionsPage
              transactions={mockTransactions}
              cards={mockCards}
              onSelectTransaction={(t) => setModalState({ isOpen: true, transaction: t })}
            />
          )}

          {/* VIEW 6: SETTINGS PAGE */}
          {activeTab === 'settings' && (
            <SettingsPage user={mockUser} />
          )}
        </main>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalState.isOpen}
        onClose={() =>
          setModalState({
            isOpen: false,
            benefit: null,
            claim: null,
            transaction: null,
          })
        }
        benefit={modalState.benefit}
        claim={modalState.claim}
        transaction={modalState.transaction}
      />
    </div>
  );
};

export default App;
