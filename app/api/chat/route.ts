import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { message, type } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Create context-aware prompt based on message type
    const systemPrompt = `You are a cybersecurity expert AI assistant helping users identify and avoid online scams, phishing attempts, and cyber threats. You should:

1. Analyze suspicious content (URLs, emails, SMS messages) for potential threats
2. Provide clear, actionable advice on cybersecurity best practices
3. Explain threats in simple, understandable language
4. Always prioritize user safety and security
5. Be supportive and educational, not alarmist

User's question type: ${type || "general"}
User's message: ${message}`

    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const text = response.text()

    // Analyze the content for risk level
    const riskLevel = analyzeRiskLevel(message, text)

    return NextResponse.json({
      message: text,
      riskLevel,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}

function analyzeRiskLevel(userMessage: string, aiResponse: string): "low" | "medium" | "high" {
  const highRiskKeywords = ["scam", "phishing", "malware", "dangerous", "avoid", "suspicious"]
  const mediumRiskKeywords = ["caution", "careful", "verify", "check"]

  const combinedText = (userMessage + " " + aiResponse).toLowerCase()

  if (highRiskKeywords.some((keyword) => combinedText.includes(keyword))) {
    return "high"
  } else if (mediumRiskKeywords.some((keyword) => combinedText.includes(keyword))) {
    return "medium"
  }
  return "low"
}
