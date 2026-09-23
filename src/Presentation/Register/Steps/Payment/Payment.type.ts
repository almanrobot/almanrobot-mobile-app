export type PaymentPostRequestType = {
  merchant_id: number;
  paytr_token: string;
  user_ip: string;
  merchant_oid: string;
  email: string;
  payment_type: string;
  payment_amount: number; // e.g. 100.99, 150 or 1500.35
  installment_count: number;
  card_type?: string;
  currency?: string;
  client_lang?: string;
  test_mode?: string;
  non_3d: number;
  non3d_test_failed?: number;
  cc_owner: string;
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  merchant_ok_url: string;
  merchant_fail_url: string;
  user_name: string;
  user_address: string;
  user_phone: string;
  user_basket: string;
  debug_on?: number;
  sync_mode?: number;
};

export type PaymentToken = {
  merchant_id?: string;
  user_ip: string;
  email: string;
  payment_amount: number;
  currency: string;
  test_mode: string;
  promo_code?: string | null;
};
