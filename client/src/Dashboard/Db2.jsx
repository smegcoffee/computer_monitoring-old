import React from 'react';
import profile from '../img/profile.png';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, Tooltip, Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis, Area, AreaChart } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faUsers, faComputer, faNoteSticky } from '@fortawesome/free-solid-svg-icons';

//many = how many computers been formatted in his/her ownership
const dataUsers =[
  {
    id: 1,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "8",
  },
  {
    id: 2,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "6",
  },
  {
    id: 3,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "6",
  },
  {
    id: 4,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "5",
  },
  {
    id: 5,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "5",
  },
  {
    id: 6,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "3",
  },{
    id: 7,
    username: "Angeleen Darunday",
    img: profile,
    email: "noreenswan@gmail.com",
    many: "2",
  },
]

function TopBox(){
  return(
    <div className='topBox '>
      <h1 className='text-xl font-bold mb-5'>Top Users with Most Formatted Computers</h1>
      <div className='list'>
        {dataUsers.map(user =>(
          <div className='listItem flex items-center justify-between mb-8' key={user.id}>
            <div className='user flex gap-5'>
              <img className='w-10 h-10 object-cover rounded-full' src={user.img} alt="User"/>
                <div className="userText flex flex-col gap-1">
                  <span className='username text-sm font-medium'>{user.username}</span>
                  <span className='email text-xs'>{user.email}</span>
                </div>
            </div>
            <span className='bcode font-medium' style={{color: user.many <5 ? "limegreen" : "tomato"}}>{user.many}</span>
            </div>
        ))}
      </div>
    </div>
  );
}

const chartBoxUser = {
  color: "#ffff00",
  icon: <FontAwesomeIcon icon={faUsers}/>,
  title: "Total Users",
  number: "168",
  dataKey: "Users",
  percentage: 45,
  chartData: [
    { name: "Sun", Users: 400},
    { name: "Mon", Users: 600},
    { name: "Tue", Users: 500},
    { name: "Wed", Users: 700},
    { name: "Thu", Users: 400},
    { name: "Fri", Users: 500},
    { name: "Sat", Users: 450},
  ],
};

const chartBoxComputer = {
  color: "brown",
  icon: <FontAwesomeIcon icon={faComputer}/>,
  title: "Total Computers",
  number: "238",
  dataKey: "Computers",
  percentage: 21,
  chartData: [
    { name: "Sun", Computers: 400},
    { name: "Mon", Computers: 600},
    { name: "Tue", Computers: 500},
    { name: "Wed", Computers: 700},
    { name: "Thu", Computers: 400},
    { name: "Fri", Computers: 500},
    { name: "Sat", Computers: 450},
  ],
};

const chartBox1 = {
  color: "#000080",
  icon: <FontAwesomeIcon icon={faDesktop}/>,
  title: "Total Units",
  number: "274",
  dataKey: "Units",
  percentage: 25,
  chartData: [
    { name: "Sun", Units: 400},
    { name: "Mon", Units: 600},
    { name: "Tue", Units: 500},
    { name: "Wed", Units: 700},
    { name: "Thu", Units: 400},
    { name: "Fri", Units: 500},
    { name: "Sat", Units: 450},
  ],
};

const chartBox2 = {
  color: "orange",
  icon: <FontAwesomeIcon icon={faNoteSticky}/>,
  title: "Total Remarks",
  number: "250",
  dataKey: "Remarks",
  percentage: 12,
  chartData: [
    { name: "Sun", Remarks: 400},
    { name: "Mon", Remarks: 600},
    { name: "Tue", Remarks: 500},
    { name: "Wed", Remarks: 700},
    { name: "Thu", Remarks: 400},
    { name: "Fri", Remarks: 500},
    { name: "Sat", Remarks: 450},
  ],
};

function ChartBox(props){
  return(
    <div className='chartBox flex h-full'>
        <div className="boxInfo flex flex-col justify-between" style={{flex: '3'}}>
        <div className="title flex items-center gap-2">
          <p className='text-white'>{props.icon}</p>
          <span className='text-base font-medium text-white'>{props.title}</span>
        </div>
        <h1 className='text-xl font-bold text-white'>{props.number}</h1>
        <Link to = "#" style={{color:'white'}}>View All</Link>
        </div>
        <div className="chartInfo flex flex-col justify-between" style={{flex: '2'}}>
          <div className="chart h-full w-full">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
              contentStyle={{background: "transparent", border: "none"}}
              labelStyle={{display: "none"}}
              position={{x:10, y:60}}
              />
              <Line type="monotone" dataKey={props.dataKey} stroke={props.color} strokeWidth={2}
              dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          </div>
          <div className="text flex flex-col text-right">
            <span className='percentage font-bold text-xl' style={{color:props.color}}>{props.percentage}%</span>
            <span className="duration text-sm text-white">This Month</span>
          </div>
        </div>
    </div>
  );
}

const barChartBoxProfit = {
  title: "Weekly Visits",
  color: "indigo",
  dataKey: "Visits",
  chartData: [
    {
    name: "Sun",
    Visits: 4000,
    },
    {
    name: "Mon",
    Visits: 5000,
    },
    {
    name: "Tue",
    Visits: 2300,
    },
    {
    name: "Wed",
    Visits: 1570,
    },
    {
    name: "Thu",
    Visits: 3245,
    },
    {
    name: "Fri",
    Visits: 1500,
    },
    {
    name: "Sat",
    Visits: 2000,
    },
  ],
};

