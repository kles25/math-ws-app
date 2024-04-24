import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/Logo-LI2.png";
import { Link } from "react-router-dom";

const navLinks = [
    { path: "/worksheets/grade-one", label: "Grade", icon: "1st" },
    { path: "/worksheets/grade-two", label: "Grade", icon: "2nd" },
    { path: "/worksheets/grade-three", label: "Grade", icon: "3rd" },
    { path: "/worksheets/grade-four", label: "Grade", icon: "4th" },
    { path: "/worksheets/grade-five", label: "Grade", icon: "5th" },
    { path: "/worksheets/grade-six", label: "Grade", icon: "6th" },
    { path: "/worksheets/grade-seven", label: "Grade", icon: "7th" },
    { path: "/worksheets/grade-eight", label: "Grade", icon: "8th" },
    { path: "/worksheets/grade-nine", label: "Grade", icon: "9th" },
    { path: "/worksheets/grade-ten", label: "Grade", icon: "10th" },
];

function WorksheetNavigation() {
    const [activeLink, setActiveLink] = useState(
        localStorage.getItem("activeLink") || "/worksheets"
    );

    const handleNavClick = (link) => {
        setActiveLink(link);
        localStorage.setItem("activeLink", link);
    };

    useEffect(() => {
        // Add event listener to handle browser refresh
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("activeLink", activeLink);
        });
        return () => {
            window.removeEventListener("beforeunload", () => {
                localStorage.setItem("activeLink", activeLink);
            });
        };
    }, [activeLink]);
    return (
        <>
            <div className="logo-holder">
                <img src={Logo} alt="" />
            </div>
            <div className="links-holder">
                {navLinks.map(({ path, label, icon }, index) => (
                    <Link
                        to={path}
                        key={index}
                        className={` ${activeLink === path ? "active" : ""}`}
                        onClick={() => handleNavClick(path)}
                    >
                        <span>{icon}</span>
                        {label}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default WorksheetNavigation;
