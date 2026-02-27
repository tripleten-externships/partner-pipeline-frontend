import { Pie, PieChart, Tooltip, Cell, PieLabelRenderProps } from "recharts";
import React from "react";
import "./ProgramPieChartDistribution.css";

type ChartDataInput = {
    name: string;
    value: number;
}

type MockProgramDataPoint = ChartDataInput;

const data: MockProgramDataPoint[] = [
    { name: 'UX/UI', value: 100 },
    { name: 'QA', value: 200 },
    { name: 'DS', value: 250 },
    { name: 'SE', value: 300 },
    { name: 'AI', value: 350 }
]

// interface ProgramDistribtionPieChartProps {
//     data: MockProgramDataPoint[];
// }

const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, payload, midAngle, innerRadius, outerRadius } = props;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const angle = -Number(midAngle ?? 0);

    const x = cx + radius * Math.cos(angle * RADIAN);
    const y = cy + radius * Math.sin(angle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle"  dominantBaseline="central" className="piechart-text" >
            {payload.name}
        </text>
    )
};

const colors = ["#008000", "#0000FF", "#800080", "#FFC0CB", "#FFA500"]

const ProgramDistribtionPieChart: React.FC = () => {
    return(
        <PieChart width={500} height={200} >
            <Pie data={data}  dataKey="value" nameKey="name" label={renderCustomizedLabel} labelLine={false}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    )
};

export default ProgramDistribtionPieChart;