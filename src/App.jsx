import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./Main";
import { AuthProvider } from "./AuthContext";


function App() {
  return (
    <AuthProvider>
      <div className="container mx-auto">
        <Header/>
        <Main />
        <Footer />
      </div>
    </AuthProvider>
    
  );
}

export default App;
