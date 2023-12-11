// import finland from "./assets/images/finland.jpg";
import france from "./assets/images/france.jpg";
import russia from "./assets/images/russia.jpg";
import italy from "./assets/images/italy.jpg";
import japan from "./assets/images/japan.jpg";
import poland from "./assets/images/poland.jpg";
import hello from "./assets/images/hello.png";
import language2 from "./assets/images/language2.png";
import earth from "./assets/images/earth.png";
import finland_aurora from "./assets/images/finland_aurora.jpeg";
import finland_flag from "./assets/images/finland-flag.png";
import sweden_flag from "./assets/images/sweden-flag.png";
import france_flag from "./assets/images/france-flag.png";
import russia_flag from "./assets/images/russia-flag.png";
import italy_flag from "./assets/images/italy-flag.png";
import japan_flag from "./assets/images/japan-flag.png";
import poland_flag from "./assets/images/poland-flag.png";
import finland_map from "./assets/images/finland-map.png";
import france_map from "./assets/images/france-map.png";
import italy_map from "./assets/images/italy-map.png";
import poland_map from "./assets/images/poland-map.png";
import japan_map from "./assets/images/japan-map.png";
import russia_map from "./assets/images/russia-map.png";

export const countries = [
  {
    id: 1,
    name: "Finland",
    image: finland_aurora,
    languages: [
      {
        id : 1,
        languageName: "Finnish",
        icon: finland_flag,
      },
      {
        id : 2,
        languageName: "Swedish",
        icon: sweden_flag,
      }

    ],
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    map: finland_map,
  },
  {
    id: 2,
    name: "France",
    image: france,
    languages: [
      {
        id : 1,
        languageName: "French",
        icon: france_flag,
      }
    ],
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    map: france_map,
  },
  {
    id: 3,
    name: "Russia",
    image: russia,
    languages: [
      {
        id : 1,
        languageName: "Russian",
        icon: russia_flag,
      }
    ],
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    map: russia_map,
  },
  {
    id: 4,
    name: "Italy",
    image: italy,
    languages: [
      {
        id : 1,
        languageName: "Italian",
        icon: italy_flag,
      }
    ],
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    map: italy_map,
  },
  {
    id: 5,
    name: "Japan",
    image: japan,
    languages: [
      {
        id : 1,
        languageName: "Japanese",
        icon: japan_flag,
      }
    ],
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    map: japan_map,
  },
  {
    id: 6,
    name: "Poland",
    image: poland,
    languages: [
      {
        id : 1,
        languageName: "Polish",
        icon: poland_flag,
      }
    ],
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    map: poland_map,
  },
];

export const welcomeSection = [
  {
    id: 1,
    name: "Hello",
    image: hello,
    title: "Your fast way to communicate with locals!",
    paragraph:
      "Welcome to ReactSpeak – your passport to global adventures! Immerse yourself in the joy of travel with the fastest way to connect with locals. Whether you're ordering a delightful espresso at a café, exploring local markets, or navigating the city's culinary delights, ReactSpeak is your linguistic wingman. Unleash the art of communication and savor every moment as you effortlessly converse with newfound friends and experience the world like a local. Your journey begins here – ReactSpeak, making every café encounter a delightful linguistic adventure!",
  },
  {
    id: 2,
    name: "language learning",
    image: earth,
    title: "Free. Effective. Fun.",
    paragraph:
      "ReactSpeak is a free, effective, and fun way to learn a new language. Our app is designed to help you learn a new language in a way that is easy and fun.",
  },
  {
    id: 3,
    name: "Hello",
    image: language2,
    title: "Learn a new language in 3 easy steps!",
    paragraph:
      "1. Select a destination. 2. Select a language. 3. Start learning!",
  },
];
