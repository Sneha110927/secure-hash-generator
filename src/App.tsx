import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HashGenerator from "./components/HashGenerator";
import FileHashGenerator from "./components/FileHashGenerator";
import Features from "./components/Features";
import Algorithms from "./components/Algorithms";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import ChatBot from "./components/Chatbot";
import "./styles.css";

export default function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <HashGenerator />
      <FileHashGenerator />
      <Features />
      <Algorithms />
      <Stats />
      <Footer />
      <ChatBot />
    </main>
  );
}