'use client';
/* eslint-disable @next/next/no-img-element */

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
import { CvTemplateRenderer, CVData } from './cv-templates/CvTemplateRenderer';
import { TemplateThumbnail } from './cv-templates/TemplateThumbnail';

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
  { id: 'onyx', name: "Onyx (Modern Executive)", badge: "Executive", type: "top-accent", colors: ['#2563eb', '#1e40af'], ats: true },
  { id: 'pikachu', name: "Pikachu (Left Sidebar)", badge: "Creative", type: "left-sidebar", colors: ['#f59e0b', '#d97706'], ats: false },
  { id: 'gengar', name: "Gengar (Header Banner)", badge: "Professional", type: "header-banner", colors: ['#6366f1', '#4338ca'], ats: true },
  { id: 'glalie', name: "Glalie (Minimal ATS)", badge: "ATS Standard", type: "minimal", colors: ['#0f172a', '#334155'], ats: true },
  { id: 'lapras', name: "Lapras (Split 2-Column)", badge: "Modern Split", type: "split-2col", colors: ['#0284c7', '#0369a1'], ats: true },
  { id: 'kakuna', name: "Kakuna (Boxed Cards)", badge: "Modern Tech", type: "boxed", colors: ['#16a34a', '#15803d'], ats: true },
  { id: 'azurill', name: "Azurill (Right Sidebar)", badge: "Clean Sidebar", type: "right-sidebar", colors: ['#06b6d4', '#0891b2'], ats: true },
  { id: 'chikorita', name: "Chikorita (Timeline Flow)", badge: "Timeline", type: "timeline", colors: ['#10b981', '#059669'], ats: true },
  { id: 'leafish', name: "Leafish (Editorial Double)", badge: "Editorial", type: "editorial", colors: ['#65a30d', '#4d7c0f'], ats: true },
  { id: 'rhyhorn', name: "Rhyhorn (Bold Block)", badge: "Bold", type: "bold-block", colors: ['#b91c1c', '#991b1b'], ats: true },
  { id: 'ditto', name: "Ditto (Soft Rounded)", badge: "Soft Minimal", type: "soft-pill", colors: ['#ec4899', '#db2777'], ats: true },
  { id: 'bronzor', name: "Bronzor (Tech Matrix)", badge: "Developer", type: "tech-matrix", colors: ['#475569', '#1e293b'], ats: true },
  { id: 'ditgar', name: "Ditgar (Hybrid 3-Tier)", badge: "Hybrid Grid", type: "hybrid", colors: ['#8b5cf6', '#6d28d9'], ats: true },
];

