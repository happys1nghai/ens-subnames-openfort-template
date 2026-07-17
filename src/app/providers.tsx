"use client";
import React from "react";
import {
  OpenfortProvider,
  AuthProvider,
} from "@openfort/react";
import { getDefaultConfig, OpenfortWagmiBridge } from "@openfort/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig } from "wagmi";
import { sepolia } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    appName: "Openfort x Namespace Demo",
    chains: [sepolia],
    ssr: true,
  })
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <OpenfortWagmiBridge>
          <OpenfortProvider
            publishableKey={process.env.NEXT_PUBLIC_OPENFORT_PUBLISHABLE_KEY!}
            walletConfig={{
              shieldPublishableKey: process.env.NEXT_PUBLIC_SHIELD_PUBLISHABLE_KEY!,
              ethereum: {
                ethereumFeeSponsorshipId: process.env.NEXT_PUBLIC_POLICY_ID,
              },
              createEncryptedSessionEndpoint: process.env.NEXT_PUBLIC_CREATE_ENCRYPTED_SESSION_ENDPOINT!,
              connectOnLogin: true,
            }}
            uiConfig={{
              theme: "midnight",
              mode: "dark",
              authProviders: [
                AuthProvider.GOOGLE,
                AuthProvider.EMAIL_OTP,
                AuthProvider.GUEST,
                AuthProvider.WALLET,
              ],
              authProvidersLength: 4,
            }}
          >
            {children}
          </OpenfortProvider>
        </OpenfortWagmiBridge>
      </WagmiProvider>
    </QueryClientProvider>
  );
}