const barChartBoxVisit = {
  title: "Weekly Remarks",
  color: "#ff8042",
  dataKey: "Remarks",
  chartData: [
    {
    name: "Sun",
    Remarks: 4000,
    },
    {
    name: "Mon",
    Remarks: 5000,
    },
    {
    name: "Tue",
    Remarks: 2300,
    },
    {
    name: "Wed",
    Remarks: 1570,
    },
    {
    name: "Thu",
    Remarks: 3245,
    },
    {
    name: "Fri",
    Remarks: 1500,
    },
    {
    name: "Sat",
    Remarks: 2000,
    },
  ],
};

function  BarChartBox(props){
  return(
    <div className="barChartBox w-full h-full">
        <h1 className='text-xl mb-3'>{props.title}</h1>
        <div className="chart">
        <ResponsiveContainer width="99%" height={120}>
          <BarChart data={props.chartData}>
            <Tooltip
            contentStyle={{background: "white", borderRadius:"5px"}}
            labelStyle={{display: "none"}}
            cursor= {{fill:"none"}}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
}


const data = [
  { name: "Using", value: 400, color: "#008bf2"},
  { name: "New", value: 300, color: "#00c49f"},
  { name: "Vacant", value: 300, color: "#ffbb28"},
  { name: "Defective", value: 200, color: "#ff8042"},
];

function PieChartBox(){
  return(
    <div className="pieChartBox h-full flex flex-col justify-between">
        <h1 className='text-2xl font-bold'>Status</h1>
        <div className="chart flex items-center justify-center w-full h-full">
          <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
            contentStyle={{background: "white", borderRadius:"5px"}}
            />
        <Pie
          data={data}
          innerRadius={"70%"}
          outerRadius={"90%"}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((item) => (
            <Cell key={item.name} fill={item.color} />
          ))}
        </Pie>
        </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="options flex justify-between gap-3 text-sm">
          {data.map(item =>(
            <div className="option flex flex-col gap-3 items-center" key={item.name}>
              <div className="title flex gap-3 items-center">
                <div className='dot w-3 h-3 rounded-full' style={{backgroundColor:item.color}}/>
                <span>{item.name}</span>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
    </div>
  );
}

const data1 = [
  {
    name: 'Page A',
    set: 4000,
    unit: 2400,
    users: 2400,
  },
  {
    name: 'Page B',
    set: 3000,
    unit: 1398,
    users: 2210,
  },
  {
    name: 'Page C',
    set: 2000,
    unit: 9800,
    users: 2290,
  },
  {
    name: 'Page D',
    set: 2780,
    unit: 3908,
    users: 2000,
  },
  {
    name: 'Page E',
    set: 1890,
    unit: 4800,
    users: 2181,
  },
  {
    name: 'Page F',
    set: 2390,
    unit: 3800,
    users: 2500,
  },
  {
    name: 'Page G',
    set: 3490,
    unit: 4300,
    users: 2100,
  },
];

function BigChartBox(){
  return(
    <div className="bigChartBox w-full h-full flex flex-col justify-between">
        <h1 className='text-2xl font-bold'>Analytics</h1>
        <div className="chart w-full h-80">
        <ResponsiveContainer width="99%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data1}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis/>
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="set"
            stackId="1"
            stroke='#8884d8'
            fill='#8884d8'
          />
          <Area
            type="monotone"
            dataKey="unit"
            stackId="1"
            stroke='#82ca9d'
            fill='#82ca9d'
          />
          <Area
            type="monotone"
            dataKey="users"
            stackId="1"
            stroke='#ffc658'
            fill='#ffc658'
          />
        </AreaChart>
      </ResponsiveContainer>
        </div>
    </div>
  );
}


function Dashboard() {
  return (
    <div className='grid gap-5 grid-cols-4' style={{gridAutoRows: 'minmax(180px, auto)'}}>
      <div className='p-5 rounded-xl bg-blue-100 border border-gray-100 col-span-1 row-span-3'>
      <TopBox/>
      </div>
      <div className='p-5 rounded-xl bg-green-500 border border-gray-100'><ChartBox {...chartBoxUser}/></div>
      <div className='p-5 rounded-xl bg-rose-500 border border-gray-100'><ChartBox {...chartBox1}/></div>
      <div className='p-5 rounded-xl bg-blue-100 border border-gray-100 col-span-1 row-span-3'><PieChartBox/></div>
      <div className='p-5 rounded-xl bg-amber-500 border border-gray-100'><ChartBox {...chartBoxComputer}/></div>
      <div className='p-5 rounded-xl bg-blue-500 border border-gray-100'><ChartBox {...chartBox2}/></div>
      <div className='p-5 rounded-xl bg-blue-100 border border-gray-100 col-span-2 row-span-2'><BigChartBox/></div>
      <div className='p-5 rounded-xl bg-blue-100 border border-gray-100'><BarChartBox {...barChartBoxVisit}/></div>
      <div className='p-5 rounded-xl bg-blue-100 border border-gray-100'><BarChartBox {...barChartBoxProfit}/></div>
    </div>
  )
}

export default Dashboard;
