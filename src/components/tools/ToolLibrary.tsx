import React from 'react';
import Link from 'next/link';
import styles from './ToolLibrary.module.css';
import { Tool } from '@/config/tools';

interface ToolLibraryProps {
  tools: Tool[];
}

const ToolIcon: React.FC<{ type: string }> = ({ type }) => {
  // Simple functional icons based on the reference image
  const getIconColor = () => {
    if (type.includes('Word')) return 'linear-gradient(135deg, #2b579a 0%, #1e3a63 100%)'; // Word Blue
    if (type.includes('Excel')) return 'linear-gradient(135deg, #217346 0%, #174d2f 100%)'; // Excel Green
    if (type.includes('PPT')) return 'linear-gradient(135deg, #d24726 0%, #a1361d 100%)'; // PPT Orange
    if (type.includes('JPG') || type.includes('Image') || type.includes('PNG')) return 'linear-gradient(135deg, #ffb900 0%, #d49a00 100%)'; // Image Yellow
    return 'linear-gradient(135deg, #ff4c4c 0%, #cc3333 100%)'; // PDF Red
  };

  const letter = type.split(' ').pop()?.charAt(0) || 'P';

  return (
    <div className={styles.iconBox} style={{ background: getIconColor() }}>
      <span className={styles.iconLetter}>{letter}</span>
    </div>
  );
};

const ToolLibrary: React.FC<ToolLibraryProps> = ({ tools }) => {
  const fromPdfTools = tools.filter(t => t.group === 'from-pdf');
  const toPdfTools = tools.filter(t => t.group === 'to-pdf');
  const textTools = tools.filter(t => t.category === 'Text');
  const securityTools = tools.filter(t => t.category === 'Security');
  const otherTools = tools.filter(t => t.group === 'other' && t.category !== 'Text' && t.category !== 'Security');

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.categoryGrid}>
        {/* Convert from PDF */}
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Convert from PDF</h2>
          <div className={styles.list}>
            {fromPdfTools.map((tool: Tool) => (
              <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.item}>
                <ToolIcon type={tool.name} />
                <span className={styles.toolName}>{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Convert to PDF */}
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>Convert to PDF</h2>
          <div className={styles.list}>
            {toPdfTools.map((tool: Tool) => (
              <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.item}>
                <ToolIcon type={tool.name} />
                <span className={styles.toolName}>{tool.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Text Tools */}
      {textTools.length > 0 && (
        <div className={styles.otherSection}>
          <h2 className={styles.columnTitle}>Text Utilities (Popular)</h2>
          <div className={styles.otherGrid}>
            {textTools.map(tool => (
              <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.otherItem}>
                <div className={styles.otherIcon}>{tool.icon}</div>
                <div className={styles.otherContent}>
                  <div className={styles.toolName}>{tool.name}</div>
                  <div className={styles.toolDesc}>{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Security Tools */}
      {securityTools.length > 0 && (
        <div className={styles.otherSection}>
          <h2 className={styles.columnTitle}>Security & Professional Tools</h2>
          <div className={styles.otherGrid}>
            {securityTools.map(tool => (
              <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.otherItem}>
                <div className={styles.otherIcon}>{tool.icon}</div>
                <div className={styles.otherContent}>
                  <div className={styles.toolName}>{tool.name}</div>
                  <div className={styles.toolDesc}>{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Others */}
      {otherTools.length > 0 && (
        <div className={styles.otherSection}>
          <h2 className={styles.columnTitle}>Data & Specialized</h2>
          <div className={styles.otherGrid}>
            {otherTools.map(tool => (
              <Link href={`/tools/${tool.slug}`} key={tool.id} className={styles.otherItem}>
                <div className={styles.otherIcon}>{tool.icon}</div>
                <div className={styles.otherContent}>
                  <div className={styles.toolName}>{tool.name}</div>
                  <div className={styles.toolDesc}>{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolLibrary;
