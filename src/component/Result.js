import styles from "./Result.module.css";
const Results = ({ data }) => {
  return (
    <>
      <div className={styles.results}>
        <h2 className={styles.heading}>Results:</h2>
      </div>

      {data.map((result, index) => (
        <div key={index} className={styles.resultItem}>
          <p>Name: {result?.name}</p>

          {result.genderData && (
            <p>Gender: {result?.genderData.gender || "No gender"}</p>
          )}

          {result?.ageData && <p>Age: {result?.ageData?.age || "No age"}</p>}

          {result?.countryData && (
            <p>
              Country:{" "}
              {result?.countryData.map((country, key) => (
                <span key={key}>{country?.country_id} </span>
              )) || "No country"}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default Results;
