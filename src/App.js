import User from "./components/User";
import Null from "./components/Null";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";
import AppContext from "./utils/app-context";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unSubcribe();
  }, []);
  return (
    <AppContext.Provider value={user}>
      <div className="flex flex-col h-screen">
        <Header />
        {user === null ? <Null /> : <User />}
      </div>
    </AppContext.Provider>
  );
}

export default App;
