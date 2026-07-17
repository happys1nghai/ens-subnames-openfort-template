"use client";
import React from "react";
import {
  OpenfortProvider,
  ChainTypeEnum,
} from "@openfort/react";
import { getDefaultConfig } from "@openfort/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { sepolia } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    appName: "Openfort x Namespace Demo",
    chains: [sepolia],
  })
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OpenfortProvider
          publishableKey={process.env.NEXT_PUBLIC_OPENFORT_PUBLISHABLE_KEY!}
          walletConfig={{
            shieldPublishableKey: process.env.NEXT_PUBLIC_SHIELD_PUBLISHABLE_KEY!,
            createEncryptedSessionEndpoint: process.env.NEXT_PUBLIC_CREATE_ENCRYPTED_SESSION_ENDPOINT!,
            chainType: ChainTypeEnum.EVM,
          }}
        >
          {children}
        </OpenfortProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
