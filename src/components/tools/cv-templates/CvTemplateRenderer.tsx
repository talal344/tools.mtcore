/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './CvTemplates.module.css';

export interface CVData {
  personal: {
    fullName: string;
    title: string;
    phone: string;
    email: string;
    linkedin?: string;
    address?: string;
    portfolio?: string;
    picture?: string;
  };
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    dates: string;
    responsibilities: string;
  }[];
  education: {
    id: string;
    degree: string;
    major: string;
    university: string;
    location: string;
    graduationYear: string;
  }[];
  skills: {
    technical: string;
    soft: string;
  };
  projects: {
    id: string;
    name: string;
    description: string;
    url: string;
    date?: string;
  }[];
  profiles: {
    id: string;
    network: string;
    username: string;
    url: string;
  }[];
  languages: {
    id: string;
    name: string;
    fluency: string;
  }[];
  interests: {
    id: string;
    name: string;
  }[];
  awards: {
    id: string;
    title: string;
    date: string;
    awarder: string;
    summary?: string;
  }[];
  certifications: {
    id: string;
    name: string;
    org: string;
    year: string;
  }[];
  publications: {
    id: string;
    name: string;
    publisher: string;
    date: string;
    url: string;
    summary: string;
  }[];
  volunteer: {
    id: string;
    organization: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    summary: string;
  }[];
  references: string;
  aiSummary: string;
}

interface CvTemplateRendererProps {
  formData: CVData;
  selectedTemplate: string;
  typography: {
    bodyFont: string;
    bodySize: string;
    bodyLineHeight: string;
    headingFont: string;
    headingSize: string;
    headingLineHeight: string;
  };
  design: {
    primaryColor: string;
    textColor: string;
    backgroundColor: string;
    sidebarWidth?: number;
  };
  forcePage2?: boolean | null;
}

