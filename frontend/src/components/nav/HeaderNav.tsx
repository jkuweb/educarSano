import type { Header as HeaderType, Post } from "@/lib/payloadTypes";
import MobileMenu from "./MobileMenu";
import { ThemeToggle } from "../ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import Navigation from "./Navigation";

interface HeaderNavProps {
  data: HeaderType;
  posts: Post[];
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, posts }) => {
  const navItems = data?.navItems ?? [];
  const navLinks = navItems.flatMap(
    (navItem) =>
      navItem.navLinks?.flatMap((linkGroup) => linkGroup.items ?? []) ?? [],
  );

  return (
    <ThemeProvider>
      <div className="flex w-full justify-end">
        <Navigation navLinks={navLinks} posts={posts} />
        <ThemeToggle />
        <MobileMenu navLinks={navLinks} posts={posts} />
      </div>
    </ThemeProvider>
  );
};
