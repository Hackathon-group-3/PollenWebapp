import styles from "./PollenSeverity.module.css";

export default function PollenSeverity({
  UPIndex,
  todaysForecast,
  indexDescription,
  locationName,
}) {
  const getSeverity = () => {
    if (UPIndex <= 3) {
      return <span className={styles.low}>Low</span>;
    } else if (UPIndex <= 6) {
      return <span className={styles.moderate}>Moderate</span>;
    } else {
      return <span className={styles.high}>High</span>;
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.pollen_card}
      >
        <div className={styles.text}>
          <h1>Pollen Forecast</h1>
          {indexDescription && (
            <p
              style={{
                fontWeight: 400,
              }}
            >
              {indexDescription}.
            </p>
          )}
          <div className={styles.severity}>
            <div style={{ marginTop: "2.7rem" }} className={styles.scaleHeader}>
              <h4>Universal Pollen Index</h4>
              <span
                style={{
                  padding: ".32rem",
                  color: "#991b1b",
                  backgroundColor: "#fee2e1",
                  borderRadius: "10px",
                  fontWeight: "500",
                  fontSize: "1rem",
                }}
                className={styles.indexValue}
              >
                {UPIndex}/10
              </span>
            </div>
          </div>

          {/* Severity Scale Goes Here */}
          <div className={styles.barContainer}>
            <div
              className={styles.barFill}
              style={{ width: `${UPIndex * 7}%` }}
            />
          </div>

          <div className={styles.barLabels}>
            <span className={styles.labelLeft}>Low (1–3)</span>
            <span className={styles.labelCenter}>Moderate (4–6)</span>
            <span className={styles.labelRight}>High (7–10)</span>
          </div>
        </div>
        <div
          className={styles.summary}
          style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: "10px" }}
        >
          <p>
            <strong> Main Allergens: </strong> {todaysForecast}
          </p>
        </div>
      </div>
    </div>
  );
}
