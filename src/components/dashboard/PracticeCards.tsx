import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare } from "lucide-react";

type PracticeCardProps = {
  title: string;
  description: string;
  company: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: string;
  completed?: boolean;
};

const PracticeCard = ({
  title,
  description,
  company,
  difficulty,
  duration,
  completed = false,
}: PracticeCardProps) => {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  return (
    <Card className={`card-hover ${completed ? 'border-green-200 bg-green-50/30' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          {completed && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary">{company}</Badge>
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-tech-purple hover:bg-tech-purple/90">
          <MessageSquare className="mr-2 h-4 w-4" />
          {completed ? "Review Session" : "Start Practice"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeCard;
