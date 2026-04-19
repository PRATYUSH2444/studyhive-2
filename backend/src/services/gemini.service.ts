import { generateContent } from '../config/gemini'

export const geminiService = {
  generateQuestion: async (params: {
    subject: string
    concept: string
    difficulty: number
    examTarget: string
    questionType: string
    errorDNA?: any[]
    avoidConcepts?: string[]
  }) => {
    const errorDNASummary = params.errorDNA?.map(e => e.name).join(', ') || 'None'
    const avoidConcepts = params.avoidConcepts?.join(', ') || 'None'

    const systemPrompt = `You are an expert question setter for Indian competitive exams (JEE, NEET, UPSC, CAT). Generate exactly ONE high-quality multiple choice question. Return ONLY valid JSON, no markdown.

Format:
{
  "text": "question text here",
  "options": ["A option", "B option", "C option", "D option"],
  "correctIndex": 0,
  "explanation": "detailed step-by-step explanation",
  "concept": "specific concept tested",
  "difficulty": 3,
  "timeLimit": 90,
  "examFrequency": 75
}`

    const userPrompt = `${systemPrompt}\n\nGenerate a ${params.difficulty}/5 difficulty ${params.questionType} question about ${params.concept} in ${params.subject} for ${params.examTarget}.
The student's known error patterns: ${errorDNASummary}
Avoid these concepts they already mastered: ${avoidConcepts}
Make it exam-realistic and tricky but fair.`

    const result = await generateContent(userPrompt, true)
    // Safe JSON parsing
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  generateARIAResponse: async (params: {
    message: string
    studentProfile: any
    conversationHistory: any[]
    mode: 'strict' | 'supportive' | 'socratic' | 'strategist'
  }) => {
    const p = params.studentProfile
    let modePrompt = ''
    if (params.mode === 'strict') {
      modePrompt = `You are ARIA, a brutally honest AI academic coach.
You are direct, data-driven, no sugarcoating. You call out
bad habits immediately. You speak like a drill sergeant who
genuinely wants the student to succeed.`
    } else if (params.mode === 'supportive') {
      modePrompt = `You are ARIA, an empathetic AI mentor.
You celebrate every win, no matter how small. You acknowledge
struggle before pushing forward. You speak like a brilliant
older sibling who has already cracked the exam.`
    } else if (params.mode === 'socratic') {
      modePrompt = `You are ARIA, a Socratic AI teacher.
You NEVER give direct answers. You only ask questions that
lead the student to discover answers themselves. Every 
response ends with a question.`
    } else if (params.mode === 'strategist') {
      modePrompt = `You are ARIA, a pure marks-maximization machine. You care only about exam strategy, not deep learning. You optimize for percentile, not understanding. You speak like a chess grandmaster planning moves.`
    }

    const weakTopicsList = p.weakTopics?.map((w: any) => w.concept).join(', ') || 'None'
    const errorPatternNames = p.recentErrors?.map((e: any) => e.name).join(', ') || 'None'
    const history = params.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')

    const contextPrompt = `
${modePrompt}

Student: ${p.name}, targeting ${p.examTarget} in ${p.daysToExam} days.
Current accuracy: ${p.accuracy}%, Projected: ${p.projectedPercentile}%ile.
Weak topics: ${weakTopicsList}.
Recent errors: ${errorPatternNames}.
Streak: ${p.streak} days.
Peak performance: ${p.peakWindow}.
Conversation history: ${history}.

You have access to their complete academic history.
Reference specific data points in your response.
Keep responses under 200 words unless explaining a concept.
Use markdown for math formulas when needed.

Return ONLY valid JSON:
{ "response": "your response string", "suggestedFollowUps": ["Q1", "Q2"] }`

    const promptObj = `${contextPrompt}\n\nStudent message: ${params.message}`
    const result = await generateContent(promptObj, true)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  generateDailyBrief: async (profile: any, yesterdayStats: any, todaySchedule: any) => {
    const prompt = `Generate a 3-sentence personalized morning brief for ${profile.name}.
Yesterday: solved ${yesterdayStats.count} questions, accuracy ${yesterdayStats.accuracy}%.
Today's schedule: ${todaySchedule.subjects}.
Days to exam: ${profile.daysToExam}.
Mention their specific weak area that needs attention today.
End with one actionable insight.
Return ONLY valid JSON: { "brief": "string", "urgentTopic": "string", "motivationalInsight": "string", "tasks": [] }`
    
    const result = await generateContent(prompt, true)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  analyzeAnswer: async (params: { question: any, userAnswer: string, correctAnswer: string, timeSpent: number, studentHistory: any }) => {
    const prompt = `Analyze this wrong answer and identify the cognitive error.
Question: ${JSON.stringify(params.question)}
Student answered: ${params.userAnswer} (wrong)
Correct: ${params.correctAnswer}
Time spent: ${params.timeSpent} seconds
Student's known error patterns: ${JSON.stringify(params.studentHistory.patterns || [])}

Return ONLY valid JSON:
{
  "errorType": "string (name the specific cognitive error)",
  "explanation": "string (why they got it wrong)",
  "conceptGap": "string (underlying knowledge gap)",
  "fixStrategy": "string (how to avoid this in future)",
  "isNewPattern": true/false,
  "relatedConcepts": ["string"]
}`

    const result = await generateContent(prompt, false)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  generateCrashPlan: async (params: { days: number, weakTopics: any, hours: number, examTarget: string }) => {
    const prompt = `Create a ${params.days}-day intensive study crash plan.
Weak topics: ${JSON.stringify(params.weakTopics)}
Available: ${params.hours} hours/day
Exam: ${params.examTarget}

Return ONLY valid JSON:
{
  "plan": [{
    "day": 1,
    "date": "string",
    "sessions": [{
      "subject": "string",
      "topic": "string",
      "duration": 60,
      "type": "learn",
      "priority": "high",
      "specificFocus": "string"
    }]
  }],
  "keyInsight": "string",
  "successProbability": 85
}`
    const result = await generateContent(prompt, false)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  generateExamPaper: async (params: { examTarget: string, topics: string[], difficulty: number, duration: number, questionCount: number }) => {
    const questions = []
    for (let i = 0; i < params.questionCount; i++) {
        // Simple uniform distribution across topics
        const topic = params.topics[i % params.topics.length]
        const q = await geminiService.generateQuestion({
            subject: 'General', 
            concept: topic,
            difficulty: params.difficulty,
            examTarget: params.examTarget,
            questionType: 'numerical'
        })
        questions.push(q)
    }
    return questions
  },

  processPDFContent: async (params: { extractedText: string, subject: string, examTarget: string }) => {
    const prompt = `You are given extracted text from a textbook/notes.
Subject: ${params.subject}, Exam: ${params.examTarget}

Text to extract and structure:
${params.extractedText.substring(0, 10000)} // Truncated for safety

Return ONLY valid JSON:
{
  "title": "string",
  "summary": "string (3-4 sentences, exam-focused)",
  "keyFormulas": [{ "formula": "string", "description": "string" }],
  "importantConcepts": [{ "concept": "string", "explanation": "string" }],
  "memorySuggestions": ["string"],
  "potentialQuestions": ["string"]
}`
    const result = await generateContent(prompt, false)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  generateMindMap: async (params: { chapter: string, subject: string, examTarget: string, studentMastery?: any }) => {
    const prompt = `Generate a complete mind map for ${params.chapter} in ${params.subject}.
Return ONLY valid JSON:
{
  "rootNode": "string",
  "branches": [{
    "topic": "string",
    "subtopics": [{
      "name": "string",
      "mastery": "mastered",
      "examWeight": 8
    }]
  }]
}`
    const result = await generateContent(prompt, true)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  predictScoreImprovement: async (params: { currentAccuracy: number, weakTopics: any, studyPlan: any, daysRemaining: number }) => {
    const prompt = `Based on the student's current trajectory and proposed study plan, predict percentile improvement.
Current accuracy: ${params.currentAccuracy}%
Days: ${params.daysRemaining}

Return ONLY valid JSON:
{
  "currentProjected": 85.5,
  "afterPlanProjected": 92.0,
  "confidence": 88,
  "keyDrivers": ["string"],
  "risks": ["string"]
}`
    const result = await generateContent(prompt, false)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  },

  generateFlashcards: async (params: { noteContent: string, subject: string, count: number }) => {
    const prompt = `Generate ${params.count} spaced repetition flashcards from this content.
Content: ${params.noteContent}
Subject: ${params.subject}

Return ONLY valid JSON array:
[{
  "front": "string (question/prompt)",
  "back": "string (answer/explanation)",
  "difficulty": 3,
  "tags": ["string"]
}]`
    const result = await generateContent(prompt, true)
    const jsonStr = result.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(jsonStr)
  }
}
