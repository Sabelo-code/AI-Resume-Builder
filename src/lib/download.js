import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Renders the given DOM node (the resume preview sheet) to a single- or
 * multi-page A4 PDF and triggers a browser download.
 *
 * Swap this out if you'd rather generate the PDF server-side (e.g. for
 * pixel-perfect output with a headless-Chrome/Puppeteer backend) — just
 * keep the same `downloadResumeAsPdf(node, filename)` signature so the
 * "Download PDF" button in the preview column doesn't need to change.
 */
export async function downloadResumeAsPdf(node, filename = 'resume.pdf') {
  if (!node) throw new Error('Nothing to export yet.');

  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
