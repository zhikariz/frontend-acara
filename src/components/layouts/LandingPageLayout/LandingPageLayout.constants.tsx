import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaX,
  FaYoutube,
} from "react-icons/fa6";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "https://facebook.com/acaraid",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/acaraid",
    icon: <FaInstagram />,
  },
  {
    label: "Tiktok",
    href: "https://tiktok.com/acaraid",
    icon: <FaTiktok />,
  },
  {
    label: "X",
    href: "https://x.com/acaraid",
    icon: <FaX />,
  },
  {
    label: "Youtube",
    href: "https://youtube.com/acaraid",
    icon: <FaYoutube />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
