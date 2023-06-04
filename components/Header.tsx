import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ThemeToggleButton from "./ThemeToggleButton";
import Button from "@mui/material/Button";
import { Session, Theme } from "next-auth";
import classes from "./Header.module.css";
import { useTheme } from "../hooks/useTheme";

type HeaderLinkProps = {
  href: string;
  isActive: (pathname: string) => boolean;
  children: React.ReactNode;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  isActive,
  children,
}) => {
  const theme = useTheme();
  return (
    <Link href={href}>
      <p
        className={`${classes.link} ${classes.linkMargin} ${
          isActive(href) ? classes.active : ""
        }`}
        style={{
          color: theme.theme === "dark" ? "white" : "black",
        }}
      >
        {children}
      </p>
    </Link>
  );
};
type SectionProps = {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  isActive: (pathname: string) => boolean;
};

const LeftSection: React.FC<SectionProps> = ({ session, status, isActive }) => {
  if (status === "loading" || !session) {
    return (
      <div className={classes.left}>
        <HeaderLink href="/" isActive={isActive}>
          Feed
        </HeaderLink>
      </div>
    );
  }

  return (
    <div className={classes.left}>
      <HeaderLink href="/" isActive={isActive}>
        Feed
      </HeaderLink>
      <HeaderLink href="/drafts" isActive={isActive}>
        My drafts
      </HeaderLink>
    </div>
  );
};

// Define RightSection component
const RightSection: React.FC<SectionProps> = ({
  session,
  status,
  isActive,
}) => {
  if (status === "loading") {
    return <p>Validating session ...</p>;
  }

  if (!session) {
    return (
      <div className={classes.right}>
        <HeaderLink href="/api/auth/signin" isActive={isActive}>
          Log in
        </HeaderLink>
      </div>
    );
  }

  return (
    <div className={classes.right}>
      <p className={classes.paragraph}>
        {session.user?.name} ({session.user?.email})
      </p>
      <Link href="/create">
        <Button variant="outlined" sx={{ margin: 1 }}>
          New post
        </Button>
      </Link>
      <Button variant="outlined" onClick={() => signOut()}>
        Log out
      </Button>
    </div>
  );
};

// Define Header component
const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  const theme = useTheme();
  return (
    <nav className={classes.nav}>
      <ThemeToggleButton />
      <LeftSection session={session} status={status} isActive={isActive} />
      <RightSection session={session} status={status} isActive={isActive} />
    </nav>
  );
};

export default Header;
