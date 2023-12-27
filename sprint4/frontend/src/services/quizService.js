import axios from "axios";
const baseUrl = "/api/v1/quiz";

const getNewQuiz = async (number, language) => {
  console.log("quizService", number, language);
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${baseUrl}/new-quiz`, {
    params: { number, language },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const postQuizResults = async (quizResult) => {
  console.log("quizService", quizResult);
  const token = localStorage.getItem("access_token");
  const response = await axios.post(`${baseUrl}/`, quizResult, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default { postQuizResults, getNewQuiz };
