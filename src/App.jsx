import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./Main";
import { AuthProvider } from "./AuthContext";
import Dashboard from "./components/auth/Dashboard";


function App() {
  return (
    <AuthProvider>
      <div className="container mx-auto">
        <Header/>
        {/* <Dashboard /> */}
        <Main />
        <Footer />
      </div>
    </AuthProvider>
    
  );
}

export default App;

// not used anymore?
