import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { OtpremnicaApp, PrevoznoSredstvoApp, Navigation, Home } from "./components";
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/otpremnice" exact component={() => <OtpremnicaApp />} />
          <Route path="/prevoznasredstva" exact component={() => <PrevoznoSredstvoApp />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;