'use client'

import { 
    ArrowRight, 
    MessageSquare, 
    BarChart, 
    Code, 
    Sparkles
  } from "lucide-react";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
  
  const Features = () => {
    const features = [
      {
        icon: <MessageSquare className="h-10 w-10 text-tech-purple" />,
        title: "Voice AI Interview Practice",
        description: "Practice with our AI interviewer that responds to your voice in real-time, simulating a real interview experience."
      },
      {
        icon: <BarChart className="h-10 w-10 text-tech-purple" />,
        title: "Performance Analytics",
        description: "Track your progress over time with detailed analytics on your communication skills, technical accuracy, and confidence."
      },
      {
        icon: <Code className="h-10 w-10 text-tech-purple" />,
        title: "Technical Problem Library",
        description: "Access hundreds of coding challenges and system design questions from actual interviews at top tech companies."
      },
      {
        icon: <Sparkles className="h-10 w-10 text-tech-purple" />,
        title: "Personalized Feedback",
        description: "Receive detailed feedback on your answers with suggestions for improvement and relevant resources."
      }
    ];
  
    return (
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-heading">How InterviewPrep Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform helps you practice and perfect your interview skills through realistic simulation and feedback.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border border-border card-hover">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 flex items-center text-tech-purple font-medium">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
  
          <div className="mt-20 bg-gradient-to-r from-tech-purple/10 to-tech-indigo/10 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to ace your next interview?</h3>
                <p className="text-muted-foreground">
                  Sign up today and get access to all features with a 7-day free trial. No credit card required.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-tech-purple text-primary-foreground hover:bg-tech-purple/90 h-11 px-8">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;
  