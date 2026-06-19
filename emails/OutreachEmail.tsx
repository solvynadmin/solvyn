import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface OutreachEmailProps {
  firstName: string;
  companyName: string;
  bodyParagraphs: string[];
  auditFindings: string[];
  closingParagraph: string;
  unsubscribeUrl: string;
}

const BASE_URL = "https://www.solvynconsulting.com";

export default function OutreachEmail({
  firstName,
  companyName,
  bodyParagraphs,
  auditFindings,
  closingParagraph,
  unsubscribeUrl,
}: OutreachEmailProps) {
  const greetingName =
    firstName && firstName !== "there" && firstName.trim() !== ""
      ? firstName
      : `${companyName} team`;

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Space Grotesk"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gozwSKzsKoX.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>

      <Preview>
        A few things I noticed about {companyName} — worth a quick look.
      </Preview>

      <Body style={body}>
        <Container style={container}>

          {/* Header — dot grid background, dark */}
          <Section style={header}>
            <Img
              src={`${BASE_URL}/solvyn-wordmark-dark-bg.svg`}
              alt="Solvyn"
              height={22}
            />
            <div style={eyebrowRow}>
              <div style={eyebrowLine} />
              <Text style={eyebrowText}>Technology &amp; AI Consulting</Text>
            </div>
          </Section>

          {/* Teal accent bar */}
          <div style={tealBar} />

          {/* Body content */}
          <Section style={content}>
            <Text style={greeting}>Hi {greetingName},</Text>

            {bodyParagraphs.map((p, i) => (
              <Text key={i} style={bodyText}>{p}</Text>
            ))}

            {/* Audit findings callout */}
            <div style={callout}>
              <Text style={calloutLabel}>A few things I noticed</Text>
              {auditFindings.map((finding, i) => (
                <div key={i} style={findingRow}>
                  <div style={findingDot} />
                  <Text style={findingText}>{finding}</Text>
                </div>
              ))}
            </div>

            <Text style={bodyText}>{closingParagraph}</Text>
          </Section>

          {/* Divider */}
          <div style={divider} />

          {/* Signature */}
          <Section style={sigSection}>
            <Text style={sigName}>Cameron Cons</Text>
            <Text style={sigRole}>Founder, Solvyn</Text>
            <Link href={BASE_URL} style={sigLink}>solvynconsulting.com</Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              &copy; 2026 Solvyn LLC&nbsp;&nbsp;&middot;&nbsp;&nbsp;25255 N 19th Ave, Phoenix, AZ 85085&nbsp;&nbsp;&middot;&nbsp;&nbsp;
              <Link href={unsubscribeUrl} style={unsubLink}>Unsubscribe</Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

OutreachEmail.PreviewProps = {
  firstName: "Jim",
  companyName: "Canyon State Roofing",
  bodyParagraphs: [
    "I came across Canyon State while researching roofing companies in Phoenix. The BBB A+ rating, the Rosie on the House partnership, 20+ years in the market — the reputation is clearly there.",
    "What I noticed is the website isn't keeping pace with it. When a homeowner lands ready to book an estimate, a few specific things are pushing them toward the next company on the list instead of yours.",
  ],
  auditFindings: [
    "Photos on your homepage aren't loading — the first thing most visitors see is blank boxes. For a roofing company, visuals are doing a lot of the convincing before a call ever happens.",
    "Your estimate form asks 8 questions before someone can submit. Research consistently shows most people drop off after 3. Every extra field is a job that doesn't get booked.",
    "Your ratings and years in business aren't surfacing in Google results the way they could. You're losing clicks to competitors whose actual reputations don't come close to yours.",
  ],
  closingParagraph:
    "I run Solvyn, a small tech consulting firm in Phoenix. I help owner-operated businesses close the gap between how good the business actually is and how well the website reflects it — more calls, more booked jobs, less left on the table each month. If it's worth 20 minutes, I'm happy to walk through exactly what I found. No pitch, just the specifics.",
  unsubscribeUrl: "https://www.solvynconsulting.com/unsubscribe?e=example%40example.com&t=preview",
} satisfies OutreachEmailProps;

/* ── Styles ─────────────────────────────────────────────────────────── */

const body: React.CSSProperties = {
  backgroundColor: "#09090b",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  maxWidth: "580px",
  margin: "0 auto",
  overflow: "hidden",
  borderRadius: 0,
};

const header: React.CSSProperties = {
  backgroundColor: "#09090b",
  backgroundImage:
    "radial-gradient(circle, rgba(113,113,122,0.3) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  padding: "28px 40px 24px",
};

const tealBar: React.CSSProperties = {
  backgroundColor: "#0d9488",
  height: "3px",
};

const eyebrowRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginTop: "18px",
};

const eyebrowLine: React.CSSProperties = {
  backgroundColor: "#0d9488",
  height: "1px",
  width: "24px",
  flexShrink: 0,
  marginRight: "10px",
};

const eyebrowText: React.CSSProperties = {
  color: "#0d9488",
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: 0,
  padding: 0,
};

const content: React.CSSProperties = {
  padding: "40px 40px 32px",
};

const greeting: React.CSSProperties = {
  color: "#18181b",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  lineHeight: "1.75",
  margin: "0 0 16px",
  padding: 0,
};

const bodyText: React.CSSProperties = {
  color: "#52525b",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  lineHeight: "1.75",
  margin: "0 0 16px",
  padding: 0,
};

const callout: React.CSSProperties = {
  backgroundColor: "#f0fdfa",
  border: "1px solid #99f6e4",
  borderRadius: "8px",
  padding: "20px 22px",
  margin: "24px 0",
};

const calloutLabel: React.CSSProperties = {
  color: "#0f766e",
  fontFamily: "Arial, sans-serif",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  margin: "0 0 14px",
  padding: 0,
};

const findingRow: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "10px",
};

const findingDot: React.CSSProperties = {
  backgroundColor: "#0f766e",
  borderRadius: "50%",
  width: "5px",
  height: "5px",
  flexShrink: 0,
  marginTop: "6px",
  marginRight: "10px",
};

const findingText: React.CSSProperties = {
  color: "#18181b",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: 0,
  padding: 0,
};

const divider: React.CSSProperties = {
  borderTop: "1px solid #e4e4e7",
  margin: "0 40px",
};

const sigSection: React.CSSProperties = {
  padding: "24px 40px 28px",
};

const sigName: React.CSSProperties = {
  color: "#18181b",
  fontFamily: "'Space Grotesk', Arial, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  margin: "0 0 2px",
  padding: 0,
};

const sigRole: React.CSSProperties = {
  color: "#71717a",
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  margin: "0 0 3px",
  padding: 0,
};

const sigLink: React.CSSProperties = {
  color: "#0f766e",
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  textDecoration: "none",
};

const footer: React.CSSProperties = {
  backgroundColor: "#09090b",
  padding: "18px 40px",
};

const footerText: React.CSSProperties = {
  color: "#52525b",
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  lineHeight: "1.6",
  margin: 0,
  padding: 0,
  textAlign: "center",
};

const unsubLink: React.CSSProperties = {
  color: "#71717a",
  textDecoration: "underline",
};
