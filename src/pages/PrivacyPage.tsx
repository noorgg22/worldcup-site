import { useIsMobile } from '../hooks/useIsMobile';

export default function PrivacyPage() {
  const isMobile = useIsMobile();

  const section = (title: string, children: React.ReactNode) => (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 20,
        color: 'var(--white)', margin: '0 0 12px',
        borderLeft: '3px solid var(--gold)', paddingLeft: 12,
      }}>{title}</h2>
      {children}
    </div>
  );

  const p = (text: string) => (
    <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, margin: '0 0 10px' }}>{text}</p>
  );

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: isMobile ? '32px 20px 80px' : '40px 24px 80px' }}>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: isMobile ? 30 : 42,
          color: 'var(--white)', marginBottom: 6,
        }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 40 }}>
          Last updated: May 20, 2026 · worldcup-site.vercel.app
        </p>

        {section('Overview', <>
          {p('This Privacy Policy describes how worldcup-site.vercel.app ("we", "us", or "our") collects, uses, and shares information when you visit our website. We are committed to protecting your privacy and being transparent about the data practices on this site.')}
          {p('By using this website, you agree to the collection and use of information in accordance with this policy.')}
        </>)}

        {section('Information We Collect', <>
          {p('We do not directly collect personal information such as names, email addresses, or payment information. However, third-party services integrated into this site may collect certain data automatically.')}
          {p('Automatically collected data may include: IP address, browser type and version, pages visited on our site, time spent on pages, referring URLs, and device information. This data is collected through cookies and similar tracking technologies by third-party services described below.')}
        </>)}

        {section('Google AdSense & Advertising', <>
          {p('This website uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this website or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the Internet.')}
          {p('You may opt out of personalized advertising by visiting Google\'s Ads Settings at https://www.google.com/settings/ads. For more information on how Google uses data from sites that use their services, visit https://policies.google.com/technologies/partner-sites.')}
          {p('We are a participant in the Google AdSense program. Ad revenue from this site helps support the ongoing development and maintenance of this free resource.')}
        </>)}

        {section('Cookies', <>
          {p('Our site uses cookies — small text files stored on your device — to improve your experience and enable certain features. Cookies used on this site include:')}
          {p('Essential cookies: Required for the website to function properly. These cannot be disabled.')}
          {p('Analytics cookies: Used to understand how visitors interact with the website. We use Vercel Analytics, which collects anonymized usage data.')}
          {p('Advertising cookies: Placed by Google AdSense to serve relevant advertisements. These track your browsing behavior across websites.')}
          {p('You can control cookies through your browser settings. Disabling cookies may affect the functionality of certain features on our site.')}
        </>)}

        {section('Third-Party Services', <>
          {p('This website integrates the following third-party services, each with their own privacy policies:')}
          {p('• Google AdSense — Advertising network (policies.google.com/privacy)')}
          {p('• Vercel Analytics — Anonymous site analytics (vercel.com/legal/privacy-policy)')}
          {p('• Wikipedia API — Used to fetch publicly available player photos (wikimediafoundation.org/privacy-policy)')}
          {p('• Google Fonts / CDN assets — Fonts and map data')}
          {p('These third parties may collect information about you when you interact with our site. We do not control their data collection or use practices.')}
        </>)}

        {section('Data Retention', <>
          {p('We do not store personal data on our own servers. Any data collection occurs through the third-party services listed above, and their respective data retention policies apply.')}
        </>)}

        {section('Your Rights', <>
          {p('Depending on your location, you may have rights under applicable privacy law including the right to access, correct, or delete personal data held about you by third-party services. Please refer to each third party\'s privacy policy for instructions on exercising these rights.')}
          {p('For users in the European Economic Area (EEA), California (CCPA), and other jurisdictions with comprehensive privacy laws, you may have additional rights regarding your personal information.')}
        </>)}

        {section('Children\'s Privacy', <>
          {p('This website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal information through our site, please contact us so we can take appropriate action.')}
        </>)}

        {section('Changes to This Policy', <>
          {p('We may update this Privacy Policy from time to time. We will notify users of any significant changes by updating the "Last updated" date at the top of this page. Continued use of the website after any changes constitutes acceptance of the updated policy.')}
        </>)}

        {section('Contact', <>
          {p('If you have any questions about this Privacy Policy or our data practices, please reach out via the contact information available on this website. We will endeavor to respond to all privacy-related inquiries promptly.')}
        </>)}

      </div>
    </div>
  );
}
