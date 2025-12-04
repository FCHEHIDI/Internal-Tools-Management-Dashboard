import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Sparkles, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * @component CampaignBanner
 * @description Hero banner for marketing campaigns, announcements, or feature highlights.
 * 
 * @pattern Marketing Hero / Promotional Banner
 * Used to showcase:
 * - New feature launches
 * - Special offers or promotions
 * - Important announcements
 * - Educational content (webinars, guides)
 * 
 * @why Instead of boring notifications:
 * 1. Visual appeal with gradients and imagery
 * 2. Clear value proposition
 * 3. Multiple CTAs (learn more, take action, dismiss)
 * 4. Can be personalized based on user segment
 * 
 * @ux-decisions
 * - Dismissible (X button) - respects user choice
 * - Two CTAs: informational and action-oriented
 * - Eye-catching but not disruptive
 * - Can be minimized to small badge after dismiss
 * 
 * @production
 * - Campaign content comes from CMS or feature flags
 * - Dismiss state stored in localStorage
 * - Track impressions and click-through rates
 * - A/B test different messages and designs
 * - Show different campaigns to different user segments
 * 
 * @accessibility
 * - Proper heading hierarchy
 * - Button labels clear and descriptive
 * - Dismiss button accessible
 * - Color contrast meets WCAG AA
 */

interface CampaignBannerProps {
  /**
   * Campaign configuration
   * @production Fetched from API/CMS based on:
   * - User role/department
   * - Current date/season
   * - User behavior (e.g., hasn't added tool in 30 days)
   * - Feature flags
   */
  campaign?: {
    title: string;
    description: string;
    badge?: string; // "NEW", "LIMITED TIME", "BETA"
    imageUrl?: string;
    primaryCta: {
      label: string;
      action: 'add-tool' | 'learn-more' | 'open-url' | 'start-trial';
      url?: string;
    };
    secondaryCta?: {
      label: string;
      action: 'add-tool' | 'learn-more' | 'open-url';
      url?: string;
    };
  };
  
  /**
   * Callback when primary CTA is clicked
   */
  onPrimaryAction: () => void;
  
  /**
   * Callback when secondary CTA is clicked
   */
  onSecondaryAction?: () => void;
  
  /**
   * Callback when user dismisses the banner
   * Should store preference to not show again
   */
  onDismiss?: () => void;
}

/**
 * @constant defaultCampaign
 * @description Fallback campaign when none provided
 * @why Always show something useful, even without CMS
 */
const defaultCampaign = {
  title: '🚀 Introducing AI-Powered Cost Optimization',
  description: 'Let our AI analyze your tool usage and automatically suggest consolidation opportunities. Save up to 30% on software costs.',
  badge: 'NEW',
  primaryCta: {
    label: 'Try AI Optimizer',
    action: 'add-tool' as const,
  },
  secondaryCta: {
    label: 'Learn More',
    action: 'learn-more' as const,
  },
};

export function CampaignBanner({
  campaign = defaultCampaign,
  onPrimaryAction,
  onSecondaryAction,
  onDismiss,
}: CampaignBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden border-2 border-primary-200 dark:border-primary-800">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100 dark:from-blue-950 dark:via-slate-900 dark:to-gray-900" />
        
        {/* Animated Background Sparkles */}
        <motion.div
          className="absolute top-10 right-20 text-primary-300 dark:text-primary-700"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-20 text-slate-300 dark:text-slate-600"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        {/* Dismiss Button */}
        {onDismiss && (
          <motion.button
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            onClick={onDismiss}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Dismiss campaign banner"
          >
            <X className="w-5 h-5 text-foreground-secondary" />
          </motion.button>
        )}

        <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-6">
          {/* Content Section */}
          <div className="flex-1 space-y-4">
            {/* Badge */}
            {campaign.badge && (
              <motion.div
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-wide"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-3 h-3" />
                {campaign.badge}
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {campaign.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-foreground-secondary text-lg max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {campaign.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                onClick={onPrimaryAction}
                className="font-semibold shadow-lg"
              >
                {campaign.primaryCta.label}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {campaign.secondaryCta && onSecondaryAction && (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={onSecondaryAction}
                  className="font-semibold"
                >
                  {campaign.secondaryCta.label}
                </Button>
              )}
            </motion.div>
          </div>

          {/* Image/Icon Section */}
          <motion.div
            className="hidden md:block flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {campaign.imageUrl ? (
              <img
                src={campaign.imageUrl}
                alt="Campaign visual"
                className="w-64 h-64 object-contain"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-blue-400 to-slate-400 rounded-2xl shadow-2xl">
                <Rocket className="w-24 h-24 text-white" />
              </div>
            )}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
