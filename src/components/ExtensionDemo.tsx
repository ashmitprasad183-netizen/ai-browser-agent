import { useState } from "react";
import { Monitor, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIAssistant } from "./AIAssistant";
import heroImage from "@/assets/ai-hero-bg.jpg";

export function ExtensionDemo() {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: Globe,
      title: "Multi-Site Workflows",
      description: "Execute complex tasks across multiple websites seamlessly"
    },
    {
      icon: Monitor,
      title: "Natural Language",
      description: "Give commands in plain English, no technical knowledge required"
    },
    {
      icon: Smartphone,
      title: "Chrome Native",
      description: "Works within your existing Chrome environment and extensions"
    }
  ];

  if (showDemo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="flex gap-8 items-start">
          <div className="relative">
            <div className="absolute inset-0 ai-glow rounded-xl" />
            <AIAssistant />
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="text-2xl font-bold gradient-text">Chrome Extension Preview</h2>
            <p className="text-muted-foreground">
              This is how your AI assistant will appear in Chrome. The extension provides 
              intelligent web automation while preserving your bookmarks, passwords, and 
              existing extensions.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowDemo(false)}
              className="border-ai-primary/50 hover:bg-ai-primary/10"
            >
              Back to Overview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-gradient-to-r from-ai-primary to-ai-secondary text-white border-0 px-4 py-2">
              Chrome Extension
            </Badge>
            
            <h1 className="text-5xl font-bold tracking-tight">
              AI-Powered Web Assistant
              <span className="block gradient-text mt-2">
                Built for Chrome
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Execute complex multi-site workflows with natural language commands. 
              Compare prices, apply to jobs, book flights - all without leaving Chrome.
            </p>
            
            <div className="flex gap-4 justify-center items-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-ai-primary to-ai-secondary hover:opacity-90 transition-opacity px-8 py-6 text-lg"
                onClick={() => setShowDemo(true)}
              >
                Try Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-ai-primary/50 hover:bg-ai-primary/10 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Intelligent Web Automation
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Powered by Playwright MCP integration for seamless cross-site workflows
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="workflow-card p-8 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center group-hover:shadow-glow transition-all">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Example Commands */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Just Tell It What You Want
          </h2>
          <p className="text-muted-foreground mb-12 text-lg">
            No coding required. Use natural language to automate complex web tasks.
          </p>
          
          <div className="max-w-4xl mx-auto grid gap-4">
            {[
              "Compare iPhone 15 prices across Amazon, Flipkart, and Best Buy",
              "Apply to all remote software engineer jobs on LinkedIn and Indeed",
              "Find the cheapest round-trip flight to Tokyo for next month",
              "Research customer reviews for wireless headphones under $200"
            ].map((command, index) => (
              <Card 
                key={index}
                className="p-6 text-left border-l-4 border-l-ai-primary/50 bg-gradient-to-r from-ai-primary/5 to-transparent hover:from-ai-primary/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-ai-primary" />
                  <span className="font-medium group-hover:gradient-text transition-all">
                    "{command}"
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}