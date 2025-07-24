import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./components/Dashboard/Home";
import TestApplication from "./components/performanceHome/TestApplication";
import AddTest from "./components/performanceMetrics/AddTest";
import TestDetails from "./components/performanceMetrics/TestDetails";
import RequireAuth from "./components/auth/RequireAuth";
import SignUp from "./pages/AuthPages/SignUp";
import ListOfUsers from "./components/users/ListUsers";
import ChangePassword from "./components/auth/ChangePassword";



export default function App() {

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/*  Auth  routes */}
          <Route path="/signin" element={<SignIn />} />
           

          <Route element={<RequireAuth />}>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />

           

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/test/:id" element={<TestApplication />} />
              <Route path="/metrics" element={<TestDetails />} />
              <Route path="/addTest" element={<AddTest />} />
              <Route path="/createUser" element={<SignUp />} />
              <Route path="/listUsers" element={<ListOfUsers />} />
              <Route path="/newPassword" element={<ChangePassword />} />
               {/* <Route path="/allcomments" element={<TestCommentsDashboard />} />
               <Route path="/testcomments" element={<LighthouseCommentsDashboard />} /> */}

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>


          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
