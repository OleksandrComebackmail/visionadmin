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
import { BoardQuoteList } from "./resources/boardQuotes/list.tsx";
import { BoardQuoteCreate } from "./resources/boardQuotes/create.tsx";
import { BoardQuoteShow } from "./resources/boardQuotes/show.tsx";
import { BoardQuoteEdit } from "./resources/boardQuotes/edit.tsx";
import { AuthorQuoteCreate } from "./resources/authorQuotes/create.tsx";
import { AuthorQuoteEdit } from "./resources/authorQuotes/edit.tsx";
import { AuthorQuoteList } from "./resources/authorQuotes/list.tsx";
import { AuthorQuoteShow } from "./resources/authorQuotes/show.tsx";
import { BoardServiceList } from "./resources/boardServices/list.tsx";
import { BoardServiceCreate } from "./resources/boardServices/create.tsx";
import { BoardServiceShow } from "./resources/boardServices/show.tsx";

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
    <Resource
      name="board-quotes"
      list={BoardQuoteList}
      create={BoardQuoteCreate}
      show={BoardQuoteShow}
      edit={BoardQuoteEdit}
      options={{ label: "Vision Statements" }}
    />
    <Resource
      name="author-quotes"
      list={AuthorQuoteList}
      create={AuthorQuoteCreate}
      show={AuthorQuoteShow}
      edit={AuthorQuoteEdit}
      options={{ label: "Author Quotes" }}
    />
    <Resource
      name="board-services"
      list={BoardServiceList}
      create={BoardServiceCreate}
      show={BoardServiceShow}
      options={{ label: "Board Services" }}
    />
  </Admin>
);
