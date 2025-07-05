import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Agent } from '../types/agent';
import { Bot, Zap, Clock } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  index: number;
}

const AgentCard = ({ agent, index }: AgentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-status-active text-white';
      case 'Beta':
        return 'bg-status-beta text-black';
      case 'Archived':
        return 'bg-status-archived text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPricingIcon = (pricingModel: string) => {
    switch (pricingModel) {
      case 'Free Tier':
        return <Zap className="w-4 h-4" />;
      case 'Subscription':
        return <Clock className="w-4 h-4" />;
      case 'Per-Use':
        return <Bot className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <Card className="h-full border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {agent.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                {agent.category}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Bot className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {agent.description}
          </p>
          
          <div className="flex items-center justify-between gap-2">
            <Badge 
              className={`${getStatusColor(agent.status)} text-xs font-medium px-2 py-1`}
            >
              {agent.status}
            </Badge>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/30 rounded-md px-2 py-1">
              {getPricingIcon(agent.pricingModel)}
              <span className="font-medium">{agent.pricingModel}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AgentCard;