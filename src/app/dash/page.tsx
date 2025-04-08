'use client'

import Navbar from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";
import ProgressChart from "@/components/dashboard/ProgressChart";
import PracticeCard from "@/components/dashboard/PracticeCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, MessageSquare, ArrowUpRight, Clock, Check } from "lucide-react";

const Dashboard = () => {
  // Sample data for practice sessions
  const recentPractices = [
    {
      title: "System Design: URL Shortener",
      description: "Design a URL shortening service like bit.ly",
      company: "Google",
      difficulty: "Medium",
      duration: "30 min",
      completed: true
    },
    {
      title: "Behavioral: Leadership Experience",
      description: "Discuss a time when you led a team through a challenging situation",
      company: "Amazon",
      difficulty: "Medium",
      duration: "20 min",
      completed: true
    },
    {
      title: "Algo: Find Median of Two Sorted Arrays",
      description: "Implement a solution with O(log(m+n)) complexity",
      company: "Facebook",
      difficulty: "Hard",
      duration: "45 min",
      completed: false
    }
  ];

  const recommendedPractices = [
    {
      title: "System Design: Chat Application",
      description: "Design a real-time chat application like Slack",
      company: "Microsoft",
      difficulty: "Medium",
      duration: "45 min"
    },
    {
      title: "Algo: LRU Cache Implementation",
      description: "Implement an LRU Cache with O(1) operations",
      company: "Netflix",
      difficulty: "Hard",
      duration: "40 min"
    },
    {
      title: "Behavioral: Conflict Resolution",
      description: "Discuss how you handle conflicts within a team",
      company: "Apple",
      difficulty: "Easy",
      duration: "25 min"
    }
  ];

  // Stats data
  const stats = [
    {
      title: "Total Practice Sessions",
      value: "24",
      icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
      change: "+8% from last month"
    },
    {
      title: "Average Score",
      value: "78%",
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
      change: "+12% from initial assessment"
    },
    {
      title: "Practice Time",
      value: "16.5 hrs",
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      change: "+2.5 hrs from last month"
    },
    {
      title: "Completed Sessions",
      value: "18",
      icon: <Check className="h-4 w-4 text-muted-foreground" />,
      change: "75% completion rate"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary/50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your interview preparation progress and practice sessions.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-tech-purple hover:bg-tech-purple/90">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Practice Session
          </Button>
        </div>

        <div className="grid gap-4 md:gap-8 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <ProgressChart />
        </div>

        <Tabs defaultValue="recent" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Practice Sessions</h2>
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recent" className="mt-0">
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recentPractices.map((practice, i) => (
                <PracticeCard
                  key={i}
                  title={practice.title}
                  description={practice.description}
                  company={practice.company}
                  difficulty={practice.difficulty as "Easy" | "Medium" | "Hard"}
                  duration={practice.duration}
                  completed={practice.completed}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-0">
            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recommendedPractices.map((practice, i) => (
                <PracticeCard
                  key={i}
                  title={practice.title}
                  description={practice.description}
                  company={practice.company}
                  difficulty={practice.difficulty as "Easy" | "Medium" | "Hard"}
                  duration={practice.duration}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
