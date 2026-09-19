import React from 'react';
import styles from './ToolLayout.module.css';
import Link from 'next/link';
import Button from '../shared/Button';
import ProgressBar from '../shared/ProgressBar';

interface ToolLayoutProps {
  name: string;
  description: string;
  icon: string;
  category: string;
  children?: React.ReactNode;
  onFileSelect?: (file: File) => void;
  isProcessing?: boolean;
  progress?: number;
  downloadSampleUrl?: string; // New prop for sample download
  hideDropZone?: boolean; // New prop to hide default dropzone
  steps?: string[]; // New prop for custom steps
  isFullWidth?: boolean; // Enables edge-to-edge layout by removing sidebars
}
const ToolLayout: React.FC<ToolLayoutProps> = ({ 
  name, 
  description, 
  icon, 
  category, 
  children,
  onFileSelect,
  isProcessing,
  progress = 0,
  downloadSampleUrl,
  hideDropZone,
  steps,
  isFullWidth
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.breadcrumbs}>
            <Link href="/" className={styles.crumb}>Home</Link>
            <span className={styles.separator}>/</span>
            <Link href="/tools" className={styles.crumb}>Tools</Link>
            <span className={styles.separator}>/</span>
            <span className={styles.activeCrumb}>{name}</span>
          </nav>
          
          <div className={styles.titleSection}>
            <div className={styles.iconBox}>{icon}</div>
            <div className={styles.titleInfo}>
              <span className={styles.category}>{category}</span>
              <h1 className={styles.title}>{name}</h1>
              <p className={styles.desc}>{description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className={`${styles.main} ${isFullWidth ? styles.fullWidthMain : 'container'}`}>
        <div className={styles.toolArea}>
          {!hideDropZone && (
            <div className={`${styles.dropZone} ${isProcessing ? styles.processing : ''}`}>
              <input 
                type="file" 
                ref={fileInputRef} 
                className={styles.hiddenInput} 
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
              />
              <div className={styles.dropZoneContent}>
                {isProcessing ? (
                  <div className={styles.loader}>
                    <ProgressBar progress={progress} label="Generating HCFA Forms..." />
                    <p>Please wait, our engine is working on it.</p>
                  </div>
                ) : (
                  <>
                    <svg className={styles.uploadIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <h3>Drag and drop your file here</h3>
                    <p>Excel or CSV files accepted</p>
                    
                    <div className={styles.actions}>
                      <Button variant="primary" onClick={handleSelectClick}>Select File</Button>
                      {downloadSampleUrl && (
                        <a href={downloadSampleUrl} download className={styles.downloadSample}>
                          <Button variant="outline" size="sm" className={styles.excelTheme}>
                            <svg className={styles.btnIcon} width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.5 2L1 5V19L14.5 22V2Z" fill="currentColor"/>
                              <path d="M16 5V7H23V5H16ZM16 9V11H23V9H16ZM16 13V15H23V13H16ZM16 17V19H23V17H16Z" fill="currentColor"/>
                              <path d="M4.5 9L7 12L4.5 15H6.5L7.5 13.5L8.5 15H10.5L8 12L10.5 9H8.5L7.5 10.5L6.5 9H4.5Z" fill="#fff"/>
                            </svg>
                            Download Sample
                          </Button>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {children}
          
          {!isFullWidth && (
            <div className={styles.infoSection}>
              <h2>About this tool</h2>
              <p>
                This is a professional-grade processing tool designed for high efficiency and precision. 
                Our system ensures that your data remains private and secure throughout the entire process.
              </p>
              
              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.check}>✓</span>
                  <span>Secure SSL encryption</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.check}>✓</span>
                  <span>Automatic data deletion</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.check}>✓</span>
                  <span>High precision output</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {!isFullWidth && (
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3>How it works</h3>
              <ol className={styles.steps}>
                {steps ? (
                  steps.map((step, idx) => <li key={idx}>{step}</li>)
                ) : (
                  <>
                    <li>Upload your source file securely.</li>
                    <li>Wait for our engine to process the data.</li>
                    <li>Download your converted or processed file.</li>
                  </>
                )}
              </ol>
            </div>
            
            <div className={styles.premiumBox}>
              <h3 className="futuristic">Pro Engine</h3>
              <p>Need to process large batches? Check out our Enterprise features.</p>
              <Button variant="outline" size="sm">Learn More</Button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default ToolLayout;
