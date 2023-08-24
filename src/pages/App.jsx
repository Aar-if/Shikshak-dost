import React, { Suspense } from "react";
import SplashScreen from "./SplashScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../components/Loading";
import Homepage from "./Homepage";
import StoryDetatils from "./storyDetails";
import QrScanner from "./QrScanner";
import TeacherApp from "./TeacherApp";
import Chatbot from "./Chatbot";
import Chatbotui from "./Chatbotui";

function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Router>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/storyDetails" element={<StoryDetatils />} />
            <Route path="/qrscanner" element={<QrScanner />} />
            <Route path="/teacherapp" element={<TeacherApp />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/chatbotui" element={<Chatbotui />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
