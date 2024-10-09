// App.jsx
import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'; // Optional
import {
    WalletModalProvider,
    // WalletConnectButton,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
// import { clusterApiUrl } from '@solana/web3.js';

// Default styles for Solana wallet modal
import '@solana/wallet-adapter-react-ui/styles.css';
import { AirDrop } from './AirDrop';  // Ensure that this import exists
import { ShowSolBalance } from './GetBalance';  // Ensure that this import exists
import { SignMessage } from './SignMessage';  // Ensure that this import exists

function App() {
    // Define the Solana network (you could use WalletAdapterNetwork.Mainnet for production)
    // const network = WalletAdapterNetwork.Devnet;

    // // Configure the network endpoint
    // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // // Configure the wallets to use, in this case, just the UnsafeBurnerWalletAdapter for dev purposes
    // const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/7FBym0aD9lnKAB5nXFwdhgUZ8ckGOvYk"}>
        {/* <ConnectionProvider endpoint= "https://api.devnet.solana.com "> */}
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  <WalletMultiButton></WalletMultiButton>
                  <WalletDisconnectButton></WalletDisconnectButton>
                    <div>
                        hi there <b>hello</b>
                    </div>

                    <AirDrop></AirDrop>
                    <ShowSolBalance></ShowSolBalance>
                    <SignMessage></SignMessage>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default App;