export const CvTemplateRenderer: React.FC<CvTemplateRendererProps> = ({
  formData,
  selectedTemplate,
  typography,
  design,
  forcePage2,
}) => {
  const pColor = design.primaryColor || '#2563eb';
  const tColor = design.textColor || '#1f2937';
  const bgColor = design.backgroundColor || '#ffffff';

  const headingFont = `${typography.headingFont}, -apple-system, BlinkMacSystemFont, sans-serif`;

  const techSkills = (formData.skills?.technical || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const softSkills = (formData.skills?.soft || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Height-based page split: estimate total content height in px.
  // A4 page content area ≈ 1050px at standard rendering (297mm - padding).
  // Only split to Page 2 when content genuinely won't fit on Page 1,
  // or when forcePage2 is explicitly requested by the user.
  const estimatedHeight =
    130 + // Header (name, title, contact)
    (formData.aiSummary ? 80 : 0) +
    (formData.experience?.length || 0) * 90 +
    (formData.education?.length || 0) * 50 +
    (formData.projects?.length || 0) * 70 +
    (techSkills.length > 0 || softSkills.length > 0 ? 85 : 0) +
    (formData.certifications?.length || 0) * 40 +
    (formData.awards?.length || 0) * 50 +
    (formData.publications?.length || 0) * 55 +
    (formData.volunteer?.length || 0) * 65 +
    (formData.languages?.length > 0 ? 45 : 0) +
    (formData.interests?.length > 0 ? 45 : 0) +
    (formData.profiles?.length > 0 ? 45 : 0) +
    (formData.references?.trim() ? 45 : 0);

  const hasPage2 = forcePage2 !== undefined && forcePage2 !== null
    ? forcePage2
    : estimatedHeight > 1050;

  const docBaseStyle: React.CSSProperties = {
    fontFamily: `${typography.bodyFont}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    fontSize: `${Number(typography.bodySize) || 9.5}pt`,
    lineHeight: typography.bodyLineHeight || '1.45',
    color: tColor,
    backgroundColor: bgColor,
    width: '210mm',
    minHeight: '297mm',
    height: '297mm',
    boxSizing: 'border-box',
    margin: '0 auto',
    boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '2px',
  };

  // Reusable Avatar Renderer
  const renderAvatar = (size = 75, borderColor = pColor) => {
    if (formData.personal?.picture) {
      return (
        <img
          src={formData.personal.picture}
          alt="Avatar"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            minWidth: `${size}px`,
            minHeight: `${size}px`,
            maxWidth: `${size}px`,
            maxHeight: `${size}px`,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            border: `3px solid ${borderColor}`,
            display: 'block',
            margin: '0 auto 12px auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      );
    }
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          borderRadius: '50%',
          backgroundColor: borderColor,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${Math.round(size * 0.38)}pt`,
          fontWeight: 800,
          margin: '0 auto 12px auto',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        {(formData.personal?.fullName || 'A').charAt(0).toUpperCase()}
      </div>
    );
  };

  // Reusable Item Header
  const renderItemHeader = (title: string, subtitle?: string, date?: string, location?: string) => (
    <div style={{ marginBottom: '3px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%', gap: '12px' }}>
        <span style={{ fontWeight: 700, fontSize: '9.8pt', color: '#0f172a' }}>{title}</span>
        {date && <span style={{ fontSize: '8.5pt', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>{date}</span>}
      </div>
      {(subtitle || location) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '8.8pt', color: pColor, fontWeight: 600, marginTop: '1px' }}>
          <span>{subtitle}</span>
          {location && <span style={{ fontSize: '8.2pt', color: '#64748b', fontWeight: 400 }}>{location}</span>}
        </div>
      )}
    </div>
  );

  // Reusable Section Header
  const renderSectionTitle = (title: string, styleVariant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (styleVariant === 'pill') {
      return (
        <div style={{ display: 'inline-block', backgroundColor: `${pColor}20`, color: pColor, fontWeight: 700, fontSize: '9pt', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '3px 12px', borderRadius: '16px', marginBottom: '8px', fontFamily: headingFont }}>
          {title}
        </div>
      );
    }
    if (styleVariant === 'terminal') {
      return (
        <div style={{ fontFamily: 'monospace', fontSize: '9.5pt', fontWeight: 700, color: pColor, borderBottom: '1px dashed #94a3b8', paddingBottom: '2px', marginBottom: '8px', textTransform: 'uppercase' }}>
          {`// ${title}`}
        </div>
      );
    }
    if (styleVariant === 'bold') {
      return (
        <div style={{ fontSize: '10.5pt', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '2px', marginBottom: '8px', fontFamily: headingFont }}>
          {title}
        </div>
      );
    }
    return (
      <div style={{ fontSize: '10.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: `1.8px solid ${pColor}`, paddingBottom: '2px', marginBottom: '8px', fontFamily: headingFont }}>
        {title}
      </div>
    );
  };

  // Reusable Page 2 Continuation Header
  const renderPage2Header = (variant: 'line' | 'banner' | 'pill' | 'terminal' | 'editorial' = 'line') => {
    if (variant === 'banner') {
      return (
        <div style={{ backgroundColor: pColor, color: '#ffffff', padding: '14px 22px', borderRadius: '4px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '13pt', fontWeight: 800, color: '#ffffff', fontFamily: headingFont }}>{formData.personal?.fullName || 'RESUME'}</span>
            <span style={{ fontSize: '9pt', opacity: 0.85, marginLeft: '12px' }}>{formData.personal?.title}</span>
          </div>
          <span style={{ fontSize: '7.5pt', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Page 2</span>
        </div>
      );
    }
    if (variant === 'terminal') {
      return (
        <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '10px 18px', borderRadius: '6px', fontFamily: 'monospace', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '8pt' }}>
          <span>{`// ${formData.personal?.fullName || 'RESUME'} — CONTINUED`}</span>
          <span style={{ opacity: 0.6 }}>[PAGE 2]</span>
        </div>
      );
    }
    if (variant === 'pill') {
      return (
        <div style={{ backgroundColor: `${pColor}12`, border: `1px solid ${pColor}35`, borderRadius: '12px', padding: '10px 18px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12pt', fontWeight: 800, color: '#0f172a', fontFamily: headingFont }}>{formData.personal?.fullName}</span>
            <span style={{ fontSize: '8.8pt', color: pColor, fontWeight: 600, marginLeft: '10px' }}>{formData.personal?.title}</span>
          </div>
          <span style={{ backgroundColor: pColor, color: '#fff', padding: '2px 9px', borderRadius: '12px', fontSize: '7pt', fontWeight: 700 }}>Page 2</span>
        </div>
      );
    }
    if (variant === 'editorial') {
      return (
        <div style={{ borderTop: `2px solid ${pColor}`, borderBottom: '1px solid #cbd5e1', padding: '8px 0', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12pt', fontWeight: 800, color: '#0f172a', fontFamily: 'Georgia, serif' }}>{formData.personal?.fullName}</span>
          <span style={{ fontSize: '8pt', fontStyle: 'italic', color: '#64748b' }}>Page 2</span>
        </div>
      );
    }
    return (
      <div style={{ borderBottom: `1.8px solid ${pColor}`, paddingBottom: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '12pt', fontWeight: 800, color: '#0f172a', fontFamily: headingFont }}>{formData.personal?.fullName}</span>
          <span style={{ fontSize: '8.8pt', color: pColor, fontWeight: 600, marginLeft: '10px' }}>{formData.personal?.title}</span>
        </div>
        <span style={{ fontSize: '7.5pt', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Page 2</span>
      </div>
    );
  };

  // Section Renderers
  const renderSummary = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (!formData.aiSummary) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Summary', variant)}
        <div style={{ fontSize: '8.8pt', lineHeight: 1.45, color: '#334155', whiteSpace: 'pre-line' }}>{formData.aiSummary}</div>
      </div>
    );
  };

  const renderExperience = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.experience || formData.experience.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Experience', variant)}
        {formData.experience.map(exp => (
          <div
            key={exp.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '8px 12px', marginBottom: '7px' }
                : { marginBottom: '7px' }
            }
          >
            {renderItemHeader(exp.title || 'Role Title', exp.company || 'Company', exp.dates, exp.location)}
            {exp.responsibilities && (
              <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#475569', whiteSpace: 'pre-line', marginTop: '3px' }}>
                {exp.responsibilities}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducation = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.education || formData.education.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Education', variant)}
        {formData.education.map(edu => (
          <div
            key={edu.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '8px 12px', marginBottom: '6px' }
                : { marginBottom: '6px' }
            }
          >
            {renderItemHeader(`${edu.degree || 'Degree'}${edu.major ? ` in ${edu.major}` : ''}`, edu.university, edu.graduationYear, edu.location)}
          </div>
        ))}
      </div>
    );
  };

  const renderProjects = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.projects || formData.projects.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Projects', variant)}
        {formData.projects.map((proj, i) => (
          <div
            key={proj.id || i}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '8px 12px', marginBottom: '6px' }
                : { marginBottom: '6px' }
            }
          >
            {renderItemHeader(proj.name, undefined, proj.date, proj.url)}
            {proj.description && (
              <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#475569', marginTop: '2px' }}>{proj.description}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (techSkills.length === 0 && softSkills.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Skills', variant)}
        {techSkills.length > 0 && (
          <div style={{ marginBottom: '6px' }}>
            <div style={{ fontSize: '7.2pt', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '3px', letterSpacing: '0.04em' }}>Technical</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {techSkills.map((s, i) => (
                <span key={i} style={{ backgroundColor: `${pColor}14`, color: pColor, border: `1px solid ${pColor}35`, padding: '2px 7px', borderRadius: '4px', fontSize: '7.8pt', fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {softSkills.length > 0 && (
          <div>
            <div style={{ fontSize: '7.2pt', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '3px', letterSpacing: '0.04em' }}>Soft Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {softSkills.map((s, i) => (
                <span key={i} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '2px 7px', borderRadius: '4px', fontSize: '7.8pt', fontWeight: 500 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCertifications = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.certifications || formData.certifications.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Certifications', variant)}
        {formData.certifications.map(c => (
          <div
            key={c.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '7px 11px', marginBottom: '5px' }
                : { marginBottom: '5px' }
            }
          >
            {renderItemHeader(c.name, c.org, c.year)}
          </div>
        ))}
      </div>
    );
  };

  const renderAwards = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.awards || formData.awards.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Honors & Awards', variant)}
        {formData.awards.map(a => (
          <div
            key={a.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '7px 11px', marginBottom: '5px' }
                : { marginBottom: '5px' }
            }
          >
            {renderItemHeader(a.title, a.awarder, a.date)}
            {a.summary && (
              <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#475569', marginTop: '2px' }}>
                {a.summary}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPublications = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.publications || formData.publications.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Publications', variant)}
        {formData.publications.map(pub => (
          <div
            key={pub.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '7px 11px', marginBottom: '5px' }
                : { marginBottom: '5px' }
            }
          >
            {renderItemHeader(pub.name, pub.publisher, pub.date, pub.url)}
            {pub.summary && (
              <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#475569', marginTop: '2px' }}>
                {pub.summary}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderVolunteer = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.volunteer || formData.volunteer.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Volunteer Experience', variant)}
        {formData.volunteer.map(v => (
          <div
            key={v.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `3.5px solid ${pColor}`, borderRadius: '5px', padding: '7px 11px', marginBottom: '5px' }
                : { marginBottom: '5px' }
            }
          >
            {renderItemHeader(v.position || 'Volunteer', v.organization, [v.startDate, v.endDate].filter(Boolean).join(' - ') || undefined, v.url)}
            {v.summary && (
              <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#475569', marginTop: '2px' }}>
                {v.summary}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguages = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (!formData.languages || formData.languages.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Languages', variant)}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {formData.languages.map((l, i) => (
            <span key={i} style={{ backgroundColor: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: '2px 8px', borderRadius: '4px', fontSize: '7.8pt' }}>
              <strong>{l.name}</strong> {l.fluency ? `(${l.fluency})` : ''}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderInterests = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (!formData.interests || formData.interests.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Interests', variant)}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {formData.interests.map((int, i) => (
            <span
              key={int.id || i}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '7.8pt',
                fontWeight: 500,
              }}
            >
              {int.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderProfiles = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (!formData.profiles || formData.profiles.length === 0) return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('Profiles', variant)}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {formData.profiles.map(p => (
            <span key={p.id} style={{ backgroundColor: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: '2px 7px', borderRadius: '4px', fontSize: '7.8pt' }}>
              <strong style={{ color: pColor }}>{p.network}:</strong> {p.username || p.url}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderReferences = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (!formData.references || formData.references.trim() === '') return null;
    return (
      <div style={{ marginBottom: '13px' }}>
        {renderSectionTitle('References', variant)}
        <div style={{ fontSize: '8.8pt', lineHeight: 1.45, color: '#475569', whiteSpace: 'pre-line' }}>
          {formData.references}
        </div>
      </div>
    );
  };

  const hasPage2Content = Boolean(
    (formData.certifications && formData.certifications.length > 0) ||
    (formData.awards && formData.awards.length > 0) ||
    (formData.publications && formData.publications.length > 0) ||
    (formData.volunteer && formData.volunteer.length > 0) ||
    (formData.languages && formData.languages.length > 0) ||
    (formData.interests && formData.interests.length > 0) ||
    (formData.profiles && formData.profiles.length > 0) ||
    (formData.references && formData.references.trim().length > 0)
  );

  const renderEmptyPage2Prompt = () => {
    if (hasPage2Content) return null;
    return (
      <div style={{
        padding: '28px 20px',
        margin: '20px 0',
        border: '2px dashed #cbd5e1',
        borderRadius: '8px',
        backgroundColor: '#f8fafc',
        textAlign: 'center',
        color: '#64748b'
      }}>
        <div style={{ fontSize: '11pt', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
          📄 Page 2 Added
        </div>
        <p style={{ fontSize: '8.5pt', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
          Add your Certifications, Awards, Languages, Volunteer Work, or References in the editor on the left to populate this page.
        </p>
      </div>
    );
  };

  const renderPageBreak = () => (
    <div className={styles.pageBreakVisualIndicator}>
      <hr className={styles.pageBreakLine} />
      <div className={styles.pageBadge}>
        <span>📄 Page 2 of 2</span>
      </div>
      <hr className={styles.pageBreakLine} />
    </div>
  );

  // =========================================================================
  // 1. ONYX (Modern Executive)
  // =========================================================================
  if (selectedTemplate === 'onyx') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '30px 36px', borderTop: `5px solid ${pColor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '14px', borderBottom: '1.5px solid #e2e8f0', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', lineHeight: 1.1, fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 8px 0' }}>
                {formData.personal?.title || 'Professional Title'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '8.2pt', color: '#64748b' }}>
                {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
                {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
                {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
                {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
                {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
              </div>
            </div>
            {renderAvatar(70, pColor)}
          </div>

          {renderSummary('underline')}
          {renderExperience('underline')}
          {renderEducation('underline')}
          {renderProjects('underline')}
          {renderSkills('underline')}
          {!hasPage2 && (
            <>
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </>
          )}
        </div>

        {/* Page 2 (Rendered ONLY if content genuinely overflows 1 page) */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '30px 36px', borderTop: `5px solid ${pColor}` }}>
              {renderPage2Header('line')}
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
              {renderEmptyPage2Prompt()}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 2. PIKACHU (Creative Left Sidebar)
  // =========================================================================
  if (selectedTemplate === 'pikachu') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, display: 'grid', gridTemplateColumns: '32% 68%' }}>
          <div style={{ backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '30px 18px', boxSizing: 'border-box' }}>
            {renderAvatar(80, pColor)}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '9pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '3px', marginBottom: '8px', fontFamily: headingFont }}>
                Contact
              </div>
              {formData.personal?.email && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155', wordBreak: 'break-all' }}>✉ {formData.personal.email}</div>}
              {formData.personal?.phone && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155' }}>📞 {formData.personal.phone}</div>}
              {formData.personal?.address && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155' }}>📍 {formData.personal.address}</div>}
              {formData.personal?.portfolio && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155', wordBreak: 'break-all' }}>🌐 {formData.personal.portfolio}</div>}
              {formData.personal?.linkedin && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155', wordBreak: 'break-all' }}>💼 {formData.personal.linkedin}</div>}
            </div>
            {renderSkills('underline')}
            {!hasPage2 && (
              <>
                {renderLanguages('underline')}
                {renderInterests('underline')}
                {renderProfiles('underline')}
              </>
            )}
          </div>

          <div style={{ padding: '30px 24px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '24pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', lineHeight: 1.1, fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 14px 0' }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
            {renderSummary('underline')}
            {renderExperience('underline')}
            {renderEducation('underline')}
            {renderProjects('underline')}
            {!hasPage2 && (
              <>
                {renderCertifications('underline')}
                {renderAwards('underline')}
                {renderPublications('underline')}
                {renderVolunteer('underline')}
                {renderReferences('underline')}
              </>
            )}
          </div>
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, display: 'grid', gridTemplateColumns: '32% 68%' }}>
              <div style={{ backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '30px 18px', boxSizing: 'border-box' }}>
                {renderLanguages('underline')}
                {renderInterests('underline')}
                {renderProfiles('underline')}
              </div>
              <div style={{ padding: '30px 24px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
                {renderPage2Header('line')}
                {renderCertifications('underline')}
                {renderAwards('underline')}
                {renderPublications('underline')}
                {renderVolunteer('underline')}
                {renderReferences('underline')}
                {renderEmptyPage2Prompt()}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 3. GENGAR (Executive Top Header Banner)
  // =========================================================================
  if (selectedTemplate === 'gengar') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={docBaseStyle}>
          <div style={{ backgroundColor: pColor, color: '#ffffff', padding: '24px 30px', width: '100%', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '24pt', fontWeight: 800, color: '#ffffff', margin: '0 0 3px 0', fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '12pt', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 8px 0' }}>
                {formData.personal?.title || 'Professional Title'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {formData.personal?.email && <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '2px 9px', borderRadius: '14px', fontSize: '7.8pt', color: '#fff' }}>✉ {formData.personal.email}</span>}
                {formData.personal?.phone && <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '2px 9px', borderRadius: '14px', fontSize: '7.8pt', color: '#fff' }}>📞 {formData.personal.phone}</span>}
                {formData.personal?.address && <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '2px 9px', borderRadius: '14px', fontSize: '7.8pt', color: '#fff' }}>📍 {formData.personal.address}</span>}
                {formData.personal?.portfolio && <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '2px 9px', borderRadius: '14px', fontSize: '7.8pt', color: '#fff' }}>🌐 {formData.personal.portfolio}</span>}
              </div>
            </div>
            {renderAvatar(70, '#ffffff')}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '58% 42%', gap: '22px', padding: '22px 30px', boxSizing: 'border-box' }}>
            <div>
              {renderSummary('underline')}
              {renderExperience('underline')}
              {renderProjects('underline')}
              {!hasPage2 && (
                <>
                  {renderVolunteer('underline')}
                  {renderReferences('underline')}
                </>
              )}
            </div>
            <div>
              {renderEducation('underline')}
              {renderSkills('underline')}
              {!hasPage2 && (
                <>
                  {renderCertifications('underline')}
                  {renderAwards('underline')}
                  {renderPublications('underline')}
                  {renderLanguages('underline')}
                  {renderInterests('underline')}
                  {renderProfiles('underline')}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '26px 30px' }}>
              {renderPage2Header('banner')}
              <div style={{ display: 'grid', gridTemplateColumns: '58% 42%', gap: '22px', boxSizing: 'border-box' }}>
                <div>
                  {renderCertifications('underline')}
                  {renderVolunteer('underline')}
                  {renderReferences('underline')}
                  {renderEmptyPage2Prompt()}
                </div>
                <div>
                  {renderAwards('underline')}
                  {renderPublications('underline')}
                  {renderLanguages('underline')}
                  {renderInterests('underline')}
                  {renderProfiles('underline')}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 4. GLALIE (Minimal ATS Standard)
  // =========================================================================
  if (selectedTemplate === 'glalie') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '30px 38px' }}>
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            {formData.personal?.picture && renderAvatar(65, pColor)}
            <h1 style={{ fontSize: '23pt', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '11pt', color: '#475569', fontWeight: 500, margin: '0 0 6px 0' }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5px 12px', fontSize: '8.2pt', color: '#64748b' }}>
              {formData.personal?.email && <span>{formData.personal.email}</span>}
              {formData.personal?.phone && <span>• {formData.personal.phone}</span>}
              {formData.personal?.address && <span>• {formData.personal.address}</span>}
              {formData.personal?.portfolio && <span>• {formData.personal.portfolio}</span>}
            </div>
            <div style={{ height: '1px', backgroundColor: '#cbd5e1', margin: '10px 0 14px 0' }} />
          </div>

          {renderSummary('underline')}
          {renderExperience('underline')}
          {renderEducation('underline')}
          {renderProjects('underline')}
          {renderSkills('underline')}
          {!hasPage2 && (
            <>
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </>
          )}
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '30px 38px' }}>
              {renderPage2Header('line')}
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
              {renderEmptyPage2Prompt()}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 5. LAPRAS (Split 2-Column with Accent Stripe)
  // =========================================================================
  if (selectedTemplate === 'lapras') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, borderLeft: `6px solid ${pColor}`, padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '12px', borderBottom: `1.8px solid ${pColor}`, marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '23pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '11.5pt', fontWeight: 600, color: pColor, margin: '0 0 6px 0' }}>
                {formData.personal?.title || 'Professional Title'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '8.2pt', color: '#64748b' }}>
                {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
                {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
                {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
                {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
              </div>
            </div>
            {renderAvatar(70, pColor)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '38% 62%', gap: '22px' }}>
            <div>
              {renderEducation('underline')}
              {renderSkills('underline')}
              {!hasPage2 && (
                <>
                  {renderCertifications('underline')}
                  {renderLanguages('underline')}
                  {renderInterests('underline')}
                  {renderProfiles('underline')}
                </>
              )}
            </div>
            <div>
              {renderSummary('underline')}
              {renderExperience('underline')}
              {renderProjects('underline')}
              {!hasPage2 && (
                <>
                  {renderAwards('underline')}
                  {renderPublications('underline')}
                  {renderVolunteer('underline')}
                  {renderReferences('underline')}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, borderLeft: `6px solid ${pColor}`, padding: '28px 32px' }}>
              {renderPage2Header('line')}
              <div style={{ display: 'grid', gridTemplateColumns: '38% 62%', gap: '22px' }}>
                <div>
                  {renderCertifications('underline')}
                  {renderLanguages('underline')}
                  {renderInterests('underline')}
                  {renderProfiles('underline')}
                </div>
                <div>
                  {renderAwards('underline')}
                  {renderPublications('underline')}
                  {renderVolunteer('underline')}
                  {renderReferences('underline')}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 6. KAKUNA (Modern Boxed Cards)
  // =========================================================================
  if (selectedTemplate === 'kakuna') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '28px 34px', backgroundColor: '#fcfcfc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: `2px solid ${pColor}`, marginBottom: '14px' }}>
            <div>
              <h1 style={{ fontSize: '24pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '11.5pt', fontWeight: 600, color: pColor, margin: '0 0 6px 0' }}>
                {formData.personal?.title || 'Professional Title'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '8.2pt', color: '#64748b' }}>
                {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
                {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
                {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
              </div>
            </div>
            {renderAvatar(70, pColor)}
          </div>

          {renderSummary('underline')}
          {renderExperience('underline', true)}
          {renderEducation('underline', true)}
          {renderProjects('underline', true)}
          {renderSkills('underline')}
          {!hasPage2 && (
            <>
              {renderCertifications('underline')}
              {renderAwards('underline', true)}
              {renderPublications('underline', true)}
              {renderVolunteer('underline', true)}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </>
          )}
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '28px 34px', backgroundColor: '#fcfcfc' }}>
              {renderPage2Header('line')}
              {renderCertifications('underline')}
              {renderAwards('underline', true)}
              {renderPublications('underline', true)}
              {renderVolunteer('underline', true)}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 7. AZURILL (Right Sidebar Layout)
  // =========================================================================
  if (selectedTemplate === 'azurill') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, display: 'grid', gridTemplateColumns: '67% 33%' }}>
          <div style={{ padding: '28px 24px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
            <h1 style={{ fontSize: '24pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 14px 0' }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
            {renderSummary('underline')}
            {renderExperience('underline')}
            {renderEducation('underline')}
            {renderProjects('underline')}
            {!hasPage2 && (
              <>
                {renderVolunteer('underline')}
                {renderReferences('underline')}
              </>
            )}
          </div>

          <div style={{ padding: '28px 18px', backgroundColor: '#f8fafc', borderLeft: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
            {renderAvatar(75, pColor)}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '9pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '3px', marginBottom: '8px', fontFamily: headingFont }}>
                Contact
              </div>
              {formData.personal?.email && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155', wordBreak: 'break-all' }}>✉ {formData.personal.email}</div>}
              {formData.personal?.phone && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155' }}>📞 {formData.personal.phone}</div>}
              {formData.personal?.address && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155' }}>📍 {formData.personal.address}</div>}
              {formData.personal?.portfolio && <div style={{ marginBottom: '5px', fontSize: '8pt', color: '#334155', wordBreak: 'break-all' }}>🌐 {formData.personal.portfolio}</div>}
            </div>
            {renderSkills('underline')}
            {!hasPage2 && (
              <>
                {renderCertifications('underline')}
                {renderAwards('underline')}
                {renderPublications('underline')}
                {renderLanguages('underline')}
                {renderInterests('underline')}
                {renderProfiles('underline')}
              </>
            )}
          </div>
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, display: 'grid', gridTemplateColumns: '67% 33%' }}>
              <div style={{ padding: '28px 24px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
                {renderPage2Header('line')}
                {renderVolunteer('underline')}
                {renderReferences('underline')}
              </div>
              <div style={{ padding: '28px 18px', backgroundColor: '#f8fafc', borderLeft: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
                {renderCertifications('underline')}
                {renderAwards('underline')}
                {renderPublications('underline')}
                {renderLanguages('underline')}
                {renderInterests('underline')}
                {renderProfiles('underline')}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 8. CHIKORITA (Timeline Flow)
  // =========================================================================
  if (selectedTemplate === 'chikorita') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '28px 34px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1.8px solid #e2e8f0', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '11.5pt', fontWeight: 600, color: pColor, margin: '0 0 6px 0' }}>
                {formData.personal?.title || 'Professional Title'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '8.2pt', color: '#64748b' }}>
                {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
                {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
                {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
              </div>
            </div>
            {renderAvatar(70, pColor)}
          </div>

          {renderSummary('underline')}

          {formData.experience && formData.experience.length > 0 && (
            <div style={{ marginBottom: '13px' }}>
              {renderSectionTitle('Experience', 'underline')}
              <div style={{ position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: '5px', top: '6px', bottom: '6px', width: '2px', backgroundColor: pColor, opacity: 0.5 }} />
                {formData.experience.map(exp => (
                  <div key={exp.id} style={{ position: 'relative', marginBottom: '10px' }}>
                    <div style={{ position: 'absolute', left: '-20px', top: '4px', width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#fff', border: `2.2px solid ${pColor}`, boxSizing: 'border-box' }} />
                    {renderItemHeader(exp.title, exp.company, exp.dates, exp.location)}
                    {exp.responsibilities && (
                      <div style={{ fontSize: '8.5pt', lineHeight: 1.4, color: '#475569', marginTop: '2px' }}>{exp.responsibilities}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderEducation('underline')}
          {renderProjects('underline')}
          {renderSkills('underline')}
          {!hasPage2 && (
            <>
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </>
          )}
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '28px 34px' }}>
              {renderPage2Header('line')}
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 9. RHYHORN (Bold Block)
  // =========================================================================
  if (selectedTemplate === 'rhyhorn') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={docBaseStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', backgroundColor: pColor, color: '#ffffff', padding: '24px 32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {renderAvatar(70, '#ffffff')}
              <div>
                <h1 style={{ fontSize: '24pt', fontWeight: 800, margin: '0 0 2px 0', color: '#fff', fontFamily: headingFont }}>
                  {formData.personal?.fullName || 'YOUR NAME'}
                </h1>
                <p style={{ fontSize: '11.5pt', opacity: 0.9, margin: 0 }}>{formData.personal?.title || 'Professional Title'}</p>
              </div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '10px', borderRadius: '6px', fontSize: '8pt', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {formData.personal?.email && <div>✉ {formData.personal.email}</div>}
              {formData.personal?.phone && <div>📞 {formData.personal.phone}</div>}
              {formData.personal?.portfolio && <div>🌐 {formData.personal.portfolio}</div>}
            </div>
          </div>

          <div style={{ padding: '22px 32px' }}>
            {renderSummary('bold')}
            {renderExperience('bold')}
            {renderEducation('bold')}
            {renderProjects('bold')}
            {renderSkills('bold')}
            {!hasPage2 && (
              <>
                {renderCertifications('bold')}
                {renderAwards('bold')}
                {renderPublications('bold')}
                {renderVolunteer('bold')}
                {renderLanguages('bold')}
                {renderInterests('bold')}
                {renderProfiles('bold')}
                {renderReferences('bold')}
              </>
            )}
          </div>
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '26px 32px' }}>
              {renderPage2Header('banner')}
              {renderCertifications('bold')}
              {renderAwards('bold')}
              {renderPublications('bold')}
              {renderVolunteer('bold')}
              {renderLanguages('bold')}
              {renderInterests('bold')}
              {renderProfiles('bold')}
              {renderReferences('bold')}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 10. DITTO (Soft Rounded Pill)
  // =========================================================================
  if (selectedTemplate === 'ditto') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '28px 34px' }}>
          <div style={{ backgroundColor: `${pColor}12`, border: `1px solid ${pColor}35`, borderRadius: '14px', padding: '14px 18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            {renderAvatar(70, pColor)}
            <div>
              <h1 style={{ fontSize: '23pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '11.5pt', fontWeight: 600, color: pColor, margin: '0 0 6px 0' }}>
                {formData.personal?.title || 'Professional Title'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', fontSize: '8.2pt', color: '#64748b' }}>
                {formData.personal?.email && <span>{formData.personal.email}</span>}
                {formData.personal?.phone && <span>• {formData.personal.phone}</span>}
                {formData.personal?.portfolio && <span>• {formData.personal.portfolio}</span>}
              </div>
            </div>
          </div>

          {renderSummary('pill')}
          {renderExperience('pill')}
          {renderEducation('pill')}
          {renderProjects('pill')}
          {renderSkills('pill')}
          {!hasPage2 && (
            <>
              {renderCertifications('pill')}
              {renderAwards('pill')}
              {renderPublications('pill')}
              {renderVolunteer('pill')}
              {renderLanguages('pill')}
              {renderInterests('pill')}
              {renderProfiles('pill')}
              {renderReferences('pill')}
            </>
          )}
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '28px 34px' }}>
              {renderPage2Header('pill')}
              {renderCertifications('pill')}
              {renderAwards('pill')}
              {renderPublications('pill')}
              {renderVolunteer('pill')}
              {renderLanguages('pill')}
              {renderInterests('pill')}
              {renderProfiles('pill')}
              {renderReferences('pill')}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 11. BRONZOR (Tech Matrix)
  // =========================================================================
  if (selectedTemplate === 'bronzor') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '26px 34px' }}>
          <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '16px 20px', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ opacity: 0.6, fontSize: '7.5pt', marginBottom: '3px' }}>{"// DEVELOPER_PROFILE_INITIALIZED"}</div>
              <h1 style={{ fontSize: '21pt', margin: '0 0 2px 0', color: '#fff', fontFamily: headingFont }}>
                {formData.personal?.fullName || 'YOUR NAME'}
              </h1>
              <p style={{ fontSize: '10.5pt', color: '#38bdf8', margin: '0 0 6px 0' }}>{`> ${formData.personal?.title || 'Professional Title'}`}</p>
              <div style={{ fontSize: '8.2pt', color: '#94a3b8', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {formData.personal?.email && <span>{`email: "${formData.personal.email}"`}</span>}
                {formData.personal?.phone && <span>{`phone: "${formData.personal.phone}"`}</span>}
                {formData.personal?.portfolio && <span>{`web: "${formData.personal.portfolio}"`}</span>}
              </div>
            </div>
            {renderAvatar(65, '#38bdf8')}
          </div>

          {renderSummary('terminal')}
          {renderExperience('terminal')}
          {renderEducation('terminal')}
          {renderProjects('terminal')}
          {renderSkills('terminal')}
          {!hasPage2 && (
            <>
              {renderCertifications('terminal')}
              {renderAwards('terminal')}
              {renderPublications('terminal')}
              {renderVolunteer('terminal')}
              {renderLanguages('terminal')}
              {renderInterests('terminal')}
              {renderProfiles('terminal')}
              {renderReferences('terminal')}
            </>
          )}
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '26px 34px' }}>
              {renderPage2Header('terminal')}
              {renderCertifications('terminal')}
              {renderAwards('terminal')}
              {renderPublications('terminal')}
              {renderVolunteer('terminal')}
              {renderLanguages('terminal')}
              {renderInterests('terminal')}
              {renderProfiles('terminal')}
              {renderReferences('terminal')}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 12. LEAFISH (Editorial Double Line)
  // =========================================================================
  if (selectedTemplate === 'leafish') {
    return (
      <div id="resume-preview" className={styles.resumeContainer}>
        {/* Page 1 */}
        <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '28px 36px' }}>
          <div style={{ borderTop: `2.5px solid ${pColor}`, borderBottom: '1px solid #cbd5e1', padding: '12px 0', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {renderAvatar(70, pColor)}
              <div>
                <h1 style={{ fontSize: '23pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: 'Georgia, serif' }}>
                  {formData.personal?.fullName || 'YOUR NAME'}
                </h1>
                <p style={{ fontSize: '11.5pt', fontStyle: 'italic', color: pColor, margin: 0 }}>
                  {formData.personal?.title || 'Professional Title'}
                </p>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '8.2pt', color: '#64748b' }}>
              {formData.personal?.email && <div>{formData.personal.email}</div>}
              {formData.personal?.phone && <div>{formData.personal.phone}</div>}
              {formData.personal?.portfolio && <div>{formData.personal.portfolio}</div>}
            </div>
          </div>

          {renderSummary('underline')}
          {renderExperience('underline')}
          {renderEducation('underline')}
          {renderProjects('underline')}
          {renderSkills('underline')}
          {!hasPage2 && (
            <>
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </>
          )}
        </div>

        {/* Page 2 */}
        {hasPage2 && (
          <>
            {renderPageBreak()}
            <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '28px 36px' }}>
              {renderPage2Header('editorial')}
              {renderCertifications('underline')}
              {renderAwards('underline')}
              {renderPublications('underline')}
              {renderVolunteer('underline')}
              {renderLanguages('underline')}
              {renderInterests('underline')}
              {renderProfiles('underline')}
              {renderReferences('underline')}
            </div>
          </>
        )}
      </div>
    );
  }

  // =========================================================================
  // 13. DITGAR (Hybrid 3-Tier Grid)
  // =========================================================================
  return (
    <div id="resume-preview" className={styles.resumeContainer}>
      {/* Page 1 */}
      <div className={`${styles.cvDocument} resume-page`} data-page="1" style={{ ...docBaseStyle, padding: '28px 32px', borderTop: `5px solid ${pColor}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1.8px solid #e2e8f0', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '23pt', fontWeight: 800, color: '#0f172a', margin: '0 0 2px 0', fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '11.5pt', fontWeight: 600, color: pColor, margin: '0 0 6px 0' }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', fontSize: '8.2pt', color: '#64748b' }}>
              {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
              {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
              {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
            </div>
          </div>
          {renderAvatar(70, pColor)}
        </div>

        {renderSummary('underline')}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>{renderExperience('underline')}</div>
          <div>
            {renderEducation('underline')}
            {!hasPage2 && renderCertifications('underline')}
          </div>
        </div>

        {renderProjects('underline')}
        {renderSkills('underline')}
        {!hasPage2 && (
          <>
            {renderAwards('underline')}
            {renderPublications('underline')}
            {renderVolunteer('underline')}
            {renderLanguages('underline')}
            {renderInterests('underline')}
            {renderProfiles('underline')}
            {renderReferences('underline')}
          </>
        )}
      </div>

      {/* Page 2 */}
      {hasPage2 && (
        <>
          {renderPageBreak()}
          <div className={`${styles.cvDocument} resume-page`} data-page="2" style={{ ...docBaseStyle, padding: '28px 32px', borderTop: `5px solid ${pColor}` }}>
            {renderPage2Header('line')}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                {renderCertifications('underline')}
                {renderVolunteer('underline')}
              </div>
              <div>
                {renderAwards('underline')}
                {renderPublications('underline')}
              </div>
            </div>
            {renderLanguages('underline')}
            {renderInterests('underline')}
            {renderProfiles('underline')}
            {renderReferences('underline')}
          </div>
        </>
      )}
    </div>
  );
};
