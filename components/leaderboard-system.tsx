"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Crown, Star, Wifi, Gift, Users, Award, Zap } from "lucide-react"
import Link from "next/link"

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  points: number
  rank: number
  badges: number
  streak: number
  country: string
}

interface Reward {
  id: string
  name: string
  description: string
  cost: number
  type: "wifi" | "data" | "premium" | "badge"
  available: boolean
  claimed: boolean
}

const leaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/diverse-woman-avatar.png",
    points: 2850,
    rank: 1,
    badges: 15,
    streak: 12,
    country: "ZA",
  },
  {
    id: "2",
    name: "Michael Okafor",
    avatar: "/man-avatar.png",
    points: 2720,
    rank: 2,
    badges: 13,
    streak: 8,
    country: "ZA",
  },
  {
    id: "3",
    name: "Alex Johnson",
    avatar: "/diverse-person-avatars.png",
    points: 2650,
    rank: 3,
    badges: 12,
    streak: 15,
    country: "ZA",
  },
  {
    id: "4",
    name: "Priya Patel",
    avatar: "/woman-avatar-2.png",
    points: 2480,
    rank: 4,
    badges: 11,
    streak: 6,
    country: "ZA",
  },
  {
    id: "5",
    name: "David Williams",
    avatar: "/man-avatar-2.png",
    points: 2350,
    rank: 5,
    badges: 10,
    streak: 9,
    country: "ZA",
  },
]

const badgesData = [
  {
    id: "1",
    name: "Phishing Expert",
    description: "Complete all phishing detection lessons",
    icon: "🎣",
    rarity: "epic",
    points: 200,
    earned: true,
  },
  {
    id: "2",
    name: "SMS Guardian",
    description: "Master SMS scam identification",
    icon: "📱",
    rarity: "rare",
    points: 150,
    earned: true,
  },
  {
    id: "3",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "👶",
    rarity: "common",
    points: 50,
    earned: true,
  },
  {
    id: "4",
    name: "Streak Master",
    description: "Maintain a 7-day learning streak",
    icon: "🔥",
    rarity: "rare",
    points: 100,
    earned: true,
    progress: 7,
    maxProgress: 7,
  },
  {
    id: "5",
    name: "Social Engineer",
    description: "Complete social engineering course",
    icon: "🧠",
    rarity: "epic",
    points: 250,
    earned: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: "6",
    name: "Cyber Legend",
    description: "Earn 5000 total points",
    icon: "👑",
    rarity: "legendary",
    points: 500,
    earned: false,
    progress: 1250,
    maxProgress: 5000,
  },
]

const rewardsData = [
  {
    id: "1",
    name: "1GB Mall Wi-Fi",
    description: "Extra 1GB data for mall Wi-Fi networks",
    cost: 500,
    type: "wifi",
    available: true,
    claimed: false,
  },
  {
    id: "2",
    name: "2GB Mall Wi-Fi",
    description: "Extra 2GB data for mall Wi-Fi networks",
    cost: 900,
    type: "wifi",
    available: true,
    claimed: false,
  },
  {
    id: "3",
    name: "Premium Week",
    description: "7 days of premium features access",
    cost: 1200,
    type: "premium",
    available: true,
    claimed: false,
  },
  {
    id: "4",
    name: "5GB Data Bundle",
    description: "5GB mobile data bundle",
    cost: 1500,
    type: "data",
    available: true,
    claimed: false,
  },
  {
    id: "5",
    name: "Exclusive Badge",
    description: "Limited edition cybersecurity badge",
    cost: 800,
    type: "badge",
    available: true,
    claimed: true,
  },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-800 border-gray-300",
  rare: "bg-blue-100 text-blue-800 border-blue-300",
  epic: "bg-purple-100 text-purple-800 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-300",
}

const rankIcons = {
  1: <Crown className="w-6 h-6 text-yellow-500" />,
  2: <Medal className="w-6 h-6 text-gray-400" />,
  3: <Medal className="w-6 h-6 text-amber-600" />,
}

