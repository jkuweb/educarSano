import type { Header as HeaderType } from "@/lib/payloadTypes";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";

interface HeaderNavProps {
  data: HeaderType;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data }) => {
  const navItems = data?.navItems ?? [];
  const navLinks = navItems.flatMap(
    (navItem) =>
      navItem.navLinks?.flatMap((linkGroup) => linkGroup.items ?? []) ?? [],
  );
  return (
    <ThemeProvider>
      <div className="flex w-full justify-center">
        <Navigation navLinks={navLinks} />
        <ThemeToggle />
        <MobileMenu navLinks={navLinks} />
      </div>
    </ThemeProvider>
  );
};
