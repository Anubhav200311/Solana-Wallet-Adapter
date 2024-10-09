import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { Buffer } from 'buffer'; // Import Buffer

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function OnClick() {
        let to = document.getElementById("To").value;
        let amount = document.getElementById("Amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return (
        <div>
            <input type="text" placeholder="To" id="To" />
            <input type="text" placeholder="Amount" id="Amount" />
            <button onClick={OnClick}>Send</button>
        </div>
    );
}
