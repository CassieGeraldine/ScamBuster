"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Trophy, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

export function Dashboard() {
  const { t } = useLanguage()
  const [username, setUsername] = useState("")
  const [inputName, setInputName] = useState("")
  const userId = "demoUser" // Replace with real user ID if you have auth

  // Fetch username from Firestore on mount
  useEffect(() => {
    async function fetchUsername() {
      const userRef = doc(db, "users", userId)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
        setUsername(userSnap.data().username || "")
      }
    }
    fetchUsername()
  }, [])

  // Update username in Firestore
  async function handleChangeUsername() {
    if (!inputName.trim()) return
    const userRef = doc(db, "users", userId)
    await setDoc(userRef, { username: inputName }, { merge: true })
    setUsername(inputName)
    setInputName("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t("cyberguard")}</h1>
                <p className="text-sm text-muted-foreground">{t("learningPlatform")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <div className="flex items-center gap-2">
                <Badge>
                  <Trophy className="w-3 h-3 mr-1" />
                  1,250 pts
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold text-foreground mb-2">
            {t("welcomeBack")}{username}`
          </h2>
          <p className="text-muted-foreground text-lg">{t("continueJourney")}</p>
          <div className="mt-4 flex gap-2 items-center">
            <input
              type="text"
              value={inputName}
              onChange={e => setInputName(e.target.value)}
              placeholder="Enter your name"
              className="border rounded px-2 py-1"
            />
            <Button size="sm" onClick={handleChangeUsername}>
              Change Name
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              {t("yourProgress")}
            </CardTitle>
            <CardDescription>{t("progressDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>{t("overallProgress")}</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">{t("lessonsCompleted")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">8</div>
                  <div className="text-sm text-muted-foreground">{t("badgesEarned")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">3rd</div>
                  <div className="text-sm text-muted-foreground">{t("leaderboardRank")}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("recentActivity")}</CardTitle>
              <CardDescription>{t("recentActivityDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("phishingExpertBadge")}</p>
                  <p className="text-sm text-muted-foreground">{t("phishingExpertDescription")}</p>
                </div>
                <Badge>+200 pts</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t("smsScamLesson")}</p>
                  <p className="text-sm text-muted-foreground">{t("smsScamDescription")}</p>
                </div>
                <Badge>+150 pts</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("dailySecurityTip")}</CardTitle>
              <CardDescription>{t("dailyTipDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{t("verifyBeforeClick")}</h4>
                <p className="text-sm text-muted-foreground mb-3">{t("verifyTipContent")}</p>
                <Button size="sm" variant="outline">
                  {t("learnMore")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
