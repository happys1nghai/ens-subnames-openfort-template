import { ProfileButton } from "./profile-button";

export function Header() {
  return (
    <header className="h-[60px] flex flex-row justify-between items-center px-6 border-b bg-white border-[#E2E3F0]">
      <div className="flex flex-row items-center gap-2 h-[26px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/horizontal-logo-dark.svg" alt="Namespace" className="h-[26px] w-auto" />
      </div>

      <div className="flex flex-row justify-end items-center gap-4 h-9">
        <ProfileButton />
      </div>
    </header>
  );
}