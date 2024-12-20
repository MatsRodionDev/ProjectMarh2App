import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

// Регистрируем все компоненты Chart.js
Chart.register(...registerables);

const Reports = () => {
    const data = [
        { name: 'Project A', value: 30 },
        { name: 'Project B', value: 70 },
        { name: 'Project C', value: 50 },
    ];

    const chartData = {
        labels: data.map(item => item.name),
        datasets: [
            {
                label: 'Project Values',
                data: data.map(item => item.value),
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
        XLSX.writeFile(workbook, 'projects.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text('Project Report', 20, 20);
        data.forEach((item, index) => {
            doc.text(`${item.name}: ${item.value}`, 20, 30 + index * 10);
        });
        doc.save('projects.pdf');
    };

    return (
        <div>
            <h1>Reports</h1>
            <div>
                <button onClick={handleExportExcel}>Export to Excel</button>
                <button onClick={handleExportPDF}>Export to PDF</button>
            </div>
            <h2>Project Values Chart</h2>
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    );
};

export default Reports;