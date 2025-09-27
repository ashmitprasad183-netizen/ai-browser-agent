import { useState, useEffect } from "react";
import { Send, Zap, History, Settings, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  type: "user" | "ai" | "system";
  timestamp: Date;
}

interface Workflow {
  id: string;
  title: string;
  status: "running" | "completed" | "paused";
  progress: number;
  steps: string[];
}

export function AIAssistant() {
  const [isTabActive, setIsTabActive] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your AI web assistant. Try commands like 'Compare iPhone prices on Amazon and Flipkart' or 'Apply to software engineer jobs on LinkedIn'.",
      type: "ai",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: "1",
      title: "Comparing iPhone prices",
      status: "running",
      progress: 65,
      steps: ["Amazon search", "Flipkart search", "Price comparison"]
    }
  ]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      type: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you with "${input}". Starting workflow...`,
        type: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const exampleCommands = [
    "Compare laptop prices across sites",
    "Find and apply to remote jobs",
    "Book cheapest flight to Paris",
    "Research product reviews"
  ];

  return (
    <div className={`chrome-extension-popup bg-background border border-border/50 shadow-2xl ${!isTabActive ? 'tab-inactive' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-semibold gradient-text">AI Web Assistant</h1>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <History className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Workflows */}
      {workflows.length > 0 && (
        <div className="p-4 border-b border-border bg-card/50">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Active Workflows</h3>
          <div className="space-y-2">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="workflow-card p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{workflow.title}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={workflow.status === "running" ? "default" : "secondary"}>
                      {workflow.status}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-6 h-6"
                    >
                      {workflow.status === "running" ? 
                        <Pause className="w-3 h-3" /> : 
                        <Play className="w-3 h-3" />
                      }
                    </Button>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-ai-primary to-ai-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${workflow.progress}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {workflow.steps.join(" → ")}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble p-3 rounded-lg max-w-[85%] ${
                message.type === "user"
                  ? "ml-auto bg-gradient-to-r from-ai-primary to-ai-secondary text-white"
                  : "mr-auto bg-card border border-border"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Example Commands */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-border bg-card/30">
          <h4 className="text-xs font-medium text-muted-foreground mb-2">Try these commands:</h4>
          <div className="grid grid-cols-1 gap-2">
            {exampleCommands.map((command, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start text-xs p-2 h-auto text-left text-muted-foreground hover:text-foreground"
                onClick={() => setInput(command)}
              >
                "{command}"
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your command... (e.g., 'Compare prices for iPhone 15')"
            className="command-input flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-ai-primary to-ai-secondary hover:opacity-90 transition-opacity"
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}