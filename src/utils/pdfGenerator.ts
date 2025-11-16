import jsPDF from 'jspdf';
import { Mission } from '@/data/missions';

export const generateMissionPDF = (mission: Mission) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const lineHeight = 7;
  let yPosition = margin;

  // Helper function to add text with automatic page breaks
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    if (yPosition > pageHeight - margin) {
      pdf.addPage();
      yPosition = margin;
    }
    
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += lineHeight;
    });
  };

  const addSection = (title: string, content: string) => {
    yPosition += 5;
    addText(title, 12, true);
    yPosition += 2;
    addText(content);
    yPosition += 3;
  };

  // Title
  pdf.setFillColor(30, 41, 59);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MISSION REPORT', margin, 25);
  
  pdf.setFontSize(14);
  pdf.text(mission.name, margin, 35);
  
  // Reset colors
  pdf.setTextColor(0, 0, 0);
  yPosition = 50;

  // Mission Details
  addSection('AGENCY', mission.agency);
  addSection('LAUNCH DATE', mission.launchDate);
  addSection('STATUS', mission.trajectory.currentStatus || 'Active');
  
  // Description
  addSection('MISSION OVERVIEW', mission.description);
  addSection('BRIEF EXPLANATION', mission.briefExplanation);
  
  // Detailed History
  if (mission.detailedHistory) {
    yPosition += 5;
    addText('DETAILED HISTORY & RESEARCH', 12, true);
    yPosition += 2;
    addText(mission.detailedHistory);
  }

  // Components
  if (mission.components && mission.components.length > 0) {
    pdf.addPage();
    yPosition = margin;
    addText('TECHNICAL COMPONENTS', 14, true);
    yPosition += 5;

    mission.components.forEach((component) => {
      yPosition += 3;
      addText(component.name, 11, true);
      addText(component.description);
      
      if (component.specifications) {
        yPosition += 2;
        addText('Specifications:', 10, true);
        const specs = component.specifications;
        
        if (specs.dimensions) addText(`  • Dimensions: ${specs.dimensions}`);
        if (specs.weight) addText(`  • Weight: ${specs.weight}`);
        if (specs.material) addText(`  • Material: ${specs.material}`);
        if (specs.manufacturer) addText(`  • Manufacturer: ${specs.manufacturer}`);
        if (specs.thrust) addText(`  • Thrust: ${specs.thrust}`);
        if (specs.fuel) addText(`  • Fuel: ${specs.fuel}`);
        if (specs.power) addText(`  • Power: ${specs.power}`);
        if (specs.operatingTemp) addText(`  • Operating Temperature: ${specs.operatingTemp}`);
      }
      
      if (component.technicalDetails) {
        yPosition += 2;
        addText('Technical Details:', 10, true);
        addText(component.technicalDetails);
      }
      
      yPosition += 5;
    });
  }

  // Trajectory
  pdf.addPage();
  yPosition = margin;
  addText('TRAJECTORY & PATH', 14, true);
  yPosition += 5;
  
  addText(mission.trajectory.description);
  
  yPosition += 3;
  addText('Flight Path Stages:', 11, true);
  mission.trajectory.path.forEach((stage, index) => {
    addText(`${index + 1}. ${stage}`);
  });

  if (mission.trajectory.landingLocation) {
    yPosition += 3;
    addText('Landing Location:', 11, true);
    addText(mission.trajectory.landingLocation);
  }

  if (mission.trajectory.coordinates) {
    yPosition += 3;
    addText('Coordinates:', 11, true);
    addText(mission.trajectory.coordinates);
  }

  // Orbital Data
  if (mission.trajectory.orbitalData) {
    pdf.addPage();
    yPosition = margin;
    addText('ORBITAL PARAMETERS', 14, true);
    yPosition += 5;

    const orbital = mission.trajectory.orbitalData;
    addText(`Altitude: ${orbital.altitude} km`);
    addText(`Inclination: ${orbital.inclination}°`);
    addText(`Orbital Period: ${orbital.period} minutes`);
    addText(`Velocity: ${orbital.velocity} km/s`);
    
    if (orbital.apogee) addText(`Apogee: ${orbital.apogee} km`);
    if (orbital.perigee) addText(`Perigee: ${orbital.perigee} km`);
    
    addText(`Last Update: ${new Date(orbital.lastUpdate).toLocaleString()}`);
  }

  // Videos section
  if (mission.videos) {
    yPosition += 10;
    addText('MISSION VIDEOS', 14, true);
    yPosition += 5;

    if (mission.videos.launch) addText(`Launch: ${mission.videos.launch}`);
    if (mission.videos.landing) addText(`Landing: ${mission.videos.landing}`);
    if (mission.videos.orbit) addText(`Orbit: ${mission.videos.orbit}`);
    if (mission.videos.mission) addText(`Mission Highlights: ${mission.videos.mission}`);
  }

  // Footer on last page
  pdf.setFontSize(8);
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `Generated on ${new Date().toLocaleString()} | Space Mission Tracker`,
    margin,
    pageHeight - 10
  );

  // Save the PDF
  pdf.save(`${mission.name.replace(/\s+/g, '_')}_Mission_Report.pdf`);
};