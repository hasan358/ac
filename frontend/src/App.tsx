import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import AboutUSPage from "./pages/AboutUsPage";
import FilterPage from "./pages/FilterPage";
import DescriptionPage from './pages/DescriptionPage';
import ChatMenuPage from './pages/ChatMenuPage';
import CheckoutPage from './pages/CheckoutPage';
import ClassicChatInterfacePage from './pages/ClassicChatInterfacePage';
import ModalChatInterfacePage from './pages/ModalChatInterfacePage';
import AnswerOfModalChatInterfacePage from './pages/AnswerOfModalChatInterfacePage';
import PushButtonChatInterfacePage from './pages/PushButtonChatInterfacePage';
import FoundationTypeChoice from './pages/Create-func/Foundation/FoundationTypeChoice';
import CreateFoundationModeTypeChoice from './pages/Create-func/Foundation/CreateFoundationModeTypeChoice';
import AddFoundation from './pages/Create-func/Foundation/AddFoundation';
import ChooseAIType from './pages/Create-func/Foundation/ChooseAIType';
import EntertainmentQuestions from './pages/Create-func/Foundation/questions/EntertainmentQuestions';
import BusinessQuestions from './pages/Create-func/Foundation/questions/BusinessQuestions';
import TrainingQuestions from './pages/Create-func/Foundation/questions/TrainingQuestions';
import AIAssistantQuestions from './pages/Create-func/Foundation/questions/AIAssistantQuestions';
import AICharacterQuestions from './pages/Create-func/Foundation/questions/AICharacterQuestions';
import ConfigurationBlock from './pages/Create-func/Foundation/ConfigurationBlock';


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUSPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/chat/:chatId" element={<DescriptionPage />} /> {/* Для страницы описания чата */}
        <Route path="/chat/:chatId/menu" element={<ChatMenuPage />} />
        <Route path="/chat/:chatId/checkout-page" element={<CheckoutPage />} />
        <Route path="chat/:chatId/classic-interface/:slug" element={<ClassicChatInterfacePage />} />
        <Route path="chat/:chatId/model-interface/:slug" element={<ModalChatInterfacePage />} />
        <Route path="chat/:chatId/pushbutton-interface/:slug" element={<PushButtonChatInterfacePage />} />
        <Route path="chat/:chatId/answer/:convName" element={<AnswerOfModalChatInterfacePage />} />
        <Route path="/create" element={<FoundationTypeChoice />} />
        <Route path="/create/add-foundation" element={<AddFoundation />} />
        <Route path="/create/foundation" element={<CreateFoundationModeTypeChoice />} />
        <Route path="/create/fast-mode/ai-type" element={<ChooseAIType />} />
        <Route path="/create/foundation/entertainment" element={<EntertainmentQuestions />} />
        <Route path="/create/foundation/business" element={<BusinessQuestions />} />
        <Route path="/create/foundation/training" element={<TrainingQuestions />} />
        <Route path="/create/foundation/assistant" element={<AIAssistantQuestions />} />
        <Route path="/create/foundation/character" element={<AICharacterQuestions />} />
        <Route path="/create/advanced-mode/config-block" element={<ConfigurationBlock />} />
      </Routes>
    </MainLayout>
  );
}

export default App