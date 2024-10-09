import {ed25519} from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const {publicKey , signMessage} = useWallet();

    async function onClick(){
        if(!publicKey) throw new Error("Wallet not connected");
        if(!signMessage) throw new Error("Sign message not available");

        const message = document.getElementById("code").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if(ed25519.verify(signature, encodedMessage, publicKey.toBytes())){
            alert(`Signature is valid: ${bs58.encode(signature)}`);
        }
    }

    return <div>
        <input id = "code" type="text" placeholder="message"/>
        <button onClick={onClick}>Sign Message</button>
    </div>
}