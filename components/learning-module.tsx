"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, CheckCircle, Lock, Star, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { LessonViewer } from "./lesson-viewer"
import { useLanguage } from "@/contexts/language-context"

const learningPaths = [
  {
    id: "phishing",
    title: "Phishing Detection",
    description: "Learn to identify and avoid phishing attacks",
    difficulty: "Beginner",
    duration: "15 min",
    points: 200,
    completed: true,
    lessons: 4,
    progress: 100,
  },
  {
    id: "sms-scams",
    title: "SMS Scam Awareness",
    description: "Recognize fake SMS messages and scam calls",
    difficulty: "Beginner",
    duration: "12 min",
    points: 150,
    completed: true,
    lessons: 3,
    progress: 100,
  },
  {
    id: "social-engineering",
    title: "Social Engineering",
    description: "Understand psychological manipulation tactics",
    difficulty: "Intermediate",
    duration: "20 min",
    points: 300,
    completed: false,
    lessons: 5,
    progress: 60,
  },
  {
    id: "password-security",
    title: "Password Security",
    description: "Create and manage strong passwords",
    difficulty: "Beginner",
    duration: "10 min",
    points: 100,
    completed: false,
    lessons: 3,
    progress: 0,
  },
  {
    id: "wifi-security",
    title: "Wi-Fi Safety",
    description: "Stay safe on public and private networks",
    difficulty: "Intermediate",
    duration: "18 min",
    points: 250,
    completed: false,
    lessons: 4,
    progress: 0,
    locked: true,
  },
  {
    id: "advanced-threats",
    title: "Advanced Threats",
    description: "Malware, ransomware, and advanced attacks",
    difficulty: "Advanced",
    duration: "25 min",
    points: 400,
    completed: false,
    lessons: 6,
    progress: 0,
    locked: true,
  },
]

export function LearningModule() {
  const { t } = useLanguage()
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  if (selectedLesson) {
    return <LessonViewer lessonId={selectedLesson} onBack={() => setSelectedLesson(null)} />
  }

  const completedPaths = learningPaths.filter((path) => path.completed).length
  const totalPoints = learningPaths.filter((path) => path.completed).reduce((sum, path) => sum + path.points, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("backToDashboard")}
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Trophy className="w-3 h-3 mr-1" />
                {totalPoints} pts earned
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Learning Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t("learningPaths")}</h1>
          <p className="text-muted-foreground text-lg mb-6">{t("learningPathsDescription")}</p>

          {/* Progress Summary */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{completedPaths}</div>
                  <div className="text-sm text-muted-foreground">{t("pathsCompleted")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{totalPoints}</div>
                  <div className="text-sm text-muted-foreground">{t("pointsEarned")}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {Math.round((completedPaths / learningPaths.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">{t("overallProgress")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className={`hover:shadow-lg transition-all cursor-pointer group ${path.locked ? "opacity-60" : ""}`}
              onClick={() => !path.locked && setSelectedLesson(path.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      {path.locked && <Lock className="w-4 h-4 text-muted-foreground" />}
                      {path.completed && <CheckCircle className="w-4 h-4 text-primary" />}
                    </div>
                    <CardDescription className="text-sm">{path.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Badge
                    variant={
                      path.difficulty === "Beginner"
                        ? "secondary"
                        : path.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {path.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {path.duration}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {path.points} pts
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{path.lessons} lessons</span>
                    <span className="font-medium">{path.progress}% complete</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />

                  <div className="flex items-center justify-between pt-2">
                    {path.locked ? (
                      <Button disabled size="sm" className="w-full">
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </Button>
                    ) : path.completed ? (
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                    ) : path.progress > 0 ? (
                      <Button size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Continue
                      </Button>
                    ) : (
                      <Button size="sm" className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("recentAchievements")}</CardTitle>
            <CardDescription>{t("achievementsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-sm font-medium">{t("phishingExpert")}</div>
                <div className="text-xs text-muted-foreground">{t("phishingExpertDescription")}</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div className="text-sm font-medium">{t("smsGuardian")}</div>
                <div className="text-xs text-muted-foreground">{t("smsGuardianDescription")}</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg opacity-60">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-sm font-medium">{t("socialEngineer")}</div>
                <div className="text-xs text-muted-foreground">{t("socialEngineerDescription")}</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg opacity-60">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-sm font-medium">{t("passwordPro")}</div>
                <div className="text-xs text-muted-foreground">{t("passwordProDescription")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
