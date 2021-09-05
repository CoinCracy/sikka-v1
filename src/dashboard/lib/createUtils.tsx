
import {
  Account,
  PublicKey,
  SystemProgram,
  Connection, clusterApiUrl, SYSVAR_RENT_PUBKEY, TransactionInstruction,
  sendAndConfirmTransaction as realSendAndConfirmTransaction,
  Transaction
} from "@solana/web3.js";
import {
  AuthorityType,
  MintLayout,
  Token,
  AccountLayout,
  TOKEN_PROGRAM_ID,
  u64,

} from "@solana/spl-token";
import { createAccount } from "./account";
import { UtilizeWallet, sendTxUsingExternalSignature } from "./Transaction";

const networks = {
  mainnet: { url: "https://solana-api.projectserum.com", displayName: "Mainnet Beta" },
  devnet: { url: clusterApiUrl("devnet"), displayName: "Devnet" },
  testnet: { url: clusterApiUrl("testnet"), displayName: "Testnet" },
};

const solanaNetwork = networks.devnet;
const connection = new Connection(solanaNetwork.url);
const getConnection = () => connection;

export const getMintPubkeyFromTokenAccountPubkey = async (
  tokenAccountPubkey: PublicKey
) => {
  try {
    const tokenMintData = (
      await getConnection().getParsedAccountInfo(
        tokenAccountPubkey,
        "singleGossip"
      )
    ).value!.data;
    //@ts-expect-error (doing the data parsing into steps so this ignore line is not moved around by formatting)
    const tokenMintAddress = tokenMintData.parsed.info.mint;

    return new PublicKey(tokenMintAddress);
  } catch (err) {
    throw new Error(
      "Error calculating mint address from token account. Are you sure you inserted a valid token account address"
    );
  }
};

export const createNewToken = async (
  feePayer: string,
  mintAuthority: string,
  freezeAuthority: string,
  decimals: number,
  signExternally: boolean
) => {
  const connection = getConnection();
  if (signExternally) {


    const wallet = await UtilizeWallet();


    const mintAccount = new Account();

    const createAccIx = SystemProgram.createAccount({
      //@ts-expect-error
      fromPubkey: wallet.publicKey,
      newAccountPubkey: mintAccount.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(
        MintLayout.span,
        "singleGossip"
      ),
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID
    });

    const initMintIx = Token.createInitMintInstruction(
      TOKEN_PROGRAM_ID,
      mintAccount.publicKey,
      decimals,
      new PublicKey(mintAuthority),
      freezeAuthority ? new PublicKey(freezeAuthority) : null
    );

    await sendTxUsingExternalSignature(
      [createAccIx, initMintIx],
      connection,
      null,
      [mintAccount],
      wallet
    ).then((d) => {
      console.log(d)
    });


    return mintAccount;

  } else {
    const token = await Token.createMint(
      getConnection(),
      await createAccount(feePayer),
      new PublicKey(mintAuthority),
      freezeAuthority ? new PublicKey(freezeAuthority) : null,
      decimals,
      TOKEN_PROGRAM_ID
    );
    return token;
  }
};

export const editToken = async (
  feePayer: string,
  tokenAddress: string,
  newAuthority: string,
  currentAuthority: string,
  authorityType: AuthorityType,
  feePayerSignsExternally: boolean,
  currentAuthoritySignsExternally: boolean
) => {
  const tokenPublicKey = new PublicKey(tokenAddress);
  const newAuthorityOrNull = newAuthority ? new PublicKey(newAuthority) : null;
  const connection = getConnection();
  if (feePayerSignsExternally || currentAuthoritySignsExternally) {
    const wallet = await UtilizeWallet();

    const currentAuthorityAccOrWallet = currentAuthoritySignsExternally
      ? wallet
      : await createAccount(currentAuthority);

    const ix = Token.createSetAuthorityInstruction(
      TOKEN_PROGRAM_ID,
      tokenPublicKey,
      newAuthorityOrNull,
      authorityType,
      //@ts-expect-error
      currentAuthorityAccOrWallet.publicKey,

      []
    );
    await sendTxUsingExternalSignature(
      [ix],
      connection,
      feePayerSignsExternally ? null : await createAccount(feePayer),
      //@ts-expect-error
      currentAuthoritySignsExternally ? [] : [currentAuthorityAccOrWallet],
      wallet
    );
  } else {
    const token = new Token(
      connection,
      tokenPublicKey,
      TOKEN_PROGRAM_ID,
      await createAccount(feePayer)
    );

    await token.setAuthority(
      tokenPublicKey,
      newAuthorityOrNull,
      authorityType,
      await createAccount(currentAuthority),
      []
    );
  }
};

