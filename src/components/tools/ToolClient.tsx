'use client';

import React, { useState } from 'react';
import ToolLayout from './ToolLayout';
import { Tool } from '@/config/tools';
import PdfMergerClient from './PdfMergerClient';
import VbaBotClient from './VbaBotClient';
import CvBuilderClient from './CvBuilderClient';
import TextToolsClient from './TextToolsClient';
import SecurityToolsClient from './SecurityToolsClient';

interface ToolClientProps {
  tool: Tool;
}

const ToolClient: React.FC<ToolClientProps> = ({ tool }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = async (file: File) => {
    // Specialized handlers for new tools
    const isOfficeToPdf = ['word-to-pdf', 'excel-to-pdf', 'ppt-to-pdf'].includes(tool.slug);
    const isJpgToPdf = tool.slug === 'jpg-to-pdf';

    if (tool.slug === 'excel-to-hcfa' || isOfficeToPdf || isJpgToPdf) {
      setIsProcessing(true);
      setProgress(0);
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + (90 - prev) * 0.1;
        });
      }, 500);

      try {
        const formData = new FormData();
        formData.append('files', file); // Use 'files' consistently

        const apiEndpoint = isOfficeToPdf ? '/api/tools/office-to-pdf' : 
                          isJpgToPdf ? '/api/tools/jpg-to-pdf' : 
                          '/api/tools/excel-to-hcfa';

        const response = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to process file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = `${tool.slug}_result.pdf`;
        if (contentDisposition && contentDisposition.includes('filename=')) {
          filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
        }
        
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setProgress(100);
        setTimeout(() => setProgress(0), 1000);
      } catch (error: unknown) {
        clearInterval(progressInterval);
        const errorMessage = error instanceof Error ? error.message : 'Processing failed';
        alert(errorMessage);
      } finally {
        clearInterval(progressInterval);
        setIsProcessing(false);
      }
    } else if (
      !['pdf-merger', 'excel-vba-bot', 'ai-cv-builder'].includes(tool.slug) && 
      tool.category !== 'Text' && 
      tool.category !== 'Security'
    ) {
      alert('This tool is currently under development. Stay tuned!');
    }
  };

  const getToolSteps = () => {
    if (tool.slug === 'excel-vba-bot') {
      return [
        "Describe your Excel tasks or automation needs in the chat.",
        "Receive a tailored VBA solution with code and explanations.",
        "Download as an automated tool (Win/Mac) or copy the code."
      ];
    }
    if (tool.slug === 'pdf-merger') {
      return [
        "Select or drag multiple PDF files into the upload area.",
        "Reorder your files by dragging cards to set the sequence.",
        "Click 'Merge PDFs' to download your combined document."
      ];
    }
    if (tool.slug === 'ai-cv-builder') {
      return [
        "Fill in your professional details across our easy 6-step form.",
        "Our AI will generate a tailored summary and polish your bullet points.",
        "Select a premium template and download your CV in PDF or Word."
      ];
    }
    return undefined; // Uses default steps in ToolLayout
  };

  return (
    <ToolLayout 
      name={tool.name} 
      description={tool.description} 
      icon={tool.icon} 
      category={tool.category}
      onFileSelect={handleFileSelect}
      isProcessing={isProcessing}
      progress={progress}
      downloadSampleUrl={tool.slug === 'excel-to-hcfa' ? '/assets/hcfa_demo.xlsx' : undefined}
      hideDropZone={['pdf-merger', 'excel-vba-bot', 'ai-cv-builder'].includes(tool.slug) || tool.category === 'Text' || tool.category === 'Security'}
      steps={getToolSteps()}
      isFullWidth={['ai-cv-builder', 'word-counter', 'case-converter', 'remove-duplicate-lines', 'text-sorter', 'text-reverser', 'line-break-remover', 'random-text-generator', 'lorem-ipsum-generator', 'password-generator', 'password-strength-checker', 'sha256-generator', 'md5-hash-generator', 'jwt-decoder'].includes(tool.slug)}
    >
      {tool.slug === 'pdf-merger' && <PdfMergerClient />}
      {tool.slug === 'excel-vba-bot' && <VbaBotClient />}
      {tool.slug === 'ai-cv-builder' && <CvBuilderClient />}
      {tool.category === 'Text' && <TextToolsClient tool={tool} />}
      {tool.category === 'Security' && <SecurityToolsClient tool={tool} />}
    </ToolLayout>
  );
};

export default ToolClient;
