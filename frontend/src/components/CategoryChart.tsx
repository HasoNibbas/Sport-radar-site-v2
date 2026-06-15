// File: src/components/CategoryChart.tsx
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Activity } from '../types';

interface Props {
  activities: Activity[];
}

const CategoryChart: React.FC<Props> = ({ activities }) => {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    activities.forEach(a => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return Object.entries(counts).map(([category, count]) => ({ category, count }));
  }, [activities]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryChart;