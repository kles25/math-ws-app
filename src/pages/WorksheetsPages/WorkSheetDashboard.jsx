import React from "react";
import WorksheetNavigation from "../../components/WorksheetDashboard/WorksheetNavigation";
import { Outlet } from "react-router-dom";

function WorkSheetDashboard() {
    return (
        <div className="pages-container">
            <div className="pages-row">
                <div className="pages-col-2">
                    <div className="dashboard-navigation-holder">
                        <WorksheetNavigation />
                    </div>
                </div>
                <div className="pages-col-10">
                    <div className="pages-row">
                        <div className="pages-col-12">
                            <div className="dashboard-header-holder"></div>
                        </div>
                        <div className="pages-col-12">
                            <div className="dashboard-section-holder">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkSheetDashboard;
