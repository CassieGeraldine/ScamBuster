"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  Copy,
  Scan,
  Globe,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react"
import Link from "next/link"

interface ScanResult {
  type: "url" | "email" | "sms" | "phone"
  content: string
  riskLevel: "safe" | "suspicious" | "dangerous"
  score: number
  threats: string[]
  recommendations: string[]
  details: {
    domain?: string
    ssl?: boolean
    reputation?: string
    blacklisted?: boolean
    phishingIndicators?: string[]
  }
}

const recentScans = [
  {
    id: "1",
    type: "url" as const,
    content: "https://secure-banking-update.com/verify",
    riskLevel: "dangerous" as const,
    timestamp: "2 hours ago",
    threats: ["Phishing attempt", "Fake banking site"],
  },
  {
    id: "2",
    type: "email" as const,
    content: "Congratulations! You've won $1000...",
    riskLevel: "suspicious" as const,
    timestamp: "5 hours ago",
    threats: ["Lottery scam", "Suspicious sender"],
  },
  {
    id: "3",
    type: "url" as const,
    content: "https://github.com/vercel/next.js",
    riskLevel: "safe" as const,
    timestamp: "1 day ago",
    threats: [],
  },
]

export function ScamDetector() {
  const [activeTab, setActiveTab] = useState("url")
  const [inputValue, setInputValue] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  const performScan = async (content: string, type: "url" | "email" | "sms" | "phone") => {
    setIsScanning(true)
    setScanResult(null)

    if (type === "url") {
      try {
        const response = await fetch("https://api.stalkphish.io/v2/scan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If you have an API key: "x-api-key": "YOUR_API_KEY"
          },
          body: JSON.stringify({ url: content })
        })
        const data = await response.json()
        console.debug("StalkPhish API response:", data)

        // Map StalkPhish response to ScanResult
        const result: ScanResult = {
          type,
          content,
          riskLevel:
            data.status === "malicious"
              ? "dangerous"
              : data.status === "suspicious"
              ? "suspicious"
              : "safe",
          score: typeof data.score === "number" ? data.score : (data.risk_score || 0),
          threats:
            Array.isArray(data.threats) && data.threats.length > 0
              ? data.threats
              : data.status === "malicious"
              ? ["Phishing detected", ...(data.indicators || [])]
              : [],
          recommendations:
            Array.isArray(data.recommendations) && data.recommendations.length > 0
              ? data.recommendations
              : data.status === "malicious"
              ? ["Do not visit this site", "Report to authorities"]
              : ["Site appears safe"],
          details: {
            domain: data.domain || (data.url ? new URL(data.url).hostname : undefined),
            ssl: typeof data.ssl_valid === "boolean" ? data.ssl_valid : undefined,
            reputation: data.reputation || (data.status === "malicious" ? "Poor" : "Good"),
            blacklisted: typeof data.blacklisted === "boolean" ? data.blacklisted : undefined,
            phishingIndicators: Array.isArray(data.indicators) ? data.indicators : [],
          },
        }
        setScanResult(result)
      } catch (error) {
        setScanResult({
          type,
          content,
          riskLevel: "suspicious",
          score: 0,
          threats: ["Could not reach StalkPhish API"],
          recommendations: ["Try again later or check your network connection."],
          details: {},
        })
      }
      setIsScanning(false)
      return
    }

    // Fallback for other types (email, sms, phone): use previous mock logic
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const lowerContent = content.toLowerCase()
    let result: ScanResult
    if (type === "email") {
      if (
        lowerContent.includes("urgent") ||
        lowerContent.includes("winner") ||
        lowerContent.includes("congratulations") ||
        lowerContent.includes("verify account") ||
        lowerContent.includes("suspended")
      ) {
        result = {
          type,
          content,
          riskLevel: "suspicious",
          score: 70,
          threats: ["Potential phishing email", "Suspicious language patterns", "Urgency tactics"],
          recommendations: [
            "Do not click any links in this email",
            "Verify sender through official channels",
            "Report as spam/phishing",
            "Delete the email",
          ],
          details: {
            phishingIndicators: ["Urgent language", "Generic greeting", "Suspicious sender domain"],
          },
        }
      } else {
        result = {
          type,
          content,
          riskLevel: "safe",
          score: 25,
          threats: [],
          recommendations: [
            "Email appears legitimate",
            "Still verify sender if requesting sensitive information",
            "Be cautious with attachments",
          ],
          details: {},
        }
      }
    } else {
      // SMS or Phone
      if (
        lowerContent.includes("click") ||
        lowerContent.includes("urgent") ||
        lowerContent.includes("verify") ||
        lowerContent.includes("winner") ||
        lowerContent.includes("prize")
      ) {
        result = {
          type,
          content,
          riskLevel: "suspicious",
          score: 65,
          threats: ["SMS scam detected", "Suspicious links", "Social engineering attempt"],
          recommendations: [
            "Do not click any links",
            "Do not reply to this message",
            "Block the sender",
            "Report to your carrier",
          ],
          details: {},
        }
      } else {
        result = {
          type,
          content,
          riskLevel: "safe",
          score: 20,
          threats: [],
          recommendations: [
            "Message appears safe",
            "Be cautious with unknown senders",
            "Verify identity before sharing information",
          ],
          details: {},
        }
      }
    }
    setScanResult(result)
    setIsScanning(false)
  }

  const handleScan = () => {
    if (!inputValue.trim()) return
    performScan(inputValue, activeTab as any)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "text-green-600"
      case "suspicious":
        return "text-yellow-600"
      case "dangerous":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "suspicious":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "dangerous":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Shield className="w-5 h-5" />
    }
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
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                <Scan className="w-3 h-3 mr-1" />
                Scam Detector
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Scam Detection & Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Analyze URLs, emails, SMS messages, and phone numbers for potential security threats
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scanner */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Scanner
                </CardTitle>
                <CardDescription>
                  Paste or type content below to check for potential scams and security threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="url" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="sms" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      SMS
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Website URL</label>
                      <Input
                        placeholder="https://example.com or paste suspicious link"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Content</label>
                      <Textarea
                        placeholder="Paste the email content, subject line, or sender address"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="sms" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">SMS Message</label>
                      <Textarea
                        placeholder="Paste the SMS message content"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone Number</label>
                      <Input
                        placeholder="+1234567890 or phone number to check"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <Button onClick={handleScan} disabled={!inputValue.trim() || isScanning} className="w-full mt-4">
                    {isScanning ? (
                      <>
                        <Scan className="w-4 h-4 mr-2 animate-spin" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Scan className="w-4 h-4 mr-2" />
                        Scan for Threats
                      </>
                    )}
                  </Button>
                </Tabs>
              </CardContent>
            </Card>

            {/* Scan Results */}
            {scanResult && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {getRiskIcon(scanResult.riskLevel)}
                      Scan Results
                    </CardTitle>
                    <Badge
                      variant={
                        scanResult.riskLevel === "safe"
                          ? "secondary"
                          : scanResult.riskLevel === "suspicious"
                            ? "default"
                            : "destructive"
                      }
                      className="uppercase"
                    >
                      {scanResult.riskLevel}
                    </Badge>
                  </div>
                  <CardDescription>Risk Score: {scanResult.score}/100</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Content Preview */}
                  <div className="p-3 bg-muted/50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Analyzed Content:</span>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(scanResult.content)}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground break-all">{scanResult.content}</p>
                  </div>

                  {/* Threats */}
                  {scanResult.threats.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Threats Detected
                      </h4>
                      <ul className="space-y-2">
                        {scanResult.threats.map((threat, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                            <span>{threat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {scanResult.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Details */}
                  {Object.keys(scanResult.details).length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Technical Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {scanResult.details.domain && (
                          <div>
                            <span className="text-muted-foreground">Domain:</span>
                            <span className="ml-2 font-mono">{scanResult.details.domain}</span>
                          </div>
                        )}
                        {scanResult.details.ssl !== undefined && (
                          <div>
                            <span className="text-muted-foreground">SSL Certificate:</span>
                            <span className={`ml-2 ${scanResult.details.ssl ? "text-green-600" : "text-red-600"}`}>
                              {scanResult.details.ssl ? "Valid" : "Invalid/Missing"}
                            </span>
                          </div>
                        )}
                        {scanResult.details.reputation && (
                          <div>
                            <span className="text-muted-foreground">Reputation:</span>
                            <span className="ml-2">{scanResult.details.reputation}</span>
                          </div>
                        )}
                        {scanResult.details.blacklisted !== undefined && (
                          <div>
                            <span className="text-muted-foreground">Blacklisted:</span>
                            <span
                              className={`ml-2 ${scanResult.details.blacklisted ? "text-red-600" : "text-green-600"}`}
                            >
                              {scanResult.details.blacklisted ? "Yes" : "No"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Scans */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Scans</CardTitle>
                <CardDescription>Your latest security checks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {scan.type.toUpperCase()}
                      </Badge>
                      <span className={`text-xs font-medium ${getRiskColor(scan.riskLevel)}`}>
                        {scan.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-1">{scan.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{scan.timestamp}</span>
                      {scan.threats.length > 0 && (
                        <span className="text-xs text-destructive">{scan.threats.length} threats</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-1">URL Safety</h4>
                  <p className="text-muted-foreground">
                    Always check for HTTPS and verify the domain before entering personal information.
                  </p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-secondary mb-1">Email Verification</h4>
                  <p className="text-muted-foreground">
                    Verify sender identity through official channels before clicking links or attachments.
                  </p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-accent mb-1">SMS Caution</h4>
                  <p className="text-muted-foreground">
                    Be wary of urgent messages asking for personal information or containing suspicious links.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
