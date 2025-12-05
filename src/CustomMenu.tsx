import { useState, ReactNode } from "react";
import { Menu, MenuItemLink, useSidebarState } from "react-admin";
import WebIcon from "@mui/icons-material/Web";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
} from "@mui/material";

const MenuGroup = ({
  label,
  children,
  initialOpen = true,
}: {
  label: string;
  children: ReactNode;
  initialOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [sidebarOpen] = useSidebarState();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!sidebarOpen) {
    return (
      <>
        <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />
        {children}
      </>
    );
  }

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          pl: 1.5,
          pr: 2,
          py: 1,
          minHeight: 32,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: 24, color: "rgba(255,255,255,0.5)" }}>
          {isOpen ? (
            <KeyboardArrowDownIcon fontSize="small" />
          ) : (
            <KeyboardArrowRightIcon fontSize="small" />
          )}
        </ListItemIcon>

        <ListItemText
          primary={label}
          primaryTypographyProps={{
            variant: "caption",
            sx: {
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.7rem",
              lineHeight: 1,
            },
          }}
        />
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Box sx={{ pl: 2 }}>{children}</Box>
        </List>
      </Collapse>
    </>
  );
};

export const CustomMenu = () => (
  <Menu>
    <Menu.DashboardItem />

    <MenuGroup label="Data Management">
      <Menu.ResourceItem name="users" />
      <Menu.ResourceItem name="board-services" />
      <Menu.ResourceItem name="board-quotes" />
      <Menu.ResourceItem name="author-quotes" />
    </MenuGroup>

    <MenuGroup label="Website Content">
      <Menu.ResourceItem name="team" leftIcon={<WebIcon />} />
      <Menu.ResourceItem name="episodes" leftIcon={<WebIcon />} />
      <MenuItemLink to="/about" primaryText="About Us" leftIcon={<WebIcon />} />
    </MenuGroup>
  </Menu>
);
