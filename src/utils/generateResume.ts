import { jsPDF } from 'jspdf';

export function downloadResumePDF(data: any, lang: 'en' | 'fa' = 'en') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Background tone for top header
  doc.setFillColor(17, 19, 23); // #111317
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Accent Line
  doc.setFillColor(76, 215, 246); // #4cd7f6 cyan
  doc.rect(0, 41, pageWidth, 1.5, 'F');

  // Name
  doc.setTextColor(241, 245, 249);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(data?.meta?.author || 'Amir Hossein Baderan', margin, 16);

  // Title
  doc.setTextColor(76, 215, 246);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(
    (data?.meta?.title || 'FULL-STACK DEVELOPER / AI ENGINEER').toUpperCase(),
    margin,
    23
  );

  // Contact line
  doc.setTextColor(188, 201, 205);
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  const emailStr = data?.meta?.email || 'amirhosseinbaderan.dev@proton.me';
  const githubStr = 'github.com/amirhosseinbaderan';
  const contactText = `${emailStr}  |  ${githubStr}  |  Tehran / Remote  |  ${data?.meta?.status || 'ONLINE'}`;
  doc.text(contactText, margin, 31);

  let currentY = 52;

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 15) {
      doc.addPage();
      currentY = 20;
    }
  };

  const drawSectionTitle = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(76, 215, 246); // Cyan
    doc.text(title.toUpperCase(), margin, currentY);

    // Decorative line
    doc.setDrawColor(61, 73, 76);
    doc.setLineWidth(0.4);
    doc.line(margin, currentY + 2, margin + contentWidth, currentY + 2);
    currentY += 8;
  };

  // 1. SUMMARY
  drawSectionTitle('01 // PROFESSIONAL SUMMARY');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 44, 52);
  const summaryText = data?.about?.paragraphs?.[0] ||
    "Full-stack developer focused on backend engineering, AI systems, and understanding complex software underneath abstractions. Current work spans production APIs, model serving, vector search, and autonomous systems.";
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, currentY);
  currentY += summaryLines.length * 4.5 + 4;

  // 2. CORE FOCUS AREAS
  drawSectionTitle('02 // CORE FOCUS & ACTIVE PARADIGMS');
  if (data?.currentFocus?.modules) {
    data.currentFocus.modules.forEach((mod: any) => {
      checkPageBreak(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 19, 23);
      doc.text(`• ${mod.title} [${mod.status}]`, margin, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(70, 75, 85);
      const descLines = doc.splitTextToSize(mod.description, contentWidth - 6);
      doc.text(descLines, margin + 4, currentY + 4);
      currentY += 4 + descLines.length * 4;

      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(6, 182, 212);
      doc.text(`Tech: ${mod.tags.join(' · ')}`, margin + 4, currentY);
      currentY += 5;
    });
  }
  currentY += 2;

  // 3. PROFESSIONAL EXPERIENCE & WORKPLACES
  if (data?.experience?.items && data.experience.items.length) {
    drawSectionTitle('03 // PROFESSIONAL EXPERIENCE & WORKPLACES');
    data.experience.items.forEach((exp: any) => {
      checkPageBreak(24);
      // Role
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(17, 19, 23);
      doc.text(`${exp.role}`, margin, currentY);

      // Period & Status on right
      doc.setFont('courier', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(6, 182, 212);
      const periodStr = `${exp.period} [${exp.status}]`;
      doc.text(periodStr, pageWidth - margin, currentY, { align: 'right' });
      currentY += 4.5;

      // Company, Type & Location
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(0, 104, 122);
      const compName = `${exp.company}`;
      doc.text(compName, margin, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 110, 120);
      const metaStr = ` | ${exp.location} | ${exp.type}`;
      doc.text(metaStr, margin + doc.getTextWidth(compName) + 1, currentY);
      currentY += 4.5;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(50, 55, 65);
      const descLines = doc.splitTextToSize(exp.description, contentWidth);
      doc.text(descLines, margin, currentY);
      currentY += descLines.length * 3.8 + 1;

      // Achievements
      if (exp.achievements && exp.achievements.length) {
        exp.achievements.forEach((ach: string) => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(70, 75, 85);
          const achLines = doc.splitTextToSize(`- ${ach}`, contentWidth - 4);
          doc.text(achLines, margin + 2, currentY);
          currentY += achLines.length * 3.6;
        });
      }

      // Tech Stack
      if (exp.technologies && exp.technologies.length) {
        doc.setFont('courier', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(6, 182, 212);
        doc.text(`Tech: ${exp.technologies.join(' · ')}`, margin + 2, currentY);
        currentY += 4;
      }

      currentY += 3;
    });
    currentY += 2;
  }

  // 4. SELECTED PROJECTS
  drawSectionTitle('04 // SELECTED ARCHITECTURE & PROJECTS');
  if (data?.projects?.featured) {
    data.projects.featured.forEach((p: any) => {
      checkPageBreak(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(17, 19, 23);
      doc.text(`${p.title} (${p.category})`, margin, currentY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(70, 75, 85);
      const pDesc = doc.splitTextToSize(p.description, contentWidth);
      doc.text(pDesc, margin, currentY + 4.5);
      currentY += 4.5 + pDesc.length * 4;

      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(6, 182, 212);
      doc.text(`Stack: ${p.tags.join(' | ')}  —  Repo: github.com`, margin, currentY);
      currentY += 6;
    });
  }

  // 5. SYSTEM STACK
  drawSectionTitle('05 // TECHNICAL SYSTEM STACK');
  if (data?.stack?.groups) {
    data.stack.groups.forEach((grp: any) => {
      checkPageBreak(8);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(17, 19, 23);
      doc.text(`${grp.name}:`, margin, currentY);

      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(60, 65, 75);
      doc.text(grp.items.join(', '), margin + 50, currentY);
      currentY += 5;
    });
  }
  currentY += 4;

  // 6. CORE PRINCIPLE
  drawSectionTitle('06 // ENGINEERING PRINCIPLE');
  checkPageBreak(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(17, 19, 23);
  doc.text(`"${data?.about?.corePrinciple?.title || 'Zero Black Boxes.'}"`, margin, currentY);
  currentY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 85, 95);
  const princText = data?.about?.corePrinciple?.description ||
    "Prefer writing a pure C prototype or algorithmic simulation before delegating critical infrastructure to third-party SDKs.";
  doc.text(princText, margin, currentY);
  currentY += 8;

  // Footer page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont('courier', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(140, 150, 160);
    doc.text(
      `Amir Hossein Baderan — Systems & AI Engineer  |  Page ${i} of ${pageCount}`,
      margin,
      pageHeight - 8
    );
  }

  // Save the PDF
  doc.save('AmirHossein_Baderan_Resume.pdf');
}
