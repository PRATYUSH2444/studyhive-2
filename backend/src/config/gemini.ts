import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const geminiFlash = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash'
})

export const geminiPro = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash'
})

export const generateContent = async (
  prompt: string,
  useFlash = true
): Promise<string> => {
  const model = geminiFlash
  let lastError: Error | null = null
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (error) {
      lastError = error as Error
      if (attempt < 3) {
        await new Promise(resolve => 
          setTimeout(resolve, 1000 * attempt))
      }
    }
  }
  throw new Error(`Failed after 3 retries: ${lastError?.message}`)
}

export default genAI