export function LeaderboardSystem() {
  const [activeTab, setActiveTab] = useState("leaderboard")
  const [timeframe, setTimeframe] = useState("weekly")

  const currentUser = {
    points: 1250,
    rank: 15,
    badges: 8,
    streak: 5,
  }

  const getRarityColor = (rarity: string) => {
    return rarityColors[rarity] || "bg-gray-100 text-gray-800 border-gray-300"
  }

  const getRankIcon = (rank: number) => {
    return rankIcons[rank] || <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">{rank}</span>
  }

  const claimReward = (rewardId: string) => {
    // In a real app, this would make an API call
    console.log(`Claiming reward ${rewardId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <span className="w-4 h-4 mr-2">←</span>
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                <Trophy className="w-3 h-3 mr-1" />
                Rank #{currentUser.rank}
              </span>
              <span className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                {currentUser.points} pts
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rewards & Leaderboard</h1>
          <p className="text-muted-foreground text-lg">
            Compete with others, earn badges, and unlock exclusive rewards
          </p>
        </div>

        {/* User Stats Overview */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{currentUser.points}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">#{currentUser.rank}</div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">{currentUser.badges}</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{currentUser.streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "leaderboard" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("leaderboard")}
            >
              <Users className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
            <Button
              variant={activeTab === "badges" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("badges")}
            >
              <Award className="w-4 h-4 mr-2" />
              Badges
            </Button>
            <Button
              variant={activeTab === "rewards" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("rewards")}
            >
              <Gift className="w-4 h-4 mr-2" />
              Rewards
            </Button>
          </div>
          {activeTab === "leaderboard" && (
            <div className="flex gap-2">
              <Button
                variant={timeframe === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={timeframe === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("monthly")}
              >
                Monthly
              </Button>
              <Button
                variant={timeframe === "alltime" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe("alltime")}
              >
                All Time
              </Button>
            </div>
          )}
        </div>

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top 3 Podium */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center items-end gap-4 mb-6">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-2 mx-auto overflow-hidden">
                      <img
                        src={leaderboardData[1].avatar || "/placeholder.svg"}
                        alt={leaderboardData[1].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg h-20 flex flex-col justify-center">
                      <Medal className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <div className="font-semibold text-sm">{leaderboardData[1].name}</div>
                      <div className="text-xs text-muted-foreground">{leaderboardData[1].points} pts</div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-200 rounded-full mb-2 mx-auto overflow-hidden border-4 border-yellow-400">
                      <img
                        src={leaderboardData[0].avatar || "/placeholder.svg"}
                        alt={leaderboardData[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg h-24 flex flex-col justify-center">
                      <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-1" />
                      <div className="font-bold">{leaderboardData[0].name}</div>
                      <div className="text-sm text-muted-foreground">{leaderboardData[0].points} pts</div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-200 rounded-full mb-2 mx-auto overflow-hidden">
                      <img
                        src={leaderboardData[2].avatar || "/placeholder.svg"}
                        alt={leaderboardData[2].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-amber-100 p-4 rounded-lg h-20 flex flex-col justify-center">
                      <Medal className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                      <div className="font-semibold text-sm">{leaderboardData[2].name}</div>
                      <div className="text-xs text-muted-foreground">{leaderboardData[2].points} pts</div>
                    </div>
                  </div>
                </div>

                {/* Full Leaderboard */}
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        index < 3 ? "bg-muted/50" : "bg-background"
                      } border`}
                    >
                      <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.badges} badges • {user.streak} day streak
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{user.points}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Next Rank</span>
                      <span>#{currentUser.rank - 1}</span>
                    </div>
                    <div className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                      <span className="w-4 h-4 mr-2">75%</span>
                      <span className="text-sm">150 points to go</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-secondary">+85</div>
                      <div className="text-xs text-muted-foreground">This Week</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-accent">12th</div>
                      <div className="text-xs text-muted-foreground">Best Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Users</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active This Week</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lessons Completed</span>
                    <span className="font-semibold">15,678</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badgesData.map((badge) => (
              <Card key={badge.id} className={`${badge.earned ? "border-primary/50 bg-primary/5" : "opacity-75"}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{badge.icon}</div>
                    <span
                      className={getRarityColor(badge.rarity)}
                      className="flex items-center gap-2 rounded-lg px-3 py-1"
                    >
                      {badge.rarity}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                  <CardDescription>{badge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reward</span>
                      <span className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        {badge.points} pts
                      </span>
                    </div>

                    {badge.progress !== undefined && badge.maxProgress && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>
                            {badge.progress}/{badge.maxProgress}
                          </span>
                        </div>
                        <div className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                          <span className="w-4 h-4 mr-2">70%</span>
                          <span className="text-sm">Progress</span>
                        </div>
                      </div>
                    )}

                    {badge.earned ? (
                      <span className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-lg px-3 py-1 w-full justify-center">
                        <Trophy className="w-3 h-3 mr-1" />
                        Earned
                      </span>
                    ) : (
                      <span className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1 w-full justify-center">
                        In Progress
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewardsData.map((reward) => (
              <Card key={reward.id} className={reward.claimed ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">
                      {reward.type === "wifi" && <Wifi className="w-8 h-8 text-blue-500" />}
                      {reward.type === "data" && <Zap className="w-8 h-8 text-green-500" />}
                      {reward.type === "premium" && <Crown className="w-8 h-8 text-purple-500" />}
                      {reward.type === "badge" && <Award className="w-8 h-8 text-yellow-500" />}
                    </div>
                    <span className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                      {reward.cost} pts
                    </span>
                  </div>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reward.claimed ? (
                      <span className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-lg px-3 py-1 w-full justify-center">
                        <Trophy className="w-3 h-3 mr-1" />
                        Claimed
                      </span>
                    ) : reward.available && currentUser.points >= reward.cost ? (
                      <Button onClick={() => claimReward(reward.id)} className="w-full">
                        <Gift className="w-4 h-4 mr-2" />
                        Claim Reward
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        {currentUser.points < reward.cost ? "Insufficient Points" : "Unavailable"}
                      </Button>
                    )}

                    {reward.type === "wifi" && (
                      <div className="text-xs text-muted-foreground p-2 bg-muted/50 rounded-lg">
                        Valid at participating mall Wi-Fi networks. Data expires in 30 days.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reward History */}
        {activeTab === "rewards" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Rewards</CardTitle>
              <CardDescription>Your claimed rewards and redemption history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-500" />
                  <div className="flex-1">
                    <p className="font-medium">Exclusive Badge</p>
                    <p className="text-sm text-muted-foreground">Claimed 2 days ago</p>
                  </div>
                  <span className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                    -800 pts
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Wifi className="w-6 h-6 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">1GB Mall Wi-Fi</p>
                    <p className="text-sm text-muted-foreground">Claimed 1 week ago</p>
                  </div>
                  <span className="bg-card text-card-foreground flex items-center gap-2 rounded-lg px-3 py-1">
                    -500 pts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
