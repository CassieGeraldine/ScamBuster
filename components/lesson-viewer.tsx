"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Shield, Trophy } from "lucide-react"

interface LessonViewerProps {
  lessonId: string
  onBack: () => void
}

const lessonContent = {
  phishing: {
    title: "Phishing Detection Mastery",
    description: "Learn to identify and avoid phishing attacks",
    lessons: [
      {
        id: 1,
        title: "What is Phishing?",
        type: "content",
        content: {
          text: "Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information like passwords, credit card numbers, or personal data.",
          keyPoints: [
            "Attackers use fake emails, websites, or messages",
            "They create urgency to make you act quickly",
            "Always verify the sender before clicking links",
            "Look for spelling mistakes and suspicious URLs",
          ],
          example: 'A fake bank email asking you to "verify your account immediately" with a suspicious link.',
        },
      },
      {
        id: 2,
        title: "Identifying Phishing Emails",
        type: "interactive",
        content: {
          scenario: "You receive an email claiming to be from your bank. Examine the email and identify the red flags.",
          email: {
            from: "security@yourbankk.com",
            subject: "URGENT: Account Suspended - Verify Now!",
            body: "Dear Valued Customer,\n\nYour account has been suspended due to suspicious activity. Click here immediately to verify your identity and restore access:\n\nhttp://verify-account-now.suspicious-site.com\n\nFailure to act within 24 hours will result in permanent account closure.\n\nBest Regards,\nSecurity Team",
          },
          redFlags: [
            "Misspelled domain (yourbankk.com)",
            "Creates false urgency",
            "Suspicious URL",
            "Generic greeting",
            "Threatens account closure",
          ],
        },
      },
      {
        id: 3,
        title: "Quiz: Phishing Detection",
        type: "quiz",
        questions: [
          {
            question: "Which of these is a common sign of a phishing email?",
            options: [
              "Professional formatting",
              "Urgent language demanding immediate action",
              "Personalized greeting with your name",
              "Official company logo",
            ],
            correct: 1,
            explanation: "Phishing emails often create false urgency to pressure you into acting without thinking.",
          },
          {
            question: "What should you do if you receive a suspicious email from your bank?",
            options: [
              "Click the link to check if it's real",
              "Reply to ask if it's legitimate",
              "Contact your bank directly through official channels",
              "Forward it to friends to ask their opinion",
            ],
            correct: 2,
            explanation:
              "Always contact the organization directly through official channels to verify suspicious communications.",
          },
        ],
      },
    ],
  },
}

function QuizComponent({ questions, onComplete }: { questions: any[]; onComplete: (score: number) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++
      }
    })
    return Math.round((correct / questions.length) * 100)
  }

  const handleComplete = () => {
    const score = calculateScore()
    onComplete(score)
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription>You scored {score}% on this quiz</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{score}%</div>
          <div className="space-y-2">
            {questions.map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Question {index + 1}</span>
                {selectedAnswers[index] === question.correct ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                )}
              </div>
            ))}
          </div>
          <Button onClick={handleComplete} className="w-full">
            Continue Learning
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <Badge variant="outline">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-32 h-2" />
        </div>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option: string, index: number) => (
            <Button
              key={index}
              variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
              className="w-full text-left justify-start h-auto p-4"
              onClick={() => handleAnswer(index)}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-3 h-3 bg-primary-foreground rounded-full" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {selectedAnswers[currentQuestion] !== undefined && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}

        <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === undefined} className="w-full">
          {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

export function LessonViewer({ lessonId, onBack }: LessonViewerProps) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])

  const content = lessonContent[lessonId as keyof typeof lessonContent]
  if (!content) return null

  const lesson = content.lessons[currentLesson]
  const progress = ((currentLesson + 1) / content.lessons.length) * 100

  const handleLessonComplete = (score?: number) => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson])
    }

    if (currentLesson < content.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    } else {
      // Course completed
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">
                Lesson {currentLesson + 1} of {content.lessons.length}
              </Badge>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{content.title}</h1>
            <p className="text-muted-foreground">{content.description}</p>
          </div>

          {lesson.type === "content" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed">{lesson.content.text}</p>

                <div>
                  <h3 className="font-semibold mb-3">Key Points to Remember:</h3>
                  <ul className="space-y-2">
                    {lesson.content.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {lesson.content.example && (
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                    <h4 className="font-semibold mb-2">Example:</h4>
                    <p className="text-muted-foreground">{lesson.content.example}</p>
                  </div>
                )}

                <Button onClick={() => handleLessonComplete()} className="w-full">
                  Continue to Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {lesson.type === "interactive" && (
            <Card>
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.content.scenario}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <div className="space-y-2 mb-4">
                    <div>
                      <strong>From:</strong> {lesson.content.email.from}
                    </div>
                    <div>
                      <strong>Subject:</strong> {lesson.content.email.subject}
                    </div>
                  </div>
                  <div className="whitespace-pre-line text-sm bg-background p-4 rounded border">
                    {lesson.content.email.body}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-destructive">Red Flags Identified:</h3>
                  <ul className="space-y-2">
                    {lesson.content.redFlags.map((flag: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button onClick={() => handleLessonComplete()} className="w-full">
                  Continue to Quiz
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {lesson.type === "quiz" && <QuizComponent questions={lesson.questions} onComplete={handleLessonComplete} />}
        </div>
      </main>
    </div>
  )
}
