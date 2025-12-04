import { Bell, User, Shield, Database, Palette, Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input, Label } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useUser } from '@/contexts/UserContext';

export function Settings() {
  const { avatarUrl, setAvatarUrl } = useUser();
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
        alert('Please upload a JPG, PNG, or GIF image');
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-h1 font-bold bg-gradient-to-r from-cyan-300 via-blue-600 to-cyan-300 bg-clip-text text-transparent animate-gradient-title">
          Settings
        </h1>
        <div className="overflow-hidden mt-2">
          <p className="text-foreground-secondary animate-scroll-left whitespace-nowrap">
            Manage your account preferences and application settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {[
                { name: 'Profile', icon: User, active: true },
                { name: 'Notifications', icon: Bell },
                { name: 'Security', icon: Shield },
                { name: 'Data & Privacy', icon: Database },
                { name: 'Appearance', icon: Palette },
                { name: 'Email Preferences', icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground-secondary hover:bg-surface-hover hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Profile Settings</h2>
            
            <div className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-primary text-white flex items-center justify-center font-bold text-2xl overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    'FC'
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    Change Avatar
                  </Button>
                  <p className="text-xs text-foreground-secondary mt-2">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    defaultValue="Fares"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    defaultValue="Chehidi"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="fares@techcorp.com"
                  className="mt-1"
                />
              </div>

              {/* Role */}
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  type="text"
                  defaultValue="Engineering Manager"
                  className="mt-1"
                  disabled
                />
                <p className="text-xs text-foreground-secondary mt-1">
                  Contact admin to change your role
                </p>
              </div>

              {/* Department */}
              <div>
                <Label htmlFor="department">Department</Label>
                <Select id="department" className="mt-1">
                  <option value="engineering">Engineering</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                  <option value="support">Support</option>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
            
            <div className="space-y-4">
              {[
                { name: 'Tool expiring soon', description: 'Get notified 30 days before renewal', enabled: true },
                { name: 'Budget threshold alert', description: 'Alert when spending exceeds 80% of budget', enabled: true },
                { name: 'New tool requests', description: 'Notify when team members request new tools', enabled: false },
                { name: 'Weekly summary', description: 'Receive weekly analytics report via email', enabled: true },
              ].map((pref) => (
                <div key={pref.name} className="flex items-start justify-between py-3 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{pref.name}</p>
                    <p className="text-sm text-foreground-secondary mt-1">{pref.description}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pref.enabled ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        pref.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Appearance */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Appearance</h2>
            
            <div className="space-y-4">
              <div>
                <Label>Theme</Label>
                <div className="mt-2 p-4 bg-surface-hover rounded-lg border-2 border-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                      <div className="w-6 h-6 rounded bg-gray-700"></div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-foreground-secondary">Optimized for low-light environments</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-foreground-secondary mt-2">
                  Dark mode is enabled by default for better visibility
                </p>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-slate-400 text-white hover:from-blue-700 hover:to-slate-500 transition-all">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
