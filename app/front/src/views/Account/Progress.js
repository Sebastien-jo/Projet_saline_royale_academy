import React from "react";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";
import Badge from "../../components/badge/badge";
import "../../styles/progress.css";
import SidebarProgress from "../../components/sidebar/sidebarProgress";

const Progress = () => {

    const test =[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="main-container">
            <div className="main-content">
                <div className="progress-container">
                    <h2>Ma progression</h2>
                    <div className={"progress"}>
                        <div className={"progress-badge"}>
                            <div className={"progress-badge-item-img"}>
                                <img src={"https://via.placeholder.com/150"} alt={"badge"} />
                            </div>
                            <div className={"progress-badge-item-level"}>17</div>

                        </div>

                        <div className={"progress-infos"}>
                            <div className={"progress-infos-item"}>
                                <div className={"progress-infos-item-title"}>Nombre de badges</div>
                                <div className={"progress-infos-item-value"}>17</div>
                            </div>

                            <div className={"progress-infos-item"}>
                                <div className={"progress-infos-item-title"}>Nombre de masterclass suivie</div>
                                <div className={"progress-infos-item-value"}>17</div>
                            </div>

                            <div className={"progress-infos-item"}>
                                <div className={"progress-infos-item-title"}>Nombre de d'instrument appris</div>
                                <div className={"progress-infos-item-value"}>3</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"badge-container"}>
                    <h2>Mes badges</h2>

                    <div className={"badge-list"}>
                        {
                            test.map((item, index) => {
                                return (
                                    <Badge key={index} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <SidebarProgress />
        </div>
    );
}

export default Progress;
