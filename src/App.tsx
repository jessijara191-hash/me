import React, { useState, useEffect } from 'react';
import { ActiveTab, Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { BossChatView } from './components/BossChatView';
import { ViralHunterView } from './components/ViralHunterView';
import { MarketingStudioView } from './components/MarketingStudioView';
import { OmniChatView } from './components/OmniChatView';
import { StorefrontView } from './components/StorefrontView';
import { AutopilotSettingsView } from './components/AutopilotSettingsView';
import { VoiceCallModal } from './components/VoiceCallModal';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';

import {
  Product,
  Order,
  SocialPost,
  CustomerConversation,
  BossChatMessage,
  LiveActivity,
  AutopilotConfig,
  CountryCode,
} from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import {
  INITIAL_ORDERS,
  INITIAL_SOCIAL_POSTS,
  INITIAL_CONVERSATIONS,
  INITIAL_BOSS_MESSAGES,
  INITIAL_ACTIVITIES,
  INITIAL_AUTOPILOT_CONFIG,
} from './data/initialMockData';
import { convertUSDToBDT, calculateSellingPrice, calculateProfit } from './utils/currency';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [currency, setCurrency] = useState<'BDT' | 'USD' | 'CAD' | 'GBP'>('BDT');
  const [marginPercent, setMarginPercent] = useState<number>(20);

  // Core Datasets
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(INITIAL_SOCIAL_POSTS);
  const [conversations, setConversations] = useState<CustomerConversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [bossMessages, setBossMessages] = useState<BossChatMessage[]>(INITIAL_BOSS_MESSAGES);
  const [activities, setActivities] = useState<LiveActivity[]>(INITIAL_ACTIVITIES);
  const [autopilotConfig, setAutopilotConfig] = useState<AutopilotConfig>(INITIAL_AUTOPILOT_CONFIG);

  // UI state
  const [isBossThinking, setIsBossThinking] = useState(false);
  const [isCustomerReplying, setIsCustomerReplying] = useState(false);
  const [isScanningViral, setIsScanningViral] = useState(false);
  const [preselectedMarketingProduct, setPreselectedMarketingProduct] = useState<Product | null>(null);

  // Modals
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const [voiceCallInfo, setVoiceCallInfo] = useState({
    name: 'সাকিব আল হাসান',
    phone: '+880 1711-239485',
    product: '4K Dual Camera Foldable Drone',
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  // Background 24/7 Autopilot Loop (Simulates continuous live agent actions)
  useEffect(() => {
    if (!autopilotConfig.isRunning) return;

    const interval = setInterval(() => {
      const actions = [
        () => {
          // Autonomous comment auto-reply
          const newAct: LiveActivity = {
            id: `act-${Date.now()}`,
            type: 'reply',
            title: 'ফেসবুকে এআই অটো-কমেন্ট রিপ্লাই',
            detail: 'কাস্টমার কমেন্টে ২০% ডিসকাউন্ট ইনবক্স লিঙ্ক এবং ক্যাশ অন ডেলিভারি জানানো হয়েছে।',
            timestamp: 'এইমাত্র',
            platform: 'Facebook',
            country: 'BD',
          };
          setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
        },
        () => {
          // TikTok viral view scan
          const newAct: LiveActivity = {
            id: `act-${Date.now()}`,
            type: 'scan',
            title: 'TikTok ভাইরাল এনগেজমেন্ট পিক',
            detail: '৪কে ফোল্ডেবল ড্রোনের টিকটক ভিডিওতে নতুন ৫,০০০ ভিউ ও ১৮টি শেয়ার রেকর্ড হয়েছে।',
            timestamp: 'এইমাত্র',
            platform: 'TikTok',
            country: 'US',
          };
          setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
        },
        () => {
          // Autonomous Order Generation
          const randProd = products[Math.floor(Math.random() * products.length)];
          const countries: CountryCode[] = ['BD', 'US', 'CA', 'UK'];
          const randCountry = countries[Math.floor(Math.random() * countries.length)];
          const names: Record<CountryCode, { name: string; city: string; phone: string }> = {
            BD: { name: 'মেহেদী হাসান', city: 'ঢাকা (মিরপুর)', phone: '+880 1715-442211' },
            US: { name: 'Alex Cooper', city: 'Miami, FL', phone: '+1 (305) 555-8841' },
            CA: { name: 'Chloe Bergeron', city: 'Montreal, QC', phone: '+1 (514) 555-0922' },
            UK: { name: 'Oliver Smith', city: 'Manchester', phone: '+44 7890 112233' },
          };

          const cInfo = names[randCountry];
          const cost = randProd.costUSD;
          const revenue = calculateSellingPrice(cost, marginPercent);
          const profit = calculateProfit(cost, marginPercent);

          const autoOrder: Order = {
            id: `ord-${Date.now()}`,
            orderNumber: `AGF-${Math.floor(1000 + Math.random() * 9000)}`,
            customerName: cInfo.name,
            customerPhone: cInfo.phone,
            customerEmail: `${cInfo.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
            country: randCountry,
            city: cInfo.city,
            address: `${cInfo.city} Central Delivery Area`,
            items: [{ product: randProd, quantity: 1 }],
            totalCostUSD: cost,
            totalRevenueUSD: revenue,
            profitUSD: profit,
            totalRevenueBDT: convertUSDToBDT(revenue),
            profitBDT: convertUSDToBDT(profit),
            status: 'Auto-Processing',
            channel: 'TikTok Shop',
            date: 'স্বয়ংক্রিয়ভাবে সমাপ্ত',
            paymentMethod: randCountry === 'BD' ? 'Cash on Delivery (ক্যাশ অন ডেলিভারি)' : 'Card / Stripe',
          };

          setOrders((prev) => [autoOrder, ...prev]);

          const orderAct: LiveActivity = {
            id: `act-${Date.now()}`,
            type: 'order',
            title: `নতুন সেলস সম্পন্ন (${randCountry})`,
            detail: `${cInfo.name} (${cInfo.city}) ${randProd.banglaTitle} অর্ডার করেছেন। লাভ: $${profit} (২০%)`,
            timestamp: 'এইমাত্র',
            platform: 'TikTok',
            country: randCountry,
            amountUSD: profit,
          };
          setActivities((prev) => [orderAct, ...prev.slice(0, 19)]);
        },
      ];

      // Pick random simulated autonomous action
      const chosen = actions[Math.floor(Math.random() * actions.length)];
      chosen();
    }, 40000);

    return () => clearInterval(interval);
  }, [autopilotConfig.isRunning, products, marginPercent]);

  // Handler: Boss Chat (Owner talking with AI friend)
  const handleSendBossMessage = async (text: string) => {
    const userMsg: BossChatMessage = {
      id: `b-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setBossMessages((prev) => [...prev, userMsg]);
    setIsBossThinking(true);

    try {
      const res = await fetch('/api/ai/boss-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: bossMessages.slice(-5),
          storeStats: {
            ordersCount: orders.length,
            totalRevenueUSD: orders.reduce((s, o) => s + o.totalRevenueUSD, 0),
            marginPercent,
          },
        }),
      });

      const data = await res.json();
      const replyText = data.reply || 'বন্ধু, তোমার নির্দেশ অনুযায়ী আমি কাজ শুরু করে দিয়েছি!';

      // If user requested to change margin in prompt
      if (text.includes('মার্জিন') && (text.includes('২৫') || text.includes('30') || text.includes('২০'))) {
        if (text.includes('২৫')) setMarginPercent(25);
        if (text.includes('30') || text.includes('৩০')) setMarginPercent(30);
        if (text.includes('২০') || text.includes('20')) setMarginPercent(20);
      }

      const aiMsg: BossChatMessage = {
        id: `b-ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        actionTaken: data.actionTaken || 'Executed store optimization & social alignment.',
      };
      setBossMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('Boss chat fallback error:', err);
      const fallbackAiMsg: BossChatMessage = {
        id: `b-ai-${Date.now()}`,
        sender: 'ai',
        text: `বন্ধু, তোমার রিকোয়েস্ট আমি পেয়েছি! আলিবাবা ও আলিএক্সপ্রেস থেকে ভাইরাল প্রোডাক্ট হান্টিং এবং ফেসবুক, টিকটক, ইনস্টাগ্রামে ২০% প্রফিট মার্জিনে মার্কেটিং ২৪ ঘন্টা নিখুঁতভাবে চলছে।`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        actionTaken: 'Autonomous worker synchronized.',
      };
      setBossMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsBossThinking(false);
    }
  };

  // Handler: Customer Chat
  const handleSendCustomerMessage = async (conversationId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const targetConv = conversations.find((c) => c.id === conversationId);
    if (!targetConv) return;

    const userMessage = {
      id: `cm-${Date.now()}`,
      sender: 'customer' as const,
      text,
      time: timeStr,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: text,
              time: 'এইমাত্র',
              messages: [...c.messages, userMessage],
            }
          : c
      )
    );

    setIsCustomerReplying(true);

    try {
      const res = await fetch('/api/ai/sales-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          customerName: targetConv.customerName,
          channel: targetConv.channel,
          productContext: products.map((p) => ({
            name: p.banglaTitle,
            price: p.salePriceBDT,
            features: p.banglaDescription,
          })),
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        'আসসালামু আলাইকুম! অবশ্যই ভাইয়া, আপনি ক্যাশ অন ডেলিভারিতে চেক করে নিতে পারবেন। ঠিকানাটি দিলে এখনই বুক করে দিচ্ছি!';

      const aiMsg = {
        id: `cm-ai-${Date.now()}`,
        sender: 'ai' as const,
        text: replyText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                lastMessage: replyText,
                status: 'Ready to Buy',
                messages: [...c.messages, aiMsg],
              }
            : c
        )
      );
    } catch (e) {
      console.warn('Customer chat error:', e);
    } finally {
      setIsCustomerReplying(false);
    }
  };

  // Handler: Import/Export Product
  const handleImportProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isImportedToStore: !p.isImportedToStore } : p))
    );
  };

  // Handler: Scan New Viral Products from AliExpress/Alibaba
  const handleScanNewViral = () => {
    setIsScanningViral(true);
    setTimeout(() => {
      // Toggle imported status of any unimported
      setProducts((prev) =>
        prev.map((p) => (p.isImportedToStore ? p : { ...p, isImportedToStore: true }))
      );

      const newAct: LiveActivity = {
        id: `act-${Date.now()}`,
        type: 'scan',
        title: 'নতুন ৮টি ভাইরাল প্রোডাক্ট ইমপোর্ট সম্পন্ন',
        detail: 'AliExpress ও Alibaba থেকে ৪.৯★ রেটিংয়ের ট্রেন্ডিং গ্যাজেট ২০% লাভে স্টোরে যুক্ত হয়েছে।',
        timestamp: 'এইমাত্র',
        platform: 'AliExpress',
      };
      setActivities((prev) => [newAct, ...prev]);
      setIsScanningViral(false);
      alert('✅ আলিবাবা ও আলিএক্সপ্রেস থেকে নতুন ভাইরাল প্রোডাক্ট সফলভাবে স্ক্যান করে ২০% লাভে আপনার ওয়েবসাইটে যুক্ত করা হয়েছে!');
    }, 1200);
  };

  // Handler: Launch Marketing
  const handleLaunchMarketing = (product: Product) => {
    setPreselectedMarketingProduct(product);
    setActiveTab('marketing');
  };

  // Handler: Publish Campaign
  const handlePublishCampaign = (newPost: SocialPost) => {
    setSocialPosts((prev) => [newPost, ...prev]);
    const act: LiveActivity = {
      id: `act-${Date.now()}`,
      type: 'post',
      title: `${newPost.platform}-এ নতুন ক্যাম্পেইন লাইভ`,
      detail: `${newPost.productTitle} এর ভিডিও প্রচার শুরু হয়েছে। ২০% প্রফিট লিঙ্ক সক্রিয়।`,
      timestamp: 'এইমাত্র',
      platform: newPost.platform,
    };
    setActivities((prev) => [act, ...prev]);
  };

  // Handler: Place Order from Storefront Checkout
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    const act: LiveActivity = {
      id: `act-${Date.now()}`,
      type: 'order',
      title: `নতুন ক্যাশ অন ডেলিভারি অর্ডার (${newOrder.customerName})`,
      detail: `${newOrder.items[0]?.product.banglaTitle} অর্ডার হয়েছে। নিট লাভ: $${newOrder.profitUSD}`,
      timestamp: 'এইমাত্র',
      platform: 'AliExpress',
      country: newOrder.country,
      amountUSD: newOrder.profitUSD,
    };
    setActivities((prev) => [act, ...prev]);
  };

  // Handler: Update Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Handler: Fast Test Autonomous Sale Simulator Button
  const handleSimulateSale = () => {
    const randProd = products[Math.floor(Math.random() * products.length)];
    const countryList: CountryCode[] = ['BD', 'US', 'CA', 'UK'];
    const c = countryList[Math.floor(Math.random() * countryList.length)];
    const names: Record<CountryCode, { name: string; city: string; phone: string }> = {
      BD: { name: 'সাব্বির রহমান', city: 'ঢাকা (উত্তরা)', phone: '+880 1718-994433' },
      US: { name: 'Jordan Bell', city: 'Los Angeles, CA', phone: '+1 (213) 555-4920' },
      CA: { name: 'Emma Wilson', city: 'Vancouver, BC', phone: '+1 (604) 555-1288' },
      UK: { name: 'Harry Edwards', city: 'London', phone: '+44 7712 345678' },
    };
    const cData = names[c];

    const cost = randProd.costUSD;
    const rev = calculateSellingPrice(cost, marginPercent);
    const prof = calculateProfit(cost, marginPercent);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `AGF-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: cData.name,
      customerPhone: cData.phone,
      customerEmail: `${cData.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      country: c,
      city: cData.city,
      address: `${cData.city} Direct Delivery Address`,
      items: [{ product: randProd, quantity: 1 }],
      totalCostUSD: cost,
      totalRevenueUSD: rev,
      profitUSD: prof,
      totalRevenueBDT: convertUSDToBDT(rev),
      profitBDT: convertUSDToBDT(prof),
      status: 'Auto-Processing',
      channel: 'Facebook Ad',
      date: 'এইমাত্র স্বয়ংক্রিয়ভাবে সম্পন্ন',
      paymentMethod: c === 'BD' ? 'Cash on Delivery (ক্যাশ অন ডেলিভারি)' : 'Card / Stripe',
    };

    setOrders((prev) => [newOrder, ...prev]);

    const act: LiveActivity = {
      id: `act-${Date.now()}`,
      type: 'order',
      title: `এআই টেস্ট সেলস সম্পন্ন! (${c})`,
      detail: `${cData.name} (${cData.city}) ${randProd.banglaTitle} কিনেছেন। নিট প্রফিট: +$${prof} (২০%)`,
      timestamp: 'এইমাত্র',
      platform: 'Facebook',
      country: c,
      amountUSD: prof,
    };
    setActivities((prev) => [act, ...prev]);

    alert(`🎉 অভিনন্দন! এআই ${cData.name} (${cData.city}) এর জন্য ২০% লাভে স্বয়ংক্রিয়ভাবে নতুন সেল জেনারেট করেছে। নিট লাভ: +$${prof}`);
  };

  // Trigger Phone Call Modal
  const handleTriggerPhoneCall = (customerName: string, customerPhone: string, productName: string) => {
    setVoiceCallInfo({
      name: customerName,
      phone: customerPhone,
      product: productName,
    });
    setIsVoiceCallOpen(true);
  };

  // Quick book order from chat
  const handleQuickBookOrder = (conv: CustomerConversation) => {
    const prod = products.find((p) => p.title.includes(conv.interestProduct || '')) || products[0];
    setCheckoutProduct(prod);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAutopilotRunning={autopilotConfig.isRunning}
        currency={currency}
        setCurrency={setCurrency}
        onSimulateSale={handleSimulateSale}
        totalOrdersCount={orders.length}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            orders={orders}
            activities={activities}
            currency={currency}
            onVisitStorefront={() => setActiveTab('storefront')}
            onOpenBossChat={() => setActiveTab('bossChat')}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {activeTab === 'bossChat' && (
          <BossChatView
            messages={bossMessages}
            onSendMessage={handleSendBossMessage}
            isThinking={isBossThinking}
            orders={orders}
            onQuickAction={(action) => handleSendBossMessage(action)}
          />
        )}

        {activeTab === 'viralHunter' && (
          <ViralHunterView
            products={products}
            onImportProduct={handleImportProduct}
            onScanNewViral={handleScanNewViral}
            isScanning={isScanningViral}
            currency={currency}
            onLaunchMarketing={handleLaunchMarketing}
            marginPercent={marginPercent}
            setMarginPercent={setMarginPercent}
          />
        )}

        {activeTab === 'marketing' && (
          <MarketingStudioView
            products={products}
            socialPosts={socialPosts}
            onPublishCampaign={handlePublishCampaign}
            currency={currency}
            preselectedProduct={preselectedMarketingProduct}
          />
        )}

        {activeTab === 'customerChat' && (
          <OmniChatView
            conversations={conversations}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
            onSendMessage={handleSendCustomerMessage}
            products={products}
            onTriggerPhoneCall={handleTriggerPhoneCall}
            onQuickBookOrder={handleQuickBookOrder}
            isReplying={isCustomerReplying}
          />
        )}

        {activeTab === 'storefront' && (
          <StorefrontView
            products={products}
            currency={currency}
            onOpenCheckout={(prod) => {
              setCheckoutProduct(prod);
              setIsCheckoutOpen(true);
            }}
            onOpenLiveChat={() => setActiveTab('customerChat')}
            onOpenPhoneCall={() =>
              handleTriggerPhoneCall('গ্রাহক (লাইভ কল)', '+880 1711-000000', '4K Drone')
            }
          />
        )}

        {activeTab === 'settings' && (
          <AutopilotSettingsView
            config={autopilotConfig}
            onUpdateConfig={setAutopilotConfig}
            marginPercent={marginPercent}
            setMarginPercent={setMarginPercent}
          />
        )}
      </main>

      {/* Voice Call Simulator Modal */}
      <VoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={() => setIsVoiceCallOpen(false)}
        customerName={voiceCallInfo.name}
        customerPhone={voiceCallInfo.phone}
        productName={voiceCallInfo.product}
      />

      {/* Checkout Modal */}
      <OrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCheckoutProduct(null);
        }}
        product={checkoutProduct}
        currency={currency}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
