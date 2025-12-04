import { Card } from '@/components/ui/Card';
import { RobotScene } from '@/components/three/RobotScene';
import { Sparkles } from 'lucide-react';

export function AssistantRobotWidget() {
  return (
    <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/20">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          AI Assistant
        </h3>
        <p className="text-sm text-blue-200/80">
          Your intelligent tool management companion
        </p>
      </div>

      {/* 3D Robot Scene */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-b from-transparent to-slate-950/50">
        <RobotScene size={1.0} autoRotate={true} className="w-full h-full" />
      </div>

      {/* Info footer */}
      <div className="mt-4 pt-4 border-t border-blue-500/20">
        <div className="flex items-center justify-between text-xs text-blue-200/60">
          <span>Interactive 3D Model</span>
          <span>Drag to rotate • Scroll to zoom</span>
        </div>
      </div>
    </Card>
  );
}
