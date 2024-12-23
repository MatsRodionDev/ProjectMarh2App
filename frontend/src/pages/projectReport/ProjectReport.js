import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { Bar, Chart } from 'react-chartjs-2';
import projectApi from "../../services/projectApi";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProjectReport = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectApi.getProjectById(id);
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchProject();
    }, [id]);

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet([project]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Project Report');
        XLSX.writeFile(workbook, 'project_report.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.text(`Project Report: ${project.name}`, 20, 20);
        doc.text(`Description: ${project.description}`, 20, 30);
        doc.text(`Deadline: ${new Date(project.deadline).toLocaleDateString()}`, 20, 40);
        doc.text(`Status: ${project.isFinished ? 'Finished' : 'In Progress'}`, 20, 50);
        doc.text(`Customer: ${project.Customer?.name || 'N/A'}`, 20, 60);
        doc.text(`Project Type: ${project.ProjectType?.name || 'N/A'}`, 20, 70);
        doc.save('project_report.pdf');
    };

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        cardHeader: {
            backgroundColor: '#007bff',
            color: 'white',
            fontWeight: 'bold',
        },
        cardBody: {
            padding: '20px',
        },
        buttonContainer: {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
        },
        button: {
            marginRight: '10px',
        },
        chartContainer: {
            marginTop: '20px',
            height: '400px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', 
        },
        chartWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
            width: '100%',
        },
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    const tasks = project.Tasks || [];
    const totalTasks = tasks.length;    
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const ongoingTasks = tasks.filter(task => task.userId !== null && !task.isCompleted).length;
    const notAssignedTasks = totalTasks - completedTasks - ongoingTasks;

    const completedChartData = {
        labels: ['Completed Tasks'],
        datasets: [
            {
                label: 'Completed Tasks',
                data: [completedTasks],
                backgroundColor: ['#28a745'],
            },
        ],
    };

    const ongoingChartData = {
        labels: ['Ongoing Tasks'],
        datasets: [
            {
                label: 'Ongoing Tasks',
                data: [ongoingTasks],
                backgroundColor: ['#ffc107'],
            },
        ],
    };

    const notAssignedChartData = {
        labels: ['Not Assigned Tasks'],
        datasets: [
            {
                label: 'Not Assigned Tasks',
                data: [notAssignedTasks],
                backgroundColor: ['#dc3545'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 16,
                    },
                },
            },
            y: {
                ticks: {
                    font: {
                        size: 16,
                    },
                },
                max: totalTasks,
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16,
                    },
                },
            },
        },
    };

    return (
        <div style={styles.container}>
            <Card>
                <Card.Header style={styles.cardHeader}>{project.name}</Card.Header>
                <Card.Body style={styles.cardBody}>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Deadline: {new Date(project.deadline).toLocaleDateString()}
                    </Card.Subtitle>
                    <Card.Text>{project.description}</Card.Text>
                    <Card.Text>
                        <strong>Status: </strong>{project.isFinished ? 'Finished' : 'In Progress'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Customer: </strong>{project.Customer?.name || 'N/A'}
                    </Card.Text>
                    <Card.Text>
                        <strong>Project Type: </strong>{project.ProjectType?.name || 'N/A'}
                    </Card.Text>
                    <div style={styles.chartWrapper}>
                        <h5>Completed Tasks</h5>
                        <div style={styles.chartContainer}>
                            <Bar data={completedChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div style={styles.chartWrapper}>
                        <h5>Ongoing Tasks</h5>
                        <div style={styles.chartContainer}>
                            <Bar data={ongoingChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div style={styles.chartWrapper}>
                        <h5>Not Assigned Tasks</h5>
                        <div style={styles.chartContainer}>
                            <Bar data={notAssignedChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <Button variant="primary" onClick={handleExportExcel} style={styles.button}>
                            Export to Excel
                        </Button>
                        <Button variant="secondary" onClick={handleExportPDF} style={styles.button}>
                            Export to PDF
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProjectReport;