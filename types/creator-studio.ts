export interface CreatorStats {
    grabs: number;
    fiveStarRatings: number;
    shares: number;
    wishlist: number;
    comments: number;
}


export interface CreatorMonthlyClicks {
    jan: number;
    feb: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
}

export interface ClickedOffer {
    offerId: string;
    title: string;
    clicks: number;
}

export interface SharedOffer {
    offerId: string;
    title: string;
    shares: number;
}

export interface CreatorTopOffers {
    topClickedOffers: ClickedOffer[];
    topSharedOffers: SharedOffer[];
}


export interface BankAccount {
    id: string;
    accountName: string;
    accountNumber: string;
    bankCode: string;
    recipientCode: string;
    isActive: boolean;
    createdAt: string;
}

export interface Payout {
    id: string;
    payoutAccount: BankAccount;
    amount: number;
    status: string;
    createdAt: string;
}

export interface Bank {
    name: string;
    code: string;
}

export interface AccountData {
    accountNumber: string;
    bankCode: string;
}

export interface VerifiedAccount {
    account_number: string;
    account_name: string;
    bank_id: number;
}

export interface SavedAccount {
    account_number: string;
    account_name: string;
    bank_id: number;
}


