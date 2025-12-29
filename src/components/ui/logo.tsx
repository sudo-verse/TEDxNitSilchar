import { Link } from "react-router-dom";

export const Logo = () => (
  <Link to="/" className="flex items-center">
    <img
      src="/tedxlogo.png"
      alt="TEDx NIT Silchar"
      className="h-32 md:h-48 w-auto object-contain"
    />
  </Link>
);
