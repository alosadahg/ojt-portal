import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../UserManagement/AuthContext";
import axios from "axios";
import InternEvalFeedbackFormController from "../InternEvalFeedbackForm/controller/InternEvalFeedbackFormController";

const TraineeEvaluation = () => {
  const { authUser } = useAuth();
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFeedback, setOpenFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ojt-backend.azurewebsites.net/company/get-all-students",
          {
            params: {
              companyName: authUser.company_name,
            },
            headers: {
              Authorization: `Bearer ${authUser.accessToken}`,
            },
          }
        );
        setTrainees(response.data);
        setOpenFeedback(Array(response.data.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authUser]);

  const handleChange = (index) => {
    setOpenFeedback((prevState) => {
      const updatedState = Array(prevState.length).fill(false);
      updatedState[index] = true;
      return updatedState;
    });
  };

  const handleCloseFeedback = (index) => {
    setOpenFeedback((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = false;
      return updatedState;
    });
  };

  return (
    <div className="TraineeEvaluation">
      <h1>Trainee Evaluation</h1>

      {loading ? (
        <td colSpan="4">Loading...</td>
      ) : (
        <ul>
          {trainees.map((item, index) => (
            <li
              key={index}
              style={{ display: openFeedback[index] ? "block" : "flex" }}
            >
              <div
                className={`user`}
                style={{ display: openFeedback[index] && "none" }}
              >
                <FontAwesomeIcon icon={faUserCircle} className="icon" />

                <div>
                  <p>
                    {item.user.firstname} {item.user.lastname}
                  </p>
                  <p>{item.user.email}</p>
                </div>
              </div>

              <div
                className="student-id-container"
                style={{ display: openFeedback[index] && "none" }}
              >
                <p>{item.degreeProgram}</p>
                <p>Student ID: {item.studentid}</p>
              </div>

              <div style={{ display: openFeedback[index] && "none" }}>
                <button onClick={() => handleChange(index)} student={item}>
                  Evaluate Trainee
                </button>
              </div>
              {openFeedback[index] && (
                <InternEvalFeedbackFormController
                  type="trainee"
                  student={item.user}
                  onClose={() => handleCloseFeedback(index)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TraineeEvaluation;
