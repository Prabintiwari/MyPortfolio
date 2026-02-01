import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import CircularProgress from "./components/CircularProgress";

const App = () => {
  return (
    <div className="bg-gray-900 text-gray-100">
      <CircularProgress />
      <Navbar />
      <main className="">
        {" "}
        <Home />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
};

export default App;
