import { PublicKey, Transaction } from "@solana/web3.js";

export const DEFAULT_PUBLIC_KEY = new PublicKey(
  "Ct47m7AyESpHZS7T8goMMBBoqWFZQ5KHzxXam3KMdkZq"
);

export interface WalletAdapter {
  publicKey: PublicKey;
  autoApprove: boolean;
  connected: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transaction: Transaction[]) => Promise<Transaction[]>;
  connect: () => any;
  disconnect: () => any;
  on<T>(event: string, fn: () => void): this;
}
