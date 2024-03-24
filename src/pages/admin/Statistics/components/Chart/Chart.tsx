import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useGetJobMonthlyQuery } from '@/services/statisticApiSlice';
import { StatisticJobMonthly } from '@/types/Statistic';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartStatis = () => {
    const { data: jobMonthlyData, isLoading, isError } = useGetJobMonthlyQuery();
    const [job, setJob] = useState<StatisticJobMonthly[]>([]);

    useEffect(() => {
        if (!isLoading && !isError && jobMonthlyData?.data?.data) {
            setJob(jobMonthlyData?.data?.data);
        }
    }, [jobMonthlyData?.data?.data, isError, isLoading]);

    const data = {
        labels: job.map((item) => `Tháng ${item.month}`),
        datasets: [
            {
                label: 'Công việc',
                data: job.map((item) => item.amountJob),
                borderColor: 'rgb(0, 167, 172)',
                backgroundColor: 'rgb(0, 167, 172)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Thống Kê Công Việc Được Tạo Theo Tháng',
                font: {
                    family: `'Exo 2', sans-serif`,
                    size: 22,
                    weight: 'bold',
                },
                color: 'rgb(0, 167, 172)',
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: `'Work Sans', sans-serif`,
                        size: 15,
                    },
                    color: 'rgb(6, 20, 33)',
                },
            },
            y: {
                ticks: {
                    font: {
                        family: `'Work Sans', sans-serif`,
                        size: 14,
                    },
                    color: 'rgb(89, 89, 89)',
                },
            },
        },
        elements: {
            point: {
                radius: 6,
            },
        },
    };

    return (
        <div className="w-full">
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartStatis;
