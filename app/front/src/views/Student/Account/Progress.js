import React,{useState, useEffect} from "react";
import Badge from "../../../components/badge/badge";
import "../../../styles/progress.css";
import SidebarProgress from "../../../components/sidebar/sidebarProgress";
import MenuBar from "../../../components/navbar/MenuBar";
import useBadges from "../../../hooks/api/useBadges";

const Progress = () => {

    const [badges, setBadges] = useState([]);
    const {loading, error, handleGetAll} = useBadges();

    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setBadges(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);



    return (
        <div className="main-container">
            <div className="main-content isMenu isSidebar">
                <MenuBar items={[
                    {
                        name: "Mes informations",
                        link: "/account"
                    },
                    {
                        name: "Ma progression",
                        link: "/account/progression"
                    },
                    {
                        name: "Mentions légales",
                        link: "/account/mentions-legales"
                    }]}/>
                <div className={"container-padding"}>
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
                        <h2>Les badges</h2>

                        <div className={"badge-list"}>
                            {
                                badges.map((item, index) => {
                                    return (
                                        <Badge key={index} name={item.category} image={item.badgeImage.contentUrl} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <SidebarProgress />
        </div>
    );
}

export default Progress;
