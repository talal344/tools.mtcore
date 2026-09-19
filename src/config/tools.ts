export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: 'PDF' | 'Data' | 'Medical' | 'EDI' | 'Text' | 'Security';
  popular?: boolean;
  group: 'from-pdf' | 'to-pdf' | 'other';
  isAi?: boolean;
}

export const tools: Tool[] = [
  // --- FROM PDF ---
  {
    id: 'pdf-to-word',
    slug: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF files to editable Microsoft Word documents with high accuracy.',
    icon: '🟦', // Placeholder for Word Blue
    category: 'PDF',
    group: 'from-pdf',
  },
  {
    id: 'pdf-to-excel',
    slug: 'pdf-to-excel',
    name: 'PDF to Excel',
    description: 'Extract data from PDF tables into Microsoft Excel spreadsheets seamlessly.',
    icon: '🟩', // Placeholder for Excel Green
    category: 'PDF',
    group: 'from-pdf',
  },
  {
    id: 'pdf-to-ppt',
    slug: 'pdf-to-ppt',
    name: 'PDF to PPT',
    description: 'Transform PDF pages into editable Microsoft PowerPoint slides.',
    icon: '🟧', // Placeholder for PPT Orange
    category: 'PDF',
    group: 'from-pdf',
  },
  {
    id: 'pdf-to-jpg',
    slug: 'pdf-to-image',
    name: 'PDF to JPG',
    description: 'Convert high-quality PDF documents into sharp JPEG images instantly.',
    icon: '📸',
    category: 'PDF',
    group: 'from-pdf',
    popular: true,
  },

  // --- TO PDF ---
  {
    id: 'word-to-pdf',
    slug: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Create professional PDF documents from your Microsoft Word files.',
    icon: '🟦',
    category: 'PDF',
    group: 'to-pdf',
  },
  {
    id: 'excel-to-pdf',
    slug: 'excel-to-pdf',
    name: 'Excel to PDF',
    description: 'Convert Microsoft Excel spreadsheets into clear, portable PDF documents.',
    icon: '🟩',
    category: 'PDF',
    group: 'to-pdf',
  },
  {
    id: 'ppt-to-pdf',
    slug: 'ppt-to-pdf',
    name: 'PPT to PDF',
    description: 'Convert Microsoft PowerPoint presentations into high-quality PDFs.',
    icon: '🟧',
    category: 'PDF',
    group: 'to-pdf',
  },
  {
    id: 'jpg-to-pdf',
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert your JPEG images into high-quality PDF documents effortlessly.',
    icon: '🟨',
    category: 'PDF',
    group: 'to-pdf',
  },

  // --- OTHER TOOLS ---
  {
    id: 'pdf-merger',
    slug: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one seamless document with drag-and-drop ease.',
    icon: '📂',
    category: 'PDF',
    group: 'other',
    popular: true,
  },
  {
    id: 'excel-to-hcfa',
    slug: 'excel-to-hcfa',
    name: 'Excel to HCFA 1500',
    description: 'Transform medical billing data from Excel sheets into standard HCFA 1500 forms.',
    icon: '📑',
    category: 'Medical',
    group: 'other',
    popular: true,
  },
  {
    id: 'edi-835-to-pdf',
    slug: 'edi-835-to-pdf',
    name: 'EDI 835 to PDF',
    description: 'Decode complex EDI 835 insurance payment files into human-readable PDF reports.',
    icon: '🔍',
    category: 'EDI',
    group: 'other',
    popular: true,
  },
  {
    id: 'excel-vba-bot',
    slug: 'excel-vba-bot',
    name: 'AI Excel VBA Bot',
    description: 'Generate, debug, and learn Excel VBA code with our intelligent AI assistant.',
    icon: '🤖',
    category: 'Data',
    group: 'other',
    popular: true,
    isAi: true,
  },
  {
    id: 'ai-cv-builder',
    slug: 'ai-cv-builder',
    name: 'AI CV Builder & ATS Reviewer',
    description: 'Create professional, ATS-friendly resumes and get instant scoring and improvement tips.',
    icon: '📝',
    category: 'Data',
    group: 'other',
    popular: true,
    isAi: true,
  },

  // --- TEXT TOOLS ---
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, and sentences in your text instantly.',
    icon: '🔢',
    category: 'Text',
    group: 'other',
    popular: true,
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, and more.',
    icon: 'Aa',
    category: 'Text',
    group: 'other',
    popular: true,
  },
  {
    id: 'remove-duplicate-lines',
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    description: 'Clean up your lists by removing identical lines automatically.',
    icon: '♊',
    category: 'Text',
    group: 'other',
  },
  {
    id: 'text-sorter',
    slug: 'text-sorter',
    name: 'Text Sorter',
    description: 'Sort lines of text alphabetically or numerically in ascending or descending order.',
    icon: '📶',
    category: 'Text',
    group: 'other',
  },
  {
    id: 'text-reverser',
    slug: 'text-reverser',
    name: 'Text Reverser',
    description: 'Flip your text or reverse the order of lines instantly.',
    icon: '⬅️',
    category: 'Text',
    group: 'other',
  },
  {
    id: 'line-break-remover',
    slug: 'line-break-remover',
    name: 'Line Break Remover',
    description: 'Remove unwanted line breaks to clean up your paragraphs.',
    icon: '⏎',
    category: 'Text',
    group: 'other',
  },
  {
    id: 'random-text-generator',
    slug: 'random-text-generator',
    name: 'Random Text Generator',
    description: 'Generate random strings of characters for testing or passwords.',
    icon: '🎲',
    category: 'Text',
    group: 'other',
  },
  {
    id: 'lorem-ipsum-generator',
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for your design and layout needs.',
    icon: '📜',
    category: 'Text',
    group: 'other',
    popular: true,
  },

  // --- SECURITY TOOLS ---
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Create strong, secure passwords with customizable length and characters.',
    icon: '🔑',
    category: 'Security',
    group: 'other',
    popular: true,
  },
  {
    id: 'password-strength-checker',
    slug: 'password-strength-checker',
    name: 'Password Strength Checker',
    description: 'Evaluate the security of your password and get improvement tips.',
    icon: '🛡️',
    category: 'Security',
    group: 'other',
  },
  {
    id: 'sha256-generator',
    slug: 'sha256-generator',
    name: 'SHA256 Generator',
    description: 'Generate secure SHA256 hashes for any input text.',
    icon: '#️⃣',
    category: 'Security',
    group: 'other',
  },
  {
    id: 'md5-hash-generator',
    slug: 'md5-hash-generator',
    name: 'MD5 Hash Generator',
    description: 'Generate MD5 hashes quickly for checksums or non-secure identifiers.',
    icon: '🔡',
    category: 'Security',
    group: 'other',
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens to view their header and payload.',
    icon: '🔓',
    category: 'Security',
    group: 'other',
  }
];

export const getToolBySlug = (slug: string) => tools.find(tool => tool.slug === slug);
