import React from "react";
import "./Styles/App.scss";
import Header from "./Components/Common/Header";
import Sidebar from "./Components/Common/Sidebar";
import Footer from "./Components/Common/Footer";
import Dashboard from "./Components/Dashboard/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentProgress from "./Components/StudentProgress/StudentProgress";
import LogbookForm from "./Components/LogbookSubmission/LogbookForm";
import { LoginSignup } from "./Components/UserManagement/LoginSignup";
import { LogbookContents } from "./Components/ViewLogbook/LogbookContents";
import TrainingPlan from "./Components/TrainingPlan/TrainingPlan";
import Logbook from "./Components/Logbook/Logbook/Logbook";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Sidebar />
        <Footer />

        <main>
          <Routes>
            <Route path="/logbookSubmissions" element={<StudentProgress />} />
            <Route path="/" element={<LoginSignup />} />
            <Route path="/student-info" element={<Dashboard />} />
            <Route path="/logbook" element={<LogbookForm />} />
            <Route path="/view-logbook" element={<LogbookContents />} />
            <Route path="/training-plan" element={<TrainingPlan />} />
            <Route path="/submit-logbook" element={<Logbook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
