import { authInstance } from "./axiosInstance";
const baseUrl = "/quiz";

const getNewQuiz = async (number, language) => {
  console.log("quizService", number, language);
  const response = await authInstance.get(`${baseUrl}/new-quiz`, {
    params: { number, language },
  });
  return response.data;
};

const sendResults = async ({ quizResult }) => {
  const response = await authInstance.post(`${baseUrl}/`, quizResult);
  return response.data;
};

export default { sendResults, getNewQuiz };
