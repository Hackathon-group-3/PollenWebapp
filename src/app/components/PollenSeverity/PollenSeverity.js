import styles from "./PollenSeverity.module.css";

export default function PollenSeverity({ UPIndex, todaysForecast, locationName }) {
    console.log('PollenSeverity Props:', { UPIndex, todaysForecast, locationName });
  const getSeverity = () => {
    if (UPIndex <= 3) {
      return <span className={styles.low}>Low</span>;
    } else if (UPIndex <= 6) {
      return <span className={styles.moderate}>Moderate</span>;
    } else {
      return <span className={styles.high}>High</span>;
    }
  };

  // const exampleTodaysForecast =
  //   "Pollen levels are expected to remain high for the next 2-3 days due to warm, dry conditions.";

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.text}>
          <h1> Pollen Severity </h1>

          <div className={styles.indexHeader}>
            <h2>Universal Pollen Index</h2> {getSeverity()}
          </div>

          <p> Current pollen severity in your area: {locationName}</p>

          <div className={styles.severity}>
            <div className={styles.scaleHeader}>
            <h4>Severity Scale (1–10)</h4>
                <span className={styles.indexValue}>{UPIndex}/10</span>
            </div>
        </div>

            {/* Severity Scale Goes Here */}
            <div className={styles.barContainer}>
              <div
                className={styles.barFill}
                style={{ width: `${UPIndex * 20}%` }}
              />
            </div>

            <div className={styles.barLabels}>
              <span className={styles.labelLeft}>Low (1–3)</span>
              <span className={styles.labelCenter}>Moderate (4–6)</span>
              <span className={styles.labelRight}>High (7–10)</span>
            </div>
          </div>

          <div className={styles.summary}>
            <p>
              <strong> Today`s Forecast: </strong> {todaysForecast}{" "}
              {/* Actual Forecast information goes here, just need to update with user zipcode */}
            </p>
          </div>
        </div>
      </div>
  );
}
