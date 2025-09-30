import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { LoginPage } from "./LoginPage";
import { Dashboard } from "./Dashboard";
import { CategoryList } from "./resources/categories/CategoryList";
import { CategoryCreate } from "./resources/categories/CategoryCreate";
import { CategoryShow } from "./resources/categories/CategoryShow";
import { CategoryEdit } from "./resources/categories/CategoryEdit";
import { UsersList } from "./resources/users/UsersList";
import { UserShow } from "./resources/users/UserShow";

import { dataProvider } from "./dataProvider";

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    layout={Layout}
    loginPage={LoginPage}
    dashboard={Dashboard}
    requireAuth
  >
    <Resource name="users" list={UsersList} show={UserShow} />
    <Resource
      name="categories"
      list={CategoryList}
      create={CategoryCreate}
      show={CategoryShow}
      edit={CategoryEdit}
    />
  </Admin>
);