export const createTokenAccount = async (
  feePayer: string,
  tokenMintAddress: string,
  owner: string,
  signExternally: boolean
) => {
  const tokenMintPubkey = new PublicKey(tokenMintAddress);
  const ownerPubkey = new PublicKey(owner);
  if (signExternally) {
    const wallet = await UtilizeWallet();

    const connection = getConnection();

    const balanceNeeded = await Token.getMinBalanceRentForExemptAccount(
      connection
    );
    const newAccount = new Account();
    const createAccIx = SystemProgram.createAccount({
      //@ts-expect-error
      fromPubkey: wallet.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: AccountLayout.span,
      programId: TOKEN_PROGRAM_ID
    });

    const createTokenAccountIx = Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      tokenMintPubkey,
      newAccount.publicKey,
      ownerPubkey
    );

    await sendTxUsingExternalSignature(
      [createAccIx, createTokenAccountIx],
      connection,
      null,
      [newAccount],
      wallet
    );

    return newAccount;
  } else {
    const token = new Token(
      getConnection(),
      tokenMintPubkey,
      TOKEN_PROGRAM_ID,
      await createAccount(feePayer)
    );

    return (await token.createAccount(ownerPubkey)).toString();
  }
};

// Creates tokens out of nowhere
export const mintToken = async (
  feePayerSecret: string,
  mintAuthoritySecret: string,
  destinationAccountAddress: string,
  amount: u64,
  feePayerSignsExternally: boolean,
  mintAuthoritySignsExternally: boolean
) => {
  const destinationPubkey = new PublicKey(destinationAccountAddress);
  const tokenMintPubkey = await getMintPubkeyFromTokenAccountPubkey(
    destinationPubkey
  );
  const connection = getConnection();

  if (mintAuthoritySignsExternally || feePayerSignsExternally) {
    const wallet = await UtilizeWallet();

    const mintAuthorityAccOrWallet = mintAuthoritySignsExternally
      ? wallet
      : await createAccount(mintAuthoritySecret);

    const mintIx = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      tokenMintPubkey,
      destinationPubkey,
      //@ts-expect-error
      mintAuthorityAccOrWallet.publicKey,
      [],
      amount
    );

    await sendTxUsingExternalSignature(
      [mintIx],
      connection,
      feePayerSignsExternally ? null : await createAccount(feePayerSecret),
      //@ts-expect-error
      mintAuthoritySignsExternally ? [] : [mintAuthorityAccOrWallet],
      wallet
    );

    return destinationPubkey.toBase58();
  } else {
    const token = new Token(
      connection,
      tokenMintPubkey,
      TOKEN_PROGRAM_ID,
      await createAccount(feePayerSecret)
    );

    await token.mintTo(
      destinationPubkey,
      await createAccount(mintAuthoritySecret),
      [],
      amount
    );

    return destinationPubkey.toBase58();
  }
};

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

const createIx = (
  funderPubkey: PublicKey,
  associatedTokenAccountPublicKey: PublicKey,
  ownerPublicKey: PublicKey,
  tokenMintPublicKey: PublicKey
) =>
  new TransactionInstruction({
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([]),
    keys: [
      { pubkey: funderPubkey, isSigner: true, isWritable: true },
      {
        pubkey: associatedTokenAccountPublicKey,
        isSigner: false,
        isWritable: true
      },
      { pubkey: ownerPublicKey, isSigner: false, isWritable: false },
      { pubkey: tokenMintPublicKey, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }
    ]
  });

  //Finds Associated Token Account Public key
