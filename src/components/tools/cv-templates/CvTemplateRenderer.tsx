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
}

export const CvTemplateRenderer: React.FC<CvTemplateRendererProps> = ({
  formData,
  selectedTemplate,
  typography,
  design,
}) => {
  const pColor = design.primaryColor || '#2563eb';
  const tColor = design.textColor || '#1f2937';
  const bgColor = design.backgroundColor || '#ffffff';

  const docBaseStyle: React.CSSProperties = {
    fontFamily: `${typography.bodyFont}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    fontSize: `${Number(typography.bodySize) || 10}pt`,
    lineHeight: typography.bodyLineHeight || '1.5',
    color: tColor,
    backgroundColor: bgColor,
    width: '210mm',
    minHeight: '297mm',
    height: 'auto',
    boxSizing: 'border-box',
    margin: '0 auto',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45)',
    position: 'relative',
    overflow: 'visible',
  };

  const headingFont = `${typography.headingFont}, -apple-system, BlinkMacSystemFont, sans-serif`;

  const techSkills = (formData.skills?.technical || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const softSkills = (formData.skills?.soft || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Reusable Avatar Renderer
  const renderAvatar = (size = 80, borderColor = pColor) => {
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
            border: `3px solid ${borderColor}`,
            display: 'block',
            margin: '0 auto 16px auto',
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
          margin: '0 auto 16px auto',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        {(formData.personal?.fullName || 'A').charAt(0).toUpperCase()}
      </div>
    );
  };

  // Reusable Item Header
  const renderItemHeader = (title: string, subtitle?: string, date?: string, location?: string) => (
    <div style={{ marginBottom: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%', gap: '12px' }}>
        <span style={{ fontWeight: 700, fontSize: '10pt', color: '#0f172a' }}>{title}</span>
        {date && <span style={{ fontSize: '8.5pt', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap' }}>{date}</span>}
      </div>
      {(subtitle || location) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontSize: '9pt', color: pColor, fontWeight: 600, marginTop: '2px' }}>
          <span>{subtitle}</span>
          {location && <span style={{ fontSize: '8.5pt', color: '#64748b', fontWeight: 400 }}>{location}</span>}
        </div>
      )}
    </div>
  );

  // Reusable Section Header
  const renderSectionTitle = (title: string, styleVariant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (styleVariant === 'pill') {
      return (
        <div style={{ display: 'inline-block', backgroundColor: `${pColor}20`, color: pColor, fontWeight: 700, fontSize: '9.5pt', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 14px', borderRadius: '20px', marginBottom: '12px', fontFamily: headingFont }}>
          {title}
        </div>
      );
    }
    if (styleVariant === 'terminal') {
      return (
        <div style={{ fontFamily: 'monospace', fontSize: '10pt', fontWeight: 700, color: pColor, borderBottom: '1px dashed #94a3b8', paddingBottom: '3px', marginBottom: '12px', textTransform: 'uppercase' }}>
          {`// ${title}`}
        </div>
      );
    }
    if (styleVariant === 'bold') {
      return (
        <div style={{ fontSize: '11pt', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: `2.5px solid ${pColor}`, paddingBottom: '3px', marginBottom: '12px', fontFamily: headingFont }}>
          {title}
        </div>
      );
    }
    return (
      <div style={{ fontSize: '11pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '3px', marginBottom: '12px', fontFamily: headingFont }}>
        {title}
      </div>
    );
  };

  // Section Renderers
  const renderSummary = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (!formData.aiSummary) return null;
    return (
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Summary', variant)}
        <div style={{ fontSize: '9pt', lineHeight: 1.55, color: '#334155', whiteSpace: 'pre-line' }}>{formData.aiSummary}</div>
      </div>
    );
  };

  const renderExperience = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline', isBoxed = false) => {
    if (!formData.experience || formData.experience.length === 0) return null;
    return (
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Experience', variant)}
        {formData.experience.map(exp => (
          <div
            key={exp.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '12px 14px', marginBottom: '10px' }
                : { marginBottom: '12px' }
            }
          >
            {renderItemHeader(exp.title || 'Role Title', exp.company || 'Company', exp.dates, exp.location)}
            {exp.responsibilities && (
              <div style={{ fontSize: '8.8pt', lineHeight: 1.5, color: '#475569', whiteSpace: 'pre-line', marginTop: '4px' }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Education', variant)}
        {formData.education.map(edu => (
          <div
            key={edu.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '12px 14px', marginBottom: '10px' }
                : { marginBottom: '10px' }
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Projects', variant)}
        {formData.projects.map((proj, i) => (
          <div
            key={proj.id || i}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '12px 14px', marginBottom: '10px' }
                : { marginBottom: '10px' }
            }
          >
            {renderItemHeader(proj.name, undefined, proj.date, proj.url)}
            {proj.description && (
              <div style={{ fontSize: '8.8pt', lineHeight: 1.5, color: '#475569', marginTop: '3px' }}>{proj.description}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = (variant: 'underline' | 'pill' | 'terminal' | 'bold' = 'underline') => {
    if (techSkills.length === 0 && softSkills.length === 0) return null;
    return (
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Skills', variant)}
        {techSkills.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>Technical</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {techSkills.map((s, i) => (
                <span key={i} style={{ backgroundColor: `${pColor}14`, color: pColor, border: `1px solid ${pColor}35`, padding: '3px 8px', borderRadius: '4px', fontSize: '8pt', fontWeight: 600 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {softSkills.length > 0 && (
          <div>
            <div style={{ fontSize: '7.5pt', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>Soft Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {softSkills.map((s, i) => (
                <span key={i} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '4px', fontSize: '8pt', fontWeight: 500 }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Certifications', variant)}
        {formData.certifications.map(c => (
          <div
            key={c.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '10px 14px', marginBottom: '8px' }
                : { marginBottom: '8px' }
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Honors & Awards', variant)}
        {formData.awards.map(a => (
          <div
            key={a.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '10px 14px', marginBottom: '8px' }
                : { marginBottom: '8px' }
            }
          >
            {renderItemHeader(a.title, a.awarder, a.date)}
            {a.summary && (
              <div style={{ fontSize: '8.8pt', lineHeight: 1.5, color: '#475569', marginTop: '3px' }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Publications', variant)}
        {formData.publications.map(pub => (
          <div
            key={pub.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '10px 14px', marginBottom: '8px' }
                : { marginBottom: '8px' }
            }
          >
            {renderItemHeader(pub.name, pub.publisher, pub.date, pub.url)}
            {pub.summary && (
              <div style={{ fontSize: '8.8pt', lineHeight: 1.5, color: '#475569', marginTop: '3px' }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Volunteer Experience', variant)}
        {formData.volunteer.map(v => (
          <div
            key={v.id}
            style={
              isBoxed
                ? { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderLeft: `4px solid ${pColor}`, borderRadius: '6px', padding: '10px 14px', marginBottom: '8px' }
                : { marginBottom: '8px' }
            }
          >
            {renderItemHeader(v.position || 'Volunteer', v.organization, [v.startDate, v.endDate].filter(Boolean).join(' - ') || undefined, v.url)}
            {v.summary && (
              <div style={{ fontSize: '8.8pt', lineHeight: 1.5, color: '#475569', marginTop: '3px' }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Languages', variant)}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {formData.languages.map((l, i) => (
            <span key={i} style={{ backgroundColor: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: '3px 9px', borderRadius: '4px', fontSize: '8pt' }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Interests', variant)}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {formData.interests.map((int, i) => (
            <span
              key={int.id || i}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #cbd5e1',
                padding: '3px 9px',
                borderRadius: '12px',
                fontSize: '8pt',
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('Profiles', variant)}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {formData.profiles.map(p => (
            <span key={p.id} style={{ backgroundColor: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '4px', fontSize: '8pt' }}>
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
      <div style={{ marginBottom: '18px' }}>
        {renderSectionTitle('References', variant)}
        <div style={{ fontSize: '9pt', lineHeight: 1.6, color: '#475569', whiteSpace: 'pre-line' }}>
          {formData.references}
        </div>
      </div>
    );
  };

  // =========================================================================
  // 1. ONYX (Modern Executive)
  // =========================================================================
  if (selectedTemplate === 'onyx') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '35px 40px', borderTop: `6px solid ${pColor}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '18px', borderBottom: '2px solid #e2e8f0', marginBottom: '22px' }}>
          <div>
            <h1 style={{ fontSize: '26pt', fontWeight: 800, color: '#0f172a', margin: '0 0 4px 0', lineHeight: 1.1, fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '13pt', fontWeight: 600, color: pColor, margin: '0 0 10px 0' }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: '8.5pt', color: '#64748b' }}>
              {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
              {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
              {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
              {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
              {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
            </div>
          </div>
          {renderAvatar(75, pColor)}
        </div>

        {renderSummary('underline')}
        {renderExperience('underline')}
        {renderEducation('underline')}
        {renderProjects('underline')}
        {renderSkills('underline')}
        {renderCertifications('underline')}
        {renderAwards('underline')}
        {renderPublications('underline')}
        {renderVolunteer('underline')}
        {renderLanguages('underline')}
        {renderInterests('underline')}
        {renderProfiles('underline')}
        {renderReferences('underline')}
      </div>
    );
  }

  // =========================================================================
  // 2. PIKACHU (Creative Left Sidebar)
  // =========================================================================
  if (selectedTemplate === 'pikachu') {
    return (
      <div
        id="resume-preview"
        className={styles.cvDocument}
        style={{
          ...docBaseStyle,
          display: 'grid',
          gridTemplateColumns: '32% 68%',
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            padding: '35px 20px',
            boxSizing: 'border-box',
          }}
        >
          {renderAvatar(85, pColor)}

          {/* Contact Details */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ fontSize: '9.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '3px', marginBottom: '10px', fontFamily: headingFont }}>
              Contact
            </div>
            {formData.personal?.email && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Email</div>
                <div style={{ color: '#334155', wordBreak: 'break-all' }}>{formData.personal.email}</div>
              </div>
            )}
            {formData.personal?.phone && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Phone</div>
                <div style={{ color: '#334155' }}>{formData.personal.phone}</div>
              </div>
            )}
            {formData.personal?.address && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Location</div>
                <div style={{ color: '#334155' }}>{formData.personal.address}</div>
              </div>
            )}
            {formData.personal?.portfolio && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Portfolio</div>
                <div style={{ color: '#334155', wordBreak: 'break-all' }}>{formData.personal.portfolio}</div>
              </div>
            )}
            {formData.personal?.linkedin && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>LinkedIn</div>
                <div style={{ color: '#334155', wordBreak: 'break-all' }}>{formData.personal.linkedin}</div>
              </div>
            )}
          </div>

          {/* Sidebar Skills */}
          {techSkills.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '9.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '3px', marginBottom: '10px', fontFamily: headingFont }}>
                Skills
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {techSkills.map((s, idx) => (
                  <div key={idx} style={{ fontSize: '8pt' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155', fontWeight: 600, marginBottom: '2px' }}>
                      <span>{s}</span>
                    </div>
                    <div style={{ height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${85 - (idx % 4) * 6}%`, backgroundColor: pColor, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderCertifications('underline')}
          {renderLanguages('underline')}
          {renderInterests('underline')}
          {renderProfiles('underline')}
        </div>

        {/* Right Main Column */}
        <div style={{ padding: '35px 30px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
          <h1 style={{ fontSize: '26pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', lineHeight: 1.1, fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '13pt', fontWeight: 600, color: pColor, margin: '0 0 18px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>

          {renderSummary('underline')}
          {renderExperience('underline')}
          {renderEducation('underline')}
          {renderProjects('underline')}
          {renderAwards('underline')}
          {renderPublications('underline')}
          {renderVolunteer('underline')}
          {renderReferences('underline')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. GENGAR (Executive Top Header Banner)
  // =========================================================================
  if (selectedTemplate === 'gengar') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={docBaseStyle}>
        {/* Full Width Top Banner */}
        <div style={{ backgroundColor: pColor, color: '#ffffff', padding: '32px 36px', width: '100%', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '26pt', fontWeight: 800, color: '#ffffff', margin: '0 0 4px 0', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '13pt', fontWeight: 500, color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 14px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {formData.personal?.email && (
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '4px 10px', borderRadius: '16px', fontSize: '8pt', color: '#fff' }}>
                ✉ {formData.personal.email}
              </span>
            )}
            {formData.personal?.phone && (
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '4px 10px', borderRadius: '16px', fontSize: '8pt', color: '#fff' }}>
                📞 {formData.personal.phone}
              </span>
            )}
            {formData.personal?.address && (
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '4px 10px', borderRadius: '16px', fontSize: '8pt', color: '#fff' }}>
                📍 {formData.personal.address}
              </span>
            )}
            {formData.personal?.portfolio && (
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '4px 10px', borderRadius: '16px', fontSize: '8pt', color: '#fff' }}>
                🌐 {formData.personal.portfolio}
              </span>
            )}
            {formData.personal?.linkedin && (
              <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)', padding: '4px 10px', borderRadius: '16px', fontSize: '8pt', color: '#fff' }}>
                💼 {formData.personal.linkedin}
              </span>
            )}
          </div>
        </div>

        {/* 2-Column Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '58% 42%', gap: '26px', padding: '28px 36px', boxSizing: 'border-box' }}>
          <div>
            {renderSummary('underline')}
            {renderExperience('underline')}
            {renderProjects('underline')}
            {renderVolunteer('underline')}
            {renderReferences('underline')}
          </div>
          <div>
            {renderEducation('underline')}
            {renderSkills('underline')}
            {renderCertifications('underline')}
            {renderAwards('underline')}
            {renderPublications('underline')}
            {renderLanguages('underline')}
            {renderInterests('underline')}
            {renderProfiles('underline')}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. GLALIE (Minimal ATS Standard)
  // =========================================================================
  if (selectedTemplate === 'glalie') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '40px 45px' }}>
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h1 style={{ fontSize: '24pt', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '11pt', color: '#475569', fontWeight: 500, margin: '0 0 8px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '6px 14px', fontSize: '8.5pt', color: '#64748b' }}>
            {formData.personal?.email && <span>{formData.personal.email}</span>}
            {formData.personal?.phone && <span>• {formData.personal.phone}</span>}
            {formData.personal?.address && <span>• {formData.personal.address}</span>}
            {formData.personal?.portfolio && <span>• {formData.personal.portfolio}</span>}
            {formData.personal?.linkedin && <span>• {formData.personal.linkedin}</span>}
          </div>
          <div style={{ height: '1px', backgroundColor: '#cbd5e1', margin: '14px 0 18px 0' }} />
        </div>

        {renderSummary('underline')}
        {renderExperience('underline')}
        {renderEducation('underline')}
        {renderProjects('underline')}
        {renderSkills('underline')}
        {renderCertifications('underline')}
        {renderAwards('underline')}
        {renderPublications('underline')}
        {renderVolunteer('underline')}
        {renderLanguages('underline')}
        {renderInterests('underline')}
        {renderProfiles('underline')}
        {renderReferences('underline')}
      </div>
    );
  }

  // =========================================================================
  // 5. LAPRAS (Split 2-Column with Accent Stripe)
  // =========================================================================
  if (selectedTemplate === 'lapras') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, borderLeft: `8px solid ${pColor}`, padding: '35px 38px' }}>
        <div style={{ paddingBottom: '16px', borderBottom: `2px solid ${pColor}`, marginBottom: '22px' }}>
          <h1 style={{ fontSize: '25pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 8px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: '8.5pt', color: '#64748b' }}>
            {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
            {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
            {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
            {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
            {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '38% 62%', gap: '26px' }}>
          <div>
            {renderEducation('underline')}
            {renderSkills('underline')}
            {renderCertifications('underline')}
            {renderLanguages('underline')}
            {renderInterests('underline')}
            {renderProfiles('underline')}
          </div>
          <div>
            {renderSummary('underline')}
            {renderExperience('underline')}
            {renderProjects('underline')}
            {renderAwards('underline')}
            {renderPublications('underline')}
            {renderVolunteer('underline')}
            {renderReferences('underline')}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. KAKUNA (Modern Boxed Cards)
  // =========================================================================
  if (selectedTemplate === 'kakuna') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '35px 40px', backgroundColor: '#fcfcfc' }}>
        <div style={{ paddingBottom: '16px', borderBottom: `2px solid ${pColor}`, marginBottom: '22px' }}>
          <h1 style={{ fontSize: '26pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 8px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: '8.5pt', color: '#64748b' }}>
            {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
            {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
            {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
            {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
            {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
          </div>
        </div>

        {renderSummary('underline')}
        {renderExperience('underline', true)}
        {renderEducation('underline', true)}
        {renderProjects('underline', true)}
        {renderAwards('underline', true)}
        {renderPublications('underline', true)}
        {renderVolunteer('underline', true)}
        {renderSkills('underline')}
        {renderCertifications('underline')}
        {renderLanguages('underline')}
        {renderInterests('underline')}
        {renderProfiles('underline')}
        {renderReferences('underline')}
      </div>
    );
  }

  // =========================================================================
  // 7. AZURILL (Right Sidebar Layout)
  // =========================================================================
  if (selectedTemplate === 'azurill') {
    return (
      <div
        id="resume-preview"
        className={styles.cvDocument}
        style={{
          ...docBaseStyle,
          display: 'grid',
          gridTemplateColumns: '67% 33%',
        }}
      >
        {/* Left Main Content */}
        <div style={{ padding: '35px 28px', boxSizing: 'border-box', backgroundColor: '#ffffff' }}>
          <h1 style={{ fontSize: '26pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '13pt', fontWeight: 600, color: pColor, margin: '0 0 18px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>
          {renderSummary('underline')}
          {renderExperience('underline')}
          {renderEducation('underline')}
          {renderProjects('underline')}
          {renderVolunteer('underline')}
          {renderReferences('underline')}
        </div>

        {/* Right Sidebar */}
        <div style={{ padding: '35px 20px', backgroundColor: '#f8fafc', borderLeft: '1px solid #e2e8f0', boxSizing: 'border-box' }}>
          {renderAvatar(80, pColor)}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '9.5pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0f172a', borderBottom: `2px solid ${pColor}`, paddingBottom: '3px', marginBottom: '10px', fontFamily: headingFont }}>
              Contact
            </div>
            {formData.personal?.email && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Email</div>
                <div style={{ color: '#334155', wordBreak: 'break-all' }}>{formData.personal.email}</div>
              </div>
            )}
            {formData.personal?.phone && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Phone</div>
                <div style={{ color: '#334155' }}>{formData.personal.phone}</div>
              </div>
            )}
            {formData.personal?.address && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Location</div>
                <div style={{ color: '#334155' }}>{formData.personal.address}</div>
              </div>
            )}
            {formData.personal?.portfolio && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>Portfolio</div>
                <div style={{ color: '#334155', wordBreak: 'break-all' }}>{formData.personal.portfolio}</div>
              </div>
            )}
            {formData.personal?.linkedin && (
              <div style={{ marginBottom: '8px', fontSize: '8.2pt' }}>
                <div style={{ fontSize: '7pt', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8' }}>LinkedIn</div>
                <div style={{ color: '#334155', wordBreak: 'break-all' }}>{formData.personal.linkedin}</div>
              </div>
            )}
          </div>
          {renderSkills('underline')}
          {renderCertifications('underline')}
          {renderAwards('underline')}
          {renderPublications('underline')}
          {renderLanguages('underline')}
          {renderInterests('underline')}
          {renderProfiles('underline')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 8. CHIKORITA (Timeline Flow)
  // =========================================================================
  if (selectedTemplate === 'chikorita') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '35px 40px' }}>
        <div style={{ paddingBottom: '16px', borderBottom: '2px solid #e2e8f0', marginBottom: '22px' }}>
          <h1 style={{ fontSize: '26pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '13pt', fontWeight: 600, color: pColor, margin: '0 0 8px 0' }}>
            {formData.personal?.title || 'Professional Title'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: '8.5pt', color: '#64748b' }}>
            {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
            {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
            {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
            {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
            {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
          </div>
        </div>

        {renderSummary('underline')}

        {/* Timeline Experience */}
        {formData.experience && formData.experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {renderSectionTitle('Experience', 'underline')}
            <div style={{ position: 'relative', paddingLeft: '22px' }}>
              <div style={{ position: 'absolute', left: '6px', top: '8px', bottom: '8px', width: '2px', backgroundColor: pColor, opacity: 0.5 }} />
              {formData.experience.map(exp => (
                <div key={exp.id} style={{ position: 'relative', marginBottom: '14px' }}>
                  <div style={{ position: 'absolute', left: '-22px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#fff', border: `2.5px solid ${pColor}`, boxSizing: 'border-box' }} />
                  {renderItemHeader(exp.title, exp.company, exp.dates, exp.location)}
                  {exp.responsibilities && (
                    <div style={{ fontSize: '8.8pt', lineHeight: 1.5, color: '#475569', marginTop: '3px' }}>{exp.responsibilities}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {renderEducation('underline')}
        {renderProjects('underline')}
        {renderAwards('underline')}
        {renderPublications('underline')}
        {renderVolunteer('underline')}
        {renderSkills('underline')}
        {renderCertifications('underline')}
        {renderLanguages('underline')}
        {renderInterests('underline')}
        {renderProfiles('underline')}
        {renderReferences('underline')}
      </div>
    );
  }

  // =========================================================================
  // 9. RHYHORN (Bold Block)
  // =========================================================================
  if (selectedTemplate === 'rhyhorn') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={docBaseStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: '60% 40%', backgroundColor: pColor, color: '#ffffff', padding: '32px 38px' }}>
          <div>
            <h1 style={{ fontSize: '26pt', fontWeight: 800, margin: '0 0 3px 0', color: '#fff', fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '13pt', opacity: 0.9, margin: 0 }}>{formData.personal?.title || 'Professional Title'}</p>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '6px', fontSize: '8.2pt', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {formData.personal?.email && <div>✉ {formData.personal.email}</div>}
            {formData.personal?.phone && <div>📞 {formData.personal.phone}</div>}
            {formData.personal?.address && <div>📍 {formData.personal.address}</div>}
            {formData.personal?.portfolio && <div>🌐 {formData.personal.portfolio}</div>}
            {formData.personal?.linkedin && <div>💼 {formData.personal.linkedin}</div>}
          </div>
        </div>

        <div style={{ padding: '28px 38px' }}>
          {renderSummary('bold')}
          {renderExperience('bold')}
          {renderEducation('bold')}
          {renderProjects('bold')}
          {renderAwards('bold')}
          {renderPublications('bold')}
          {renderVolunteer('bold')}
          {renderSkills('bold')}
          {renderCertifications('bold')}
          {renderLanguages('bold')}
          {renderInterests('bold')}
          {renderProfiles('bold')}
          {renderReferences('bold')}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 10. DITTO (Soft Rounded Pill)
  // =========================================================================
  if (selectedTemplate === 'ditto') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '35px 40px' }}>
        <div style={{ backgroundColor: `${pColor}12`, border: `1px solid ${pColor}35`, borderRadius: '16px', padding: '22px', marginBottom: '22px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          {renderAvatar(75, pColor)}
          <div>
            <h1 style={{ fontSize: '25pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 8px 0' }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 14px', fontSize: '8.5pt', color: '#64748b' }}>
              {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
              {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
              {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
              {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
              {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
            </div>
          </div>
        </div>

        {renderSummary('pill')}
        {renderExperience('pill')}
        {renderEducation('pill')}
        {renderProjects('pill')}
        {renderAwards('pill')}
        {renderPublications('pill')}
        {renderVolunteer('pill')}
        {renderSkills('pill')}
        {renderCertifications('pill')}
        {renderLanguages('pill')}
        {renderInterests('pill')}
        {renderProfiles('pill')}
        {renderReferences('pill')}
      </div>
    );
  }

  // =========================================================================
  // 11. BRONZOR (Tech Matrix)
  // =========================================================================
  if (selectedTemplate === 'bronzor') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '30px 40px' }}>
        <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '20px 24px', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '22px' }}>
          <div style={{ opacity: 0.6, fontSize: '8pt', marginBottom: '4px' }}>{"// DEVELOPER_PROFILE_INITIALIZED"}</div>
          <h1 style={{ fontSize: '22pt', margin: '0 0 2px 0', color: '#fff', fontFamily: headingFont }}>
            {formData.personal?.fullName || 'YOUR NAME'}
          </h1>
          <p style={{ fontSize: '11pt', color: '#38bdf8', margin: '0 0 8px 0' }}>{`> ${formData.personal?.title || 'Professional Title'}`}</p>
          <div style={{ fontSize: '8.5pt', color: '#94a3b8', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {formData.personal?.email && <span>{`email: "${formData.personal.email}"`}</span>}
            {formData.personal?.phone && <span>{`phone: "${formData.personal.phone}"`}</span>}
            {formData.personal?.address && <span>{`location: "${formData.personal.address}"`}</span>}
            {formData.personal?.portfolio && <span>{`web: "${formData.personal.portfolio}"`}</span>}
            {formData.personal?.linkedin && <span>{`linkedin: "${formData.personal.linkedin}"`}</span>}
          </div>
        </div>

        {renderSummary('terminal')}
        {renderExperience('terminal')}
        {renderEducation('terminal')}
        {renderProjects('terminal')}
        {renderAwards('terminal')}
        {renderPublications('terminal')}
        {renderVolunteer('terminal')}
        {renderSkills('terminal')}
        {renderCertifications('terminal')}
        {renderLanguages('terminal')}
        {renderInterests('terminal')}
        {renderProfiles('terminal')}
        {renderReferences('terminal')}
      </div>
    );
  }

  // =========================================================================
  // 12. LEAFISH (Editorial Double Line)
  // =========================================================================
  if (selectedTemplate === 'leafish') {
    return (
      <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '35px 45px' }}>
        <div style={{ borderTop: `3px solid ${pColor}`, borderBottom: '1px solid #cbd5e1', padding: '16px 0', marginBottom: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '25pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: 'Georgia, serif' }}>
              {formData.personal?.fullName || 'YOUR NAME'}
            </h1>
            <p style={{ fontSize: '12pt', fontStyle: 'italic', color: pColor, margin: 0 }}>
              {formData.personal?.title || 'Professional Title'}
            </p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#64748b' }}>
            {formData.personal?.email && <div>{formData.personal.email}</div>}
            {formData.personal?.phone && <div>{formData.personal.phone}</div>}
            {formData.personal?.address && <div>{formData.personal.address}</div>}
            {formData.personal?.portfolio && <div>{formData.personal.portfolio}</div>}
            {formData.personal?.linkedin && <div>{formData.personal.linkedin}</div>}
          </div>
        </div>

        {renderSummary('underline')}
        {renderExperience('underline')}
        {renderEducation('underline')}
        {renderProjects('underline')}
        {renderAwards('underline')}
        {renderPublications('underline')}
        {renderVolunteer('underline')}
        {renderSkills('underline')}
        {renderCertifications('underline')}
        {renderLanguages('underline')}
        {renderInterests('underline')}
        {renderProfiles('underline')}
        {renderReferences('underline')}
      </div>
    );
  }

  // =========================================================================
  // 13. DITGAR (Hybrid 3-Tier Grid)
  // =========================================================================
  return (
    <div id="resume-preview" className={styles.cvDocument} style={{ ...docBaseStyle, padding: '32px 38px', borderTop: `5px solid ${pColor}` }}>
      <div style={{ paddingBottom: '16px', borderBottom: '2px solid #e2e8f0', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '25pt', fontWeight: 800, color: '#0f172a', margin: '0 0 3px 0', fontFamily: headingFont }}>
          {formData.personal?.fullName || 'YOUR NAME'}
        </h1>
        <p style={{ fontSize: '12pt', fontWeight: 600, color: pColor, margin: '0 0 8px 0' }}>
          {formData.personal?.title || 'Professional Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', fontSize: '8.5pt', color: '#64748b' }}>
          {formData.personal?.email && <span>✉ {formData.personal.email}</span>}
          {formData.personal?.phone && <span>📞 {formData.personal.phone}</span>}
          {formData.personal?.address && <span>📍 {formData.personal.address}</span>}
          {formData.personal?.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
          {formData.personal?.linkedin && <span>💼 {formData.personal.linkedin}</span>}
        </div>
      </div>

      {renderSummary('underline')}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
        <div>
          {renderExperience('underline')}
          {renderVolunteer('underline')}
        </div>
        <div>
          {renderEducation('underline')}
          {renderCertifications('underline')}
          {renderAwards('underline')}
          {renderPublications('underline')}
        </div>
      </div>

      {renderProjects('underline')}
      {renderSkills('underline')}
      {renderLanguages('underline')}
      {renderInterests('underline')}
      {renderProfiles('underline')}
      {renderReferences('underline')}
    </div>
  );
};
