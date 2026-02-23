import React from "react";

import ProgramDistributionPieChart from "../ProgramPieChartDistribution/ProgramPieChartDistribution";

interface AdminStats {
    waitingCount: number;
    inactiveCount: number;
    inviteAcceptanceRate: number;
    avgResponseTimeDays: number;
    programDistribution?: Record<string, number>;
}

interface AdminInsightsProps{
    stats: AdminStats;
}

const AdminInsightsContainer: React.FC<AdminInsightsProps> = ({stats}) => {
    return(
        <div className="flex flex-col justify-center items-center bg-white text-black">
            <h1 className="text-lg font-semibold mr-[930px]">Admin Insights</h1>
            <p className="text-[#808080] mr-[755px]">Overview of waitlist health and key metrics</p>

            <div className="py-5 px-[50px]">
                <section className="flex border-solid border-[#808080] rounded-[8px] text[#808080] flex-row">
                    <ul className="w-full flex justify-between m-0 p-0  gap-[10px]">
                        <li className="border-solid border-[1px] border-[#808080] rounded-[8px] w-[525px] h-[200px] m-0 flex items-center justify-center flex-col">
                            <h2 className="font-bold text-[48px] text-black">{stats.waitingCount}</h2>
                            <p className="admin-metrics__wait-count__subtext">students are waiting</p>
                        </li>
                        <li className="border-solid border-[1px] border-[#808080] rounded-[8px] w-[525px] h-[200px] m-0 flex items-center justify-center flex-col">    
                            {/* {stats.programDistribution && Object.entries(stats.programDistribution).map(([field, count]) => ( */}
                                <div className="w-full flex justify-between m-0 p-0  gap-[10px] admin-metrics__program-dist">
                                    < ProgramDistributionPieChart/>
                                </div>

                            {/* // ))} */}
                        </li>
                    </ul>
                </section>
                <section className="pt-[10px] m-0 justify-between">
                    <ul className="flex h-full justify-between">
                        <li className="border-[1px] border-solid border-[#808080] rounded-[8px] w-[345px] flex items-center justify-center flex-col">
                            <h2 className="text-[36px] font-bold">{stats.inactiveCount}</h2>
                            <p className="admin-metrics__subtext">students are inactive</p>
                        </li>
                        <li className="border-[1px] border-solid border-[#808080] rounded-[8px] w-[345px] flex items-center justify-center flex-col">
                            <h2 className="text-[36px] font-bold">{stats.inviteAcceptanceRate}%</h2>
                            <p className="admin-metrics__subtext">Invited - accepted rate</p>
                        </li>
                        <li className="border-[1px] border-solid border-[#808080] rounded-[8px] w-[345px] flex items-center justify-center flex-col">
                            <h2 className="text-[36px] font-bold">{stats.avgResponseTimeDays}d</h2>
                            <p className="text-[#808080]">average response time</p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AdminInsightsContainer;