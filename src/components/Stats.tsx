import React from 'react';
import { WordEntry } from '../types';
import { BarChart, Calendar, BookOpen } from 'lucide-react';

interface Props {
  entries: WordEntry[];
}

export default function Stats({ entries }: Props) {
  const totalWords = entries.length;
  const uniqueDates = new Set(entries.map(entry => entry.dateAdded)).size;
  const averagePerDay = totalWords / (uniqueDates || 1);

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);
  const recentWords = entries.filter(
    entry => new Date(entry.dateAdded) >= last7Days
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Words</p>
            <p className="text-2xl font-semibold text-gray-900">{totalWords}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Active Days</p>
            <p className="text-2xl font-semibold text-gray-900">{uniqueDates}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <BarChart className="w-8 h-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Last 7 Days</p>
            <p className="text-2xl font-semibold text-gray-900">{recentWords}</p>
          </div>
        </div>
      </div>
    </div>
  );
}