import React from "react";
import "./AdminInsightsContainer.css";
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
        <div className="admin-insight__container">
            <h1 className="admin-container__title">Admin Insights</h1>
            <p className="admin-container__subtitle">Overview of waitlist health and key metrics</p>

            <div className="admin-metrics__container">
                <section className="admin-metrics__top-row">
                    <ul className="admin-metrics__top-row-cards">
                        <li className="admin-metrics__top-row-card">
                            <h2 className="admin-metrics__wait-count">{stats.waitingCount}</h2>
                            <p className="admin-metrics__wait-count__subtext">students are waiting</p>
                        </li>
                        <li className="admin-metrics__top-row-card">    
                            {/* {stats.programDistribution && Object.entries(stats.programDistribution).map(([field, count]) => ( */}
                                <div className="admin-metrics__top-row-cards admin-metrics__program-dist">
                                    < ProgramDistributionPieChart/>
                                </div>

                            {/* // ))} */}
                        </li>
                    </ul>
                </section>
                <section className="admin-metrics__bottom-row">
                    <ul className="admin-metrics__bottom-row-cards">
                        <li className="admin-metrics__bottom-row-card">
                            <h2 className="admin-metrics__inactive-count">{stats.inactiveCount}</h2>
                            <p className="admin-metrics__subtext">students are inactive</p>
                        </li>
                        <li className="admin-metrics__bottom-row-card">
                            <h2 className="admin-metrics__invite-acceptance-rate">{stats.inviteAcceptanceRate}%</h2>
                            <p className="admin-metrics__subtext">Invited - accepted rate</p>
                        </li>
                        <li className="admin-metrics__bottom-row-card">
                            <h2 className="admin-metrics__avg-response-time">{stats.avgResponseTimeDays}d</h2>
                            <p className="admin-metrics__subtext">average response time</p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default AdminInsightsContainer;