import { Menu, MenuItemLink } from "react-admin";
import InfoIcon from "@mui/icons-material/Info";

export const CustomMenu = () => (
  <Menu>
    <Menu.DashboardItem />

    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="board-quotes" />
    <Menu.ResourceItem name="author-quotes" />
    <Menu.ResourceItem name="board-services" />
    <Menu.ResourceItem name="team" />
    <Menu.ResourceItem name="episodes" />

    <MenuItemLink
      to="/about"
      primaryText="About Us"
      leftIcon={<InfoIcon />}
    />
  </Menu>
);