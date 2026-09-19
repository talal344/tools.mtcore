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

  const docStyle: React.CSSProperties = {
    fontFamily: `${typography.bodyFont}, -apple-system, sans-serif`,
    fontSize: `${Number(typography.bodySize) || 10}pt`,
    lineHeight: typography.bodyLineHeight || '1.5',
    color: tColor,
    backgroundColor: bgColor,
    // Custom CSS variable for primary color
    ['--tpl-primary' as string]: pColor,
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: `${typography.headingFont}, -apple-system, sans-serif`,
  };

  // Helper getters
  const techSkills = (formData.skills?.technical || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const softSkills = (formData.skills?.soft || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Common Section Renderers
  const renderSummary = (titleClass = styles.onyxSectionTitle) => {
    if (!formData.aiSummary) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Summary</span>
        </div>
        <div className={styles.itemDesc}>{formData.aiSummary}</div>
      </div>
    );
  };

  const renderExperience = (titleClass = styles.onyxSectionTitle, isBoxed = false) => {
    if (!formData.experience || formData.experience.length === 0) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Experience</span>
        </div>
        {formData.experience.map(exp => (
          <div key={exp.id} className={isBoxed ? styles.kakunaCard : styles.itemRow}>
            <div className={styles.itemHeader}>
              <span>{exp.title || 'Role Title'}</span>
              <span className={styles.itemDate}>{exp.dates}</span>
            </div>
            <div className={styles.itemSubHeader}>
              <span>{exp.company || 'Company'}</span>
              {exp.location && <span>{exp.location}</span>}
            </div>
            {exp.responsibilities && (
              <div className={styles.itemDesc}>{exp.responsibilities}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderEducation = (titleClass = styles.onyxSectionTitle, isBoxed = false) => {
    if (!formData.education || formData.education.length === 0) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Education</span>
        </div>
        {formData.education.map(edu => (
          <div key={edu.id} className={isBoxed ? styles.kakunaCard : styles.itemRow}>
            <div className={styles.itemHeader}>
              <span>{edu.degree || 'Degree'} {edu.major ? `in ${edu.major}` : ''}</span>
              <span className={styles.itemDate}>{edu.graduationYear}</span>
            </div>
            <div className={styles.itemSubHeader}>
              <span>{edu.university || 'University'}</span>
              {edu.location && <span>{edu.location}</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProjects = (titleClass = styles.onyxSectionTitle, isBoxed = false) => {
    if (!formData.projects || formData.projects.length === 0) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Projects</span>
        </div>
        {formData.projects.map((proj, i) => (
          <div key={i} className={isBoxed ? styles.kakunaCard : styles.itemRow}>
            <div className={styles.itemHeader}>
              <span>{proj.name}</span>
              {proj.url && <span className={styles.itemDate}>{proj.url}</span>}
            </div>
            {proj.description && <div className={styles.itemDesc}>{proj.description}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = (titleClass = styles.onyxSectionTitle) => {
    if (techSkills.length === 0 && softSkills.length === 0) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Skills</span>
        </div>
        {techSkills.length > 0 && (
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '8pt', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Technical</div>
            <div className={styles.tagContainer}>
              {techSkills.map((s, i) => (
                <span key={i} className={styles.tagBadge}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {softSkills.length > 0 && (
          <div>
            <div style={{ fontSize: '8pt', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Soft Skills</div>
            <div className={styles.tagContainer}>
              {softSkills.map((s, i) => (
                <span key={i} className={styles.tagBadge} style={{ background: 'rgba(0,0,0,0.04)', borderColor: '#cbd5e1', color: '#475569' }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCertifications = (titleClass = styles.onyxSectionTitle) => {
    if (!formData.certifications || formData.certifications.length === 0) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Certifications</span>
        </div>
        {formData.certifications.map(c => (
          <div key={c.id} style={{ marginBottom: '6px' }}>
            <div className={styles.itemHeader}>
              <span>{c.name}</span>
              <span className={styles.itemDate}>{c.year}</span>
            </div>
            {c.org && <div className={styles.itemSubHeader}>{c.org}</div>}
          </div>
        ))}
      </div>
    );
  };

  const renderLanguages = (titleClass = styles.onyxSectionTitle) => {
    if (!formData.languages || formData.languages.length === 0) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>Languages</span>
        </div>
        <div className={styles.tagContainer}>
          {formData.languages.map((l, i) => (
            <span key={i} className={styles.tagBadge} style={{ background: '#f1f5f9', color: '#334155', borderColor: '#e2e8f0' }}>
              <strong>{l.name}</strong> {l.fluency ? `(${l.fluency})` : ''}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderReferences = (titleClass = styles.onyxSectionTitle) => {
    if (!formData.references) return null;
    return (
      <div className={styles.onyxSection}>
        <div className={titleClass} style={headingStyle}>
          <span>References</span>
        </div>
        <div className={styles.itemDesc} style={{ fontStyle: 'italic', color: '#64748b' }}>
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
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplOnyx}`} style={docStyle}>
        <header className={styles.onyxHeader}>
          <div>
            <h1 className={styles.onyxName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
            <p className={styles.onyxTitle}>{formData.personal.title || 'Professional Title'}</p>
            <div className={styles.onyxContactList}>
              {formData.personal.email && <div className={styles.contactItem}>✉ {formData.personal.email}</div>}
              {formData.personal.phone && <div className={styles.contactItem}>📞 {formData.personal.phone}</div>}
              {formData.personal.address && <div className={styles.contactItem}>📍 {formData.personal.address}</div>}
              {formData.personal.portfolio && <div className={styles.contactItem}>🌐 {formData.personal.portfolio}</div>}
              {formData.personal.linkedin && <div className={styles.contactItem}>💼 {formData.personal.linkedin}</div>}
            </div>
          </div>
          {formData.personal.picture && (
            <img src={formData.personal.picture} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
          )}
        </header>

        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderProjects()}
        {renderSkills()}
        {renderCertifications()}
        {renderLanguages()}
        {renderReferences()}
      </div>
    );
  }

  // =========================================================================
  // 2. PIKACHU (Left Sidebar Creative)
  // =========================================================================
  if (selectedTemplate === 'pikachu') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplPikachu}`} style={docStyle}>
        {/* Left Sidebar */}
        <aside className={styles.pikachuSidebar}>
          {formData.personal.picture ? (
            <img src={formData.personal.picture} alt="Avatar" className={styles.sidebarAvatar} />
          ) : (
            <div className={styles.sidebarAvatar} style={{ background: pColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24pt', fontWeight: 800 }}>
              {(formData.personal.fullName || 'U').charAt(0)}
            </div>
          )}

          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle} style={headingStyle}>Contact</div>
            {formData.personal.email && (
              <div className={styles.sidebarContactItem}>
                <span className={styles.sidebarContactLabel}>Email</span>
                <span>{formData.personal.email}</span>
              </div>
            )}
            {formData.personal.phone && (
              <div className={styles.sidebarContactItem}>
                <span className={styles.sidebarContactLabel}>Phone</span>
                <span>{formData.personal.phone}</span>
              </div>
            )}
            {formData.personal.address && (
              <div className={styles.sidebarContactItem}>
                <span className={styles.sidebarContactLabel}>Location</span>
                <span>{formData.personal.address}</span>
              </div>
            )}
            {formData.personal.portfolio && (
              <div className={styles.sidebarContactItem}>
                <span className={styles.sidebarContactLabel}>Website</span>
                <span>{formData.personal.portfolio}</span>
              </div>
            )}
          </div>

          {techSkills.length > 0 && (
            <div className={styles.sidebarSection}>
              <div className={styles.sidebarTitle} style={headingStyle}>Skills</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {techSkills.map((s, i) => (
                  <div key={i} style={{ fontSize: '8.5pt' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span>{s}</span>
                    </div>
                    <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${80 + (i % 4) * 5}%`, background: pColor, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {renderCertifications(styles.sidebarTitle)}
          {renderLanguages(styles.sidebarTitle)}
        </aside>

        {/* Right Main Column */}
        <main className={styles.pikachuMain}>
          <h1 className={styles.pikachuName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p className={styles.pikachuTitle}>{formData.personal.title || 'Professional Title'}</p>

          {renderSummary(styles.pikachuSectionTitle)}
          {renderExperience(styles.pikachuSectionTitle)}
          {renderEducation(styles.pikachuSectionTitle)}
          {renderProjects(styles.pikachuSectionTitle)}
          {renderReferences(styles.pikachuSectionTitle)}
        </main>
      </div>
    );
  }

  // =========================================================================
  // 3. GENGAR (Executive Header Banner)
  // =========================================================================
  if (selectedTemplate === 'gengar') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplGengar}`} style={docStyle}>
        <div className={styles.gengarBanner}>
          <h1 className={styles.gengarName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p className={styles.gengarTitle}>{formData.personal.title || 'Professional Title'}</p>
          <div className={styles.gengarBadges}>
            {formData.personal.email && <span className={styles.gengarBadge}>✉ {formData.personal.email}</span>}
            {formData.personal.phone && <span className={styles.gengarBadge}>📞 {formData.personal.phone}</span>}
            {formData.personal.address && <span className={styles.gengarBadge}>📍 {formData.personal.address}</span>}
            {formData.personal.portfolio && <span className={styles.gengarBadge}>🌐 {formData.personal.portfolio}</span>}
            {formData.personal.linkedin && <span className={styles.gengarBadge}>💼 {formData.personal.linkedin}</span>}
          </div>
        </div>

        <div className={styles.gengarBody}>
          <div>
            {renderSummary(styles.gengarSectionTitle)}
            {renderExperience(styles.gengarSectionTitle)}
            {renderProjects(styles.gengarSectionTitle)}
          </div>
          <div>
            {renderEducation(styles.gengarSectionTitle)}
            {renderSkills(styles.gengarSectionTitle)}
            {renderCertifications(styles.gengarSectionTitle)}
            {renderLanguages(styles.gengarSectionTitle)}
            {renderReferences(styles.gengarSectionTitle)}
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
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplGlalie}`} style={docStyle}>
        <header className={styles.glalieHeader}>
          <h1 className={styles.glalieName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p className={styles.glalieTitle}>{formData.personal.title || 'Professional Title'}</p>
          <div className={styles.glalieContact}>
            {formData.personal.email && <span>{formData.personal.email}</span>}
            {formData.personal.phone && <span>{formData.personal.phone}</span>}
            {formData.personal.address && <span>{formData.personal.address}</span>}
            {formData.personal.portfolio && <span>{formData.personal.portfolio}</span>}
            {formData.personal.linkedin && <span>{formData.personal.linkedin}</span>}
          </div>
          <div className={styles.glalieDivider} />
        </header>

        {renderSummary(styles.glalieSectionTitle)}
        {renderExperience(styles.glalieSectionTitle)}
        {renderEducation(styles.glalieSectionTitle)}
        {renderProjects(styles.glalieSectionTitle)}
        {renderSkills(styles.glalieSectionTitle)}
        {renderCertifications(styles.glalieSectionTitle)}
        {renderLanguages(styles.glalieSectionTitle)}
        {renderReferences(styles.glalieSectionTitle)}
      </div>
    );
  }

  // =========================================================================
  // 5. LAPRAS (Split 2-Column with Ocean Stripe)
  // =========================================================================
  if (selectedTemplate === 'lapras') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplLapras}`} style={docStyle}>
        <header className={styles.laprasHeader}>
          <h1 className={styles.onyxName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p className={styles.onyxTitle}>{formData.personal.title || 'Professional Title'}</p>
          <div className={styles.onyxContactList}>
            {formData.personal.email && <span>✉ {formData.personal.email}</span>}
            {formData.personal.phone && <span>📞 {formData.personal.phone}</span>}
            {formData.personal.address && <span>📍 {formData.personal.address}</span>}
            {formData.personal.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
          </div>
        </header>

        <div className={styles.laprasGrid}>
          <div>
            {renderEducation()}
            {renderSkills()}
            {renderCertifications()}
            {renderLanguages()}
          </div>
          <div>
            {renderSummary()}
            {renderExperience()}
            {renderProjects()}
            {renderReferences()}
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
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplKakuna}`} style={docStyle}>
        <header className={styles.onyxHeader} style={{ borderBottomColor: pColor }}>
          <div>
            <h1 className={styles.onyxName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
            <p className={styles.onyxTitle}>{formData.personal.title || 'Professional Title'}</p>
            <div className={styles.onyxContactList}>
              {formData.personal.email && <span>✉ {formData.personal.email}</span>}
              {formData.personal.phone && <span>📞 {formData.personal.phone}</span>}
              {formData.personal.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
            </div>
          </div>
        </header>

        {renderSummary()}
        {renderExperience(styles.onyxSectionTitle, true)}
        {renderEducation(styles.onyxSectionTitle, true)}
        {renderProjects(styles.onyxSectionTitle, true)}
        {renderSkills()}
        {renderCertifications()}
        {renderLanguages()}
        {renderReferences()}
      </div>
    );
  }

  // =========================================================================
  // 7. AZURILL (Right Sidebar Layout)
  // =========================================================================
  if (selectedTemplate === 'azurill') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplAzurill}`} style={docStyle}>
        <main className={styles.azurillMain}>
          <h1 className={styles.pikachuName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p className={styles.pikachuTitle}>{formData.personal.title || 'Professional Title'}</p>
          {renderSummary(styles.pikachuSectionTitle)}
          {renderExperience(styles.pikachuSectionTitle)}
          {renderProjects(styles.pikachuSectionTitle)}
          {renderReferences(styles.pikachuSectionTitle)}
        </main>

        <aside className={styles.azurillSidebar}>
          {formData.personal.picture && (
            <img src={formData.personal.picture} alt="Avatar" className={styles.sidebarAvatar} />
          )}
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarTitle} style={headingStyle}>Contact</div>
            {formData.personal.email && <div className={styles.sidebarContactItem}>{formData.personal.email}</div>}
            {formData.personal.phone && <div className={styles.sidebarContactItem}>{formData.personal.phone}</div>}
            {formData.personal.address && <div className={styles.sidebarContactItem}>{formData.personal.address}</div>}
          </div>
          {renderEducation(styles.sidebarTitle)}
          {renderSkills(styles.sidebarTitle)}
          {renderCertifications(styles.sidebarTitle)}
          {renderLanguages(styles.sidebarTitle)}
        </aside>
      </div>
    );
  }

  // =========================================================================
  // 8. CHIKORITA (Timeline Layout)
  // =========================================================================
  if (selectedTemplate === 'chikorita') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplChikorita}`} style={docStyle}>
        <header className={styles.onyxHeader}>
          <div>
            <h1 className={styles.onyxName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
            <p className={styles.onyxTitle}>{formData.personal.title || 'Professional Title'}</p>
            <div className={styles.onyxContactList}>
              {formData.personal.email && <span>✉ {formData.personal.email}</span>}
              {formData.personal.phone && <span>📞 {formData.personal.phone}</span>}
              {formData.personal.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
            </div>
          </div>
        </header>

        {renderSummary()}
        
        {formData.experience && formData.experience.length > 0 && (
          <div className={styles.onyxSection}>
            <div className={styles.onyxSectionTitle} style={headingStyle}>Experience</div>
            <div className={styles.timelineWrap}>
              {formData.experience.map(exp => (
                <div key={exp.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.itemHeader}>
                    <span>{exp.title}</span>
                    <span className={styles.itemDate}>{exp.dates}</span>
                  </div>
                  <div className={styles.itemSubHeader}>
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.responsibilities && <div className={styles.itemDesc}>{exp.responsibilities}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {renderEducation()}
        {renderProjects()}
        {renderSkills()}
        {renderCertifications()}
        {renderLanguages()}
        {renderReferences()}
      </div>
    );
  }

  // =========================================================================
  // 9. RHYHORN (Bold Block Header)
  // =========================================================================
  if (selectedTemplate === 'rhyhorn') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplRhyhorn}`} style={docStyle}>
        <div className={styles.rhyhornHeaderBlock}>
          <div>
            <h1 style={{ fontSize: '26pt', fontWeight: 800, margin: '0 0 4px 0', ...headingStyle }}>{formData.personal.fullName || 'YOUR NAME'}</h1>
            <p style={{ fontSize: '13pt', opacity: 0.9, margin: 0 }}>{formData.personal.title || 'Professional Title'}</p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '14px', borderRadius: '8px', fontSize: '8.5pt', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {formData.personal.email && <div>✉ {formData.personal.email}</div>}
            {formData.personal.phone && <div>📞 {formData.personal.phone}</div>}
            {formData.personal.portfolio && <div>🌐 {formData.personal.portfolio}</div>}
          </div>
        </div>

        <div className={styles.rhyhornBody}>
          {renderSummary(styles.rhyhornSectionTitle)}
          {renderExperience(styles.rhyhornSectionTitle)}
          {renderEducation(styles.rhyhornSectionTitle)}
          {renderProjects(styles.rhyhornSectionTitle)}
          {renderSkills(styles.rhyhornSectionTitle)}
          {renderCertifications(styles.rhyhornSectionTitle)}
          {renderLanguages(styles.rhyhornSectionTitle)}
          {renderReferences(styles.rhyhornSectionTitle)}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 10. DITTO (Soft Rounded Modern)
  // =========================================================================
  if (selectedTemplate === 'ditto') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplDitto}`} style={docStyle}>
        <div className={styles.dittoHeaderCard}>
          {formData.personal.picture ? (
            <img src={formData.personal.picture} alt="Avatar" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: pColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20pt', fontWeight: 800 }}>
              {(formData.personal.fullName || 'U').charAt(0)}
            </div>
          )}
          <div>
            <h1 className={styles.onyxName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
            <p className={styles.onyxTitle}>{formData.personal.title || 'Professional Title'}</p>
            <div className={styles.onyxContactList}>
              {formData.personal.email && <span>{formData.personal.email}</span>}
              {formData.personal.phone && <span>{formData.personal.phone}</span>}
              {formData.personal.portfolio && <span>{formData.personal.portfolio}</span>}
            </div>
          </div>
        </div>

        {renderSummary(styles.dittoPillTitle)}
        {renderExperience(styles.dittoPillTitle)}
        {renderEducation(styles.dittoPillTitle)}
        {renderProjects(styles.dittoPillTitle)}
        {renderSkills(styles.dittoPillTitle)}
        {renderCertifications(styles.dittoPillTitle)}
        {renderLanguages(styles.dittoPillTitle)}
        {renderReferences(styles.dittoPillTitle)}
      </div>
    );
  }

  // =========================================================================
  // 11. BRONZOR (Tech Matrix)
  // =========================================================================
  if (selectedTemplate === 'bronzor') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplBronzor}`} style={docStyle}>
        <div className={styles.bronzorTerminalHeader}>
          <div style={{ opacity: 0.6, fontSize: '8pt', marginBottom: '4px' }}>{"// DEVELOPER_PROFILE_INITIALIZED"}</div>
          <h1 style={{ fontSize: '22pt', margin: '0 0 2px 0', color: '#fff', ...headingStyle }}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p style={{ fontSize: '11pt', color: '#38bdf8', margin: '0 0 8px 0' }}>{`> ${formData.personal.title || 'Professional Title'}`}</p>
          <div style={{ fontSize: '8.5pt', color: '#94a3b8', display: 'flex', gap: '16px' }}>
            {formData.personal.email && <span>{`email: "${formData.personal.email}"`}</span>}
            {formData.personal.phone && <span>{`phone: "${formData.personal.phone}"`}</span>}
            {formData.personal.portfolio && <span>{`web: "${formData.personal.portfolio}"`}</span>}
          </div>
        </div>

        {renderSummary(styles.bronzorSectionTitle)}
        {renderExperience(styles.bronzorSectionTitle)}
        {renderEducation(styles.bronzorSectionTitle)}
        {renderProjects(styles.bronzorSectionTitle)}
        {renderSkills(styles.bronzorSectionTitle)}
        {renderCertifications(styles.bronzorSectionTitle)}
        {renderLanguages(styles.bronzorSectionTitle)}
        {renderReferences(styles.bronzorSectionTitle)}
      </div>
    );
  }

  // =========================================================================
  // 12. LEAFISH (Editorial Double Line)
  // =========================================================================
  if (selectedTemplate === 'leafish') {
    return (
      <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplLeafish}`} style={docStyle}>
        <div className={styles.leafishDoubleHeader}>
          <div>
            <h1 className={styles.onyxName} style={{ fontFamily: 'Georgia, serif', ...headingStyle }}>{formData.personal.fullName || 'YOUR NAME'}</h1>
            <p className={styles.onyxTitle} style={{ fontStyle: 'italic' }}>{formData.personal.title || 'Professional Title'}</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '8.5pt', color: '#64748b' }}>
            {formData.personal.email && <div>{formData.personal.email}</div>}
            {formData.personal.phone && <div>{formData.personal.phone}</div>}
            {formData.personal.portfolio && <div>{formData.personal.portfolio}</div>}
          </div>
        </div>

        {renderSummary()}
        {renderExperience()}
        {renderEducation()}
        {renderProjects()}
        {renderSkills()}
        {renderCertifications()}
        {renderLanguages()}
        {renderReferences()}
      </div>
    );
  }

  // =========================================================================
  // 13. DITGAR (Hybrid 3-Tier Grid)
  // =========================================================================
  return (
    <div id="resume-preview" className={`${styles.cvDocument} ${styles.tplDitgar}`} style={docStyle}>
      <header className={styles.onyxHeader}>
        <div>
          <h1 className={styles.onyxName} style={headingStyle}>{formData.personal.fullName || 'YOUR NAME'}</h1>
          <p className={styles.onyxTitle}>{formData.personal.title || 'Professional Title'}</p>
          <div className={styles.onyxContactList}>
            {formData.personal.email && <span>✉ {formData.personal.email}</span>}
            {formData.personal.phone && <span>📞 {formData.personal.phone}</span>}
            {formData.personal.portfolio && <span>🌐 {formData.personal.portfolio}</span>}
          </div>
        </div>
      </header>

      {renderSummary()}

      <div className={styles.ditgarGrid}>
        <div>
          {renderExperience()}
        </div>
        <div>
          {renderEducation()}
          {renderCertifications()}
        </div>
      </div>

      {renderProjects()}
      {renderSkills()}
      {renderLanguages()}
      {renderReferences()}
    </div>
  );
};
