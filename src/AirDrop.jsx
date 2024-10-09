import {useWallet , useConnection} from '@solana/wallet-adapter-react';

export function AirDrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    async function sendAirDropToUser() {
        const amount = document.getElementById("amount").value;
        await connection.requestAirdrop(wallet.publicKey, amount * 1000000000)
        alert("airdropped sol");
    }
    return <div>
        <input id="amount"type="text" placeholder="Amount"></input>
        <button onClick={sendAirDropToUser}>Send AirDrop</button>
    </div>
}