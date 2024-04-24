import React, { useState } from "react";
import { jsPDF } from "jspdf";

function QuadraticEquationConverter() {
    const [equations, setEquations] = useState([]);
    const [convertedEquations, setConvertedEquations] = useState([]);
    const [conversionType, setConversionType] = useState("standardToVertex"); // Default to standard to vertex conversion

    // Function to generate random quadratic equations in standard form
    const generateStandardFormEquations = () => {
        const randomCoefficient = () => Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
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
    const generateVertexFormEquations = () => {
        const randomCoefficient = () => Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
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

    const generateEquations = () => {
        let equationsToPdf = { equations: [], convertedEquations: [] };
        let conversionTypeString =
            conversionType === "standardToVertex"
                ? "Standard to Vertex"
                : "Vertex to Standard";
        if (conversionType === "standardToVertex") {
            generateStandardFormEquations();
            equationsToPdf.equations = [...equations];
        } else {
            generateVertexFormEquations();
            equationsToPdf.convertedEquations = [...equations];
        }
        generatePdf(conversionTypeString); // Call generatePdf with the updated conversion type string
        localStorage.setItem("equations", JSON.stringify(equationsToPdf));
    };

    const generatePdf = (conversionType) => {
        const storedEquations = localStorage.getItem("equations");
        if (storedEquations) {
            const { equations, convertedEquations } =
                JSON.parse(storedEquations);
            const doc = new jsPDF();
            const fontSize = 12;
            const lineHeight = (1.5 * fontSize) / doc.internal.scaleFactor;

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
                equations.map((equation, index) => `Question ${index + 1}: `),
                equations
            );

            // Generate content for converted equations
            const convertedContent = generateSectionContent(
                convertedEquations.map(
                    (convertedEquation, index) => `Answer ${index + 1}: `
                ),
                convertedEquations
            );

            // Add title for questions
            doc.setFontSize(18);
            doc.text(10, 10, `${conversionType} Equations`);

            // Add questions content
            doc.setFontSize(fontSize);
            doc.text(10, 20, doc.splitTextToSize(questionsContent, 90), {
                lineHeight,
            });

            // Add a new page for converted equations
            doc.addPage();

            // Add title for converted equations
            doc.setFontSize(18);
            doc.text(10, 10, "Answer");

            // Add converted equations content
            doc.setFontSize(fontSize);
            doc.text(10, 20, doc.splitTextToSize(convertedContent, 90), {
                lineHeight,
            });

            doc.save("equations.pdf");
        }
    };

    return (
        <div>
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
            <button onClick={generateEquations}>Generate 10 Equations</button>
            {equations.length > 0 && (
                <div>
                    <h3>Generated Equations:</h3>
                    <ul>
                        {equations.map((equation, index) => (
                            <li
                                key={index}
                                dangerouslySetInnerHTML={{ __html: equation }}
                            />
                        ))}
                    </ul>
                    <h3>Converted Equations:</h3>
                    <ul>
                        {convertedEquations.map((equation, index) => (
                            <li
                                key={index}
                                dangerouslySetInnerHTML={{ __html: equation }}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default QuadraticEquationConverter;
