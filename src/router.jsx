import React, { useContext, useEffect, useState } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import WorkSheetDashboard from "./pages/WorksheetsPages/WorkSheetDashboard";
import NotFoundPage from "./pages/AlertPages/NotFoundPage";
import UnAuthorizedPage from "./pages/AlertPages/UnAuthorizedPage";
import GradeNine from "./pages/WorksheetsPages/GradeNine";
import GradeOne from "./pages/WorksheetsPages/GradeOne";
import GradeTwo from "./pages/WorksheetsPages/GradeTwo";
import GradeThree from "./pages/WorksheetsPages/GradeThree";
import GradeFour from "./pages/WorksheetsPages/GradeFour";
import GradeFive from "./pages/WorksheetsPages/GradeFive";
import GradeSix from "./pages/WorksheetsPages/GradeSix";
import GradeSeven from "./pages/WorksheetsPages/GradeSeven";
import GradeEight from "./pages/WorksheetsPages/GradeEight";
import GradeTen from "./pages/WorksheetsPages/GradeTen";
import QuadraticEquationConverter from "./components/GradeNineWorksheets/QuadraticEquation";
import Polynomials from "./components/GradeNineWorksheets/Polynomials";
import QuadraticFunctions from "./components/GradeNineWorksheets/QuadraticFunctions";
// import { AuthContext } from "./context/AuthContext";

const TIMEOUT_DURATION = 3000;

const DelayedRoute = ({ element }) => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, TIMEOUT_DURATION);

        return () => clearTimeout(timer);
    }, []);

    return showLoader ? (
        <div className="default-page-container">
            <div className="text-loader">Page Loading</div>
            <div className="loader"></div>
        </div>
    ) : (
        element
    );
};

// const PrivateRoute = ({ element }) => {
//     const { currentUser } = useContext(AuthContext); // Access currentUser from the authentication context

//     // If currentUser is null (user is not authenticated), redirect to the SigninPage
//     if (!currentUser) {
//         return <Navigate to="/signin" />;
//     }

//     // If user is authenticated, render the original element
//     return element;
// };

// const AuthRoute = ({ element }) => {
//     const { currentUser } = useContext(AuthContext); // Access currentUser from the authentication context

//     // If currentUser is not null (user is authenticated), redirect to the AdminPage
//     if (currentUser) {
//         return <Navigate to="/admin" />;
//     }

//     // If user is not authenticated, render the original element
//     return element;
// };

const router = createBrowserRouter([
    {
        path: "/",
        element: <WorkSheetDashboard />,
        children: [
            {
                path: "/",
                element: <Navigate to="/worksheets" />,
            },
            {
                path: "/worksheets",
                element: <WorkSheetDashboard />,
            },
            {
                path: "/worksheets/grade-one",
                element: <GradeOne />,
            },
            {
                path: "/worksheets/grade-two",
                element: <GradeTwo />,
            },
            {
                path: "/worksheets/grade-three",
                element: <GradeThree />,
            },
            {
                path: "/worksheets/grade-four",
                element: <GradeFour />,
            },
            {
                path: "/worksheets/grade-five",
                element: <GradeFive />,
            },
            {
                path: "/worksheets/grade-six",
                element: <GradeSix />,
            },
            {
                path: "/worksheets/grade-seven",
                element: <GradeSeven />,
            },
            {
                path: "/worksheets/grade-eight",
                element: <GradeEight />,
            },
            {
                path: "/worksheets/grade-nine",
                element: <GradeNine />,
                children: [
                    {
                        path: "/worksheets/grade-nine/quadratic-equation",
                        element: <QuadraticEquationConverter />,
                    },
                    {
                        path: "/worksheets/grade-nine/polynomials",
                        element: <Polynomials />,
                    },
                    {
                        path: "/worksheets/grade-nine/quadratic-functions",
                        element: <QuadraticFunctions />,
                    },
                ],
            },
            {
                path: "/worksheets/grade-ten",
                element: <GradeTen />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/unauthorized",
        element: <UnAuthorizedPage />,
    },
]);

export default router;
