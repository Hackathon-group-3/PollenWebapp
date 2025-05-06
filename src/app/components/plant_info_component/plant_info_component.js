import styles from "./plant_info_component.module.css";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React, { useState, useRef, useEffect } from "react";

export default function PlantInfoComponent({ forecastData: forecast }) {
  const [scrollposition, setScrollPosition] = useState(0);
  const SCROLL_WIDTH = 585;
  const scrollRef = useRef(null);
  let scrollmultiplier = -1;

  const handle_scroll = (ScrollAmount) => {
    let new_scroll_position = scrollposition - ScrollAmount;
    if (new_scroll_position < 0) {
      new_scroll_position = 0;
    } else if (scrollmultiplier * SCROLL_WIDTH < new_scroll_position) {
      new_scroll_position = scrollmultiplier * SCROLL_WIDTH;
    }
    console.log(new_scroll_position);
    setScrollPosition(new_scroll_position);
    scrollRef.current.scrollLeft = new_scroll_position;
  };

  const todays_forecast = forecast[0];
  return (
    <div className={styles.card_overparent}>
      <div className={styles.plant_card_parent} ref={scrollRef}>
        {todays_forecast.plantInfo.map((plant, index) => {
          const plantDescription = plant?.plantDescription;
          const plantindexInfo = plant?.indexInfo;
          if (plantDescription && plantindexInfo) {
            scrollmultiplier++;
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
                  <h3 className={styles.plant_card_content}>
                    {plant.displayName}
                  </h3>
                  <p className={styles.genus}>{plantDescription.family}</p>
                  <p className={styles.plant_card_content}>
                    {plantDescription.specialShapes}
                  </p>
                  {plantindexInfo.value && (
                    <div
                      style={{ marginTop: "3rem" }}
                      className={styles.plant_card_content}
                    >
                      <span>Allergy Potential:</span>
                      <div>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Brightness1Icon
                            key={i}
                            sx={{
                              color: i < plantindexInfo.value ? "red" : "gray",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          }
        })}
      </div>
      <div className={styles.button_container}>
        <Button
          className={styles.Card_ScrollButton}
          onClick={() => handle_scroll(SCROLL_WIDTH)}
        >
          <ArrowCircleLeftIcon className={styles.Card_ScrollIcon} />
        </Button>
        <Button
          className={styles.Card_ScrollButton}
          onClick={() => handle_scroll(-SCROLL_WIDTH)}
        >
          <ArrowCircleRightIcon className={styles.Card_ScrollIcon} />
        </Button>
      </div>
    </div>
  );
}
