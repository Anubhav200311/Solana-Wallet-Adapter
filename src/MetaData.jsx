import React, { useState } from "react";
import { fetchDigitalAsset, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

export function MetaData() {
    const [tokenAddress, setTokenAddress] = useState("");
    const [nftMetadata, setNftMetadata] = useState(null);

    async function onFetch() {
        try {
            if (!tokenAddress) {
                alert("Please enter a token address");
                return;
            }

            // Use your Alchemy Mainnet RPC URL
            const umi = createUmi("https://solana-mainnet.g.alchemy.com/v2/7FBym0aD9lnKAB5nXFwdhgUZ8ckGOvYk");
            umi.use(mplTokenMetadata());

            // Fetch the NFT metadata using the mint address
            const asset = await fetchDigitalAsset(umi, tokenAddress);

            // Fetch the JSON metadata to get the logo URL
            let logoUrl = null;
            if (asset.metadata.uri) {
                const response = await fetch(asset.metadata.uri);
                const jsonMetadata = await response.json();
                logoUrl = jsonMetadata.image || null; // Ensure logoUrl is null if 'image' key is not present
            }

            // Set the fetched metadata to the state
            setNftMetadata({
                name: asset.metadata.name,
                symbol: asset.metadata.symbol,
                uri: asset.metadata.uri,
                logo: logoUrl, // Add logo URL to the metadata
            });
        } catch (error) {
            console.error("Error fetching metadata:", error);
            alert("Error fetching metadata. Please check the token address.");
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter token address"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <button onClick={onFetch}>Fetch Metadata</button>

            {nftMetadata && (
                <div>
                    <h3>NFT Metadata</h3>
                    <p><strong>Name:</strong> {nftMetadata.name}</p>
                    <p><strong>Symbol (Ticker):</strong> {nftMetadata.symbol}</p>
                    {nftMetadata.logo && (
                        <img src={nftMetadata.logo} alt={`${nftMetadata.name} logo`} style={{ width: "100px", height: "100px" }} />
                    )}
                </div>
            )}
        </div>
    );
}
