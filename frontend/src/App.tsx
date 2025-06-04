import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import AboutUSPage from "./pages/AboutUsPage";
import FilterPage from "./pages/FilterPage";
import DescriptionPage from './pages/DescriptionPage';


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUSPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/chat/:chatId" element={<DescriptionPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;