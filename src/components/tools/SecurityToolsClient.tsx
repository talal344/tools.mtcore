'use client';

import React, { useState, useEffect } from 'react';
import { Tool } from '@/config/tools';
import styles from './SecurityToolsClient.module.css';

interface SecurityToolsClientProps {
  tool: Tool;
}

const SecurityToolsClient: React.FC<SecurityToolsClientProps> = ({ tool }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [pwOptions, setPwOptions] = useState({
    length: 16,
    includeNumbers: true,
    includeSymbols: true,
    includeUppercase: true,
    includeLowercase: true
  });
  const [strength, setStrength] = useState({ score: 0, label: 'Weak', color: '#ff4d4d' });
  const [jwtData, setJwtData] = useState<{header: unknown, payload: unknown} | null>(null);

  // Simple MD5 implementation
  const md5 = (string: string) => {
    function k(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + (b & c | ~b & d) + x + t << s | a + (b & c | ~b & d) + x + t >>> 32 - s;
      return a + b | 0;
    }
    function l(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + (b & d | c & ~d) + x + t << s | a + (b & d | c & ~d) + x + t >>> 32 - s;
      return a + b | 0;
    }
    function m(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + (b ^ c ^ d) + x + t << s | a + (b ^ c ^ d) + x + t >>> 32 - s;
      return a + b | 0;
    }
    function n(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      a = a + (c ^ (b | ~d)) + x + t << s | a + (c ^ (b | ~d)) + x + t >>> 32 - s;
      return a + b | 0;
    }
    const x: number[] = [];
    let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    const s = unescape(encodeURIComponent(string));
    for (let i = 0; i < s.length; i++) x[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
    x[s.length >> 2] |= 128 << (s.length % 4 << 3);
    x[(s.length + 8 >> 6 << 4) + 14] = s.length << 3;
    for (let i = 0; i < x.length; i += 16) {
      const aa = a, bb = b, cc = c, dd = d;
      a = k(a, b, c, d, x[i + 0], 7, -680876936); d = k(d, a, b, c, x[i + 1], 12, -389564586); c = k(c, d, a, b, x[i + 2], 17, 606105819); b = k(b, c, d, a, x[i + 3], 22, -1044525330);
      a = k(a, b, c, d, x[i + 4], 7, -176418897); d = k(d, a, b, c, x[i + 5], 12, 1200080426); c = k(c, d, a, b, x[i + 6], 17, -1473231341); b = k(b, c, d, a, x[i + 7], 22, -45705983);
      a = k(a, b, c, d, x[i + 8], 7, 1770035416); d = k(d, a, b, c, x[i + 9], 12, -1958414417); c = k(c, d, a, b, x[i + 10], 17, -42063); b = k(b, c, d, a, x[i + 11], 22, -1990404162);
      a = k(a, b, c, d, x[i + 12], 7, 1804603682); d = k(d, a, b, c, x[i + 13], 12, -40341101); c = k(c, d, a, b, x[i + 14], 17, -1502002290); b = k(b, c, d, a, x[i + 15], 22, 1236535329);
      a = l(a, b, c, d, x[i + 1], 5, -165796510); d = l(d, a, b, c, x[i + 6], 9, -1069501632); c = l(c, d, a, b, x[i + 11], 14, 643717713); b = l(b, c, d, a, x[i + 0], 20, -373897302);
      a = l(a, b, c, d, x[i + 5], 5, -701558691); d = l(d, a, b, c, x[i + 10], 9, 38016083); c = l(c, d, a, b, x[i + 15], 14, -660478335); b = l(b, c, d, a, x[i + 4], 20, -405537848);
      a = l(a, b, c, d, x[i + 9], 5, 568446438); d = l(d, a, b, c, x[i + 14], 9, -1019803690); c = l(c, d, a, b, x[i + 3], 14, -187363961); b = l(b, c, d, a, x[i + 8], 20, 1163531501);
      a = l(a, b, c, d, x[i + 13], 5, -1444681467); d = l(d, a, b, c, x[i + 2], 9, -51403784); c = l(c, d, a, b, x[i + 7], 14, 1735328473); b = l(b, c, d, a, x[i + 12], 20, -1926607734);
      a = m(a, b, c, d, x[i + 5], 4, -378558); d = m(d, a, b, c, x[i + 8], 11, -2022574463); c = m(c, d, a, b, x[i + 11], 16, 1839030562); b = m(b, c, d, a, x[i + 14], 23, -35309556);
      a = m(a, b, c, d, x[i + 1], 4, -1530992060); d = m(d, a, b, c, x[i + 4], 11, 1272893353); c = m(c, d, a, b, x[i + 7], 16, -155497632); b = m(b, c, d, a, x[i + 10], 23, -1094730640);
      a = m(a, b, c, d, x[i + 13], 4, 681279174); d = m(d, a, b, c, x[i + 0], 11, -358537222); c = m(c, d, a, b, x[i + 3], 16, -722521979); b = m(b, c, d, a, x[i + 6], 23, 76029189);
      a = m(a, b, c, d, x[i + 9], 4, -640364487); d = m(d, a, b, c, x[i + 12], 11, -421815835); c = m(c, d, a, b, x[i + 15], 16, 530742520); b = m(b, c, d, a, x[i + 2], 23, -995338651);
      a = n(a, b, c, d, x[i + 0], 6, -198630844); d = n(d, a, b, c, x[i + 7], 10, 1126891415); c = n(c, d, a, b, x[i + 14], 15, -1416354905); b = n(b, c, d, a, x[i + 5], 21, -57434055);
      a = n(a, b, c, d, x[i + 12], 6, 1700485571); d = n(d, a, b, c, x[i + 3], 10, -189490751); c = n(c, d, a, b, x[i + 10], 15, -1051523); b = n(b, c, d, a, x[i + 1], 21, -2054922799);
      a = n(a, b, c, d, x[i + 8], 6, 1873313359); d = n(d, a, b, c, x[i + 15], 10, -30611744); c = n(c, d, a, b, x[i + 6], 15, -1560198380); b = n(b, c, d, a, x[i + 13], 21, 1309151649);
      a = n(a, b, c, d, x[i + 4], 6, -145523070); d = n(d, a, b, c, x[i + 11], 10, -1120210379); c = n(c, d, a, b, x[i + 2], 15, 718787281); b = n(b, c, d, a, x[i + 9], 21, -343485551);
      a = a + aa | 0; b = b + bb | 0; c = c + cc | 0; d = d + dd | 0;
    }
    const o = [a, b, c, d];
    let res = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) res += (o[i] >> (j << 3) & 255).toString(16).padStart(2, '0');
    }
    return res;
  };

  const handleAction = async () => {
    switch (tool.slug) {
      case 'password-generator':
        let charset = '';
        if (pwOptions.includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (pwOptions.includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (pwOptions.includeNumbers) charset += '0123456789';
        if (pwOptions.includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-';
        
        if (charset === '') charset = 'abcdefghijklmnopqrstuvwxyz';
        
        let pw = '';
        for (let i = 0; i < pwOptions.length; i++) {
          pw += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setResult(pw);
        break;

      case 'sha256-generator':
        if (!input) return;
        const msgUint8 = new TextEncoder().encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setResult(hashHex);
        break;

      case 'md5-hash-generator':
        if (!input) return;
        setResult(md5(input));
        break;

      case 'jwt-decoder':
        if (!input) return;
        try {
          const parts = input.split('.');
          if (parts.length !== 3) throw new Error('Invalid JWT format');
          const header = JSON.parse(atob(parts[0]));
          const payload = JSON.parse(atob(parts[1]));
          setJwtData({ header, payload });
          setResult('Successfully Decoded');
        } catch {
          setResult('Error: Invalid JWT');
          setJwtData(null);
        }
        break;
    }
  };

  useEffect(() => {
    if (tool.slug === 'password-strength-checker') {
      let score = 0;
      if (input.length > 8) score++;
      if (/[A-Z]/.test(input)) score++;
      if (/[a-z]/.test(input)) score++;
      if (/[0-9]/.test(input)) score++;
      if (/[^A-Za-z0-9]/.test(input)) score++;

      const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong', 'Secure'];
      const colors = ['#ff4d4d', '#ff4d4d', '#ffa64d', '#ffff4d', '#4dff4d', '#00f2ff'];
      
      setStrength({
        score: (score / 5) * 100,
        label: labels[score],
        color: colors[score]
      });
    }
  }, [input, tool.slug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolTitle}>
        <span>{tool.icon}</span>
        {tool.name}
      </div>

      <div className={styles.card}>
        {tool.slug !== 'password-generator' && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              {tool.slug === 'password-strength-checker' ? 'Test your password' : 
               tool.slug === 'jwt-decoder' ? 'Paste JWT Token' : 'Enter Input Text'}
            </label>
            <textarea 
              className={styles.inputField} 
              rows={tool.slug === 'jwt-decoder' ? 4 : 2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="..."
            />
          </div>
        )}

        {tool.slug === 'password-generator' && (
          <div className={styles.grid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Length: {pwOptions.length}</label>
              <input 
                type="range" min="4" max="64" 
                value={pwOptions.length}
                onChange={(e) => setPwOptions({...pwOptions, length: parseInt(e.target.value)})}
              />
            </div>
            <div className={styles.optionItem}>
              <span className={styles.label}>Uppercase (A-Z)</span>
              <input type="checkbox" checked={pwOptions.includeUppercase} onChange={(e) => setPwOptions({...pwOptions, includeUppercase: e.target.checked})} />
            </div>
            <div className={styles.optionItem}>
              <span className={styles.label}>Lowercase (a-z)</span>
              <input type="checkbox" checked={pwOptions.includeLowercase} onChange={(e) => setPwOptions({...pwOptions, includeLowercase: e.target.checked})} />
            </div>
            <div className={styles.optionItem}>
              <span className={styles.label}>Numbers (0-9)</span>
              <input type="checkbox" checked={pwOptions.includeNumbers} onChange={(e) => setPwOptions({...pwOptions, includeNumbers: e.target.checked})} />
            </div>
            <div className={styles.optionItem}>
              <span className={styles.label}>Symbols (!@#)</span>
              <input type="checkbox" checked={pwOptions.includeSymbols} onChange={(e) => setPwOptions({...pwOptions, includeSymbols: e.target.checked})} />
            </div>
          </div>
        )}

        {tool.slug === 'password-strength-checker' && (
          <div className={styles.inputGroup}>
            <div className={styles.strengthMeter}>
              <div 
                className={styles.strengthBar} 
                style={{ width: `${strength.score}%`, backgroundColor: strength.color }}
              />
            </div>
            <span className={styles.strengthLabel} style={{ color: strength.color }}>
              Strength: {strength.label}
            </span>
          </div>
        )}

        {tool.slug !== 'password-strength-checker' && (
          <button className={styles.actionBtn} onClick={handleAction}>
            {tool.slug === 'password-generator' ? 'Generate Password' : 
             tool.slug === 'jwt-decoder' ? 'Decode JWT' : 'Process'}
          </button>
        )}

        {result && tool.slug !== 'jwt-decoder' && (
          <div className={styles.resultArea}>
            <span className={styles.resultText}>{result}</span>
            <button className={styles.copyBtn} onClick={copyToClipboard}>Copy</button>
          </div>
        )}

        {jwtData && tool.slug === 'jwt-decoder' && (
          <div className={styles.jwtContainer}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Header</label>
              <pre className={styles.jsonBlock}>{JSON.stringify(jwtData.header, null, 2)}</pre>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Payload</label>
              <pre className={styles.jsonBlock}>{JSON.stringify(jwtData.payload, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityToolsClient;
