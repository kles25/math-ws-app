import React, { useState } from "react";
import { jsPDF } from "jspdf";

function QuadraticEquationConverter() {
    const [equations, setEquations] = useState([]);
    const [convertedEquations, setConvertedEquations] = useState([]);
    const [difficulty, setDifficulty] = useState(""); // State for selected difficulty
    const [conversionType, setConversionType] = useState("standardToVertex");
    const [activeDifficulty, setActiveDifficulty] = useState("");

    // Function to generate random quadratic equations in standard form
    const generateStandardFormEquations = (difficulty) => {
        let minCoefficient = 1;
        let maxCoefficient = 10;
        if (difficulty === "easy") {
            maxCoefficient = 5;
        } else if (difficulty === "medium") {
            minCoefficient = 6;
            maxCoefficient = 15;
        } else if (difficulty === "hard") {
            minCoefficient = 11;
            maxCoefficient = 20;
        }

        const randomCoefficient = () =>
            Math.floor(Math.random() * (maxCoefficient - minCoefficient + 1)) +
            minCoefficient;
        const newEquations = [];
        const newConvertedEquations = [];

        for (let i = 0; i < 10; i++) {
            const a = randomCoefficient();
            const b = randomCoefficient();
            const c = randomCoefficient();

            const h = -b / (2 * a);
            const k = c - b ** 2 / (4 * a);

            const equation = `y = ${a}x² + ${b}x + ${c}`;
            const convertedEquation = `y = ${a}(x - ${h})² + ${k}`;

            newEquations.push(equation);
            newConvertedEquations.push(convertedEquation);
        }

        setEquations(newEquations);
        setConvertedEquations(newConvertedEquations);
        localStorage.setItem(
            "equations",
            JSON.stringify({
                equations: newEquations,
                convertedEquations: newConvertedEquations,
            })
        );
    };

    // Function to generate random quadratic equations in vertex form
    const generateVertexFormEquations = (difficulty) => {
        let minCoefficient = 1;
        let maxCoefficient = 10;
        if (difficulty === "easy") {
            maxCoefficient = 5;
        } else if (difficulty === "medium") {
            minCoefficient = 6;
            maxCoefficient = 15;
        } else if (difficulty === "hard") {
            minCoefficient = 11;
            maxCoefficient = 20;
        }

        const randomCoefficient = () =>
            Math.floor(Math.random() * (maxCoefficient - minCoefficient + 1)) +
            minCoefficient;
        const newEquations = [];
        const newConvertedEquations = [];

        for (let i = 0; i < 10; i++) {
            const a = randomCoefficient();
            const h = Math.floor(Math.random() * 10); // Random number between 0 and 9 for h
            const k = Math.floor(Math.random() * 10); // Random number between 0 and 9 for k

            const b = -2 * a * h;
            const c = a * h * h + k;

            const equation = `y = ${a}(x - ${h})² + ${k}`;
            const convertedEquation = `y = ${a}x² + ${b}x + ${c}`;

            newEquations.push(equation);
            newConvertedEquations.push(convertedEquation);
        }

        setEquations(newEquations);
        setConvertedEquations(newConvertedEquations);
        localStorage.setItem(
            "equations",
            JSON.stringify({
                equations: newEquations,
                convertedEquations: newConvertedEquations,
            })
        );
    };

    const handleConversionTypeChange = (event) => {
        const newConversionType = event.target.value;
        setConversionType(newConversionType);
    };

    const handleDifficultyChange = (difficulty) => {
        setActiveDifficulty(difficulty);
    };

    const generateEquations = () => {
        if (conversionType === "standardToVertex") {
            generateStandardFormEquations(difficulty);
        } else {
            generateVertexFormEquations(difficulty);
        }
    };

    const generatePdf = (conversionType) => {
        const storedEquations = localStorage.getItem("equations");
        if (storedEquations) {
            const { equations, convertedEquations } =
                JSON.parse(storedEquations);
            const doc = new jsPDF();
            const fontSize = 12;
            let title = "";

            // Determine the title based on the conversion type
            if (conversionType === "standardToVertex") {
                title = "Standard to Vertex Form";
            } else if (conversionType === "vertexToStandard") {
                title = "Vertex to Standard Form";
            }

            // Function to generate content for a single section
            const generateSectionContent = (titles, contents) => {
                let sectionContent = "";
                for (let i = 0; i < titles.length; i++) {
                    sectionContent += `${titles[i]} ${contents[i]}\n\n`;
                }
                return sectionContent;
            };

            // Generate content for questions
            const questionsContent = generateSectionContent(
                equations.map((equation, index) => `${index + 1}. `),
                equations
            );

            // Generate content for converted equations
            const convertedContent = generateSectionContent(
                convertedEquations.map(
                    (convertedEquation, index) => `${index + 1}. `
                ),
                convertedEquations
            );

            // Add title for the document
            doc.setFontSize(18);
            doc.text(10, 10, title + " Equations"); // Corrected line

            // Add questions content
            doc.setFontSize(fontSize);
            doc.text(10, 20, doc.splitTextToSize(questionsContent, 90));

            // Add a new page for converted equations
            doc.addPage();

            // Add title for converted equations
            doc.setFontSize(18);
            doc.text(10, 10, "Answer");

            // Add converted equations content
            doc.setFontSize(fontSize);
            doc.text(10, 20, doc.splitTextToSize(convertedContent, 90));

            doc.save("equations.pdf");
        }
    };

    return (
        <>
            <h2>
                {conversionType === "standardToVertex"
                    ? "Standard to Vertex Form Worksheets Generator"
                    : "Vertex to Standard Form Worksheets Generator"}
            </h2>
            <select
                value={conversionType}
                onChange={handleConversionTypeChange}
            >
                <option value="standardToVertex">Standard to Vertex</option>
                <option value="vertexToStandard">Vertex to Standard</option>
            </select>
            <div className="button-difficulty-holder">
                <button
                    className={activeDifficulty === "easy" ? "active" : ""}
                    onClick={() => handleDifficultyChange("easy")}
                >
                    Easy
                </button>
                <button
                    className={activeDifficulty === "medium" ? "active" : ""}
                    onClick={() => handleDifficultyChange("medium")}
                >
                    Medium
                </button>
                <button
                    className={activeDifficulty === "hard" ? "active" : ""}
                    onClick={() => handleDifficultyChange("hard")}
                >
                    Hard
                </button>
            </div>
            <button onClick={generateEquations}>Generate Equations</button>
            {equations.length > 0 && (
                <div>
                    <button onClick={() => generatePdf(conversionType)}>
                        Generate PDF
                    </button>
                    <h3>Generated Equations:</h3>
                    <ul>
                        {equations.map((equation, index) => (
                            <li key={index}>{equation}</li>
                        ))}
                    </ul>
                    <h3>Converted Equations:</h3>
                    <ul>
                        {convertedEquations.map((equation, index) => (
                            <li key={index}>{equation}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default QuadraticEquationConverter;
