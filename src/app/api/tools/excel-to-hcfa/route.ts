import { NextRequest, NextResponse } from 'next/server';
import { processHcfaClaims } from '@/lib/hcfa-processor';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('files') as File;
    console.log('HCFA API: Received request, file:', file?.name, 'size:', file?.size);

    if (!file) {
      console.error('HCFA API: No file found in FormData (key: files)');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const excelBuffer = Buffer.from(await file.arrayBuffer());
    console.log('HCFA API: Excel buffer created, length:', excelBuffer.length);
    
    // Path to the HCFA template in public directory
    const templatePath = path.join(process.cwd(), 'public', 'assets', 'hcfa_template.pdf');
    console.log('HCFA API: Looking for template at:', templatePath);
    
    if (!fs.existsSync(templatePath)) {
      console.error('HCFA API: Template NOT found at:', templatePath);
      return NextResponse.json({ 
        error: `HCFA Template missing on server at ${templatePath}. Please ensure public/assets/hcfa_template.pdf exists.` 
      }, { status: 500 });
    }

    const templateBuffer = fs.readFileSync(templatePath);
    console.log('HCFA API: Template read, starts processing claims...');
    const resultBuffer = await processHcfaClaims(excelBuffer, templateBuffer);
    console.log('HCFA API: Processing complete, result size:', resultBuffer.length);

    // Determine if it's a ZIP or PDF based on processing logic
    // (Our processor returns a ZIP buffer if > 1 page, or PDF buffer if 1 page)
    // Actually, to be safe and match user expectation of "zip folder is downloaded",
    // we should check the first few bytes of the buffer for "PK" (ZIP header)
    const isZip = resultBuffer.toString('hex', 0, 2) === '504b'; // 'PK' in hex

    const headers = new Headers();
    if (isZip) {
      headers.set('Content-Type', 'application/zip');
      headers.set('Content-Disposition', 'attachment; filename="hcfa_claims.zip"');
    } else {
      headers.set('Content-Type', 'application/pdf');
      headers.set('Content-Disposition', 'attachment; filename="hcfa_claim.pdf"');
    }

    return new NextResponse(new Uint8Array(resultBuffer), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Conversion error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
