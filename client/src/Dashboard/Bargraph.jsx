import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BarGraph() {
    const data = [
        { name: 'Week 1', 'Monitored Computers': 65 },
        { name: 'Week 2', 'Monitored Computers': 59 },
        { name: 'Week 3', 'Monitored Computers': 80 },
        { name: 'Week 4', 'Monitored Computers': 81 },
    ];

    return (
        <div style={{ width: '100%', height: '300px'}}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                    <YAxis axisLine={false} tickLine={false}/>
                    <Tooltip
                        isAnimationActive={false}
                        separator={": "}
                        cursor={false}
                    />
                    <Legend/>
                    <Bar
                        dataKey="Monitored Computers"
                        fill="rgba(54, 162, 235, 0.5)"
                        stroke="rgba(54, 162, 235, 1)"
                        strokeWidth={1}
                        className='neona'
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarGraph;