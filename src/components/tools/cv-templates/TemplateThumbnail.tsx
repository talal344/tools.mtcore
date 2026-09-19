import React from 'react';

interface ThumbnailProps {
  templateId: string;
  primaryColor: string;
  secondaryColor?: string;
  isActive?: boolean;
}

export const TemplateThumbnail: React.FC<ThumbnailProps> = ({
  templateId,
  primaryColor,
  isActive = false,
}) => {
  const c = primaryColor || '#2563eb';

  const renderLayout = () => {
    switch (templateId) {
      case 'pikachu': // Left Sidebar
        return (
          <>
            <rect x="0" y="0" width="34" height="140" fill={c} opacity="0.18" />
            <line x1="34" y1="0" x2="34" y2="140" stroke={c} strokeWidth="0.8" opacity="0.4" />
            <circle cx="17" cy="18" r="8" fill={c} opacity="0.75" />
            <rect x="5" y="32" width="24" height="2" rx="1" fill="#64748b" />
            <rect x="5" y="37" width="20" height="2" rx="1" fill="#64748b" />
            <rect x="5" y="42" width="22" height="2" rx="1" fill="#64748b" />
            <rect x="5" y="52" width="16" height="2.5" rx="1" fill={c} />
            <rect x="5" y="58" width="24" height="2" rx="1" fill="#e2e8f0" />
            <rect x="5" y="58" width="18" height="2" rx="1" fill={c} />
            <rect x="5" y="63" width="24" height="2" rx="1" fill="#e2e8f0" />
            <rect x="5" y="63" width="22" height="2" rx="1" fill={c} />
            <rect x="5" y="68" width="24" height="2" rx="1" fill="#e2e8f0" />
            <rect x="5" y="68" width="15" height="2" rx="1" fill={c} />
            <rect x="5" y="78" width="16" height="2.5" rx="1" fill={c} />
            <rect x="5" y="84" width="22" height="2" rx="1" fill="#64748b" />
            <rect x="5" y="89" width="18" height="2" rx="1" fill="#64748b" />
            <rect x="40" y="12" width="38" height="5" rx="1" fill="#0f172a" />
            <rect x="40" y="19" width="24" height="3" rx="1" fill={c} />
            <rect x="40" y="27" width="54" height="2" rx="1" fill="#94a3b8" />
            <rect x="40" y="31" width="48" height="2" rx="1" fill="#94a3b8" />
            <rect x="40" y="41" width="24" height="3" rx="1" fill={c} />
            <line x1="43" y1="48" x2="43" y2="82" stroke={c} strokeWidth="0.8" strokeDasharray="1 1" />
            <circle cx="43" cy="51" r="1.5" fill={c} />
            <rect x="47" y="50" width="28" height="2.5" rx="1" fill="#334155" />
            <rect x="79" y="50" width="15" height="2" rx="1" fill="#94a3b8" />
            <rect x="47" y="55" width="45" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="47" y="59" width="40" height="1.8" rx="0.5" fill="#94a3b8" />
            <circle cx="43" cy="68" r="1.5" fill={c} />
            <rect x="47" y="67" width="24" height="2.5" rx="1" fill="#334155" />
            <rect x="79" y="67" width="15" height="2" rx="1" fill="#94a3b8" />
            <rect x="47" y="72" width="46" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="40" y="88" width="22" height="3" rx="1" fill={c} />
            <rect x="40" y="94" width="30" height="2.5" rx="1" fill="#334155" />
            <rect x="40" y="99" width="24" height="2" rx="1" fill="#94a3b8" />
          </>
        );

      case 'gengar': // Header Banner
        return (
          <>
            <rect x="0" y="0" width="100" height="32" fill={c} />
            <rect x="8" y="8" width="42" height="5.5" rx="1" fill="#ffffff" />
            <rect x="8" y="16" width="26" height="3" rx="1" fill="#ffffff" opacity="0.8" />
            <rect x="8" y="23" width="18" height="3.5" rx="1.5" fill="#ffffff" opacity="0.3" />
            <rect x="29" y="23" width="22" height="3.5" rx="1.5" fill="#ffffff" opacity="0.3" />
            <rect x="54" y="23" width="20" height="3.5" rx="1.5" fill="#ffffff" opacity="0.3" />
            <rect x="8" y="40" width="22" height="3" rx="1" fill={c} />
            <line x1="8" y1="45" x2="52" y2="45" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="8" y="49" width="30" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="54" width="42" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="58" width="38" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="66" width="28" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="71" width="42" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="75" width="35" height="2" rx="1" fill="#94a3b8" />
            <rect x="58" y="40" width="18" height="3" rx="1" fill={c} />
            <line x1="58" y1="45" x2="92" y2="45" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="58" y="49" width="28" height="2.5" rx="1" fill="#334155" />
            <rect x="58" y="53" width="20" height="2" rx="1" fill="#94a3b8" />
            <rect x="58" y="64" width="16" height="3" rx="1" fill={c} />
            <line x1="58" y1="69" x2="92" y2="69" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="58" y="73" width="15" height="4" rx="2" fill={c} opacity="0.2" />
            <rect x="75" y="73" width="16" height="4" rx="2" fill={c} opacity="0.2" />
            <rect x="58" y="79" width="18" height="4" rx="2" fill={c} opacity="0.2" />
            <rect x="78" y="79" width="13" height="4" rx="2" fill={c} opacity="0.2" />
          </>
        );

      case 'glalie': // Minimal ATS
        return (
          <>
            <rect x="28" y="10" width="44" height="5" rx="1" fill="#0f172a" />
            <rect x="36" y="17" width="28" height="2.5" rx="0.5" fill="#64748b" />
            <rect x="20" y="22" width="60" height="2" rx="0.5" fill="#94a3b8" />
            <line x1="10" y1="28" x2="90" y2="28" stroke="#cbd5e1" strokeWidth="0.8" />
            <rect x="10" y="33" width="24" height="2.5" rx="0.5" fill="#0f172a" />
            <line x1="10" y1="37" x2="90" y2="37" stroke="#e2e8f0" strokeWidth="0.6" />
            <rect x="10" y="41" width="80" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="10" y="45" width="72" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="10" y="53" width="26" height="2.5" rx="0.5" fill="#0f172a" />
            <line x1="10" y1="57" x2="90" y2="57" stroke="#e2e8f0" strokeWidth="0.6" />
            <rect x="10" y="61" width="34" height="2" rx="0.5" fill="#334155" />
            <rect x="70" y="61" width="20" height="2" rx="0.5" fill="#64748b" />
            <rect x="10" y="65" width="78" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="10" y="69" width="74" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="10" y="75" width="30" height="2" rx="0.5" fill="#334155" />
            <rect x="70" y="75" width="20" height="2" rx="0.5" fill="#64748b" />
            <rect x="10" y="79" width="76" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="10" y="87" width="24" height="2.5" rx="0.5" fill="#0f172a" />
            <line x1="10" y1="91" x2="90" y2="91" stroke="#e2e8f0" strokeWidth="0.6" />
            <rect x="10" y="95" width="36" height="2" rx="0.5" fill="#334155" />
            <rect x="70" y="95" width="20" height="2" rx="0.5" fill="#64748b" />
          </>
        );

      case 'lapras': // Split 2-Column
        return (
          <>
            <rect x="0" y="0" width="4" height="140" fill={c} />
            <rect x="10" y="10" width="44" height="5" rx="1" fill="#0f172a" />
            <rect x="10" y="17" width="28" height="3" rx="1" fill={c} />
            <line x1="10" y1="24" x2="92" y2="24" stroke={c} strokeWidth="1" />
            <rect x="10" y="30" width="20" height="3" rx="1" fill={c} />
            <rect x="10" y="36" width="36" height="2" rx="1" fill="#94a3b8" />
            <rect x="10" y="44" width="20" height="3" rx="1" fill={c} />
            <rect x="10" y="50" width="34" height="2" rx="1" fill="#334155" />
            <rect x="10" y="54" width="26" height="2" rx="1" fill="#94a3b8" />
            <rect x="10" y="64" width="18" height="3" rx="1" fill={c} />
            <rect x="10" y="70" width="16" height="4" rx="2" fill={c} opacity="0.2" />
            <rect x="28" y="70" width="16" height="4" rx="2" fill={c} opacity="0.2" />
            <rect x="52" y="30" width="22" height="3" rx="1" fill={c} />
            <circle cx="54" cy="38" r="1.5" fill={c} />
            <rect x="58" y="37" width="26" height="2.5" rx="1" fill="#334155" />
            <rect x="58" y="42" width="34" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="58" y="46" width="30" height="1.8" rx="0.5" fill="#94a3b8" />
            <circle cx="54" cy="56" r="1.5" fill={c} />
            <rect x="58" y="55" width="24" height="2.5" rx="1" fill="#334155" />
            <rect x="58" y="60" width="34" height="1.8" rx="0.5" fill="#94a3b8" />
          </>
        );

      case 'kakuna': // Boxed Cards
        return (
          <>
            <rect x="8" y="8" width="38" height="5" rx="1" fill="#0f172a" />
            <rect x="8" y="15" width="24" height="3" rx="1" fill={c} />
            <rect x="8" y="21" width="56" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="28" width="84" height="26" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="8" y="28" width="3" height="26" rx="1" fill={c} />
            <rect x="15" y="32" width="30" height="2.5" rx="0.5" fill="#0f172a" />
            <rect x="68" y="32" width="20" height="2" rx="0.5" fill="#64748b" />
            <rect x="15" y="37" width="70" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="15" y="41" width="65" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="15" y="45" width="68" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="58" width="84" height="26" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="8" y="58" width="3" height="26" rx="1" fill={c} />
            <rect x="15" y="62" width="28" height="2.5" rx="0.5" fill="#0f172a" />
            <rect x="68" y="62" width="20" height="2" rx="0.5" fill="#64748b" />
            <rect x="15" y="67" width="70" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="15" y="71" width="62" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="90" width="18" height="3" rx="1" fill={c} />
            <rect x="8" y="96" width="18" height="4.5" rx="2.2" fill={c} opacity="0.2" />
            <rect x="29" y="96" width="20" height="4.5" rx="2.2" fill={c} opacity="0.2" />
            <rect x="52" y="96" width="16" height="4.5" rx="2.2" fill={c} opacity="0.2" />
            <rect x="71" y="96" width="21" height="4.5" rx="2.2" fill={c} opacity="0.2" />
          </>
        );

      case 'azurill': // Right Sidebar
        return (
          <>
            <rect x="66" y="0" width="34" height="140" fill={c} opacity="0.18" />
            <line x1="66" y1="0" x2="66" y2="140" stroke={c} strokeWidth="0.8" opacity="0.4" />
            <circle cx="83" cy="18" r="8" fill={c} opacity="0.75" />
            <rect x="71" y="32" width="24" height="2" rx="1" fill="#64748b" />
            <rect x="71" y="37" width="20" height="2" rx="1" fill="#64748b" />
            <rect x="71" y="48" width="16" height="2.5" rx="1" fill={c} />
            <rect x="71" y="54" width="24" height="2" rx="1" fill={c} />
            <rect x="71" y="59" width="20" height="2" rx="1" fill={c} />
            <rect x="71" y="64" width="22" height="2" rx="1" fill={c} />
            <rect x="8" y="12" width="44" height="5" rx="1" fill="#0f172a" />
            <rect x="8" y="19" width="28" height="3" rx="1" fill={c} />
            <rect x="8" y="28" width="52" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="32" width="46" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="42" width="24" height="3" rx="1" fill={c} />
            <line x1="8" y1="47" x2="60" y2="47" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="8" y="52" width="30" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="57" width="50" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="61" width="44" height="1.8" rx="0.5" fill="#94a3b8" />
          </>
        );

      case 'chikorita': // Timeline
        return (
          <>
            <rect x="8" y="10" width="42" height="5" rx="1" fill="#0f172a" />
            <rect x="8" y="17" width="26" height="3" rx="1" fill={c} />
            <rect x="8" y="23" width="58" height="2" rx="0.5" fill="#94a3b8" />
            <line x1="14" y1="34" x2="14" y2="125" stroke={c} strokeWidth="1" opacity="0.6" />
            <circle cx="14" cy="42" r="2.5" fill="#ffffff" stroke={c} strokeWidth="1.2" />
            <rect x="22" y="40" width="32" height="2.5" rx="1" fill="#0f172a" />
            <rect x="68" y="40" width="22" height="2" rx="0.5" fill="#64748b" />
            <rect x="22" y="45" width="68" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="22" y="49" width="62" height="1.8" rx="0.5" fill="#94a3b8" />
            <circle cx="14" cy="62" r="2.5" fill="#ffffff" stroke={c} strokeWidth="1.2" />
            <rect x="22" y="60" width="28" height="2.5" rx="1" fill="#0f172a" />
            <rect x="68" y="60" width="22" height="2" rx="0.5" fill="#64748b" />
            <rect x="22" y="65" width="68" height="1.8" rx="0.5" fill="#94a3b8" />
            <circle cx="14" cy="82" r="2.5" fill="#ffffff" stroke={c} strokeWidth="1.2" />
            <rect x="22" y="80" width="34" height="2.5" rx="1" fill="#0f172a" />
            <rect x="22" y="85" width="24" height="2" rx="0.5" fill="#94a3b8" />
          </>
        );

      case 'leafish': // Editorial Double Line
        return (
          <>
            <line x1="8" y1="8" x2="92" y2="8" stroke={c} strokeWidth="2" />
            <line x1="8" y1="12" x2="92" y2="12" stroke={c} strokeWidth="0.8" />
            <rect x="8" y="16" width="46" height="5.5" rx="1" fill="#1e293b" />
            <rect x="8" y="24" width="28" height="2.5" rx="0.5" fill={c} />
            <rect x="58" y="17" width="34" height="2" rx="0.5" fill="#64748b" />
            <rect x="58" y="21" width="34" height="2" rx="0.5" fill="#64748b" />
            <line x1="8" y1="29" x2="92" y2="29" stroke="#cbd5e1" strokeWidth="0.6" />
            <rect x="8" y="34" width="24" height="3" rx="1" fill={c} />
            <rect x="8" y="40" width="38" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="45" width="38" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="49" width="34" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="52" y="34" width="24" height="3" rx="1" fill={c} />
            <rect x="52" y="40" width="38" height="2.5" rx="1" fill="#334155" />
            <rect x="52" y="45" width="38" height="2" rx="0.5" fill="#94a3b8" />
          </>
        );

      case 'rhyhorn': // Bold Block
        return (
          <>
            <rect x="0" y="0" width="56" height="32" fill={c} />
            <rect x="6" y="8" width="44" height="6" rx="1" fill="#ffffff" />
            <rect x="6" y="17" width="30" height="3" rx="1" fill="#ffffff" opacity="0.8" />
            <rect x="60" y="4" width="36" height="24" rx="2" fill="#f1f5f9" />
            <rect x="64" y="9" width="28" height="2" rx="0.5" fill="#475569" />
            <rect x="64" y="14" width="24" height="2" rx="0.5" fill="#475569" />
            <rect x="64" y="19" width="26" height="2" rx="0.5" fill="#475569" />
            <rect x="8" y="40" width="26" height="3.5" rx="1" fill="#0f172a" />
            <line x1="8" y1="46" x2="92" y2="46" stroke={c} strokeWidth="1.5" />
            <rect x="8" y="51" width="36" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="56" width="80" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="60" width="74" height="1.8" rx="0.5" fill="#94a3b8" />
          </>
        );

      case 'ditto': // Soft Rounded Pill
        return (
          <>
            <rect x="6" y="6" width="88" height="26" rx="6" fill={c} opacity="0.12" stroke={c} strokeWidth="0.8" />
            <circle cx="18" cy="19" r="6" fill={c} opacity="0.8" />
            <rect x="28" y="12" width="34" height="4.5" rx="1" fill="#0f172a" />
            <rect x="28" y="19" width="22" height="2.5" rx="1" fill={c} />
            <rect x="8" y="38" width="28" height="6" rx="3" fill={c} opacity="0.2" />
            <rect x="8" y="48" width="84" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="52" width="78" height="2" rx="1" fill="#94a3b8" />
            <rect x="8" y="60" width="30" height="6" rx="3" fill={c} opacity="0.2" />
            <rect x="8" y="70" width="36" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="75" width="80" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="88" width="18" height="5" rx="2.5" fill={c} opacity="0.25" />
            <rect x="29" y="88" width="20" height="5" rx="2.5" fill={c} opacity="0.25" />
            <rect x="52" y="88" width="16" height="5" rx="2.5" fill={c} opacity="0.25" />
          </>
        );

      case 'bronzor': // Tech Matrix
        return (
          <>
            <rect x="0" y="0" width="100" height="22" fill="#1e293b" />
            <rect x="8" y="6" width="40" height="4.5" rx="1" fill="#38bdf8" />
            <rect x="8" y="13" width="24" height="2.5" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="30" width="28" height="3" rx="0.5" fill="#1e293b" />
            <line x1="8" y1="35" x2="92" y2="35" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="8" y="40" width="32" height="2.5" rx="0.5" fill="#334155" />
            <rect x="8" y="45" width="80" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="58" width="84" height="22" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
            <rect x="12" y="63" width="14" height="4" rx="1" fill="#e2e8f0" />
            <rect x="29" y="63" width="16" height="4" rx="1" fill="#e2e8f0" />
            <rect x="48" y="63" width="14" height="4" rx="1" fill="#e2e8f0" />
          </>
        );

      case 'ditgar': // Hybrid Grid
        return (
          <>
            <rect x="0" y="0" width="100" height="5" fill={c} />
            <rect x="8" y="10" width="44" height="5" rx="1" fill="#0f172a" />
            <rect x="8" y="17" width="26" height="3" rx="1" fill={c} />
            <rect x="8" y="23" width="60" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="32" width="22" height="3" rx="1" fill={c} />
            <line x1="8" y1="37" x2="52" y2="37" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="8" y="41" width="32" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="46" width="42" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="58" y="32" width="18" height="3" rx="1" fill={c} />
            <line x1="58" y1="37" x2="92" y2="37" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="58" y="41" width="28" height="2.5" rx="1" fill="#334155" />
            <rect x="8" y="64" width="20" height="3" rx="1" fill={c} />
            <line x1="8" y1="69" x2="92" y2="69" stroke="#e2e8f0" strokeWidth="0.8" />
            <rect x="8" y="74" width="18" height="4.5" rx="2" fill={c} opacity="0.2" />
            <rect x="29" y="74" width="20" height="4.5" rx="2" fill={c} opacity="0.2" />
            <rect x="52" y="74" width="16" height="4.5" rx="2" fill={c} opacity="0.2" />
            <rect x="71" y="74" width="21" height="4.5" rx="2" fill={c} opacity="0.2" />
          </>
        );

      default: // Onyx (Modern Executive)
        return (
          <>
            <rect x="0" y="0" width="100" height="5" fill={c} />
            <rect x="8" y="11" width="42" height="5.5" rx="1" fill="#0f172a" />
            <rect x="8" y="19" width="28" height="3" rx="1" fill={c} />
            <rect x="8" y="25" width="64" height="2" rx="0.5" fill="#94a3b8" />
            <line x1="8" y1="30" x2="92" y2="30" stroke={c} strokeWidth="1" />
            <rect x="8" y="35" width="24" height="3" rx="1" fill={c} />
            <rect x="8" y="41" width="84" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="45" width="76" height="2" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="53" width="26" height="3" rx="1" fill={c} />
            <rect x="8" y="59" width="34" height="2.5" rx="1" fill="#334155" />
            <rect x="70" y="59" width="22" height="2" rx="0.5" fill="#64748b" />
            <rect x="8" y="64" width="80" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="68" width="74" height="1.8" rx="0.5" fill="#94a3b8" />
            <rect x="8" y="80" width="20" height="3" rx="1" fill={c} />
            <rect x="8" y="86" width="18" height="4.5" rx="2" fill={c} opacity="0.2" />
            <rect x="29" y="86" width="20" height="4.5" rx="2" fill={c} opacity="0.2" />
            <rect x="52" y="86" width="16" height="4.5" rx="2" fill={c} opacity="0.2" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 100 140"
      width="100%"
      height="100%"
      style={{
        borderRadius: '6px',
        overflow: 'hidden',
        boxShadow: isActive ? `0 0 0 2px #00f2ff, 0 8px 20px rgba(0, 242, 255, 0.25)` : '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'block',
      }}
    >
      <rect x="0" y="0" width="100" height="140" fill="#ffffff" rx="3" />
      {renderLayout()}
    </svg>
  );
};
