import { Bell, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface AppHeaderProps {
  selectedProvider: "google" | "aws";
  onProviderChange: (provider: "google" | "aws") => void;
}

export default function AppHeader({ selectedProvider, onProviderChange }: AppHeaderProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Image uploaded successfully",
      message: "Your image has been uploaded to Google Cloud Storage",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "Storage limit warning",
      message: "You're approaching your storage limit (85% used)",
      time: "1 hour ago",
      read: false
    },
    {
      id: 3,
      title: "Backup completed",
      message: "Weekly backup completed successfully",
      time: "2 hours ago",
      read: true
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Cloud className="w-8 h-8 text-google-blue" />
              <h1 className="text-xl font-bold text-gray-900">CloudVault</h1>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm text-gray-500">Provider:</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedProvider === "google" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onProviderChange("google")}
                  className={selectedProvider === "google" ? "bg-google-blue hover:bg-blue-700" : ""}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Cloud
                </Button>
                <Button
                  variant={selectedProvider === "aws" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onProviderChange("aws")}
                  className={selectedProvider === "aws" ? "bg-aws-orange hover:bg-orange-600" : ""}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.072-.208.072-.08 0-.16-.04-.239-.112-.112-.12-.208-.248-.288-.384-.08-.144-.16-.304-.256-.48-.64.759-1.44 1.135-2.4 1.135-.687 0-1.239-.2-1.663-.591-.424-.4-.64-.936-.64-1.599 0-.712.255-1.287.776-1.727.52-.44 1.215-.664 2.087-.664.287 0 .583.024.895.08.32.048.648.128.991.224v-.735c0-.768-.16-1.303-.488-1.606-.32-.304-.87-.456-1.64-.456-.36 0-.728.047-1.119.136-.39.096-.775.224-1.151.4-.168.072-.295.12-.375.127-.08.016-.144-.056-.2-.2l-.319-.512c-.048-.08-.056-.168-.024-.248.032-.08.104-.16.2-.24.375-.192.823-.352 1.343-.479.52-.127 1.072-.2 1.648-.2 1.256 0 2.175.287 2.759.852.583.568.871 1.424.871 2.576v3.4zm-3.335 1.255c.28 0 .567-.048.871-.151.304-.104.575-.272.791-.52.128-.152.224-.32.279-.504.056-.184.088-.4.088-.648v-.312c-.256-.064-.528-.12-.807-.16-.28-.04-.559-.056-.831-.056-.592 0-1.023.12-1.295.36-.272.24-.407.580-.407 1.02 0 .424.104.744.32.952.208.2.52.304.888.304l.103-.285zm6.415.96c-.104 0-.175-.016-.215-.056-.04-.032-.08-.12-.111-.24L8.246 2.666c-.032-.128-.048-.215-.048-.256 0-.104.048-.16.151-.16h.617c.111 0 .184.016.215.056.04.032.072.12.104.24l1.087 4.304L11.55 2.546c.024-.128.056-.215.096-.24.04-.04.12-.056.231-.056h.505c.111 0 .184.016.231.056.04.032.08.12.096.24l1.175 4.368 1.127-4.368c.032-.128.072-.215.104-.24.04-.04.111-.056.215-.056h.585c.104 0 .16.048.16.16 0 .032-.008.064-.016.104-.008.04-.024.104-.048.184L14.745 11.67c-.032.128-.072.215-.112.24-.04.04-.111.056-.215.056h-.543c-.111 0-.184-.016-.231-.056-.04-.032-.08-.12-.096-.24L12.47 7.537l-1.063 4.353c-.024.128-.056.215-.096.24-.04.04-.12.056-.231.056h-.543zm8.71.048c-.353 0-.71-.04-1.063-.12-.353-.088-.63-.2-.823-.336-.096-.071-.16-.152-.184-.24-.024-.088-.04-.184-.04-.288v-.464c0-.144.056-.215.16-.215.064 0 .128.016.2.048.071.032.16.08.256.12.335.151.695.2 1.087.2.305 0 .543-.056.71-.16.167-.104.256-.248.256-.432 0-.128-.04-.24-.12-.336-.08-.096-.2-.184-.36-.272l-1.151-.36c-.583-.184-.983-.456-1.207-.823-.215-.368-.32-.775-.32-1.215 0-.36.08-.679.24-.96.16-.279.375-.52.631-.704.256-.184.551-.32.887-.408.335-.088.687-.12 1.047-.12.151 0 .305.008.464.032.16.024.312.056.456.088.144.04.279.08.408.128.128.048.231.096.312.144.08.064.144.128.184.2.04.071.056.151.056.240v.432c0 .144-.056.224-.16.224-.08 0-.2-.032-.36-.104-.487-.216-1.031-.32-1.631-.32-.279 0-.511.048-.688.144-.176.096-.264.24-.264.432 0 .128.048.24.144.336.096.096.24.184.432.272l1.135.36c.575.184.99.44 1.239.775.248.336.368.72.368 1.151 0 .368-.08.696-.24.984-.16.288-.384.536-.672.736-.288.2-.624.352-1.008.456-.392.104-.808.16-1.255.16z"/>
                  </svg>
                  AWS S3
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          !notification.read ? 'bg-blue-500' : 'bg-transparent'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Button variant="ghost" size="sm" className="w-full text-sm text-gray-500">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

