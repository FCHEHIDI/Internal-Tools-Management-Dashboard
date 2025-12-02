import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Lightbulb, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';

/**
 * @component WelcomeWidget
 * @description Engaging dashboard widget that greets users and provides contextual insights.
 * 
 * @pattern Hero Section / Dashboard Widget
 * Combines multiple engagement elements:
 * - Personalized greeting with time-aware message
 * - Recent activity summary (last action taken)
 * - "Did You Know?" fact to highlight value
 * - Clear CTA to add new tool
 * 
 * @why Instead of immediately showing a form, we:
 * 1. Orient the user (welcome, show recent activity)
 * 2. Provide value (interesting stats, achievements)
 * 3. Guide to action (prominent but not intrusive CTA)
 * 
 * @ux-decisions
 * - Gradient card draws attention without being overwhelming
 * - Stats are real user data, making it personal
 * - "Did you know?" rotates facts (can add rotation logic)
 * - Button clearly labeled for primary action
 * 
 * @accessibility
 * - Semantic HTML structure
 * - Button properly labeled
 * - Color contrast maintained
 * - Screen reader friendly content
 */

interface WelcomeWidgetProps {
  /**
   * User's name for personalization
   * @default "there" - Fallback if user not loaded
   */
  userName?: string;
  
  /**
   * Most recent action the user took
   * @example { action: 'Added', toolName: 'Figma', timeAgo: '2 hours ago' }
   */
  lastAction?: {
    action: string;
    toolName: string;
    timeAgo: string;
  };
  
  /**
   * Cost savings this quarter (in euros)
   * Used to show user their impact
   */
  quarterlySavings?: number;
  
  /**
   * Callback when user clicks "Add New Tool" button
   * Triggers transition to form view
   */
  onAddToolClick: () => void;
}

/**
 * @function getTimeBasedGreeting
 * @description Returns appropriate greeting based on time of day
 * @why More personal than generic "Hello" - shows attention to detail
 */
function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * @constant didYouKnowFacts
 * @description Pool of interesting facts to display
 * @production In real app, these would:
 * - Come from API based on user's actual data
 * - Rotate on each visit (store last shown in localStorage)
 * - Be A/B tested for engagement
 */
const didYouKnowFacts = [
  'Companies that track tool usage reduce software waste by 35%',
  'The average company uses 110 SaaS tools across departments',
  'Consolidating similar tools can save up to 30% on software costs',
  'Unused licenses account for 30% of total SaaS spending',
  'Regular audits can identify $50K+ in annual savings',
];

export function WelcomeWidget({
  userName = 'there',
  lastAction,
  quarterlySavings = 0,
  onAddToolClick,
}: WelcomeWidgetProps) {
  // @production: Select random fact or rotate based on visit count
  const randomFact = didYouKnowFacts[Math.floor(Math.random() * didYouKnowFacts.length)];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        variant="gradient" 
        gradient="primary" 
        className="p-8 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 space-y-6">
          {/* Greeting Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-white/90" />
              <h2 className="text-2xl font-bold text-white">
                {getTimeBasedGreeting()}, {userName}!
              </h2>
            </div>
            
            {/* Last Action Summary */}
            {lastAction && (
              <motion.p 
                className="text-white/80 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TrendingUp className="w-4 h-4" />
                Your last action: <strong>{lastAction.action} "{lastAction.toolName}"</strong> {lastAction.timeAgo}
              </motion.p>
            )}
          </div>

          {/* Did You Know Section */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-white/90 mb-1">💡 Did you know?</p>
                <p className="text-sm text-white/80">{randomFact}</p>
              </div>
            </div>
          </motion.div>

          {/* Savings Highlight (if available) */}
          {quarterlySavings > 0 && (
            <motion.div
              className="flex items-center gap-2 text-white/90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-sm">
                You've saved <strong className="text-green-300">{formatCurrency(quarterlySavings)}</strong> this quarter by optimizing tools
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 font-semibold shadow-lg w-full sm:w-auto transition-colors"
              onClick={onAddToolClick}
              data-testid="add-tool-cta"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Tool to Your Stack
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
