import { authInstance } from "./axiosInstance";
const baseUrl = "/quiz";

const getNewQuiz = async (number, language) => {
  console.log("quizService", number, language);
  const response = await authInstance.get(`${baseUrl}/new-quiz`, {
    params: { number, language },
  });
  return response.data;
};

const postQuizResults = async (quizResult) => {
  const response = await authInstance.post(`${baseUrl}/`, quizResult);
  return response.data;
};

const getLatestQuizResults = async () => {
  console.log("quizService");
  const response = await authInstance.get(`${baseUrl}/latest`);
  return response;
};

export default { postQuizResults, getNewQuiz, getLatestQuizResults };
