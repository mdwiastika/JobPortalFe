import type { Theme, SxProps, Breakpoint } from "@mui/material/styles";

import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";

import { _langs, _notifications } from "../../../../_mock";

import { Iconify } from "../../../../components/iconify";

import { Main } from "./main";
import { layoutClasses } from "../classes";
import { NavMobile, NavDesktop } from "./nav";
import { navData } from "../config-nav-dashboard";
import { Searchbar } from "../components/searchbar";
import { _workspaces } from "../config-nav-workspace";
import { MenuButton } from "../components/menu-button";
import { LayoutSection } from "../core/layout-section";
import { HeaderSection } from "../core/header-section";
import { AccountPopover } from "../components/account-popover";
import { LanguagePopover } from "../components/language-popover";
import { NotificationsPopover } from "../components/notifications-popover";
import { Helmet, HelmetProvider } from "react-helmet-async";
import icon from "/job-wise2.png";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  role: string;
};

export function DashboardLayout({
  sx,
  children,
  header,
  role,
}: DashboardLayoutProps) {
  console.log(role);
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const [nameMenu, setNameMenu] = useState("Home");
  useEffect(() => {
    const item = navData.find((item) => item.path === location.pathname);
    if (item) {
      setNameMenu(item.title);
    }
  }, [location.pathname]);
  const layoutQuery: Breakpoint = "lg";
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: "none", borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: "none" },
                  }}
                />
                <NavMobile
                  data={navData.filter((item) => {
                    if (role !== "super_admin" && role !== "admin") {
                      return !["Users", "Skills", "Categories"].includes(
                        item.title
                      );
                    } else {
                      return item;
                    }
                  })}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  _workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Searchbar />
                <LanguagePopover data={_langs} />
                <NotificationsPopover data={_notifications} />
                <AccountPopover
                  data={[
                    {
                      label: "Home",
                      href: "/",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:home-angle-bold-duotone"
                        />
                      ),
                    },
                    {
                      label: "Profile",
                      href: "#",
                      icon: (
                        <Iconify
                          width={22}
                          icon="solar:shield-keyhole-bold-duotone"
                        />
                      ),
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop
          data={navData.filter((item) => {
            if (role !== "super_admin" && role !== "admin") {
              return !["Users", "Skills", "Categories"].includes(item.title);
            } else {
              return item;
            }
          })}
          layoutQuery={layoutQuery}
          _workspaces={_workspaces}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        "--layout-nav-vertical-width": "300px",
        "--layout-dashboard-content-pt": theme.spacing(1),
        "--layout-dashboard-content-pb": theme.spacing(8),
        "--layout-dashboard-content-px": theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: "var(--layout-nav-vertical-width)",
          },
        },
        ...sx,
      }}
    >
      <HelmetProvider>
        <Helmet>
          <title>JobWise | {nameMenu}</title>
          <link rel="shortcut icon" href={icon} type="image/x-icon" />
        </Helmet>
      </HelmetProvider>
      <Main>{children}</Main>
    </LayoutSection>
  );
}
