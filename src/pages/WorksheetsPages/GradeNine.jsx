import React from "react";
import { Link, Outlet } from "react-router-dom";

function GradeNine() {
    return (
        <div className="section-lesson-holder">
            <div className="lesson-title-holder">
                <h1>GRADE-9</h1>
            </div>
            <div className="pages-row">
                <div className="pages-col-2">
                    <div className="topics-holder">
                        <h5>Choose your topic</h5>
                        <ul>
                            <li>
                                <Link to="/worksheets/grade-nine/quadratic-equation">
                                    Quadratic Equation
                                </Link>
                            </li>
                            <li>
                                <Link to="/worksheets/grade-nine/polynomials">
                                    Polynomials
                                </Link>
                            </li>
                            <li>
                                <Link to="/worksheets/grade-nine/quadratic-functions">
                                    Quadratic Functions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="pages-col-10">
                    <div className="generator-holder">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GradeNine;
