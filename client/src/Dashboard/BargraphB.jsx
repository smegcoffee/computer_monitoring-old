import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './../styles/Tailwind.css';

function BarGraphB() {
    const data = [
        { month: 'January', 'Monitored Computers': 65 },
        { month: 'February', 'Monitored Computers': 59 },
        { month: 'March', 'Monitored Computers': 80 },
        { month: 'April', 'Monitored Computers': 81 },
        { month: 'May', 'Monitored Computers': 80 },
        { month: 'June', 'Monitored Computers': 30 },
        { month: 'July', 'Monitored Computers': 65 },
        { month: 'August', 'Monitored Computers': 73 },
        { month: 'September', 'Monitored Computers': 38 },
        { month: 'October', 'Monitored Computers': 27 },
        { month: 'November', 'Monitored Computers': 83 },
        { month: 'December', 'Monitored Computers': 90 },
    ];

    return (
        <div style={{ width: '100%', height: '300px'}}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="month" axisLine={false} tickLine={false}/>
                    <YAxis axisLine={false} tickLine={false}/>
                    <Tooltip 
                    isAnimationActive={false}
                    separator={": "}
                    cursor={false}
                    />
                    <Legend />
                    <Bar
                        dataKey="Monitored Computers"
                        fill="rgba(235, 0, 0, 0.5)"
                        stroke="rgba(235, 0, 0, 1)"
                        strokeWidth={1}
                        className='neonb'
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default BarGraphB;