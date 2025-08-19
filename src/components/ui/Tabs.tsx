
import React, { createContext, useContext } from 'react';

interface TabsContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> & { List: React.FC<any>; Trigger: React.FC<any> } = ({ value, onValueChange, children, className }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={`flex border-b ${className}`}>{children}</div>;
};

const TabsTrigger: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({ value, children, className }) => {
  const { value: activeTab, onValueChange } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 -mb-px border-b-2 ${isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} ${className}`}>
      {children}
    </button>
  );
};

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
