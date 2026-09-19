'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './PdfMergerClient.module.css';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';

interface FileItem {
  id: string;
  file: File;
  pageCount?: number;
}

interface SortableFileCardProps {
  id: string;
  file: File;
  pageCount?: number;
  onRemove: (id: string) => void;
}

const SortableFileCard: React.FC<SortableFileCardProps> = ({ 
  id, 
  file, 
  pageCount, 
  onRemove, 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.fileCard}
    >
      <button 
        className={styles.removeBtn} 
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onRemove(id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        title="Remove file"
      >
        ×
      </button>
      
      <div 
        className={styles.cardContent}
        {...attributes}
        {...listeners}
      >
        <div className={styles.preview}>
          {/* Static PDF Icon Replacement */}
          <div className={styles.staticIconWrapper}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.pdfIcon}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          
          {pageCount !== undefined && (
            <div className={styles.pageCountBadge}>
              {pageCount} {pageCount === 1 ? 'Page' : 'Pages'}
            </div>
          )}
        </div>
        <div className={styles.fileName}>{file.name}</div>
      </div>
    </div>
  );
};

interface PdfMergerClientProps {
  onMergeStart?: () => void;
}

const PdfMergerClient: React.FC<PdfMergerClientProps> = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFiles = (incomingFiles: FileList | File[]) => {
    const pdfFiles = Array.from(incomingFiles).filter(file => file.type === 'application/pdf');
    if (pdfFiles.length === 0) return;

    const newFiles = pdfFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsMerging(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(p => (p < 90 ? p + 5 : p));
    }, 200);

    try {
      const formData = new FormData();
      files.forEach(({ file }) => formData.append('files', file));

      const response = await fetch('/api/tools/pdf-merger', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to merge PDFs');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged_document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Sharing failed';
      alert(errorMessage);
    } finally {
      clearInterval(interval);
      setIsMerging(false);
    }
  };

  return (
    <div 
      className={`${styles.container} ${isDraggingOver ? styles.dragging : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isMerging && <ProgressBar progress={progress} label="Merging your PDFs..." />}
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.fileList}>
          <SortableContext
            items={files.map(f => f.id)}
            strategy={horizontalListSortingStrategy}
          >
            {files.map((fileItem) => (
              <SortableFileCard
                key={fileItem.id}
                id={fileItem.id}
                file={fileItem.file}
                pageCount={fileItem.pageCount}
                onRemove={removeFile}
              />
            ))}
          </SortableContext>
          
          <label className={styles.addCard}>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div className={styles.addContent}>
              <div className={styles.plusIcon}>+</div>
              <div className={styles.addText}>Add More PDFs</div>
            </div>
          </label>
        </div>
      </DndContext>

      <div className={styles.actions}>
        <Button 
          variant="primary" 
          className={styles.pdfTheme} 
          disabled={files.length < 2 || isMerging}
          onClick={handleMerge}
        >
          <svg style={{ marginRight: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          </svg>
          Merge & Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PdfMergerClient;
