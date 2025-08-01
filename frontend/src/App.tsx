import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import MainLayout from "./layouts/MainLayout";
import DescriptionPage from './pages/DescriptionPage';
import ChatMenuPage from './pages/ChatMenuPage';
import ClassicPage from './pages/ClassicPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <MainLayout>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ChatMenuPage />} />
          <Route path="/chat/:chatId" element={<DescriptionPage />} /> 
          <Route path="/:chatId/menu" element={<ChatMenuPage />} />
          <Route path="/:chatId" element={<ClassicPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </AuthProvider>
    </MainLayout>
  );
}

export default App