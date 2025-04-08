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
import { Briefcase, Building, Users, LineChart, PieChart, TrendingUp, ClipboardList, LightbulbIcon } from "lucide-react";

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
      id: "Mckinsey",
      name: "McKinsey & Company",
      logo: <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-lg">M</span>
      </div>,
      description: "Practice for McKinsey's case interviews and personal experience questions"
    },
    {
      id: "BCG",
      name: "Boston Consulting Group",
      logo: <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
        <span className="font-bold text-red-600 text-xl">BCG</span>
      </div>,
      description: "Prepare for BCG's consulting frameworks and business problem-solving"
    },
    {
      id: "Bain",
      name: "Bain & Company",
      logo: <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-sm">
        <span className="text-white font-bold text-lg">B</span>
      </div>,
      description: "Get ready for Bain's case interviews and fit assessment"
    },
    {
      id: "Deloitte",
      name: "Deloitte",
      logo: <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <div className="w-6 h-6 bg-green-700"></div>
      </div>,
      description: "Practice Deloitte's behavioral interviews and consulting case studies"
    }
  ];

  const roles: RoleOption[] = [
    {
      id: "Product Manager",
      name: "Product Manager",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Product strategy, roadmapping, market research, and stakeholder management"
    },
    {
      id: "Project Manager",
      name: "Project Manager",
      icon: <ClipboardList className="h-5 w-5" />,
      description: "Project planning, resource allocation, risk management, and delivery"
    },
    {
      id: "Consultant",
      name: "Management Consultant",
      icon: <LineChart className="h-5 w-5" />,
      description: "Business strategy, problem-solving, data analysis, and client presentations"
    },
    {
      id: "Business Analyst",
      name: "Business Analyst",
      icon: <PieChart className="h-5 w-5" />,
      description: "Requirements gathering, process improvement, and analytical problem-solving"
    },
    {
      id: "Executive Leader",
      name: "Executive Leadership",
      icon: <TrendingUp className="h-5 w-5" />,
      description: "Vision setting, organizational strategy, and high-level decision making"
    }
  ];

  const form = useForm<InterviewOptionForm>({
    defaultValues: {
      interviewerType: "consultant"
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Management Interview Options</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Customize your management interview experience by selecting a company and role
          </p>
          
          <div className="space-y-8">
            {/* Company Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Select a consulting firm</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {companies.map((company) => (
                  <Card 
                    key={company.id}
                    className={`cursor-pointer transition-all ${
                      selectedCompany === company.id 
                        ? "border-blue-600 bg-blue-50" 
                        : "hover:border-blue-300"
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
              <h2 className="text-xl font-semibold mb-4">Select a management role</h2>
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
                                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
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
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Start Management Interview
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