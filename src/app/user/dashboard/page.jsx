'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useState } from 'react';
import { RiCalendarLine } from 'react-icons/ri';
import { ChevronDown } from 'lucide-react';
import { FaTrophy, FaArrowRight } from 'react-icons/fa'; // Trophy icon for Rank
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'; // Up and Down arrows
import LottiePlayer from "@/components/animations/LottiePlayer";
import run from "@/components/animations/data/Hi.json"

const RecentActivity = () => {
    const activities = [
        {
            image: "/lungs.png", // Replace with actual image path
            title: "Anatomy Upper Quadrant",
            type: "Quiz",
            questionsLeft: 20,
            progress: 48,
        },
        {
            image: "/lungs.png", // Replace with actual image path
            title: "Anatomy Upper Quadrant",
            type: "Quiz",
            questionsLeft: 20,
            progress: 48,
        },
        {
            image: "/lungs.png", // Replace with actual image path
            title: "Anatomy Upper Quadrant",
            type: "Quiz",
            questionsLeft: 20,
            progress: 48,
        }
    ];

    return (
        <div className="p-6 bg-white rounded-lg border w-[300px]">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <button className="text-purple-600 text-xs flex items-center space-x-2">
                    <span>View All</span>
                    <FaArrowRight size={12} />
                </button>
            </div>

            {/* Activity List */}
            <div className="space-y-1">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 rounded-lg hover:bg-gray-100 space-y-3">
                        <img
                            src={activity.image}
                            alt={activity.title}
                            className="w-15 h-15 object-cover rounded-md"
                        />
                        <div className="flex-1">
                            <h4 className="font-semibold text-sm">{activity.title}</h4>
                            <p className="text-xs text-gray-500">{activity.type} • {activity.questionsLeft} questions left</p>
                            <div className='flex justify-between'>
                                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                    <div
                                        className="bg-green-500 h-1 rounded-full"
                                        style={{ width: `${activity.progress}%` }}
                                    />
                                </div>
                                <div className="text-xs text-right text-gray-500 ml-3">{activity.progress}%</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Leaderboard = () => {
    const leaderboardData = [
        { Rank: '1st', Name: 'Courtney Henry', Points: 4627, change: 'up' },
        { Rank: '2nd', Name: 'Jacob Jones', Points: 1746, change: 'down' },
        { Rank: '3rd', Name: 'Eleanor Pena', Points: 3015, change: 'up' },
        { Rank: '8th', Name: 'Sarthak (You)', Points: 1627, change: 'up' },
    ];

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg border w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
            <div className="space-y-4">
                {leaderboardData.map((entry, index) => (
                    <div key={index}>
                        {index === 0 && <div className={`flex items-start justify-between mb-4`}>
                            <span className="text-sm text-gray-400">Rank</span>
                            <span className="text-sm text-gray-400 w-1/3">Name</span>
                            <span className="text-sm text-gray-400">Points</span>
                        </div>}
                        <div
                            key={index}
                            className={`flex items-start justify-between`}
                        >
                            <div className="flex items-start space-x-1">
                                {entry.change === 'up' ? (
                                    <AiOutlineArrowUp className="text-green-500" size={15} />
                                ) : (
                                    <AiOutlineArrowDown className="text-red-500" size={15} />
                                )}
                                <span className="text-xs font-semibold">{entry.Rank}</span>
                            </div>
                            <div className="flex items-start space-x-2 w-1/2">
                                <div className='flex flex-col justify-center items-center'>
                                    <img
                                        src="/avatar.png"
                                        alt="Profile"
                                        className="w-7 h-7 rounded-full"
                                    /></div>
                                <div className='flex flex-col justify-center items-center'>
                                    <span className="text-xs">{entry.Name}</span>
                                </div>
                            </div>
                            <span className="text-xs text-gray-600">{entry.Points}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfileCard = () => {
    return (
        <div className="flex flex-col items-center justify-between bg-white rounded-lg border border-[#E2E8F0] p-6 w-[inherit] md:w-[inherit] lg:w-[300px]">
            <img
                src="/avatar.png"
                alt="Profile"
                className="w-30 h-30 rounded-full border-4"
            />
            <h2 className="text-lg font-semibold mt-4 text-[#232B2B]">Sarthak</h2>
            <p className="text-xs sm:text-sm text-[#687494] mt-1">Joined 2 years ago</p>
            <div className='flex w-full bg-[#F6F9FC] rounded-lg py-3 mt-4'>
                <div className='flex flex-col justify-center items-center w-1/2'>
                    <span className="font-semibold text-md sm:text-lg">8</span>
                    <div className='flex space-x-1 sm:space-x-2 mt-1'>
                        <FaTrophy className="text-yellow-500" size={16} />
                        <p className="text-xs sm:text-sm text-gray-500">Rank</p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-1/2 border-l'>
                    <span className="font-semibold text-md sm:text-lg">1,627</span>
                    <div className='flex space-x-1 sm:space-x-2 mt-1'>
                        <FaTrophy className="text-yellow-500" size={16} />
                        <p className="text-xs sm:text-sm text-gray-500">Points</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const ActivityTracker = () => {

    const activityData = [
        [1, 0, 0, 2, 0, 1, 0, 0, 0, 1, 2, 0, 1, 0, 2, 0, 1],
        [0, 0, 1, 1, 1, 0, 2, 1, 0, 0, 1, 2, 1, 0, 1, 2, 0],
        [0, 1, 0, 0, 0, 2, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 2],
        [1, 1, 0, 0, 0, 1, 1, 2, 0, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 1, 1, 2, 0, 0, 2, 1, 1, 1, 0, 0, 1, 1, 2, 0],
        [2, 0, 1, 0, 0, 1, 2, 0, 0, 2, 1, 0, 0, 1, 2, 0, 1],
        [1, 2, 1, 0, 0, 0, 1, 1, 0, 2, 1, 1, 0, 2, 1, 0, 1],
        [0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 2, 1, 1, 0, 0, 1],
        [0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 2, 1, 1, 0, 0, 1],
        [0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 2, 1, 1, 0, 0, 1],
        [0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 2, 1, 1, 0, 0, 1],
        [0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 2, 1, 1, 0, 0, 1],
    ];

    const getColor = (value) => {
        switch (value) {
            case 0:
                return 'bg-gray-200';
            case 2:
                return 'bg-green-600';
            default:
                return 'bg-gray-200';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg border mt-4 w-[70%]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Activity Tracker</h3>
                <div className="flex items-center space-x-2">
                    <button
                        className="text-gray-700 py-1 px-3 text-sm"
                    >
                        Less
                    </button>
                    <div className='flex space-x-2'>
                        <div
                            className={`w-6 h-6 rounded-sm bg-gray-200 transition-colors`}
                        ></div>
                        <div
                            className={`w-6 h-6 rounded-sm bg-green-100 transition-colors`}
                        ></div>
                        <div
                            className={`w-6 h-6 rounded-sm bg-green-300 transition-colors`}
                        ></div>
                        <div
                            className={`w-6 h-6 rounded-sm bg-green-600 transition-colors`}
                        ></div>
                    </div>
                    <button
                        className="text-gray-700 py-1 px-3 text-sm"
                    >
                        More
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-13 gap-1 mt-12">
                {/* Weekdays on the left */}
                <div className="col-span-1 flex flex-col items-start justify-between">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <div key={index} className="text-center font-semibold">{day}</div>
                    ))}
                </div>

                {/* Month names across the top */}
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, colIndex) => (
                    <div key={month} className="col-span-1 flex flex-col items-start">
                        <div className="text-center font-semibold">{month}</div>
                        {/* Here we create a grid for each month with activity squares */}
                        {activityData.map((week, rowIndex) => (
                            <div key={rowIndex} className={`w-6 h-6 rounded-sm ${getColor(week[colIndex])} mb-1`}></div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    );
};

const PerformanceChart = () => {
    const [dateRange, setDateRange] = useState('10 Jul 2024 - 16 Jul 2024');
    const [interval, setInterval] = useState('Daily');

    const data = {
        labels: ['10 Jul', '11 Jul', '12 Jul', '13 Jul', '14 Jul', '15 Jul', '16 Jul'], // Example dates
        datasets: [
            {
                label: 'Flashcard',
                data: [50, 52, 55, 60, 62, 65, 70], // Example data points
                borderColor: 'rgba(75, 0, 130, 1)', // Purple color
                backgroundColor: 'rgba(75, 0, 130, 0.1)', // Lighter purple for background
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Quiz',
                data: [30, 40, 45, 50, 55, 60, 65], // Example data points
                borderColor: 'rgba(0, 255, 255, 1)', // Light green color
                backgroundColor: 'rgba(0, 255, 255, 0.1)', // Lighter green for background
                fill: true,
                tension: 0.4,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: (tooltipItem) => {
                        return tooltipItem[0].label;
                    },
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Performance (%)',
                },
                min: 25,
                max: 100
            }
        }
    };

    return (
        <div className="flex flex-col bg-white p-6 rounded-lg border mt-4 w-[70%]">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Performance over time</h3>
                <div className="flex items-center">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-sm bg-purple-500 mr-2"></span>
                            <p className="text-xs text-gray-600">Flashcard</p>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 rounded-sm bg-teal-400 mr-2"></span>
                            <p className="text-xs text-gray-600">Quiz</p>
                        </div>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-sm p-1 rounded-r-xs ml-4">
                        <RiCalendarLine className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-xs text-gray-600">{dateRange}</span>
                    </div>
                    <div className="flex items-center border border-gray-300 border-l-0 rounded-sm rounded-l-xs py-1 px-2">
                        <p className="text-xs text-gray-600 mr-6">{interval}</p>
                        <ChevronDown size={16} className='text-gray-400' />
                    </div>
                </div>
            </div>
            <Line data={data} options={options}/>
        </div>
    );
};

const StatCard = ({ icon, count, label }) => {
    return (
        <div className={`bg-white border p-6 rounded-lg flex flex-col items-start w-full lg:w-[250px]`}>
            <div className={`text-white rounded-full mb-4 flex items-start justify-center`}>
                <img src={icon} alt="Icon" className="w-7 h-7" />
            </div>
            <p className="text-3xl font-bold mt-2">{count}</p>
            <p className="text-sm text-gray-500 mt-2">{label}</p>
        </div>
    );
};

export default function Dashboard() {
    return <div className='flex flex-col md:flex-col sm:flex-col lg:flex-row'>
        <div className='w-full'>
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-6 flex items-center justify-between w-full lg:w-[70%]">
                <div className="text-white">
                    <h2 className="text-lg font-light">Total Lessons Completed</h2>
                    <p className="text-3xl font-bold mt-2">128</p>
                </div>
                <LottiePlayer animationFile={run} width="130px" height="100px" />
                {/* <img
                    src="/bird-flying.png"
                    alt="Penguin Illustration"
                    width={150} height={150}
                /> */}
            </div>
            <div className="flex space-x-4 mt-4 gap-4 sm:flex-col lg:flex-row md:flex-row">
                <StatCard
                    icon="/message.png" // Flashcard icon
                    count={234}
                    label="My flashcards"
                />
                <StatCard
                    icon="/checklist.png" // Quiz icon
                    count={29}
                    label="Quiz Completed"
                />
                <StatCard
                    icon="/light.png" // Streak icon
                    count={200}
                    label="Longest Streak"
                />
            </div>
            <PerformanceChart />
            <ActivityTracker />
        </div>
        <div className='flex flex-col items-center'>
            <div className="flex lg:flex-col lg:gap-4 lg:items-center lg:p-4 lg:pt-0 lg:mt-0 sm:mt-4 md:mt-4">
                <ProfileCard />
                {/* <Leaderboard /> */}
            </div>
            <div className="flex space-x-4 mt-4">
                <RecentActivity />
            </div>
        </div>
    </div>
}