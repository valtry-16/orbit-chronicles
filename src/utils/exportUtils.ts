import jsPDF from 'jspdf';

/**
 * Export data to CSV format
 */
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export data to JSON format
 */
export const exportToJSON = (data: any, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export NEO tracking data to PDF
 */
export const exportNEOtoPDF = (neoData: any[], filename: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Title
  pdf.setFillColor(30, 41, 59);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Near-Earth Object Tracking Report', margin, 25);
  
  pdf.setFontSize(12);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, 35);
  
  pdf.setTextColor(0, 0, 0);
  yPosition = 50;

  neoData.forEach((neo, index) => {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    // NEO Header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${neo.name}`, margin, yPosition);
    yPosition += 8;

    // NEO Details
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const details = [
      `Type: ${neo.type}`,
      `Distance from Earth: ${neo.distanceFromEarth} million km`,
      `Approach Date: ${new Date(neo.approachDate).toLocaleDateString()}`,
      `Diameter: ${neo.diameter}`,
      `Velocity: ${neo.velocity} km/s`,
      `Magnitude: ${neo.magnitude}`,
      `Hazardous: ${neo.hazardous ? 'Yes' : 'No'}`
    ];

    details.forEach(detail => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(detail, margin + 5, yPosition);
      yPosition += 6;
    });

    if (neo.viewingLocation) {
      yPosition += 3;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Viewing Information:', margin + 5, yPosition);
      yPosition += 6;
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Best Time: ${neo.bestViewingTime}`, margin + 10, yPosition);
      yPosition += 6;
      pdf.text(`Location: ${neo.viewingLocation}`, margin + 10, yPosition);
      yPosition += 6;
    }

    yPosition += 10;
  });

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    'Space Mission Tracker - NEO Tracking System',
    margin,
    pageHeight - 10
  );

  pdf.save(`${filename}.pdf`);
};

/**
 * Export observation data to PDF
 */
export const exportObservationsToPDF = (observations: any[], filename: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Title
  pdf.setFillColor(30, 41, 59);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Citizen Science Observations', margin, 25);
  
  pdf.setFontSize(12);
  pdf.text(`Total Observations: ${observations.length}`, margin, 35);
  
  pdf.setTextColor(0, 0, 0);
  yPosition = 50;

  observations.forEach((obs, index) => {
    if (yPosition > pageHeight - 70) {
      pdf.addPage();
      yPosition = margin;
    }

    // Observation Header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${index + 1}. ${obs.objectName}`, margin, yPosition);
    yPosition += 8;

    // Details
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const details = [
      `Observer: ${obs.observer}`,
      `Type: ${obs.objectType}`,
      `Date: ${new Date(obs.date).toLocaleDateString()}`,
      `Location: ${obs.location}`,
      `Magnitude: ${obs.magnitude}`,
      `Status: ${obs.verified ? 'Verified' : 'Pending Verification'}`
    ];

    details.forEach(detail => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(detail, margin + 5, yPosition);
      yPosition += 6;
    });

    // Description
    yPosition += 3;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Description:', margin + 5, yPosition);
    yPosition += 6;
    pdf.setFont('helvetica', 'normal');
    
    const descLines = pdf.splitTextToSize(obs.description, pageWidth - 2 * margin - 10);
    descLines.forEach((line: string) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin + 10, yPosition);
      yPosition += 6;
    });

    yPosition += 10;
  });

  pdf.save(`${filename}.pdf`);
};