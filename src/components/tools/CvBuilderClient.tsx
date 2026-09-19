'use client';

import React, { useState } from 'react';
import styles from './CvBuilderClient.module.css';
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface XP { id: string; title: string; company: string; location: string; dates: string; responsibilities: string; }
interface Edu { id: string; degree: string; major: string; university: string; location: string; graduationYear: string; }
interface Cert { id: string; name: string; org: string; year: string; }
interface Project { id: string; name: string; description: string; url: string; date: string; }
interface Profile { id: string; network: string; username: string; url: string; }
interface Language { id: string; name: string; fluency: string; }
interface Interest { id: string; name: string; }
interface Award { id: string; title: string; date: string; awarder: string; summary: string; }
interface Publication { id: string; name: string; publisher: string; date: string; url: string; summary: string; }
interface Volunteer { id: string; organization: string; position: string; url: string; startDate: string; endDate: string; summary: string; }

const FONTS = [
  'Inter', 'IBM Plex Serif', 'Roboto', 'Outfit', 'Montserrat', 'Open Sans', 'Lato', 'Poppins', 'Playfair Display', 'Merriweather',
  'Source Sans Pro', 'Raleway', 'Lora', 'PT Sans', 'PT Serif', 'Nunito', 'Mukta', 'Ubuntu', 'Zilla Slab', 'Inconsolata',
  'Quicksand', 'Josefin Sans', 'Arvo', 'Work Sans', 'Libre Baskerville', 'Cormorant Garamond', 'Fira Sans', 'Overpass', 'Karla', 'Bitter',
  'Crimson Text', 'Spectral', 'DM Sans', 'Manrope', 'Lexend', 'Space Grotesk', 'Public Sans', 'BioRhyme', 'EB Garamond', 'Faustina',
  'Fragment Mono', 'Geologica', 'Golos Text', 'Hanken Grotesk', 'Instrument Sans', 'Instrument Serif', 'Jost', 'Kumbh Sans', 'Libre Franklin', 'Nanum Myeongjo',
  'Noto Sans', 'Noto Serif', 'Onest', 'Plus Jakarta Sans', 'Red Hat Display', 'Sarabun', 'Schibsted Grotesk', 'Sora', 'Syne', 'Urbanist',
  'Victor Mono', 'Young Serif', 'Afacad', 'Alice', 'Amiri', 'Assistant', 'Barlow', 'Bebas Neue', 'Cabin', 'Cairo',
  'Cardo', 'Chivo', 'Cinzel', 'Comfortaa', 'Courier Prime', 'Crete Round', 'Dancing Script', 'Didact Gothic', 'Domine', 'Dosis',
  'Exo 2', 'Fira Code', 'Frank Ruhl Libre', 'Heebo', 'Hind', 'Italiana', 'Kanit', 'Krub', 'Libre Caslon Text', 'Lobster',
  'Maven Pro', 'Monda', 'NewsCycle', 'Old Standard TT', 'Orbitron', 'Oswald', 'Oxygen', 'Pacifico', 'Pathway Gothic One', 'Philosopher',
  'Playball', 'Prata', 'Prompt', 'Questrial', 'RaleWay Dots', 'Righteous', 'Rokkitt', 'Ruda', 'Russo One', 'Satisfy',
  'Shadows Into Light', 'Signika', 'Sintony', 'Snippet', 'Special Elite', 'Staatliches', 'Tangerine', 'Teko', 'Tenor Sans', 'Titillium Web',
  'Volkhov', 'Vollkorn', 'Yeseva One'
];

const TEMPLATE_DATA = [
  { id: 'onyx', name: "Onyx (Modern)", colors: ['#000000', '#333333'], ats: true },
  { id: 'pikachu', name: "Pikachu (Creative)", colors: ['#fbbf24', '#d97706'], ats: false },
  { id: 'gengar', name: "Gengar (Professional)", colors: ['#4c1d95', '#2e1065'], ats: true },
  { id: 'glalie', name: "Glalie (Sleek)", colors: ['#1e293b', '#0f172a'], ats: true },
  { id: 'kakuna', name: "Kakuna (Simple)", colors: ['#16a34a', '#15803d'], ats: true },
  { id: 'lapras', name: "Lapras (Ocean)", colors: ['#2563eb', '#1e40af'], ats: true },
  { id: 'leafish', name: "Leafish (Nature)", colors: ['#65a30d', '#4d7c0f'], ats: true },
  { id: 'rhyhorn', name: "Rhyhorn (Bold)", colors: ['#7c2d12', '#431407'], ats: true },
  { id: 'azurill', name: "Azurill (Soft)", colors: ['#60a5fa', '#2563eb'], ats: true },
  { id: 'bronzor', name: "Bronzor (Tech)", colors: ['#475569', '#1e293b'], ats: true },
  { id: 'chikorita', name: "Chikorita (Fresh)", colors: ['#4ade80', '#16a34a'], ats: true },
  { id: 'ditto', name: "Ditto (Clean)", colors: ['#f472b6', '#db2777'], ats: true },
  { id: 'ditgar', name: "Ditgar (Hybrid)", colors: ['#6366f1', '#4338ca'], ats: true },
];

