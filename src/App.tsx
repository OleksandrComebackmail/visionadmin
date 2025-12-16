import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router";
import { Layout } from "./Layout";
import { authProvider } from "./authProvider";
import { LoginPage } from "./LoginPage";
import { Dashboard } from "./Dashboard";
import { UserList } from "./resources/users/list.tsx";
import { UserShow } from "./resources/users/show.tsx";

import { BehindTheScenesList } from "@/resources/BehindTheScenes";
import { TeamList } from "@/resources/team/list.tsx";
import { TeamShow } from "@/resources/team/show.tsx";
import { TeamEdit } from "@/resources/team/edit.tsx";

import { dataProvider } from "./dataProvider";
import { AuthorQuoteCreate } from "./resources/authorQuotes/create.tsx";
import { AuthorQuoteEdit } from "./resources/authorQuotes/edit.tsx";
import { AuthorQuoteList } from "./resources/authorQuotes/list.tsx";
import { AuthorQuoteShow } from "./resources/authorQuotes/show.tsx";
import { BoardServiceList } from "./resources/boardServices/list.tsx";
import { BoardServiceCreate } from "./resources/boardServices/create.tsx";
import { BoardServiceShow } from "./resources/boardServices/show.tsx";
import "@/styles/_variables.scss";
import "@/components/tiptap-overrides.css";
import "@/styles/admin-overrides.css";

import { AboutUsEdit } from "@/resources/aboutUs/edit";
import { AboutUsShow } from "@/resources/aboutUs/show.tsx";
import { AboutRedirectList } from "@/resources/aboutUs/AboutRedirectList.tsx";

import { NewsCreate } from "@/resources/BehindTheScenes/news/NewsCreate.tsx";
import { NewsEdit } from "@/resources/BehindTheScenes/news/NewsEdit.tsx";
import { NewsShow } from "@/resources/BehindTheScenes/news/NewsShow.tsx";
import { HomePageList } from "@/resources/HomePage";

import { TermsRedirectList } from "@/resources/termsAndConditions/TermsRedirectList.tsx";
import { TermsShow } from "@/resources/termsAndConditions/show.tsx";
import { TermsEdit } from "@/resources/termsAndConditions/edit.tsx";
import { PrivacyRedirectList } from "@/resources/privacyPolicy/PrivacyRedirectList.tsx";
import { PrivacyShow } from "@/resources/privacyPolicy/show.tsx";
import { PrivacyEdit } from "@/resources/privacyPolicy/edit.tsx";
import { ContactRedirectList } from "@/resources/contactUs/ContactRedirectList.tsx";
import { ContactUsShow } from "@/resources/contactUs/show.tsx";
import { ContactUsEdit } from "@/resources/contactUs/edit.tsx";
import { HowItWorksRedirectList } from "@/resources/howItWorks/HowItWorksRedirectList.tsx";
import { HowItWorksShow } from "@/resources/howItWorks/show.tsx";
import { HowItWorksEdit } from "@/resources/howItWorks/edit.tsx";
import { ComingSoonRedirectList } from "@/resources/comingSoon/ComingSoonRedirectList.tsx";
import { ComingSoonShow } from "@/resources/comingSoon/show.tsx";
import { ComingKidsEdit } from "@/resources/comingSoon/editKids.tsx";
import { ComingBusinessEdit } from "@/resources/comingSoon/editBusiness.tsx";

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    layout={Layout}
    loginPage={LoginPage}
    dashboard={Dashboard}
    requireAuth
  >
    <Resource name="users" list={UserList} show={UserShow} />

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

    <Resource
      name="team"
      list={TeamList}
      show={TeamShow}
      edit={TeamEdit}
      options={{
        label: "Team",
      }}
    />

    <Resource
      name="episodes"
      list={BehindTheScenesList}
      options={{ label: "Behind The Scenes" }}
    />

    <Resource
      name="testimonials"
      list={HomePageList}
      options={{ label: "Home" }}
    />

    <Resource name="news" create={NewsCreate} edit={NewsEdit} show={NewsShow} />

    <CustomRoutes>
      <Route path="/about" element={<AboutUsShow />} />
      <Route path="/about/edit" element={<AboutUsEdit />} />

      <Route path="/contact" element={<ContactUsShow />} />
      <Route path="/contact/edit" element={<ContactUsEdit />} />

      <Route path="/how-it-work" element={<HowItWorksShow />} />
      <Route path="/how-it-work/edit" element={<HowItWorksEdit />} />

      <Route path="/terms" element={<TermsShow />} />
      <Route path="/terms/edit" element={<TermsEdit />} />

      <Route path="/privacy" element={<PrivacyShow />} />
      <Route path="/privacy/edit" element={<PrivacyEdit />} />

      <Route path="/coming-soon" element={<ComingSoonShow />} />
      <Route path="/coming-kids/edit" element={<ComingKidsEdit />} />
      <Route path="/coming-business/edit" element={<ComingBusinessEdit />} />
    </CustomRoutes>

    <Resource
      name="about"
      list={AboutRedirectList}
      show={AboutUsShow}
      edit={AboutUsEdit}
      options={{ label: "About Us" }}
    />

    <Resource
      name="contact"
      list={ContactRedirectList}
      show={ContactUsShow}
      edit={ContactUsEdit}
      options={{ label: "Contact Us" }}
    />

    <Resource
      name="how-it-work"
      list={HowItWorksRedirectList}
      show={HowItWorksShow}
      edit={HowItWorksEdit}
      options={{ label: "How It Works" }}
    />

    <Resource
      name="terms"
      list={TermsRedirectList}
      show={TermsShow}
      edit={TermsEdit}
      options={{ label: "Terms & Policy" }}
    />

    <Resource
      name="privacy"
      list={PrivacyRedirectList}
      show={PrivacyShow}
      edit={PrivacyEdit}
      options={{ label: "Privacy Policy" }}
    />

    <Resource
      name="coming-soon"
      list={ComingSoonRedirectList}
      show={ComingSoonShow}
      options={{ label: "Coming Soon" }}
    />
  </Admin>
);
