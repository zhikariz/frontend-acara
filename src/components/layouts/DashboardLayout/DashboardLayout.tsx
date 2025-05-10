import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
  children: ReactNode;
  description?: string;
  title?: string;
  type?: string;
}

const DashboardLayout = (props: PropTypes) => {
  const { children, description, title, type = "admin" } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <PageHead title={title}></PageHead>
      <div className="flex max-w-screen-2xl 2xl:container">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        ></DashboardLayoutSidebar>
        <div className="h-screen w-full overflow-y-auto p-8">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            classNames={{ wrapper: "p-0" }}
            isBlurred={false}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            ></NavbarMenuToggle>
          </Navbar>
          <p className="mb-4 text-small">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
