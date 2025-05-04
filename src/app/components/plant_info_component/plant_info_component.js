import styles from "./plant_info_component.module.css";
import Image from "next/image"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

{/*  can't style until we get data */}

export default function PlantInfoComponent({ plants }) {
    if (plants.length === 0) {
        return <p>No plants in this category are currently affecting pollen levels.</p>
      }
    return (
        <div> 
            { 
                plants.map((plants,index) => {
                    <Card key={index}>
                    <div>
                      <Image src={plant.imageUrl} alt={plant.name} fill/>
                    </div>
                    <CardContent>
                      <h3>{plant.name}</h3>
                      <p>{plant.scientificName}</p>
                      <p>{plant.description}</p>
          
                      {plant.allergyLevel && (
                        <div>
                          <span>Allergy Potential:</span>
                          <div>
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mx-0.5 ${i < plant.allergyLevel ? "bg-red-500" : "bg-gray-200"}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                })
            }
        </div>
    );
}