export const findAssociatedTokenAccountPublicKey = async (
  ownerPublicKey: PublicKey,
  tokenMintPublicKey: PublicKey
) =>
  (
    await PublicKey.findProgramAddress(
      [
        ownerPublicKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenMintPublicKey.toBuffer()
      ],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];


// Create Instructions 



export const createAssociatedTokenAccount = async (
  feePayerSecret: string,
  feePayerSignsExternally: boolean,
  tokenMintAddress: string,
  ownerAddress: string
) => {
  const tokenMintPublicKey = new PublicKey(tokenMintAddress);
  console.log(ownerAddress);
  const ownerPublicKey = new PublicKey(ownerAddress);
  const associatedTokenAccountPublicKey = await findAssociatedTokenAccountPublicKey(
    ownerPublicKey,
    tokenMintPublicKey
  );
  const connection = getConnection();

  if (feePayerSignsExternally) {
    const wallet = await UtilizeWallet();
    const ix = createIx(
      //@ts-expect-error   
      wallet.publicKey,
      associatedTokenAccountPublicKey,
      ownerPublicKey,
      tokenMintPublicKey
    );

    await sendTxUsingExternalSignature([ix], connection, null, [], wallet);
  } else {
    const feePayerAccount = await createAccount(feePayerSecret);
    const ix = createIx(
      feePayerAccount.publicKey,
      associatedTokenAccountPublicKey,
      ownerPublicKey,
      tokenMintPublicKey
    );

    await sendAndConfirmTransaction(
      connection,
      new Transaction().add(ix),
      feePayerAccount
    );
  }

  return associatedTokenAccountPublicKey.toBase58();
};

export function sendAndConfirmTransaction(
  connection: Connection,
  transaction: Transaction,
  ...signers: Account[]
) {
  return realSendAndConfirmTransaction(connection, transaction, signers, {
    skipPreflight: false,
    commitment: 'singleGossip'
  });
}

export const burnTokens = async (
  feePayerSecret: string,
  tokenAccountAddress: string,
  ownerSecret: string,
  amount: u64,
  feePayerSignsExternally: boolean,
  accountOwnerSignsExternally: boolean
) => {
  const tokenAccountPubkey = new PublicKey(tokenAccountAddress);
  const tokenMintPubkey = await getMintPubkeyFromTokenAccountPubkey(
    tokenAccountPubkey
  );
  const connection = getConnection();

  if (feePayerSignsExternally || accountOwnerSignsExternally) {
    const wallet = await UtilizeWallet();

    const currentOwnerAccOrWallet = accountOwnerSignsExternally
      ? wallet
      : await createAccount(ownerSecret);

    const ix = Token.createBurnInstruction(
      TOKEN_PROGRAM_ID,
      tokenMintPubkey,
      tokenAccountPubkey,
      //@ts-ignore
      currentOwnerAccOrWallet.publicKey,
      [],
      amount
    );
    await sendTxUsingExternalSignature(
      [ix],
      connection,
      feePayerSignsExternally ? null : await createAccount(feePayerSecret),
      //@ts-ignore
      accountOwnerSignsExternally ? [] : [currentOwnerAccOrWallet],
      wallet
    );
  } else {
    const token = new Token(
      connection,
      tokenMintPubkey,
      TOKEN_PROGRAM_ID,
      await createAccount(feePayerSecret)
    );

    await token.burn(
      tokenAccountPubkey,
      await createAccount(ownerSecret),
      [],
      amount
    );
  }
};

export const freezeAccount = async (
  feePayerSecret: string,
  addressToFreeze: string,
  freezeAuthoritySecret: string,
  feePayerSignsExternally: boolean,
  freezeAuthoritysignsExternally: boolean
) => {
  const pubkeyToFreeze = new PublicKey(addressToFreeze);
  const tokenMintPubkey = await getMintPubkeyFromTokenAccountPubkey(
    pubkeyToFreeze
  );

  const connection = getConnection();
  if (feePayerSignsExternally || freezeAuthoritysignsExternally) {
    const wallet = await UtilizeWallet();

    const authorityAccOrWallet = freezeAuthoritysignsExternally
      ? wallet
      : await createAccount(freezeAuthoritySecret);

    //@ts-ignore
    const freezeIx = Token.createFreezeAccountInstruction(
      TOKEN_PROGRAM_ID,
      pubkeyToFreeze,
      tokenMintPubkey,
      //@ts-ignore
      authorityAccOrWallet.publicKey,
      []
    );

    await sendTxUsingExternalSignature(
      [freezeIx],
      connection,
      feePayerSignsExternally ? null : await createAccount(feePayerSecret),
      //@ts-ignore
      freezeAuthoritysignsExternally ? [] : [authorityAccOrWallet],
      wallet
    );
  } else {
    const token = new Token(
      connection,
      tokenMintPubkey,
      TOKEN_PROGRAM_ID,
      await createAccount(feePayerSecret)
    );

    await token.freezeAccount(
      pubkeyToFreeze,
      await createAccount(freezeAuthoritySecret),
      []
    );
  }
};




// Utility Functions
export const transferTokens = async (
  feePayerSecret: string,
  sourceAddress: string,
  destAddress: string,
  ownerSecret: string,
  amount: u64,
  feePayerSignsExternally: boolean,
  accountOwnerSignsExternally: boolean
) => {
  const sourcePubkey = new PublicKey(sourceAddress);
  const destinationPubkey = new PublicKey(destAddress);
  const tokenMintPubkey = await getMintPubkeyFromTokenAccountPubkey(
    sourcePubkey
  );

  const connection = getConnection();

  if (feePayerSignsExternally || accountOwnerSignsExternally) {
    const wallet = await UtilizeWallet();
    const ownerAccountOrWallet = accountOwnerSignsExternally
      ? wallet
      : await createAccount(ownerSecret);

    const transferIx = Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      sourcePubkey,
      destinationPubkey,
      //@ts-expect-error
      ownerAccountOrWallet.publicKey,
      [],
      amount
    );

    await sendTxUsingExternalSignature(
      [transferIx],
      connection,
      feePayerSignsExternally ? null : await createAccount(feePayerSecret),
      //@ts-expect-error
      accountOwnerSignsExternally ? [] : [ownerAccountOrWallet],
      wallet
    );
  } else {
    const token = new Token(
      connection,
      tokenMintPubkey,
      TOKEN_PROGRAM_ID,
      await createAccount(feePayerSecret)
    );

    await token.transfer(
      new PublicKey(sourceAddress),
      destinationPubkey,
      await createAccount(ownerSecret),
      [],
      amount
    );
  }
};