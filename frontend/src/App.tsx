import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/functional-pages/SignInPage";
import HomePage from "./pages/company-pages/HomePage";
import AboutUSPage from "./pages/company-pages/AboutUsPage";
import FilterPage from "./pages/functional-pages/FilterPage";
import DescriptionPage from './pages/temprary-pages/DescriptionPage';
import ChatMenuPage from './pages/functional-pages/ChatMenuPage';
import CheckoutPage from './pages/temprary-pages/CheckoutPage';
import ClassicPage from './pages/chat-interface/ClassicPage';
import ModalPage from './pages/chat-interface/ModalPage';
import AnswerOfModalPage from './pages/chat-interface/AnswerOfModalPage';
import PushButtonPage from './pages/chat-interface/PushButtonPage';
import FoundationType from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/choices/FoundationType';
import InterfaceType from './pages/process-of-custom-chat-creation/interface-of-custom-chat/InterfaceType';
import ModeType from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/choices/ModeType';
import FoundationAdding from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/FoundationAdding';
import InterfaceAdding from './pages/process-of-custom-chat-creation/interface-of-custom-chat/InterfaceAdding.tsx';
import AIType from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/choices/AIType';
import EntertainmentAI from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/questions/EntertainmentAI';
import BusinessAI from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/questions/BusinessAI';
import TrainingAI from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/questions/TrainingAI';
import AIAssistant from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/questions/AIAssistant';
import AICharacter from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/questions/AICharacter';
import ConfigurationBlock from './pages/process-of-custom-chat-creation/foundation-of-custom-chat/creation/ConfigurationBlock';
import BuiltInInterfaces from './pages/process-of-custom-chat-creation/interface-of-custom-chat/BuiltInInterfaces';
import FinalStep from './pages/process-of-custom-chat-creation/FinalStep.tsx';
import SettingsPage from './pages/custom-chat-control/SettingsPage';
import CustomChatPage from './pages/custom-chat-control/CustomChatPage.tsx';
import MonitizationType from './pages/custom-chat-control/publication-process/MonitizationType.tsx';
import PaidChat from './pages/custom-chat-control/publication-process/details/PaidChat.tsx';
import ChatWithAdds from './pages/custom-chat-control/publication-process/details/ChatWithAdds.tsx';
import PricingPlan from './pages/custom-chat-control/publication-process/payment/PricingPlan.tsx';
import MonthlySubscription from './pages/custom-chat-control/publication-process/payment/payment-check-out-pages/MonthlySubscription.tsx';
import LifetimeAccess from './pages/custom-chat-control/publication-process//payment/payment-check-out-pages/LifetimeAccess.tsx';


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
        <Route path="chat/:chatId/classic-interface/:slug" element={<ClassicPage />} />
        <Route path="chat/:chatId/model-interface/:slug" element={<ModalPage />} />
        <Route path="chat/:chatId/pushbutton-interface/:slug" element={<PushButtonPage />} />
        <Route path="chat/:chatId/answer/:convName" element={<AnswerOfModalPage />} />
        <Route path="/create" element={<FoundationType />} />
        <Route path="/create/interface" element={<InterfaceType />} />
        <Route path="/create/add-foundation" element={<FoundationAdding />} />
        <Route path="/create/add-interface" element={<InterfaceAdding />} />
        <Route path="/create/foundation" element={<ModeType />} />
        <Route path="/create/fast-mode/ai-type" element={<AIType />} />
        <Route path="/create/foundation/entertainment" element={<EntertainmentAI />} />
        <Route path="/create/foundation/business" element={<BusinessAI />} />
        <Route path="/create/foundation/training" element={<TrainingAI />} />
        <Route path="/create/foundation/assistant" element={<AIAssistant />} />
        <Route path="/create/foundation/character" element={<AICharacter />} />
        <Route path="/create/advanced-mode/config-block" element={<ConfigurationBlock />} />
        <Route path="/create/built-in/interfaces" element={<BuiltInInterfaces />} />
        <Route path="/create/final-step" element={<FinalStep />} />
        <Route path="/chats" element={<SettingsPage />} />
        <Route path="/settings" element={<CustomChatPage />} />
        <Route path="/chat/monitization" element={<MonitizationType />} />
        <Route path="/details/paid" element={<PaidChat />} />
        <Route path="/details/ads" element={<ChatWithAdds />} />
        <Route path="/pricing-plan" element={<PricingPlan />} />
        <Route path="/monthly/payment" element={<MonthlySubscription />} />
        <Route path="/lifetime/payment" element={<LifetimeAccess />} />
      </Routes>
    </MainLayout>
  );
}

export default App