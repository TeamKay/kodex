
import GameHeroLanding from "../_components/GameHeroLanding";

export default async function HomePage() {
  return (
    <>
      <GameHeroLanding/>
    </>
  );
}





// "use client"

// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"

// type Question = {
//   text: string
//   answer: number
// }

// export default function GamePage() {
//   const [sessionId, setSessionId] = useState<string | null>(null)
//   const [question, setQuestion] = useState<Question | null>(null)
//   const [userAnswer, setUserAnswer] = useState("")
//   const [score, setScore] = useState(0)
//   const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null)
//   const [count, setCount] = useState(0)

//   const TOTAL_QUESTIONS = 10
//   const OPERATION = "ADDITION"
//   const DIFFICULTY = "EASY"

//   // 🔢 Generate Question
//   function generateQuestion() {
//     const max = 10
//     const a = Math.floor(Math.random() * max)
//     const b = Math.floor(Math.random() * max)

//     return {
//       text: `${a} + ${b}`,
//       answer: a + b,
//     }
//   }

//   // 🎮 Start Game
//   useEffect(() => {
//     async function startGame() {
//       const res = await fetch("/api/game/start", {
//         method: "POST",
//         body: JSON.stringify({
//           operation: OPERATION,
//           difficulty: DIFFICULTY,
//           totalQuestions: TOTAL_QUESTIONS,
//         }),
//       })

//       const data = await res.json()
//       setSessionId(data.id)
//       setQuestion(generateQuestion())
//     }

//     startGame()
//   }, [])

//   // ✅ Submit Answer
//   async function submitAnswer() {
//     if (!question || !sessionId) return

//     const isCorrect = Number(userAnswer) === question.answer

//     setFeedback(isCorrect ? "correct" : "wrong")
//     if (isCorrect) setScore((s) => s + 10)

//     await fetch("/api/game/answer", {
//       method: "POST",
//       body: JSON.stringify({
//         sessionId,
//         question: question.text,
//         correctAnswer: question.answer,
//         userAnswer: Number(userAnswer),
//       }),
//     })

//     setTimeout(() => {
//       setFeedback(null)
//       setUserAnswer("")
//       setCount((c) => c + 1)

//       if (count + 1 < TOTAL_QUESTIONS) {
//         setQuestion(generateQuestion())
//       }
//     }, 800)
//   }

//   // 🏁 End Game
//   if (count >= TOTAL_QUESTIONS) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-sky-100">
//         <div className="rounded-xl bg-white p-8 text-center shadow-lg">
//           <h1 className="text-3xl font-bold">🎉 Great Job!</h1>
//           <p className="mt-4 text-xl">Score: {score}</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-sky-100">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
//       >
//         <h1 className="text-center text-2xl font-bold">➕ Math Game</h1>

//         <div className="mt-6 text-center text-4xl font-extrabold">
//           {question?.text}
//         </div>

//         <input
//           type="number"
//           value={userAnswer}
//           onChange={(e) => setUserAnswer(e.target.value)}
//           className="mt-6 w-full rounded-lg border p-3 text-center text-2xl"
//           placeholder="Your answer"
//         />

//         <button
//           onClick={submitAnswer}
//           className="mt-6 w-full rounded-lg bg-blue-500 py-3 text-xl font-bold text-white hover:bg-blue-600"
//         >
//           Submit
//         </button>

//         {feedback && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className={`mt-4 text-center text-xl font-bold ${
//               feedback === "correct" ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {feedback === "correct" ? "✅ Correct!" : "❌ Try Again!"}
//           </motion.div>
//         )}

//         <div className="mt-6 flex justify-between text-sm text-gray-600">
//           <span>Score: {score}</span>
//           <span>
//             Question {count + 1}/{TOTAL_QUESTIONS}
//           </span>
//         </div>
//       </motion.div>
//     </div>
//   )
// }