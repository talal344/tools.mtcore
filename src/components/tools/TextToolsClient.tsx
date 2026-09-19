'use client';

import React, { useState } from 'react';
import { Tool } from '@/config/tools';
import styles from './TextToolsClient.module.css';

interface TextToolsClientProps {
  tool: Tool;
}

const TextToolsClient: React.FC<TextToolsClientProps> = ({ tool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  
  // Options for specific tools
  const [options, setOptions] = useState({
    sortOrder: 'asc', // asc, desc
    caseType: 'upper', // upper, lower, title, sentence
    generatorCount: 5,
    generatorType: 'paragraphs', // paragraphs, sentences, words
    randomLength: 16,
    randomIncludeSymbols: true,
    randomIncludeNumbers: true
  });

  const stats = React.useMemo(() => {
    const text = input || '';
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lines = text.trim() === '' ? 0 : text.split('\n').length;

    return {
      words,
      characters: chars,
      lines,
      charactersNoSpaces: charsNoSpaces
    };
  }, [input]);

  const handleAction = () => {
    let result = '';
    const text = input || '';

    switch (tool.slug) {
      case 'word-counter':
        // Stats are updated automatically, maybe we show a formatted report
        result = `Analysis Report:\n----------------\nWords: ${stats.words}\nCharacters: ${stats.characters}\nCharacters (no spaces): ${stats.charactersNoSpaces}\nLines: ${stats.lines}`;
        break;

      case 'case-converter':
        if (options.caseType === 'upper') {
          result = text.toUpperCase();
        } else if (options.caseType === 'lower') {
          result = text.toLowerCase();
        } else if (options.caseType === 'title') {
          result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        } else if (options.caseType === 'sentence') {
          result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        }
        break;

      case 'remove-duplicate-lines':
        result = Array.from(new Set(text.split('\n'))).join('\n');
        break;

      case 'text-sorter':
        const lines = text.split('\n').filter(line => line.trim() !== '');
        lines.sort((a, b) => {
          if (options.sortOrder === 'asc') return a.localeCompare(b);
          return b.localeCompare(a);
        });
        result = lines.join('\n');
        break;

      case 'text-reverser':
        result = text.split('').reverse().join('');
        break;

      case 'line-break-remover':
        result = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        break;

      case 'random-text-generator':
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                        (options.randomIncludeNumbers ? '0123456789' : '') + 
                        (options.randomIncludeSymbols ? '!@#$%^&*()_+~`|}{[]:;?><,./-=' : '');
        let randomStr = '';
        for (let i = 0; i < options.randomLength; i++) {
          randomStr += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        result = randomStr;
        break;

      case 'lorem-ipsum-generator':
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        const parts = [];
        for(let i=0; i<options.generatorCount; i++) parts.push(lorem);
        result = parts.join('\n\n');
        break;

      default:
        result = text;
    }

    setOutput(result);
  };

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    // Could add a toast here
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      console.error('Failed to read clipboard');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolHeader}>
        <div className={styles.toolTitle}>
          <span>{tool.icon}</span>
          {tool.name}
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.words}</span>
          <span className={styles.statLabel}>Words</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.characters}</span>
          <span className={styles.statLabel}>Characters</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.lines}</span>
          <span className={styles.statLabel}>Lines</span>
        </div>
      </div>

      <div className={`${styles.workArea} ${tool.slug !== 'word-counter' ? styles.split : ''}`}>
        <div className={styles.fieldGroup}>
          <div className={styles.fieldLabel}>
            <span>Input Text</span>
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={handlePaste}>Paste</button>
              <button className={styles.actionBtn} onClick={handleClear}>Clear</button>
            </div>
          </div>
          <textarea 
            className={styles.textArea} 
            placeholder="Type or paste your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {tool.slug !== 'word-counter' && (
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>
              <span>Result</span>
              <div className={styles.actions}>
                <button className={styles.actionBtn} onClick={() => copyToClipboard(output)}>Copy</button>
              </div>
            </div>
            <textarea 
              className={styles.textArea} 
              readOnly 
              placeholder="Result will appear here..."
              value={output}
            />
          </div>
        )}
      </div>

      <div className={styles.optionsSection}>
        <div className={styles.optionsTitle}>Tool Options</div>
        <div className={styles.optionsGrid}>
          {tool.slug === 'case-converter' && (
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Conversion Type</label>
              <select 
                className={styles.select}
                value={options.caseType}
                onChange={(e) => setOptions({...options, caseType: e.target.value})}
              >
                <option value="upper">UPPERCASE</option>
                <option value="lower">lowercase</option>
                <option value="title">Title Case</option>
                <option value="sentence">Sentence case</option>
              </select>
            </div>
          )}

          {tool.slug === 'text-sorter' && (
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Sort Order</label>
              <select 
                className={styles.select}
                value={options.sortOrder}
                onChange={(e) => setOptions({...options, sortOrder: e.target.value})}
              >
                <option value="asc">A-Z (Ascending)</option>
                <option value="desc">Z-A (Descending)</option>
              </select>
            </div>
          )}

          {tool.slug === 'lorem-ipsum-generator' && (
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Number of Paragraphs</label>
              <input 
                type="number" 
                className={styles.input} 
                min="1" max="50"
                value={options.generatorCount}
                onChange={(e) => setOptions({...options, generatorCount: parseInt(e.target.value)})}
              />
            </div>
          )}

          {tool.slug === 'random-text-generator' && (
            <>
              <div className={styles.optionGroup}>
                <label className={styles.optionLabel}>Length</label>
                <input 
                  type="number" 
                  className={styles.input} 
                  min="1" max="1000"
                  value={options.randomLength}
                  onChange={(e) => setOptions({...options, randomLength: parseInt(e.target.value)})}
                />
              </div>
              <div className={styles.optionGroup}>
                <label className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={options.randomIncludeNumbers}
                    onChange={(e) => setOptions({...options, randomIncludeNumbers: e.target.checked})}
                  />
                  Include Numbers
                </label>
                <label className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    className={styles.checkbox}
                    checked={options.randomIncludeSymbols}
                    onChange={(e) => setOptions({...options, randomIncludeSymbols: e.target.checked})}
                  />
                  Include Symbols
                </label>
              </div>
            </>
          )}

          <div className={styles.optionGroup}>
            <button className={`${styles.actionBtn} ${styles.primary}`} onClick={handleAction}>
              {tool.slug.includes('generator') ? 'Generate' : 'Process Text'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToolsClient;
