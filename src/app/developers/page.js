import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./dev.module.css";

const developers = [
  {
    name: "Donovan Ester",
    role: "Fullstack Developer",
    bio: "I'm an experienced fullstack dev, I'm passionate about webdev and I like to bring unique perspective to every project i'm a part of!",
    image: "/avatar/donovan.jpg",
    github: "https://github.com/LordDredlam",
    linkedin: "https://www.linkedin.com/in/donovan-ester/",
  },
  {
    name: "Alejandro Patino Camargo",
    role: "Fullstack Developer",
    bio: "I help empower underrepresented communities through open source. I specialize in the backend, and love tinkering my neovim workflow.",
    image: "/avatar/alejandro.jpeg",
    github: "https://github.com/alejandroo-pc",
    linkedin: "https://www.linkedin.com/in/alejandropatinoc/",
  },
  {
    name: "Tianna Spears",
    role: "Frontend Developer",
    bio: "Frontend dev, currently learning Node / Express.js to become a fullstack dev. I'm passionate about making intentional change in marginalized communities.",
    image: "/avatar/tianna.png",
    github: "https://github.com/tianna-spears",
    linkedin: "https://www.linkedin.com/in/tiannasp/",
  },
];

export default function MeetTheDevs() {
  return (
    <main className={styles.container}>
      <div className={styles.textCenter}></div>
      <div className={styles.grid}>
        {developers.map((dev, index) => (
          <Card
            key={index}
            className={styles.card}
            sx={{
              borderRadius: "10px",
              boxShadow: "none",
              border: "1px solid #E4E4E7",
            }}
          >
            <div
              className={styles.imageContainer}
              style={{ borderTop: "1px solid #E4E4E7" }}
            >
              <Image
                src={dev.image || "/placeholder.svg"}
                alt={`Photo of ${dev.name}`}
                width={400}
                height={400}
                className={styles.image}
              />
            </div>
            <CardContent className={styles.cardContent}>
              <h2 className={styles.name}>{dev.name}</h2>
              <p className={styles.role}>{dev.role}</p>
              <p className={styles.bio}>{dev.bio}</p>

              <div className={styles.buttonContainer}>
                <Button
                  variant="outlined"
                  size="small"
                  className={styles.button}
                  sx={{
                    border: "1px solid #E4E4E7",
                    color: "black",
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  }}
                >
                  <Link
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className={styles.icon} />
                    LinkedIn
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  className={styles.button}
                  sx={{
                    border: "1px solid #E4E4E7",
                    color: "black",
                    "& .MuiSvgIcon-root": {
                      color: "black",
                    },
                  }}
                >
                  <Link
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className={styles.icon} />
                    GitHub
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
