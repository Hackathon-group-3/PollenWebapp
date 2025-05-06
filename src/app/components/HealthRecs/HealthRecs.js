import styles from './HealthRecs.module.css';
import { IoPeopleOutline, IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineShowChart } from "react-icons/md";

export default function HealthRecs({
    UPIndex, 
    sensitiveGroups = [], 
    safeActivities = [] 
}) {
    // console.log(UPIndex, sensitiveGroups, safeActivities);
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.text}>
                    <h1>Health Recommendations</h1>           

                    {/* Groups at Risk Section */}
                    <div className={styles.section}>
                        <span className={styles.iconHeading}>
                            <IoPeopleOutline />
                            <h2>Groups at Risk</h2>
                        </span>
                    </div>

                    <div className={styles.advisoryContainer}>
                        <span className={styles.iconHeading}>
                            <IoAlertCircleOutline />
                            <h2>Health Advisory</h2>
                        </span>
                        <p>The following groups should take precautions due to the current pollen levels:</p>
                        <div className={styles.advisoryList}>
                        {sensitiveGroups.length > 0 ? (
                            <ul>
                                {sensitiveGroups.map((group, index) => (
                                    <li key={index}>{group}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No data for sensitive groups available.</p>
                        )}
                    </div>
                    </div>



                    {/* Safe Activities Section */}
                    <div className={styles.section}>
                        <span className={styles.iconHeading}>
                            <MdOutlineShowChart />
                            <h2>Safe Activities</h2>
                        </span>
                        <p>Based on the current pollen levels (index: {UPIndex}),  the following activities are considered safe:</p>
                    </div>

                    <div className={styles.safeActivitiesList}>
                        {safeActivities.length > 0 ? (
                            <div className= {styles.safeActivitiesContainer}>
                                {safeActivities.map((activity, index) => (
                                    <div className={styles.safeActivity} key={index}>{activity}</div>
                                ))}
                            </div>
                        ) : (
                            <p>No safe activities data available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
