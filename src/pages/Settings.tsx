import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Building, 
  Bell, 
  Shield, 
  Palette,
  Save
} from "lucide-react";

export default function Settings() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "My Business",
    email: "business@example.com",
    phone: "+1-234-567-8900",
    address: "123 Business St, City, State 12345"
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    newOrders: true,
    overdue: true,
    reports: false
  });

  const [preferences, setPreferences] = useState({
    currency: "USD",
    taxRate: 8.5,
    invoicePrefix: "INV",
    autoBackup: true
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your billing software preferences and business information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={businessInfo.name}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessPhone">Phone</Label>
              <Input
                id="businessPhone"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Address</Label>
              <Input
                id="businessAddress"
                value={businessInfo.address}
                onChange={(e) => setBusinessInfo(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
              </div>
              <Switch
                checked={notifications.lowStock}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, lowStock: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>New Orders</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new orders</p>
              </div>
              <Switch
                checked={notifications.newOrders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newOrders: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Overdue Invoices</Label>
                <p className="text-sm text-muted-foreground">Alert when invoices become overdue</p>
              </div>
              <Switch
                checked={notifications.overdue}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, overdue: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly business reports</p>
              </div>
              <Switch
                checked={notifications.reports}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, reports: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Input
                id="currency"
                value={preferences.currency}
                onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                step="0.1"
                value={preferences.taxRate}
                onChange={(e) => setPreferences(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
              <Input
                id="invoicePrefix"
                value={preferences.invoicePrefix}
                onChange={(e) => setPreferences(prev => ({ ...prev, invoicePrefix: e.target.value }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatically backup data daily</p>
              </div>
              <Switch
                checked={preferences.autoBackup}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoBackup: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Export Data
            </Button>
            <Button variant="outline" className="w-full">
              Import Data
            </Button>
            <Separator />
            <Button variant="destructive" className="w-full">
              Reset All Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}