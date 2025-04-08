'use client'

import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "InterviewPrep helped me land my dream job at Google. The AI interviewer feels remarkably realistic and the feedback was invaluable.",
      name: "Alex Johnson",
      title: "Software Engineer at Google",
      avatar: "/placeholder.svg"
    },
    {
      quote: "I was struggling with system design interviews until I found InterviewPrep. The AI guidance helped me identify my weak points and improve rapidly.",
      name: "Sarah Chen",
      title: "Senior Developer at Microsoft",
      avatar: "/placeholder.svg"
    },
    {
      quote: "The voice AI feature is a game-changer. It's like having a personal interview coach available 24/7. Worth every penny!",
      name: "Michael Rodriguez",
      title: "Frontend Engineer at Meta",
      avatar: "/placeholder.svg"
    },
    {
      quote: "After just two weeks of practicing with InterviewPrep, I felt so much more confident. I got offers from three top tech companies!",
      name: "Priya Patel",
      title: "Product Manager at Amazon",
      avatar: "/placeholder.svg"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-heading">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful developers who have aced their interviews with InterviewPrep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-border card-hover">
              <CardContent className="p-8">
                <div className="flex flex-col h-full">
                  <blockquote className="text-lg text-foreground mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center mt-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
