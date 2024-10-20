'use client'
import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, ChartData, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { currencyFormat } from '@/utils/currencyFormatter';

ChartJS.register(ArcElement, Tooltip);

interface BudgetItem {
    category: string;
    amount: number;
    color: string;
}

interface PieChartProps {
    data: BudgetItem[];
    limit: number;
}

export default function PieChart({ data, limit }: PieChartProps) {
    const chartRef = useRef<ChartJS<"doughnut", number[], unknown>>(null);

    const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, shadeColor(color, -15)); // Darken the color by 15%
        return gradient;
    };

    const shadeColor = (color: string, percent: number) => {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = (num >> 8 & 0x00FF) + amt,
            B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    const chartData: ChartData<'doughnut'> = {
        labels: data.map(item => item.category),
        datasets: [
            {
                data: data.map(item => item.amount),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return;
                    return createGradient(ctx, data[context.dataIndex].color);
                },
                borderWidth: 0,
            },
            {
                data: data.map(item => item.amount),
                backgroundColor: data.map(item => shadeColor(item.color, -30)), // Darker shade
                borderWidth: 0,
                offset: 3, // Creates the bevel effect
            }
        ]
    };

    const options: ChartOptions<'doughnut'> = {
        cutout: '75%',
        radius: '90%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => currencyFormat(context.raw as number)
                }
            }
        },
        layout: {
            padding: 20
        }
    };

    const totalSpent = data.reduce((sum, item) => sum + item.amount, 0);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const canvas = chart.canvas;
            const parent = canvas.parentNode as HTMLElement;
            if (parent) {
                parent.style.height = '300px';
                parent.style.width = '300px';
            }
        }
    }, []);

    return (
        <div className='relative w-full h-full'>
            <Doughnut data={chartData} options={options} ref={chartRef} />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                <div className="text-3xl font-bold">{currencyFormat(totalSpent)}</div>
                <div className="text-sm text-gray-500">of {currencyFormat(limit)} limit</div>
            </div>
        </div>
    );
};