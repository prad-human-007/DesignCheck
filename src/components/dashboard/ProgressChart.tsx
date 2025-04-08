import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
  
  // Sample data
  const data = [
    { name: "Week 1", score: 45 },
    { name: "Week 2", score: 52 },
    { name: "Week 3", score: 49 },
    { name: "Week 4", score: 62 },
    { name: "Week 5", score: 69 },
    { name: "Week 6", score: 75 },
    { name: "Week 7", score: 78 },
    { name: "Week 8", score: 86 },
  ];
  
  const ProgressChart = () => {
    return (
      <div className="w-full h-80 bg-white rounded-lg p-4 shadow">
        <h3 className="text-lg font-medium mb-4">Interview Performance Progress</h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Performance Score']}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.375rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none'
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#8B5CF6" 
              fillOpacity={1} 
              fill="url(#colorScore)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default ProgressChart;
  