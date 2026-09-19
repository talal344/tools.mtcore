import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an expert AI Resume Builder and Career Coach.
You generate high-quality, professional, ATS-friendly resumes.

MODES:
1. GENERATE_CV: Create a new CV from scratch based on provided data.
2. POLISH_CV: Improve existing CV content (professional summary, work responsibilities) for better impact, tone, and ATS score.

OUTPUT RULE:
For both modes, ALWAYS return a JSON object that matches the CV data structure.
Only return the JSON. No conversational filler.
- Preserve IDs for experience and certifications.`;

interface CVData {
  personal: { fullName: string; title: string; email: string; phone: string; address?: string; portfolio?: string; picture?: string; };
  experience: { id: string; title: string; company: string; location: string; dates: string; responsibilities: string; }[];
  education: { id: string; degree: string; major: string; university: string; location: string; graduationYear: string; }[];
  projects: { name: string; url: string; description: string; }[];
  skills: { technical: string; soft: string; };
  certifications: { id: string; name: string; org: string; year: string; }[];
  aiSummary: string;
}

// Map our custom form data to rxresu.me v4 JSON schema
const mapToRxResume = (data: CVData, template: string) => {
  return {
    picture: {
      hidden: !data.personal.picture,
      url: data.personal.picture || "",
      size: 64,
      rotation: 0,
      aspectRatio: 1,
      borderRadius: 0,
      borderColor: "#cccccc",
      borderWidth: 0,
      shadowColor: "rgba(0,0,0,0)",
      shadowWidth: 0
    },
    basics: {
      name: data.personal.fullName,
      headline: data.personal.title,
      email: data.personal.email,
      phone: data.personal.phone,
      location: data.personal.address || "",
      website: {
        url: data.personal.portfolio || "",
        label: "Portfolio"
      },
      customFields: []
    },
    summary: {
      title: "Summary",
      columns: 1,
      hidden: !data.aiSummary,
      content: data.aiSummary || ""
    },
    sections: {
      profiles: { title: "Profiles", columns: 1, hidden: false, items: [] },
      experience: {
        title: "Experience",
        columns: 1,
        hidden: false,
        items: (data.experience || []).map((xp) => ({
          id: xp.id,
          hidden: false,
          options: { showLinkInTitle: false },
          company: xp.company,
          position: xp.title,
          location: xp.location,
          period: xp.dates,
          website: { url: "", label: "" },
          description: xp.responsibilities,
          roles: []
        }))
      },
      education: {
        title: "Education",
        columns: 1,
        hidden: false,
        items: (data.education || []).map((edu) => ({
          id: edu.id,
          hidden: false,
          options: { showLinkInTitle: false },
          school: edu.university,
          degree: edu.degree,
          area: edu.major,
          grade: "",
          location: edu.location,
          period: edu.graduationYear,
          website: { url: "", label: "" },
          description: ""
        }))
      },
      projects: {
        title: "Projects",
        columns: 1,
        hidden: false,
        items: (data.projects || []).map((p) => ({
          id: p.name,
          hidden: false,
          options: { showLinkInTitle: false },
          name: p.name,
          period: "",
          website: { url: p.url || "", label: "Project Link" },
          description: p.description
        }))
      },
      skills: {
        title: "Skills",
        columns: 1,
        hidden: false,
        items: [
          { id: "tech", hidden: false, options: { showLinkInTitle: false }, icon: "", name: "Technical Skills", proficiency: "Advanced", level: 0, keywords: [data.skills?.technical || ""] },
          { id: "soft", hidden: false, options: { showLinkInTitle: false }, icon: "", name: "Soft Skills", proficiency: "Advanced", level: 0, keywords: [data.skills?.soft || ""] }
        ]
      },
      languages: { title: "Languages", columns: 1, hidden: false, items: [] },
      interests: { title: "Interests", columns: 1, hidden: false, items: [] },
      awards: { title: "Awards", columns: 1, hidden: false, items: [] },
      certifications: {
        title: "Certifications",
        columns: 1,
        hidden: false,
        items: (data.certifications || []).map((c) => ({
          id: c.id,
          hidden: false,
          options: { showLinkInTitle: false },
          title: c.name,
          issuer: c.org,
          date: c.year,
          website: { url: "", label: "" },
          description: ""
        }))
      },
      publications: { title: "Publications", columns: 1, hidden: false, items: [] },
      volunteer: { title: "Volunteer", columns: 1, hidden: false, items: [] },
      references: { title: "References", columns: 1, hidden: false, items: [] }
    },
    customSections: [],
    metadata: {
      template: template || "onyx",
      layout: {
        sidebarWidth: 35,
        pages: [{ fullWidth: false, main: ["experience", "education", "projects"], sidebar: ["skills", "certifications"] }]
      },
      css: { enabled: false, value: "" },
      page: { gapX: 12, gapY: 12, marginX: 30, marginY: 30, format: "a4", locale: "en-US", hideIcons: false },
      design: {
        level: { icon: "", type: "hidden" },
        colors: { primary: "#2563eb", text: "#000000", background: "#ffffff" }
      },
      typography: {
        body: { fontFamily: "Inter", fontWeights: ["400"], fontSize: 10, lineHeight: 1.5 },
        heading: { fontFamily: "Inter", fontWeights: ["700"], fontSize: 14, lineHeight: 1.2 }
      },
      notes: ""
    }
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, mode, formData, template } = body;
    
    // Mode: EXPORT_PDF
    if (mode === 'EXPORT_PDF') {
      const rxResumeData = mapToRxResume(formData, template);
      const rxApiKey = process.env.RXRESUME_API_KEY;

      if (!rxApiKey) {
        return NextResponse.json({ error: 'rxresu.me API key is not configured.' }, { status: 500 });
      }

      // Call rxresu.me API to generate PDF
      // Using the printer RPC endpoint discovered in research
      const response = await fetch('https://rxresu.me/api/rpc/printer/printResumeAsPDF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': rxApiKey
        },
        body: JSON.stringify(rxResumeData),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error('rxresu.me API Error:', err);
        throw new Error('Failed to generate PDF from rxresu.me');
      }

      const pdfBuffer = await response.arrayBuffer();
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="resume.pdf"',
        },
      });
    }

    // Default: Groq AI Generation/Polishing
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Groq API key (GROQ_API_KEY) is missing from environment variables.' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: false,
      }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message || 'Groq API Error');

    return NextResponse.json({
      content: data.choices[0].message.content,
    });

  } catch (error) {
    console.error('CV Builder API Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate response';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