const INITIAL_FORM_DATA: CVData = {
  personal: {
    fullName: 'Alex Morgan',
    title: 'Senior Software Engineer',
    phone: '+1 (555) 234-5678',
    email: 'alex.morgan@example.com',
    linkedin: 'linkedin.com/in/alexmorgan',
    address: 'San Francisco, CA',
    portfolio: 'alexmorgan.dev',
    picture: ''
  },
  experience: [
    {
      id: '1',
      title: 'Senior Full Stack Engineer',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      dates: '2022 - Present',
      responsibilities: 'Architected and deployed microservices handling 10M+ daily requests. Led a cross-functional team of 6 engineers and improved application performance by 40%.'
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'Creative Pixel Inc',
      location: 'Austin, TX',
      dates: '2019 - 2022',
      responsibilities: 'Developed responsive React/Next.js web applications, established UI component design system, and optimized Core Web Vitals across 15+ client projects.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. in Computer Science',
      major: 'Software Systems',
      university: 'Stanford University',
      location: 'Stanford, CA',
      graduationYear: '2019'
    }
  ],
  skills: {
    technical: 'React, Next.js, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, GraphQL, Tailwind CSS',
    soft: 'Team Leadership, Agile Methodologies, Technical Communication, Problem Solving, Product Architecture'
  },
  projects: [
    {
      id: '1',
      name: 'CloudScale Observability Platform',
      url: 'https://github.com/alexmorgan/cloudscale',
      description: 'Real-time telemetry and metrics visualizer built with Go and React, tracking latency across distributed microservices.'
    }
  ],
  profiles: [
    { id: '1', network: 'GitHub', username: 'alexmorgan', url: 'https://github.com/alexmorgan' },
    { id: '2', network: 'LinkedIn', username: 'alex-morgan-dev', url: 'https://linkedin.com/in/alex-morgan-dev' }
  ],
  languages: [
    { id: '1', name: 'English', fluency: 'Native' },
    { id: '2', name: 'Spanish', fluency: 'Professional Working' }
  ],
  interests: [
    { id: '1', name: 'Open Source' },
    { id: '2', name: 'Cloud Architecture' },
    { id: '3', name: 'Marathon Running' }
  ],
  awards: [
    { id: '1', title: 'Outstanding Engineering Contribution', date: '2023', awarder: 'TechFlow Solutions', summary: 'Recognized for top performance and mentoring.' }
  ],
  certifications: [
    { id: '1', name: 'AWS Certified Solutions Architect', org: 'Amazon Web Services', year: '2023' },
    { id: '2', name: 'Certified Kubernetes Administrator (CKA)', org: 'Cloud Native Computing Foundation', year: '2022' }
  ],
  publications: [],
  volunteer: [],
  references: 'References available upon request',
  aiSummary: 'Results-driven Senior Software Engineer with 6+ years of expertise in architecting scalable web applications and distributed cloud systems. Proven track record in improving system performance, leading agile engineering teams, and shipping production-grade software.'
};

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
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeSection, setActiveSection] = useState('basics');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('onyx');
  const [resumeTitle, setResumeTitle] = useState('Untitled Resume');
  const [error, setError] = useState<string | null>(null);
  const [rightPaneTab, setRightPaneTab] = useState('templates');
  const [showAllTemplates, setShowAllTemplates] = useState(true);
  
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

  const [formData, setFormData] = useState<CVData>(INITIAL_FORM_DATA);
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
    if (history.length === 0) {
      pushHistory(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [typography.bodyFont, typography.headingFont]);

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

  const handleSelectTemplate = (template: typeof TEMPLATE_DATA[0]) => {
    setSelectedTemplate(template.id);
    setDesign(prev => ({
      ...prev,
      primaryColor: template.colors[0],
    }));
  };

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const response = await fetch('/api/tools/cv-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'POLISH_CV', formData }),
      });
      
      if (!response.ok) {
        throw new Error('AI Polish service encountered an issue');
      }

      const data = await response.json();
      const polishedData = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
      
      const newFormData: CVData = {
        ...formData,
        aiSummary: polishedData.aiSummary || formData.aiSummary,
        experience: (formData.experience || []).map((exp, idx) => {
          const polishedExp = polishedData.experience?.[idx];
          return {
            ...exp,
            responsibilities: polishedExp?.responsibilities || exp.responsibilities,
          };
        }),
      };

      pushHistory(newFormData);
      setFormData(newFormData);
      setSuccessMsg('✨ Resume polished successfully with high-impact action verbs and ATS keywords!');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) { 
      console.error('AI error:', err);
      setError('AI Polish could not process at this moment.'); 
    }
    finally { setIsLoading(false); }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 6 * 1024 * 1024) {
        setError('Image size should be less than 6MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const newFormData: CVData = {
          ...formData,
          personal: {
            ...formData.personal,
            picture: result,
          },
        };
        pushHistory(newFormData);
        setFormData(newFormData);
        setSuccessMsg('📸 Profile photo uploaded and auto-fitted for all templates!');
        setTimeout(() => setSuccessMsg(null), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePicture = () => {
    const newFormData: CVData = {
      ...formData,
      personal: {
        ...formData.personal,
        picture: '',
      },
    };
    pushHistory(newFormData);
    setFormData(newFormData);
    setSuccessMsg('Photo removed.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const [downloadProgress, setDownloadProgress] = useState<{
    isOpen: boolean;
    percent: number;
    status: string;
  }>({
    isOpen: false,
    percent: 0,
    status: '',
  });

  const handleDownloadPDF = async () => {
    setIsLoading(true);
    setError(null);
    setDownloadProgress({ isOpen: true, percent: 15, status: 'Initializing PDF engine...' });
    try {
      const resumeEl = document.getElementById('resume-preview');
      if (!resumeEl) {
        throw new Error('Resume element not found');
      }

      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const pageElements = resumeEl.querySelectorAll<HTMLElement>('.resume-page');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      if (pageElements && pageElements.length > 0) {
        for (let i = 0; i < pageElements.length; i++) {
          const stepPercent = Math.round(25 + ((i + 1) / pageElements.length) * 60);
          setDownloadProgress({
            isOpen: true,
            percent: stepPercent,
            status: `Rendering Page ${i + 1} of ${pageElements.length}...`,
          });

          if (i > 0) {
            pdf.addPage();
          }
          const pageCanvas = await html2canvas(pageElements[i], {
            scale: 2.5,
            useCORS: true,
            logging: false,
            backgroundColor: design.backgroundColor || '#ffffff',
          });
          const imgData = pageCanvas.toDataURL('image/png', 1.0);
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        }
      } else {
        setDownloadProgress({ isOpen: true, percent: 60, status: 'Rendering document...' });
        const canvas = await html2canvas(resumeEl, {
          scale: 2.5,
          useCORS: true,
          logging: false,
          backgroundColor: design.backgroundColor || '#ffffff',
        });
        const imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      }

      setDownloadProgress({ isOpen: true, percent: 95, status: 'Compiling PDF file...' });
      const filename = `${(formData.personal?.fullName || resumeTitle || 'Resume').trim().replace(/\s+/g, '_')}_CV.pdf`;
      pdf.save(filename);

      setDownloadProgress({ isOpen: true, percent: 100, status: 'Download Complete!' });
      setTimeout(() => {
        setDownloadProgress({ isOpen: false, percent: 0, status: '' });
        setSuccessMsg('✅ Resume downloaded successfully!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }, 700);
    } catch (err) { 
      console.error('PDF export error, falling back to print dialog:', err);
      setDownloadProgress({ isOpen: false, percent: 0, status: '' });
      handlePrint();
    }
    finally { setIsLoading(false); }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('resume-preview');
    if (!printContent) return;
    const win = window.open('', '_blank');
    const stylesTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(el => el.outerHTML)
      .join('\n');

    win?.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeTitle || 'Resume'}</title>
          ${stylesTags}
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; background: #fff !important; }
            #resume-preview { box-shadow: none !important; margin: 0 auto !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; overflow: visible !important; }
            [class*="pageGuide"] { display: none !important; }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    win?.document.close();
    setTimeout(() => {
      win?.focus();
      win?.print();
    }, 250);
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
      {successMsg && (
        <div className={styles.successBanner}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span>{successMsg}</span>
          <button className={styles.closeError} onClick={() => setSuccessMsg(null)}>×</button>
        </div>
      )}
      {downloadProgress.isOpen && (
        <div className={styles.progressOverlay}>
          <div className={styles.progressCard}>
            <div className={styles.progressIcon}>📄</div>
            <h3 className={styles.progressTitle}>Generating High-Res PDF</h3>
            <p className={styles.progressDesc}>{downloadProgress.status}</p>
            <div className={styles.progressBarTrack}>
              <div className={styles.progressBarFill} style={{ width: `${downloadProgress.percent}%` }} />
            </div>
            <div className={styles.progressFooter}>
              <span>Multi-Page Vector Export</span>
              <span className={styles.progressPercent}>{downloadProgress.percent}%</span>
            </div>
          </div>
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
        {/* Section 1: Left Form Editor Pane */}
        <div className={styles.editorPane}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {formData.personal.picture ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', backgroundColor: '#18181b', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <img
                      src={formData.personal.picture}
                      alt="Profile Preview"
                      style={{
                        width: '85px',
                        height: '85px',
                        minWidth: '85px',
                        minHeight: '85px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `3px solid ${design.primaryColor || '#2563eb'}`,
                        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '4px' }}>Active Profile Photo</div>
                      <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>Auto-scaled and fitted to each template style</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <label style={{ backgroundColor: '#2563eb', color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span>📷 Change Photo</span>
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageFileChange} />
                        </label>
                        <button
                          type="button"
                          onClick={handleRemovePicture}
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 14px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1.5rem', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.02)', transition: 'all 0.2s', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📸</div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>Upload Profile Picture</div>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>PNG, JPG, WEBP up to 6MB. Auto-cropped to template framing.</div>
                    <span style={{ backgroundColor: '#2563eb', color: '#fff', padding: '8px 18px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>Choose from Computer / Device</span>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageFileChange} />
                  </label>
                )}

                <div style={{ marginTop: '0.5rem' }}>
                  <label className={styles.label} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Or Enter Image URL Directly:</label>
                  <input
                    className={styles.input}
                    placeholder="https://example.com/photo.jpg"
                    value={formData.personal.picture || ''}
                    onChange={e => setFormData({ ...formData, personal: { ...formData.personal, picture: e.target.value } })}
                  />
                </div>
              </div>
            )}

            {activeSection === 'basics' && (
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}><label className={styles.label}>Full Name</label><input className={styles.input} value={formData.personal.fullName} onChange={e => setFormData({...formData, personal: {...formData.personal, fullName: e.target.value}})} /></div>
                <div className={styles.formGroupFull}><label className={styles.label}>Title</label><input className={styles.input} value={formData.personal.title} onChange={e => setFormData({...formData, personal: {...formData.personal, title: e.target.value}})} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Email</label><input className={styles.input} value={formData.personal.email} onChange={e => setFormData({...formData, personal: {...formData.personal, email: e.target.value}})} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Phone</label><input className={styles.input} value={formData.personal.phone} onChange={e => setFormData({...formData, personal: {...formData.personal, phone: e.target.value}})} /></div>
                <div className={styles.formGroup}><label className={styles.label}>Location / Address</label><input className={styles.input} value={formData.personal.address || ''} onChange={e => setFormData({...formData, personal: {...formData.personal, address: e.target.value}})} /></div>
                <div className={styles.formGroup}><label className={styles.label}>LinkedIn</label><input className={styles.input} value={formData.personal.linkedin || ''} onChange={e => setFormData({...formData, personal: {...formData.personal, linkedin: e.target.value}})} /></div>
                <div className={styles.formGroupFull}><label className={styles.label}>Website / Portfolio</label><input className={styles.input} value={formData.personal.portfolio || ''} onChange={e => setFormData({...formData, personal: {...formData.personal, portfolio: e.target.value}})} /></div>
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
                      <div className={styles.formGroupFull}><label className={styles.label}>Responsibilities</label><textarea className={styles.textarea} value={exp.responsibilities} onChange={e => { const n = [...formData.experience]; n[idx].responsibilities = e.target.value; setFormData({...formData, experience: n})}} /></div>
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
                      <div className={styles.formGroup}><label className={styles.label}>Major / Field</label><input className={styles.input} value={edu.major} onChange={e => { const n = [...formData.education]; n[idx].major = e.target.value; setFormData({...formData, education: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>School / University</label><input className={styles.input} value={edu.university} onChange={e => { const n = [...formData.education]; n[idx].university = e.target.value; setFormData({...formData, education: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Location</label><input className={styles.input} value={edu.location} onChange={e => { const n = [...formData.education]; n[idx].location = e.target.value; setFormData({...formData, education: n})}} /></div>
                      <div className={styles.formGroupFull}><label className={styles.label}>Year</label><input className={styles.input} value={edu.graduationYear} onChange={e => { const n = [...formData.education]; n[idx].graduationYear = e.target.value; setFormData({...formData, education: n})}} /></div>
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
                <button className={styles.addBtn} onClick={() => setFormData({...formData, projects: [...formData.projects, {id: Date.now().toString(), name:'', url:'', description:''}]})}>+ Add Project</button>
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
                  <div key={award.id || idx} className={styles.listItem}>
                    <button className={styles.removeBtn} onClick={() => { const n = [...formData.awards]; n.splice(idx, 1); setFormData({...formData, awards: n}) }}>×</button>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}><label className={styles.label}>Award Title</label><input className={styles.input} value={award.title} onChange={e => { const n = [...formData.awards]; n[idx].title = e.target.value; setFormData({...formData, awards: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Awarding Org</label><input className={styles.input} value={award.awarder} onChange={e => { const n = [...formData.awards]; n[idx].awarder = e.target.value; setFormData({...formData, awards: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>Year / Date</label><input className={styles.input} value={award.date} onChange={e => { const n = [...formData.awards]; n[idx].date = e.target.value; setFormData({...formData, awards: n})}} /></div>
                      <div className={styles.formGroupFull}><label className={styles.label}>Summary / Description</label><input className={styles.input} placeholder="Brief description of the award..." value={award.summary || ''} onChange={e => { const n = [...formData.awards]; n[idx].summary = e.target.value; setFormData({...formData, awards: n})}} /></div>
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
                      <div className={styles.formGroupFull}><label className={styles.label}>Year</label><input className={styles.input} value={cert.year} onChange={e => { const n = [...formData.certifications]; n[idx].year = e.target.value; setFormData({...formData, certifications: n})}} /></div>
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
                      <div className={styles.formGroupFull}><label className={styles.label}>Link / URL</label><input className={styles.input} value={pub.url} onChange={e => { const n = [...formData.publications]; n[idx].url = e.target.value; setFormData({...formData, publications: n})}} /></div>
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
                      <div className={styles.formGroup}><label className={styles.label}>Start Date</label><input className={styles.input} value={v.startDate} onChange={e => { const n = [...formData.volunteer]; n[idx].startDate = e.target.value; setFormData({...formData, volunteer: n})}} /></div>
                      <div className={styles.formGroup}><label className={styles.label}>End Date</label><input className={styles.input} value={v.endDate} onChange={e => { const n = [...formData.volunteer]; n[idx].endDate = e.target.value; setFormData({...formData, volunteer: n})}} /></div>
                      <div className={styles.formGroupFull}><label className={styles.label}>Summary / Impact</label><textarea className={styles.textarea} value={v.summary} onChange={e => { const n = [...formData.volunteer]; n[idx].summary = e.target.value; setFormData({...formData, volunteer: n})}} /></div>
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
        </div>

        {/* Section 2: Middle Live Preview Pane */}
        <div className={styles.previewPane}>
          <CvTemplateRenderer 
            formData={formData}
            selectedTemplate={selectedTemplate}
            typography={typography}
            design={design}
          />
        </div>

        {/* Section 3: Right Settings & Templates Pane */}
        <div className={styles.settingsPane}>
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
                {TEMPLATE_DATA.slice(0, showAllTemplates ? TEMPLATE_DATA.length : 4).map(t => (
                  <div 
                    key={t.id} 
                    className={`${styles.templateCard} ${selectedTemplate === t.id ? styles.active : ''}`} 
                    onClick={() => handleSelectTemplate(t)}
                  >
                    <div className={styles.templatePreviewPlaceholder}>
                      <TemplateThumbnail 
                        templateId={t.id} 
                        primaryColor={t.colors[0]} 
                        isActive={selectedTemplate === t.id} 
                      />
                    </div>
                    <div className={styles.templateInfo}>
                      <div className={styles.templateCardHeader}>
                        <div className={styles.templateName}>{t.name}</div>
                        <span className={styles.templateBadge}>{t.badge}</span>
                      </div>
                      <div className={styles.templateFooter}>
                        <div className={styles.swatchContainer}>
                          {t.colors.map(c => <div key={c} className={styles.swatch} style={{ background: c }} />)}
                        </div>
                        {selectedTemplate === t.id && (
                          <span className={styles.activeBadge}>✓ Active</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button className={styles.showMoreBtn} onClick={() => setShowAllTemplates(!showAllTemplates)}>
                  {showAllTemplates ? 'Show Less' : `Show All (${TEMPLATE_DATA.length}) +`}
                </button>
              </div>
            )}

            {rightPaneTab === 'layout' && (
              <div className={styles.layoutEditor}>
                <div className={styles.atsOverlayMini}>
                   <span>ATS COMPLIANCE SCORE</span>
                   <span className={styles.atsScoreMini}>96%</span>
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
                    {['#2563eb', '#6366f1', '#f59e0b', '#16a34a', '#ec4899', '#0f172a', '#7c2d12', '#06b6d4'].map(c => (
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
        </div>

        {/* Section 4: Right Tab Icons */}
        <div className={styles.rightToolbar}>
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
        </div>
      </main>
    </div>
  );
};

export default CvBuilderClient;
