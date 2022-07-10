import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './Components/HomePageFolder/HomePage/HomePage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import Navbar from './Components/Shared/Navbar/Navbar';
import Footer from './Components/Shared/Footer/Footer';
import AdminRoute from './RouteManagement/AdminRoute/AdminRoute';
import AuthenticationRoute from './RouteManagement/AuthenticationRoute/AuthenticationRoute';
import DashboardLayout from './Components/DashboardFolder/DashboardLayout/DashboardLayout';
import DashboardPage from './Components/DashboardFolder/DashboardPage/DashboardPage';
import Login from './Components/AuthenticationFolder/Login';
import Registration from './Components/AuthenticationFolder/Registration';
import AddAnotherUser from './Components/DashboardFolder/AddAnotherUser/AddAnotherUser';
import AddAdminUser from './Components/DashboardFolder/AddAdminUser/AddAdminUser';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='home' element={<HomePage />} />
        <Route path='dashboard' element={<AdminRoute><DashboardLayout /></AdminRoute>} >
          <Route index element={<DashboardPage />} />
          <Route path='addAnotherUser' element={<AddAnotherUser />} />
          <Route path='addAdminUser' element={<AddAdminUser />} />
        </Route>
        <Route path='profile' element={<ProfilePage />} />
        <Route path='login' element={<AuthenticationRoute><Login /></AuthenticationRoute>} />
        <Route path='registration' element={<AuthenticationRoute><Registration /></AuthenticationRoute>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
