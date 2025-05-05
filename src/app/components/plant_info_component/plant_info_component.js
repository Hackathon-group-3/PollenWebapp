import styles from "./plant_info_component.module.css";
import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Brightness1Icon from '@mui/icons-material/Brightness1';

export default function PlantInfoComponent({ forecastData: forecast }) {
  if (forecast.length === 0) {
    return <p>No plants in this category are currently affecting pollen levels.</p>;
  }
  const todays_forecast = forecast[0];
  return (
    <div className={styles.plant_card_parent}>
      {
        todays_forecast.plantInfo.map((plant, index) => {
          const plantDescription = plant?.plantDescription;
          const plantindexInfo = plant?.indexInfo;
          if (plantDescription && plantindexInfo) {
            return (
              <Card key={index} className={styles.plant_card}>
                <div className={styles.plant_card_image_wrapper}>
                <Image 
                    src={plantDescription.picture} 
                    alt={plant.displayName} 
                    fill 
                    className={styles.plant_card_image}
                  />
                </div>
                <CardContent>
                  <h3 className={styles.plant_card_content}>{plant.displayName}</h3>
                  <p className={styles.plant_card_content}>Family: {plantDescription.family}</p>
                  <p className={styles.plant_card_content}>Season: {plantDescription.season}</p>
                  <p className={styles.plant_card_content}>{plantDescription.specialShapes}</p>
                  {plantindexInfo.value && (
                      <div className={styles.plant_card_content}>
                        <span>Allergy Potential:</span>
                        <div>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Brightness1Icon
                            key={i}  
                            sx = {{ color: i < plantindexInfo.value ? "red" : "gray" }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            );
          }
        })
      }
    </div>
  );
}


              // plants.map((plants,index) => {
              //     <Card key={index}>
              //     <div>
              //       <Image src={plant.imageUrl} alt={plant.name} fill/>
              //     </div>
              //     <CardContent>
              //       <h3>{plant.name}</h3>
              //       <p>{plant.scientificName}</p>
              //       <p>{plant.description}</p>
        

              //     </CardContent>
              //   </Card>
              // })