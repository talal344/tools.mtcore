import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const fileType = file.type;

      let image;
      if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else if (fileType === 'image/png') {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        continue; // Skip non-image files
      }

      const { width, height } = image.scale(1);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted_images.pdf"',
      },
    });
  } catch (error) {
    console.error('JPG to PDF Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to convert images to PDF: ' + message },
      { status: 500 }
    );
  }
}