const SortableItem = ({ id, label }: { id: string; label: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={styles.sortableItem}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '10px', opacity: 0.5 }}><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
      {label}
    </div>
  );
};

const CvBuilderClient = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeSection, setActiveSection] = useState('basics');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('onyx');
  const [resumeTitle, setResumeTitle] = useState('Untitled Resume');
  const [error, setError] = useState<string | null>(null);
  const [rightPaneTab, setRightPaneTab] = useState('templates');
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  
  const [typography, setTypography] = useState({
    bodyFont: 'Inter',
    bodySize: '10',
    bodyLineHeight: '1.5',
    headingFont: 'Inter',
    headingSize: '14',
    headingLineHeight: '1.5'
  });

  const [design, setDesign] = useState({
    primaryColor: '#2563eb',
    textColor: '#1f2937',
    backgroundColor: '#ffffff',
    sidebarWidth: 30
  });

  const [layoutOrder, setLayoutOrder] = useState([
    'summary', 'profiles', 'experience', 'education', 'projects', 
    'skills', 'languages', 'interests', 'awards', 'certs', 
    'publications', 'volunteer', 'references'
  ]);

  const [history, setHistory] = useState<unknown[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const pushHistory = (data: unknown) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(data)));
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevOrder = historyIndex - 1;
      setFormData(JSON.parse(JSON.stringify(history[prevOrder])));
      setHistoryIndex(prevOrder);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextOrder = historyIndex + 1;
      setFormData(JSON.parse(JSON.stringify(history[nextOrder])));
      setHistoryIndex(nextOrder);
    }
  };

  React.useEffect(() => {
    // Initial history push
    if (history.length === 0) {
      pushHistory(formData);
    }
  }, []);

  React.useEffect(() => {
    const fontsSet = new Set([typography.bodyFont, typography.headingFont]);
    const fontsToLoad = Array.from(fontsSet)
      .filter(f => !['Inter', 'Arial', 'sans-serif', 'serif', 'system-ui'].includes(f));
    
    if (fontsToLoad.length > 0) {
      const linkId = 'google-fonts-cv-builder';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?${fontsToLoad.map(f => `family=${f.replace(/ /g, '+')}:wght@400;700`).join('&')}&display=swap`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typography.bodyFont, typography.headingFont]);

  const [formData, setFormData] = useState({
    personal: { fullName: '', title: '', phone: '', email: '', linkedin: '', address: '', portfolio: '', picture: '' },
    experience: [] as XP[],
    education: [] as Edu[],
    skills: { technical: '', soft: '' },
    projects: [] as Project[],
    profiles: [] as Profile[],
    languages: [] as Language[],
    interests: [] as Interest[],
    awards: [] as Award[],
    certifications: [] as Cert[],
    publications: [] as Publication[],
    volunteer: [] as Volunteer[],
    references: 'References available upon request',
    aiSummary: ''
  });

  const SECTIONS = [
    { id: 'picture', label: 'Picture', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> },
    { id: 'basics', label: 'Basics', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    { id: 'summary', label: 'Summary', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { id: 'profiles', label: 'Profiles', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> },
    { id: 'experience', label: 'Experience', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> },
    { id: 'education', label: 'Education', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg> },
    { id: 'projects', label: 'Projects', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> },
    { id: 'skills', label: 'Skills', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> },
    { id: 'languages', label: 'Languages', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
    { id: 'interests', label: 'Interests', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
    { id: 'awards', label: 'Awards', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> },
    { id: 'certs', label: 'Certifications', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="8" x2="17" y2="8"></line><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="16" x2="12" y2="16"></line></svg> },
    { id: 'publications', label: 'Publications', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> },
    { id: 'volunteer', label: 'Volunteer', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> },
    { id: 'references', label: 'References', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setLayoutOrder((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUnlock = () => {
    if (passwordInput === 'talal344') { setIsUnlocked(true); setError(null); }
    else { setError('Incorrect password.'); }
  };

  const handleGenerateAI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tools/cv-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: `POLISH_CV mode. Data: ${JSON.stringify(formData)}.` }] }),
      });
      const data = await response.json();
      const polishedData = JSON.parse(data.content);
      
      const newFormData = { ...formData, ...polishedData };
      pushHistory(newFormData);
      setFormData(newFormData);
    } catch { 
      setError('AI error.'); 
    }
    finally { setIsLoading(false); }
  };

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tools/cv-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'EXPORT_PDF', formData, template: selectedTemplate }),
      });
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Failed to generate PDF' }));
        throw new Error(errData.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeTitle || 'Resume'}.pdf`;
      a.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch { 
      setError('Failed to download PDF.'); 
    }
    finally { setIsLoading(false); }
  };

  const handlePrint = () => {
     const printContent = document.getElementById('resume-preview');
     if (!printContent) return;
     const win = window.open('', '_blank');
     win?.document.write(`<html><head><title>${resumeTitle}</title><style>body{margin:0;} .doc{padding:20mm;font-family:serif;}</style></head><body><div class="doc">${printContent.innerHTML}</div></body></html>`);
     win?.document.close();
     win?.print();
  };

  if (!isUnlocked) {
    return (
      <div className={styles.lockOverlay}>
        <div className={styles.lockCard}>
          <div className={styles.statusBadge}>UNDER DEVELOPMENT</div>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔐</div>
          <h2 className={styles.lockTitle}>AI CV Builder & ATS Reviewer</h2>
          <p className={styles.lockDetail}>
             Create high-impact, ATS-friendly resumes powered by AI. 
             Complete with 15 professional sections and real-time score auditing.
          </p>
          <div className={styles.lockForm}>
            <input 
              type="password" 
              className={styles.lockInput} 
              placeholder="Enter Access Password" 
              value={passwordInput} 
              onChange={e => setPasswordInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleUnlock()} 
            />
            <button className={styles.lockBtn} onClick={handleUnlock}>Unlock Tool</button>
          </div>
          {error && <p className={styles.lockError}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {error && (
        <div className={styles.errorBanner}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <span>{error}</span>
          <button className={styles.closeError} onClick={() => setError(null)}>×</button>
        </div>
      )}
      <header className={styles.toolbar}>
        <div className={styles.resumeInfo}>
          <input className={styles.resumeTitleInput} value={resumeTitle} onChange={e => setResumeTitle(e.target.value)} />
        </div>
        <div className={styles.toolbarActions}>
          <div className={styles.historyActions}>
            <button className={styles.iconBtn} onClick={undo} disabled={historyIndex <= 0} title="Undo (Ctrl+Z)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-15 9 9 0 0 0-6 2.3L3 13"/></svg>
            </button>
            <button className={styles.iconBtn} onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo (Ctrl+Y)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-15 9 9 0 0 1 6 2.3L21 13"/></svg>
            </button>
          </div>
          <button className={styles.secondaryBtn} onClick={handlePrint}>🖨️ Print</button>
          <button className={styles.secondaryBtn} onClick={handleGenerateAI} disabled={isLoading}>✨ AI Polish</button>
          <button className={styles.primaryBtn} onClick={handleDownloadPDF} disabled={isLoading}>Download PDF</button>
        </div>
      </header>

      <main className={styles.mainLayout}>
        <section className={styles.editorPane}>
          <div className={styles.sidebarIcons}>
            {SECTIONS.map(section => (
              <div key={section.id} className={`${styles.navIcon} ${activeSection === section.id ? styles.active : ''}`} onClick={() => setActiveSection(section.id)} title={section.label}>
                {section.icon}
              </div>
            ))}
          </div>
          <div className={styles.sectionContent}>
            <h2 className={styles.sectionTitle}>{SECTIONS.find(s => s.id === activeSection)?.label.toUpperCase()}</h2>
            <p className={styles.sectionDesc}>Edit your {activeSection} information below.</p>
            
            {activeSection === 'picture' && (
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}><label className={styles.label}>Picture URL</label><input className={styles.input} placeholder="https://example.com/photo.jpg" value={formData.personal.picture} onChange={e => setFormData({...formData, personal: {...formData.personal, picture: e.target.value}})} /></div>
              </div>
            )}

            {activeSection === 'basics' && (
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}><label className={styles.label}>Full Name</label><input className={styles.input} value={formData.personal.fullName} onChange={e => setFormData({...formData, personal: {...formData.personal, fullName: e.target.value}})} /></div>
                <div className={styles.formGroupFull}><label className={styles.label}>Title</label><input className={styles.input} value={formData.personal.title} onChange={e => setFormData({...formData, personal: {...formData.personal, title: e.target.value}})} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Email</label><input className={styles.input} value={formData.personal.email} onChange={e => setFormData({...formData, personal: {...formData.personal, email: e.target.value}})} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Phone</label><input className={styles.input} value={formData.personal.phone} onChange={e => setFormData({...formData, personal: {...formData.personal, phone: e.target.value}})} /></div>
                <div className={styles.formGroupFull}><label className={styles.label}>Website</label><input className={styles.input} value={formData.personal.portfolio} onChange={e => setFormData({...formData, personal: {...formData.personal, portfolio: e.target.value}})} /></div>
              </div>
            )}
            
            {activeSection === 'summary' && (
              <div className={styles.formGrid}>
                 <div className={styles.formGroupFull}><label className={styles.label}>Professional Summary</label><textarea className={styles.textarea} style={{ minHeight: '200px' }} value={formData.aiSummary} onChange={e => setFormData({...formData, aiSummary: e.target.value})} /></div>
              </div>
            )}
            {activeSection === 'profiles' && (
              <div>
                {formData.profiles.map((profile, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.profiles]; n.splice(idx, 1); setFormData({...formData, profiles: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Network</label><input className={styles.input} placeholder="LinkedIn" value={profile.network} onChange={e => { const n = [...formData.profiles]; n[idx].network = e.target.value; setFormData({...formData, profiles: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Username</label><input className={styles.input} placeholder="johndoe" value={profile.username} onChange={e => { const n = [...formData.profiles]; n[idx].username = e.target.value; setFormData({...formData, profiles: n})}} /></div>
                      <div className={styles.formGroupFull}><label className={styles.label}>URL</label><input className={styles.input} placeholder="https://..." value={profile.url} onChange={e => { const n = [...formData.profiles]; n[idx].url = e.target.value; setFormData({...formData, profiles: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, profiles: [...formData.profiles, {id: Date.now().toString(), network:'', username:'', url:''}]})}>+ Add Profile</button>
              </div>
            )}

            {activeSection === 'experience' && (
              <div>
                {formData.experience.map((exp, idx) => (
                  <div key={exp.id} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => setFormData({...formData, experience: formData.experience.filter(e => e.id !== exp.id)})}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Role</label><input className={styles.input} value={exp.title} onChange={e => { const n = [...formData.experience]; n[idx].title = e.target.value; setFormData({...formData, experience: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Employer</label><input className={styles.input} value={exp.company} onChange={e => { const n = [...formData.experience]; n[idx].company = e.target.value; setFormData({...formData, experience: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Location</label><input className={styles.input} value={exp.location} onChange={e => { const n = [...formData.experience]; n[idx].location = e.target.value; setFormData({...formData, experience: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Date Range</label><input className={styles.input} placeholder="Jan 2020 - Present" value={exp.dates} onChange={e => { const n = [...formData.experience]; n[idx].dates = e.target.value; setFormData({...formData, experience: n})}} /></div>
                      <div className={styles.formGroupFull}><label className={styles.label}>Details (AI Polished)</label><textarea className={styles.textarea} value={exp.responsibilities} onChange={e => { const n = [...formData.experience]; n[idx].responsibilities = e.target.value; setFormData({...formData, experience: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, experience: [...formData.experience, {id: Date.now().toString(), title:'', company:'', location:'', dates:'', responsibilities:''}]})}>+ Add Experience</button>
              </div>
            )}

            {activeSection === 'education' && (
              <div>
                {formData.education.map((edu, idx) => (
                  <div key={edu.id} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => setFormData({...formData, education: formData.education.filter(e => e.id !== edu.id)})}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Degree</label><input className={styles.input} value={edu.degree} onChange={e => { const n = [...formData.education]; n[idx].degree = e.target.value; setFormData({...formData, education: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>School</label><input className={styles.input} value={edu.university} onChange={e => { const n = [...formData.education]; n[idx].university = e.target.value; setFormData({...formData, education: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Location</label><input className={styles.input} value={edu.location} onChange={e => { const n = [...formData.education]; n[idx].location = e.target.value; setFormData({...formData, education: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Year</label><input className={styles.input} value={edu.graduationYear} onChange={e => { const n = [...formData.education]; n[idx].graduationYear = e.target.value; setFormData({...formData, education: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, education: [...formData.education, {id: Date.now().toString(), degree:'', major:'', university:'', location:'', graduationYear:''}]})}>+ Add Education</button>
              </div>
            )}

            {activeSection === 'projects' && (
              <div>
                {formData.projects.map((proj, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.projects]; n.splice(idx, 1); setFormData({...formData, projects: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Project Name</label><input className={styles.input} value={proj.name} onChange={e => { const n = [...formData.projects]; n[idx].name = e.target.value; setFormData({...formData, projects: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Link</label><input className={styles.input} value={proj.url} onChange={e => { const n = [...formData.projects]; n[idx].url = e.target.value; setFormData({...formData, projects: n})}} /></div>
                      <div className={styles.formGroupFull}><label className={styles.label}>Description</label><textarea className={styles.textarea} value={proj.description} onChange={e => { const n = [...formData.projects]; n[idx].description = e.target.value; setFormData({...formData, projects: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, projects: [...formData.projects, {id: Date.now().toString(), name:'', url:'', description:'', date:''}]})}>+ Add Project</button>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}><label className={styles.label}>Technical Skills (Comma separated)</label><textarea className={styles.textarea} placeholder="React, Node.js, Python..." value={formData.skills.technical} onChange={e => setFormData({...formData, skills: {...formData.skills, technical: e.target.value}})} /></div>
                <div className={styles.formGroupFull}><label className={styles.label}>Soft Skills</label><textarea className={styles.textarea} placeholder="Leadership, Communication..." value={formData.skills.soft} onChange={e => setFormData({...formData, skills: {...formData.skills, soft: e.target.value}})} /></div>
              </div>
            )}

            {activeSection === 'languages' && (
              <div>
                {formData.languages.map((lang, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.languages]; n.splice(idx, 1); setFormData({...formData, languages: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Language</label><input className={styles.input} value={lang.name} onChange={e => { const n = [...formData.languages]; n[idx].name = e.target.value; setFormData({...formData, languages: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Fluency</label><input className={styles.input} placeholder="Native, Fluent, etc." value={lang.fluency} onChange={e => { const n = [...formData.languages]; n[idx].fluency = e.target.value; setFormData({...formData, languages: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, languages: [...formData.languages, {id: Date.now().toString(), name:'', fluency:''}]})}>+ Add Language</button>
              </div>
            )}

            {activeSection === 'interests' && (
              <div>
                {formData.interests.map((int, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.interests]; n.splice(idx, 1); setFormData({...formData, interests: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroupFull}><label className={styles.label}>Interest Name</label><input className={styles.input} value={int.name} onChange={e => { const n = [...formData.interests]; n[idx].name = e.target.value; setFormData({...formData, interests: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, interests: [...formData.interests, {id: Date.now().toString(), name:''}]})}>+ Add Interest</button>
              </div>
            )}

            {activeSection === 'awards' && (
              <div>
                {formData.awards.map((award, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.awards]; n.splice(idx, 1); setFormData({...formData, awards: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Award Title</label><input className={styles.input} value={award.title} onChange={e => { const n = [...formData.awards]; n[idx].title = e.target.value; setFormData({...formData, awards: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Awarding Org</label><input className={styles.input} value={award.date} onChange={e => { const n = [...formData.awards]; n[idx].date = e.target.value; setFormData({...formData, awards: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, awards: [...formData.awards, {id: Date.now().toString(), title:'', date:'', awarder:'', summary:''}]})}>+ Add Award</button>
              </div>
            )}

            {activeSection === 'certs' && (
              <div>
                {formData.certifications.map((cert, idx) => (
                  <div key={cert.id} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => setFormData({...formData, certifications: formData.certifications.filter(c => c.id !== cert.id)})}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Certification Name</label><input className={styles.input} value={cert.name} onChange={e => { const n = [...formData.certifications]; n[idx].name = e.target.value; setFormData({...formData, certifications: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Issuer</label><input className={styles.input} value={cert.org} onChange={e => { const n = [...formData.certifications]; n[idx].org = e.target.value; setFormData({...formData, certifications: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, certifications: [...formData.certifications, {id: Date.now().toString(), name:'', org:'', year:''}]})}>+ Add Certification</button>
              </div>
            )}

            {activeSection === 'publications' && (
              <div>
                {formData.publications.map((pub, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.publications]; n.splice(idx, 1); setFormData({...formData, publications: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroupFull}><label className={styles.label}>Publication Title</label><input className={styles.input} value={pub.name} onChange={e => { const n = [...formData.publications]; n[idx].name = e.target.value; setFormData({...formData, publications: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Publisher</label><input className={styles.input} value={pub.publisher} onChange={e => { const n = [...formData.publications]; n[idx].publisher = e.target.value; setFormData({...formData, publications: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Year</label><input className={styles.input} value={pub.date} onChange={e => { const n = [...formData.publications]; n[idx].date = e.target.value; setFormData({...formData, publications: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, publications: [...formData.publications, {id: Date.now().toString(), name:'', publisher:'', date:'', url:'', summary:''}]})}>+ Add Publication</button>
              </div>
            )}

            {activeSection === 'volunteer' && (
              <div>
                {formData.volunteer.map((v, idx) => (
                  <div key={idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.volunteer]; n.splice(idx, 1); setFormData({...formData, volunteer: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Organization</label><input className={styles.input} value={v.organization} onChange={e => { const n = [...formData.volunteer]; n[idx].organization = e.target.value; setFormData({...formData, volunteer: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Role</label><input className={styles.input} value={v.position} onChange={e => { const n = [...formData.volunteer]; n[idx].position = e.target.value; setFormData({...formData, volunteer: n})}} /></div>
                    </div>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => setFormData({...formData, volunteer: [...formData.volunteer, {id: Date.now().toString(), organization:'', position:'', url:'', startDate:'', endDate:'', summary:''}]})}>+ Add Volunteer Experience</button>
              </div>
            )}

            {activeSection === 'references' && (
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}><label className={styles.label}>References</label><textarea className={styles.textarea} style={{ minHeight: '150px' }} value={formData.references} onChange={e => setFormData({...formData, references: e.target.value})} /></div>
              </div>
            )}
          </div>
        </section>

        <section className={styles.previewPane}>
          <div className={styles.cvDocument} id="resume-preview" style={{ 
            fontFamily: `${typography.bodyFont}, sans-serif`, 
            fontSize: `${Number(typography.bodySize)}pt`,
            lineHeight: typography.bodyLineHeight,
            color: design.textColor,
            backgroundColor: design.backgroundColor,
            borderColor: design.primaryColor
          }}>
            <header className={styles.docHeader} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', borderBottomColor: design.primaryColor }}>
              {formData.personal.picture && (
                <img src={formData.personal.picture} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
              )}
              <div style={{ flex: 1 }}>
                <h1 className={styles.docName} style={{ fontFamily: `${typography.headingFont}, sans-serif`, fontSize: `${Number(typography.headingSize) * 2}pt`, color: design.primaryColor }}>{formData.personal.fullName || 'YOUR NAME'}</h1>
                <p className={styles.docTitle} style={{ fontSize: `${Number(typography.headingSize)}pt` }}>{formData.personal.title || 'Professional Title'}</p>
                <div className={styles.docContact}>
                  {formData.personal.email && <span>{formData.personal.email}</span>}
                  {formData.personal.phone && <span>{formData.personal.phone}</span>}
                  {formData.personal.portfolio && <span>{formData.personal.portfolio}</span>}
                </div>
              </div>
            </header>

            {layoutOrder.map(sectionId => {
              if (sectionId === 'summary' && formData.aiSummary) {
                return (
                  <div key="summary" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Summary</h2>
                    <div className={styles.docContent}>{formData.aiSummary}</div>
                  </div>
                );
              }
              if (sectionId === 'profiles' && formData.profiles.length > 0) {
                return (
                  <div key="profiles" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Profiles</h2>
                    <div className={styles.docContact}>
                      {formData.profiles.map((p, i) => (
                        <span key={i}>{p.network}: {p.username}</span>
                      ))}
                    </div>
                  </div>
                );
              }
              if (sectionId === 'experience' && formData.experience.length > 0) {
                return (
                  <div key="experience" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Experience</h2>
                    {formData.experience.map(exp => (
                      <div key={exp.id} className={styles.docItem}>
                        <div className={styles.docItemHeader}><span>{exp.title}</span><span>{exp.dates}</span></div>
                        <div className={styles.docSubHeader}><span>{exp.company}</span> | <span>{exp.location}</span></div>
                        <div className={styles.docContent}>{exp.responsibilities}</div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'education' && formData.education.length > 0) {
                return (
                  <div key="education" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Education</h2>
                    {formData.education.map(edu => (
                      <div key={edu.id} className={styles.docItem}>
                        <div className={styles.docItemHeader}><span>{edu.degree}</span><span>{edu.graduationYear}</span></div>
                        <div className={styles.docSubHeader}><span>{edu.university}</span> | <span>{edu.location}</span></div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'projects' && formData.projects.length > 0) {
                return (
                  <div key="projects" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Projects</h2>
                    {formData.projects.map((proj, i) => (
                      <div key={i} className={styles.docItem}>
                        <div className={styles.docItemHeader}><span>{proj.name}</span><span>{proj.url}</span></div>
                        <div className={styles.docContent}>{proj.description}</div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'skills' && (formData.skills.technical || formData.skills.soft)) {
                return (
                  <div key="skills" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Skills</h2>
                    <div className={styles.docContent}>
                      {formData.skills.technical && <p><strong>Technical:</strong> {formData.skills.technical}</p>}
                      {formData.skills.soft && <p><strong>Soft:</strong> {formData.skills.soft}</p>}
                    </div>
                  </div>
                );
              }
              if (sectionId === 'languages' && formData.languages.length > 0) {
                return (
                  <div key="languages" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Languages</h2>
                    <div className={styles.docContact}>
                      {formData.languages.map((l, i) => (
                        <span key={i}>{l.name} ({l.fluency})</span>
                      ))}
                    </div>
                  </div>
                );
              }
              if (sectionId === 'awards' && formData.awards.length > 0) {
                 return (
                  <div key="awards" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Awards</h2>
                    {formData.awards.map((a, i) => (
                      <div key={i} className={styles.docItemHeader}><span>{a.title}</span><span>{a.date}</span></div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'certs' && formData.certifications.length > 0) {
                return (
                  <div key="certs" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Certifications</h2>
                    {formData.certifications.map(c => (
                      <div key={c.id} className={styles.docSubHeader}><span>{c.name}</span> | <span>{c.org}</span></div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'publications' && formData.publications.length > 0) {
                return (
                  <div key="publications" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Publications</h2>
                    {formData.publications.map((pb, i) => (
                      <div key={i} className={styles.docItem}>
                        <div className={styles.docItemHeader}><span>{pb.name}</span><span>{pb.date}</span></div>
                        <div className={styles.docSubHeader}><span>{pb.publisher}</span></div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'volunteer' && formData.volunteer.length > 0) {
                return (
                  <div key="volunteer" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>Volunteer</h2>
                    {formData.volunteer.map((v, i) => (
                      <div key={i} className={styles.docItemHeader}><span>{v.position}</span><span>{v.organization}</span></div>
                    ))}
                  </div>
                );
              }
              if (sectionId === 'references' && formData.references) {
                 return (
                  <div key="references" className={styles.docSection}>
                    <h2 className={styles.docSectionTitle} style={{ color: design.primaryColor, borderBottomColor: design.primaryColor, fontSize: `${Number(typography.headingSize)}pt` }}>References</h2>
                    <div className={styles.docContent}>{formData.references}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </section>

        <section className={styles.settingsPane}>
          <div className={styles.settingsHeader}>
            <h3 className={styles.settingsTitle}>
              {rightPaneTab === 'templates' && 'Templates'}
              {rightPaneTab === 'layout' && 'Layout'}
              {rightPaneTab === 'typography' && 'Typography'}
              {rightPaneTab === 'design' && 'Design'}
            </h3>
          </div>

          <div className={styles.settingsContent}>
            {rightPaneTab === 'templates' && (
              <div className={styles.templateGrid}>
                {TEMPLATE_DATA.slice(0, showAllTemplates ? TEMPLATE_DATA.length : 3).map(t => (
                  <div key={t.id} className={`${styles.templateCard} ${selectedTemplate === t.id ? styles.active : ''}`} onClick={() => setSelectedTemplate(t.id)}>
                    <div className={styles.templatePreviewPlaceholder}>
                       <img src={`https://placehold.co/400x565/000000/ffffff?text=${t.name.split(' ')[0]}`} alt={t.name} />
                    </div>
                    <div className={styles.templateInfo}>
                      <div className={styles.templateName}>{t.name}</div>
                      <div className={styles.swatchContainer}>{t.colors.map(c => <div key={c} className={styles.swatch} style={{ background: c }}></div>)}</div>
                    </div>
                  </div>
                ))}
                <button className={styles.showMoreBtn} onClick={() => setShowAllTemplates(!showAllTemplates)}>
                  {showAllTemplates ? 'Show Less' : 'Show More +'}
                </button>
              </div>
            )}

            {rightPaneTab === 'layout' && (
              <div className={styles.layoutEditor}>
                <div className={styles.atsOverlayMini}>
                   <span>ATS SCORE</span>
                   <span className={styles.atsScoreMini}>85</span>
                </div>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={layoutOrder} strategy={verticalListSortingStrategy}>
                    {layoutOrder.map(id => (
                      <SortableItem key={id} id={id} label={SECTIONS.find(s => s.id === id)?.label || id} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>
            )}

            {rightPaneTab === 'typography' && (
              <div className={styles.typographyPanel}>
                <div className={styles.settingsGroup}>
                  <h4 className={styles.groupLabel}>Body</h4>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Font Family</label>
                    <select className={styles.input} value={typography.bodyFont} onChange={e => setTypography({...typography, bodyFont: e.target.value})}>
                      {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGridCompact}>
                    <div className={styles.formGroup}><label className={styles.label}>Size (pt)</label><input type="number" className={styles.input} value={typography.bodySize} onChange={e => setTypography({...typography, bodySize: e.target.value})} /></div>
                    <div className={styles.formGroup}><label className={styles.label}>Line Height</label><input type="text" className={styles.input} value={typography.bodyLineHeight} onChange={e => setTypography({...typography, bodyLineHeight: e.target.value})} /></div>
                  </div>
                </div>
                <div className={styles.settingsGroup}>
                  <h4 className={styles.groupLabel}>Heading</h4>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Font Family</label>
                    <select className={styles.input} value={typography.headingFont} onChange={e => setTypography({...typography, headingFont: e.target.value})}>
                      {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGridCompact}>
                    <div className={styles.formGroup}><label className={styles.label}>Size (pt)</label><input type="number" className={styles.input} value={typography.headingSize} onChange={e => setTypography({...typography, headingSize: e.target.value})} /></div>
                    <div className={styles.formGroup}><label className={styles.label}>Line Height</label><input type="text" className={styles.input} value={typography.headingLineHeight} onChange={e => setTypography({...typography, headingLineHeight: e.target.value})} /></div>
                  </div>
                </div>
              </div>
            )}

            {rightPaneTab === 'design' && (
              <div className={styles.designPanel}>
                <div className={styles.settingsGroup}>
                  <h4 className={styles.groupLabel}>Colors</h4>
                   <div className={styles.colorPalette}>
                    {['#2563eb', '#db2777', '#059669', '#7c3aed', '#ea580c', '#000000'].map(c => (
                      <div key={c} className={`${styles.colorCircle} ${design.primaryColor === c ? styles.activeColor : ''}`} style={{ backgroundColor: c }} onClick={() => setDesign({...design, primaryColor: c})}></div>
                    ))}
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Primary Color</label>
                    <input type="color" className={styles.colorPicker} value={design.primaryColor} onChange={e => setDesign({...design, primaryColor: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Text Color</label>
                    <input type="color" className={styles.colorPicker} value={design.textColor} onChange={e => setDesign({...design, textColor: e.target.value})} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Background Color</label>
                    <input type="color" className={styles.colorPicker} value={design.backgroundColor} onChange={e => setDesign({...design, backgroundColor: e.target.value})} />
                  </div>
                </div>
                <div className={styles.settingsGroup}>
                   <h4 className={styles.groupLabel}>Sidebar Width</h4>
                   <input type="range" min="20" max="50" value={design.sidebarWidth} onChange={e => setDesign({...design, sidebarWidth: parseInt(e.target.value)})} className={styles.rangeInput} />
                   <div style={{ fontSize: '0.8rem', textAlign: 'right', marginTop: '5px' }}>{design.sidebarWidth}%</div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={styles.rightToolbar}>
          {[
            { id: 'templates', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zM14 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4zM14 12a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-7z"/></svg>, label: 'Templates' },
            { id: 'layout', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, label: 'Layout' },
            { id: 'typography', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>, label: 'Typography' },
            { id: 'design', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12c0-2 1-5 4-8s7-2 6 0z"/></svg>, label: 'Design' },
          ].map(tab => (
            <div key={tab.id} className={`${styles.toolIcon} ${rightPaneTab === tab.id ? styles.active : ''}`} onClick={() => setRightPaneTab(tab.id)} title={tab.label}>
              {tab.icon}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CvBuilderClient;
