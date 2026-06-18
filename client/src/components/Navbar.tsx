import { useLocation } from "react-router-dom";
import Button from "./UI/Button";

const Navbar = () => {
  const { pathname } = useLocation();
  const link = [
    {
      name: "Home",
      link: "/",
      active: pathname === "/",
    },
    {
      name: "Hotels",
      link: "/hotels",
      active: pathname.startsWith("/hotels"),
    },
    {
      name: "Café",
      link: "/café",
      active: pathname.startsWith("/Café"),
    },
    {
      name: "Attractions",
      link: "attractions",
      active: pathname.startsWith("/attractions"),
    },
    {
      name: "Support",
      link: "/support",
      active: pathname.startsWith("/support"),
    },
  ];
  return (
    <header className="w-full z-9999 bg-secondary/20">
      <nav className="flex items-center justify-between p-2 mx-auto max-w-screen-2xl">
        <h2 className="text-secondary text-3xl font-bold">Jump.</h2>
        <ul className="flex gap-4 text-semibold text-secondary">
          {link.map((item) => (
            <li
              key={item.name}
              className={`relative text-secondary ${item.active ? "cutom_underline" : ""}`}
            >
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
        <Button>Login</Button>
      </nav>
    </header>
  );
};

export default Navbar;
