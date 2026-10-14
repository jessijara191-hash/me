export type CountryCode = 'BD' | 'US' | 'CA' | 'UK';

export interface Product {
  id: string;
  title: string;
  banglaTitle: string;
  category: 'Gadgets' | 'Lifestyle' | 'Home' | 'Electronics' | 'Health';
  image: string;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  viralScore: number; // 0 - 100
  supplierSource: 'AliExpress' | 'Alibaba';
  supplierUrl: string;
  costUSD: number;
  salePriceUSD: number; // calculated at cost + 20% (or custom margin)
  costBDT: number;
  salePriceBDT: number;
  marginPercent: number; // e.g. 20
  stock: number;
  deliveryDays: string;
  targetCountries: CountryCode[];
  description: string;
  banglaDescription: string;
  viralReason: string;
  isImportedToStore: boolean;
  featured: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  country: CountryCode;
  city: string;
  address: string;
  items: {
    product: Product;
    quantity: number;
  }[];
  totalCostUSD: number;
  totalRevenueUSD: number;
  profitUSD: number;
  totalRevenueBDT: number;
  profitBDT: number;
  status: 'Pending' | 'Auto-Processing' | 'Shipped' | 'Delivered';
  channel: 'TikTok Shop' | 'Facebook Ad' | 'Instagram DM' | 'WhatsApp Direct' | 'Storefront Web' | 'Phone Call';
  date: string;
  paymentMethod: 'Cash on Delivery (ক্যাশ অন ডেলিভারি)' | 'bKash / Nagad' | 'Card / Stripe' | 'PayPal';
}

export interface SocialPost {
  id: string;
  platform: 'Facebook' | 'YouTube' | 'TikTok' | 'Instagram' | 'Twitter' | 'WhatsApp';
  productId: string;
  productTitle: string;
  productImage: string;
  content: string;
  hook: string;
  script?: string;
  hashtags: string[];
  reach: number;
  clicks: number;
  shares: number;
  commentsCount: number;
  ordersGenerated: number;
  revenueGeneratedUSD: number;
  timeAgo: string;
  status: 'Live' | 'Scheduled' | 'Draft';
}

export interface LiveActivity {
  id: string;
  type: 'scan' | 'reply' | 'order' | 'post' | 'call' | 'margin_calc' | 'optimize';
  title: string;
  detail: string;
  timestamp: string;
  platform?: 'Facebook' | 'YouTube' | 'TikTok' | 'Instagram' | 'Twitter' | 'WhatsApp' | 'AliExpress';
  country?: CountryCode;
  amountUSD?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'ai' | 'user' | 'system';
  text: string;
  time: string;
  audioGenerated?: boolean;
}

export interface CustomerConversation {
  id: string;
  customerName: string;
  customerPhone: string;
  avatar: string;
  channel: 'WhatsApp' | 'Facebook' | 'Instagram' | 'TikTok' | 'WebChat' | 'PhoneCall';
  country: CountryCode;
  interestProduct?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  status: 'Inquiring' | 'Bargaining' | 'Ready to Buy' | 'Order Placed';
  messages: ChatMessage[];
}

export interface BossChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  actionTaken?: string;
  statsContext?: {
    activeProducts: number;
    dailyRevenue: number;
    margin: number;
  };
}

export interface AutopilotConfig {
  isRunning: boolean;
  defaultMarginPercent: number; // default 20
  speed: 'normal' | 'fast';
  targetCountries: {
    BD: boolean;
    US: boolean;
    CA: boolean;
    UK: boolean;
  };
  connectedAccounts: {
    gmail: { connected: boolean; email: string };
    facebook: { connected: boolean; page: string };
    tiktok: { connected: boolean; handle: string };
    instagram: { connected: boolean; handle: string };
    youtube: { connected: boolean; channel: string };
    twitter: { connected: boolean; handle: string };
    whatsapp: { connected: boolean; number: string };
  };
  autoReplyComments: boolean;
  autoReplyDMs: boolean;
  autoDailyHunt: boolean;
  autoImportViral: boolean;
  autoVoiceCallOutreach: boolean;
}
