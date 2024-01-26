import { NavLink as Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "react-feather";

function SocialFooter() {
  return (
    <footer className="flex h-14 items-center justify-center border-t px-4 md:px-6">
      <nav className="flex gap-4">
        <Link to="/">
          <Facebook className="h-6 w-6" />
        </Link>
        <Link to="/">
          <Twitter className="h-6 w-6" />
        </Link>
        <Link to="/">
          <Instagram className="h-6 w-6" />
        </Link>
      </nav>
    </footer>
  );
}

export default SocialFooter;
