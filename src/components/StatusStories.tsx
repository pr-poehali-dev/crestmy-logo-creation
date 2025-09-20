import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Story {
  id: string;
  user: string;
  avatar: string;
  hasNew: boolean;
  isOwn?: boolean;
}

const StatusStories: React.FC = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
      user: 'Моя история',
      avatar: 'МИ',
      hasNew: false,
      isOwn: true
    },
    {
      id: '2',
      user: 'Анна',
      avatar: 'А',
      hasNew: true
    },
    {
      id: '3',
      user: 'Максим',
      avatar: 'М',
      hasNew: true
    },
    {
      id: '4',
      user: 'Елена',
      avatar: 'Е',
      hasNew: false
    },
    {
      id: '5',
      user: 'Дмитрий',
      avatar: 'Д',
      hasNew: true
    }
  ]);

  return (
    <div className="p-4 border-b border-border bg-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">Истории</h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-fit cursor-pointer group">
            <div className="relative">
              <div className={`p-0.5 rounded-full ${
                story.hasNew 
                  ? 'bg-gradient-to-tr from-primary to-accent' 
                  : 'bg-border'
              }`}>
                <Avatar className="w-12 h-12 border-2 border-card">
                  <AvatarFallback className="bg-secondary text-foreground font-semibold">
                    {story.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              {story.isOwn && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-card flex items-center justify-center">
                  <Icon name="Plus" size={12} className="text-white" />
                </div>
              )}
            </div>
            
            <span className="text-xs text-muted-foreground text-center max-w-[60px] truncate group-hover:text-foreground transition-colors">
              {story.user}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusStories;