import { useState, useEffect } from "react";
import Card from "../../components/LearningCard/Card";

const words = [
  {
    phrase: "Hello",
    translations: ["Xin chào", "Xin chào bạn", "Tạm biệt", "Cảm ơn"],
    correctTranslation: "Xin chào",
  },
  {
    phrase: "Goodbye",
    translations: ["Tạm biệt", "Chào tạm biệt", "Hẹn gặp lại"],
    correctTranslation: "Tạm biệt",
  },
  {
    phrase: "Thank you",
    translations: ["Cảm ơn", "Cảm ơn bạn", "Cảm ơn nhiều"],
    correctTranslation: "Cảm ơn",
  },
  {
    phrase: "Sorry",
    translations: ["Xin lỗi", "Lỗi rồi", "Thật xin lỗi"],
    correctTranslation: "Xin lỗi",
  },
  {
    phrase: "Yes",
    translations: ["Vâng", "Đúng", "Ừ"],
    correctTranslation: "Vâng",
  },
];

const StudyView = () => {
  const [activeWord, setActiveWord] = useState(0);
  const [correctTranslation, setCorrectTranslation] = useState("");
  const [translationSelected, setTranslationSelected] = useState("");

  useEffect(() => {
    if (correctTranslation === "") {
      return;
    }
    if (translationSelected === correctTranslation) {
      console.log("Correct");
      setActiveWord(activeWord + 1);
    } else {
      console.log("Incorrect");
    }
  }, [correctTranslation, translationSelected]);

  return (
    <div>
      <Card
        {...words[activeWord]}
        setCorrectTranslation={setCorrectTranslation}
        setTranslationSelected={setTranslationSelected}
      />
    </div>
  );
};

export default StudyView;
