export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface BusinessRow {
  id: string;
  owner_id: string | null;
  name: string | null;
  twilio_number: string | null;
  forwarding_number: string | null;
  is_active: boolean;
  default_system_prompt: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_status: string | null;
  created_at: Date | string | null;
}

export interface CommunicationRow {
  id: string;
  business_id: string;
  business_phone: string | null;
  customer_phone: string | null;
  status: string | null;
  trigger_source: string | null;
  system_prompt: string | null;
  message_history: ChatMessage[] | null;
  created_at: Date | string | null;
  updated_at: Date | string | null;
}
