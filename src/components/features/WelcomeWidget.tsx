import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Lightbulb, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StreamingText } from '@/components/ui/StreamingText';
import { RobotScene } from '@/components/three/RobotScene';
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
  const [showLastAction, setShowLastAction] = useState(false);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="p-0 relative overflow-visible bg-transparent border-0 shadow-none"
      >        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-center">

          {/* Content Section */}
          <div className="space-y-4 relative z-10">
            {/* Greeting Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">
                  <StreamingText 
                    text={`${getTimeBasedGreeting()}, ${userName}!`}
                    speed={40}
                  />
                </h2>
              </div>
            
            {/* Last Action Summary */}
            {lastAction && (
              <motion.div
                className="text-foreground-secondary flex items-start gap-2 text-sm bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-200/50 dark:border-blue-800/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: showLastAction ? 1 : 0, height: showLastAction ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
              >
                <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <p>
                  <StreamingText 
                    text={`Your last action: ${lastAction.action} "${lastAction.toolName}" ${lastAction.timeAgo}`}
                    delay={1200}
                    speed={20}
                    onComplete={() => setShowLastAction(true)}
                  />
                </p>
              </motion.div>
            )}
          </div>

          {/* Did You Know Section */}
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: showDidYouKnow ? 1 : 0, scale: showDidYouKnow ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">💡 Did you know?</p>
                <p className="text-sm text-foreground-secondary">
                  <StreamingText 
                    text={randomFact}
                    delay={2400}
                    speed={25}
                    onComplete={() => setShowDidYouKnow(true)}
                  />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Savings Highlight (if available) */}
          {quarterlySavings > 0 && (
            <motion.div
              className="flex items-center gap-2 text-foreground-secondary text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: showSavings ? 1 : 0, x: showSavings ? 0 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p>
                <StreamingText 
                  text={`You've saved ${formatCurrency(quarterlySavings)} this quarter by optimizing tools`}
                  delay={3600}
                  speed={20}
                  onComplete={() => setShowSavings(true)}
                />
              </p>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() => {
              setTimeout(() => setShowButton(true), 4200);
            }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-slate-400 text-white hover:from-blue-700 hover:to-slate-500 font-semibold shadow-lg w-full sm:w-auto transition-all"
              onClick={onAddToolClick}
              data-testid="add-tool-cta"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Tool to Your Stack
            </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}