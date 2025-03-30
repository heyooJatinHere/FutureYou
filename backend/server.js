import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model=genAI.getGenerativeModel({model:"gemini-2.0-flash"});

app.post("/submit-answers", async (req, res) => {
    try {
        const answers = req.body;

        const prompt = `You are an AI-powered future prediction system designed to help users visualize their future based on their current habits and preferences. The user has answered the following questions with their raw responses:

1. How often do you engage in physical activity (like walking, running, or gym) each week? Answer: ${answers[0]}
2. How would you describe your eating habits? Answer: ${answers[1]}
3. How many hours of sleep do you typically get per night? Answer: ${answers[2]}
4. What percentage of your monthly income do you save or invest? Answer: ${answers[3]}
5. How often do you spend on non-essential items (like gadgets, dining out, or luxury purchases)? Answer: ${answers[4]}
6. Do you currently have any debt (like loans, credit card debt)? Answer: ${answers[5]}
7. What’s your primary goal for your career in the next 10 years? Answer: ${answers[6]}
8. How many hours do you typically work or study each week? Answer: ${answers[7]}
9. How often do you set and review personal goals (like fitness, finance, or career goals)? Answer: ${answers[8]}
10. How optimistic are you about achieving your future dreams? Answer: ${answers[9]}

### Instructions:
1. Analyze the user's raw answers and predict their future in 10 years, focusing on the following areas:
   - **Health**: Predict their physical and mental health based on their answers to questions 1 (physical activity), 2 (eating habits), and 3 (sleep). Consider the long-term impact of these habits.
   - **Financial Status**: Predict their financial situation, including savings, debt, and overall stability, based on their answers to questions 4 (savings), 5 (spending), and 6 (debt). Provide an estimated savings amount if possible.
   - **Career and Lifestyle**: Predict their career progress and overall lifestyle, considering their answers to questions 7 (career goal), 8 (work hours), 9 (goal setting), and 10 (optimism). Discuss work-life balance and fulfillment.
2. Use a motivational and realistic tone, speaking directly to the user as if guiding them toward a better future.
3. After the predictions, provide a **Recommendations** section with 3-5 actionable tips to improve their future outcomes, focusing on areas where they can improve based on their answers.
4. Keep the response concise, around 150-200 words total.
5. Avoid playful nicknames or metaphors (e.g., "Mental Health Rockstar"). Focus on clear, direct predictions and advice.

### Output Format:
**Health:** [Prediction for health in 10 years]  
**Financial Status:** [Prediction for financial status in 10 years]  
**Career and Lifestyle:** [Prediction for career and lifestyle in 10 years]  
**Recommendations:** [3-5 actionable tips to improve their future]`;

        const result=await model.generateContent(prompt);
        const response=result.response.text().trim();

        res.json({message: "Answer recieved...", analysis: response});

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
