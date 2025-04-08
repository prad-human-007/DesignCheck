'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Navbar from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Briefcase, Building, Code, Database, Layout, Search, Server, User } from "lucide-react";

interface InterviewOptionForm {
  interviewerType: string;
}

interface CompanyOption {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
}

interface RoleOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const InterviewOptions = () => {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  
  const companies: CompanyOption[] = [
    {
      id: "google",
      name: "Google",
      logo: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-green-500 to-red-500 bg-clip-text text-transparent">G</span>
      </div>,
      description: "Practice for Google's rigorous technical and behavioral interviews"
    },
    {
      id: "amazon",
      name: "Amazon",
      logo: <div className="w-10 h-10 rounded-full bg-[#ff9900] flex items-center justify-center shadow-sm">
        <Building className="text-white" size={20} />
      </div>,
      description: "Prepare for Amazon's leadership principles and coding challenges"
    },
    {
      id: "meta",
      name: "Meta",
      logo: <div className="w-10 h-10 rounded-full bg-[#0866ff] flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-xl">M</span>
      </div>,
      description: "Get ready for Meta's problem-solving and system design interviews"
    },
    {
      id: "microsoft",
      name: "Microsoft",
      logo: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-3 h-3 bg-[#f25022]"></div>
          <div className="w-3 h-3 bg-[#7fba00]"></div>
          <div className="w-3 h-3 bg-[#00a4ef]"></div>
          <div className="w-3 h-3 bg-[#ffb900]"></div>
        </div>
      </div>,
      description: "Practice Microsoft's collaborative and technical interview process"
    }
  ];

  const roles: RoleOption[] = [
    {
      id: "frontend",
      name: "Frontend Engineer",
      icon: <Layout className="h-5 w-5" />,
      description: "UI frameworks, JavaScript, accessibility, and responsive design"
    },
    {
      id: "backend",
      name: "Backend Engineer",
      icon: <Server className="h-5 w-5" />,
      description: "APIs, system design, data processing, and server infrastructure"
    },
    {
      id: "fullstack",
      name: "Full-Stack Engineer",
      icon: <Code className="h-5 w-5" />,
      description: "End-to-end development, from UI to databases and everything in between"
    },
    {
      id: "data",
      name: "Data Engineer/Scientist",
      icon: <Database className="h-5 w-5" />,
      description: "Data structures, algorithms, machine learning, and data analysis"
    },
    {
      id: "swe",
      name: "Software Engineer (General)",
      icon: <Search className="h-5 w-5" />,
      description: "Core CS concepts, problem-solving, and coding challenges"
    }
  ];

  const form = useForm<InterviewOptionForm>({
    defaultValues: {
      interviewerType: "general"
    }
  });

  const handleContinue = () => {
    if (!selectedCompany) {
      toast.error("Please select a company first");
      return;
    }
    
    const roleValue = form.getValues().interviewerType;
    
    // In a real app, you would navigate to the interview page with these params
    toast.success("Interview preferences saved!");
    router.push(`/voice?company=${selectedCompany}&role=${roleValue}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-tech-gray">Interview Options</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Customize your interview experience by selecting a company and role
          </p>
          
          <div className="space-y-8">
            {/* Company Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((company) => (
                  <Card 
                    key={company.id}
                    className={`cursor-pointer transition-all ${
                      selectedCompany === company.id 
                        ? "border-tech-purple bg-tech-purple/5" 
                        : "hover:border-tech-purple/50"
                    }`}
                    onClick={() => setSelectedCompany(company.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        {company.logo}
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{company.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Role Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a role</h2>
              <Form {...form}>
                <RadioGroup 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  onValueChange={(value) => form.setValue("interviewerType", value)}
                  defaultValue={form.getValues().interviewerType}
                >
                  {roles.map((role) => (
                    <FormItem key={role.id}>
                      <FormControl>
                        <Card className="cursor-pointer transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-tech-purple/10 text-tech-purple">
                                  {role.icon}
                                </div>
                                <CardTitle className="text-base">{role.name}</CardTitle>
                              </div>
                              <RadioGroupItem value={role.id} id={role.id} />
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>{role.description}</CardDescription>
                          </CardContent>
                        </Card>
                      </FormControl>
                    </FormItem>
                  ))}
                </RadioGroup>
              </Form>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleContinue}
                className="bg-tech-purple hover:bg-tech-purple/90"
                size="lg"
              >
                <User className="mr-2 h-4 w-4" />
                Start Interview
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InterviewOptions;
