import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import StatusStories from '@/components/StatusStories';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  avatar: string;
  type: 'private' | 'group' | 'channel';
}

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  author?: string;
}

const MessengerLayout: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');
  const [activeSection, setActiveSection] = useState<'chats' | 'contacts' | 'groups' | 'channels' | 'calls' | 'settings'>('chats');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Анна Петрова',
      lastMessage: 'Привет! Как дела?',
      time: '14:32',
      unread: 2,
      isOnline: true,
      avatar: 'АП',
      type: 'private'
    },
    {
      id: '2',
      name: 'Команда разработки',
      lastMessage: 'Максим: Обновил макеты',
      time: '13:45',
      unread: 0,
      isOnline: false,
      avatar: 'КР',
      type: 'group'
    },
    {
      id: '3',
      name: 'Новости Crestmy',
      lastMessage: 'Новая версия приложения!',
      time: '12:00',
      unread: 1,
      isOnline: false,
      avatar: 'NC',
      type: 'channel'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      text: 'Привет! Как дела?',
      time: '14:30',
      isOwn: false
    },
    {
      id: '2',
      text: 'Привет! Всё отлично, работаю над новым проектом',
      time: '14:31',
      isOwn: true
    },
    {
      id: '3',
      text: 'Звучит интересно! Расскажешь подробнее?',
      time: '14:32',
      isOwn: false
    }
  ];

  const sidebarSections = [
    { id: 'chats', label: 'Чаты', icon: 'MessageCircle' },
    { id: 'contacts', label: 'Контакты', icon: 'Users' },
    { id: 'groups', label: 'Группы', icon: 'Users' },
    { id: 'channels', label: 'Каналы', icon: 'Radio' },
    { id: 'calls', label: 'Звонки', icon: 'Phone' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-messenger-bg font-inter">
      {/* Левая панель навигации */}
      <div className="w-20 bg-messenger-sidebar border-r border-border flex flex-col items-center py-6 space-y-4">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center font-bold text-white text-lg">
          C
        </div>
        
        <div className="flex flex-col space-y-2 mt-8">
          {sidebarSections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'ghost'}
              size="sm"
              className={`w-12 h-12 p-0 ${
                activeSection === section.id 
                  ? 'bg-primary text-white' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-messenger-hover'
              }`}
              onClick={() => setActiveSection(section.id as any)}
            >
              <Icon name={section.icon as any} size={20} />
            </Button>
          ))}
        </div>
      </div>

      {/* Панель чатов */}
      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-lg mb-3 text-foreground">Сообщения</h2>
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Поиск чатов..."
              className="pl-10 bg-background border-border text-foreground"
            />
          </div>
        </div>

        <StatusStories />
        
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-messenger-hover ${
                activeChat === chat.id ? 'bg-messenger-hover' : ''
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-messenger-online rounded-full border-2 border-card"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <Badge variant="default" className="bg-primary text-white text-xs min-w-[20px] h-5 rounded-full">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Область чата */}
      <div className="flex-1 flex flex-col">
        {/* Заголовок чата */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-white font-semibold">
                  АП
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">Анна Петрова</h3>
                <p className="text-sm text-messenger-online">в сети</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Icon name="Video" size={20} />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isOwn
                    ? 'bg-primary text-white'
                    : 'bg-card text-foreground border border-border'
                }`}
              >
                <p className="text-sm font-roboto">{message.text}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-muted-foreground'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Поле ввода */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Icon name="Paperclip" size={20} />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Написать сообщение..."
                className="pr-12 bg-background border-border text-foreground"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="Smile" size={18} />
              </Button>
            </div>
            
            <Button 
              onClick={sendMessage}
              className="bg-primary hover:bg-primary/90 text-white"
              size="sm"
            >
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessengerLayout;