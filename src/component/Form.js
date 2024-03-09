import { useState } from "react";
import styles from "./Form.module.css";
import Results from "./Result";
import axios from "axios";

const Form = ({ onSubmit }) => {
  const [userInputs, setUserInputs] = useState({});
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    value: false,
    errorStatement: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInputs.userName || userInputs.userName.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    fetchData(userInputs.userName);
  };

  const fetchData = async (userName) => {
    try {
      const [agifyResponse, genderizeResponse, nationalizeResponse] =
        await Promise.all([
          axios.get(`https://api.agify.io?name=${userName}`),
          axios.get(`https://api.genderize.io?name=${userName}`),
          axios.get(`https://api.nationalize.io?name=${userName}`),
        ]);

      const resultData = {
        name: userName,
        ageData: agifyResponse?.data,
        genderData: genderizeResponse?.data,
        countryData: nationalizeResponse?.data?.country,
      };

      setResults([...results, resultData]);
    } catch (error) {
      debugger;
      setErrorMessage({
        ...errorMessage,
        value: true,
        errorStatement: error?.response?.data?.error,
      });
      console.error("Error fetching data:", error);
    }
  };

  const userDataHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserInputs({ ...userInputs, [name]: value });
    setResults([]);
    setError(false);
    setErrorMessage({});
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <h4 className="d-flex justify-content-center">
            Please fill the user name to get the details
          </h4>
        </div>
        <label className={styles.label}>
          Username:
          <input
            type="text"
            value={userInputs?.["userName"] || ""}
            name="userName"
            onChange={userDataHandler}
            className={styles.input}
            style={{ borderColor: error ? " red" : "" }}
          />
          {error && (
            <span
              className={styles.errorColor}
            >{`User name cannot be empty`}</span>
          )}
          {errorMessage && errorMessage["value"] && (
            <span className={styles.errorColor}>
              {errorMessage["errorStatement"]}
            </span>
          )}
        </label>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
      {results && results.length > 0 && (
        <div className={styles.resultsContainer}>
          <Results data={results} />
        </div>
      )}
    </>
  );
};

export default Form;
