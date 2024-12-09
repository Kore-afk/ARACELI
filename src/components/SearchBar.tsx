import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-xl mx-auto mt-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-xl opacity-30" />
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar parte del cuerpo..."
          className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-md text-white placeholder-blue-100 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 shadow-lg text-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-100" />
      </div>
    </div>
  );
}