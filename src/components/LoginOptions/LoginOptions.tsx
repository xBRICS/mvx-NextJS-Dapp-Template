'use client';

import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  ExtensionLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
  WebWalletLoginButton,
  MetamaskLoginButton,
} from '@multiversx/sdk-dapp/UI';

interface LoginOptionsProps {
  callbackRoute: string;
  onClose: () => void;
}

// Custom styled button that wraps the MultiversX buttons
const StyledLoginButton: FC<{ 
  icon: string;
  name: string;
  type: string;
  LoginButton: typeof WalletConnectLoginButton;
  callbackRoute: string;
}> = ({ icon, name, type, LoginButton, callbackRoute }) => {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full">
      <LoginButton
        className="!w-full !max-w-[350px] !p-0 !bg-[#2a2a2a] hover:!bg-[#3a3a3a] 
                   !border !border-[#333333] !rounded-xl
                   !transition-all !duration-300 hover:!scale-[1.02] group
                   !text-inherit !shadow-none !font-inherit"
        callbackRoute={callbackRoute}
        onLoginRedirect={() => router.push(callbackRoute)}
      >
        <div className="flex items-center justify-between w-full px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-black/30 
                          flex items-center justify-center text-xl">
              {icon}
            </div>
            <span className="text-white font-medium">
              {name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#888888]">{type}</span>
            <span className="text-[#888888] group-hover:translate-x-0.5 transition-transform">
              ›
            </span>
          </div>
        </div>
      </LoginButton>
    </div>
  );
};

export const LoginOptions: FC<LoginOptionsProps> = ({ callbackRoute, onClose }) => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    onClose(); // Close the modal first
    router.push(callbackRoute); // Then redirect
  };

  const commonProps = {
    callbackRoute,
    onLoginRedirect: handleLoginSuccess,
    className: "hidden",
  };

  const options = [
    {
      icon: '📱',
      name: 'xPortal App',
      type: 'Mobile',
      LoginButton: WalletConnectLoginButton
    },
    {
      icon: '🦊',
      name: 'DeFi Wallet',
      type: 'Extension',
      LoginButton: ExtensionLoginButton
    },
    {
      icon: '💻',
      name: 'Web Wallet',
      type: 'Browser',
      LoginButton: WebWalletLoginButton
    },
    {
      icon: '🔒',
      name: 'Ledger',
      type: 'Hardware',
      LoginButton: LedgerLoginButton
    }
  ];

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {options.map(({ icon, name, type, LoginButton }) => (
        <StyledLoginButton
          key={name}
          icon={icon}
          name={name}
          type={type}
          LoginButton={LoginButton}
          callbackRoute={callbackRoute}
        />
      ))}
    </div>
  );
};