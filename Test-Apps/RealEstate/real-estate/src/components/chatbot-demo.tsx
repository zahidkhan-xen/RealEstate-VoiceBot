import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! Im your AI real estate assistant. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you find properties that match your criteria. What's your budget range?",
        "That's a great area! There are several properties available. Would you like to schedule a viewing?",
        "I can provide detailed information about schools, amenities, and recent sales in that neighborhood.",
      ]
      const aiMessage: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Bot className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-semibold">Real Estate AI Assistant</h3>
          <p className="text-sm text-muted-foreground">Ask me anything about properties</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4 h-[400px] overflow-y-auto">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

