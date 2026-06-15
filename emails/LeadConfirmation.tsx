import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface LeadConfirmationProps {
  name: string;
}

const BASE_URL = "https://www.solvynconsulting.com";

export default function LeadConfirmation({ name }: LeadConfirmationProps) {
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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');
        `}</style>
      </Head>

      <Preview>We received your message and will follow up within one business day.</Preview>

      <Body style={body}>
        <Container style={container}>

          {/* Dark header with dot-grid — mirrors the hero section */}
          <Section style={header}>
            <Row>
              {/* Wordmark */}
              <Column>
                <Img
                  src={`${BASE_URL}/solvyn-wordmark-dark-bg.svg`}
                  alt="Solvyn"
                  height={24}
                />
              </Column>
              {/* Watermark icon — same treatment as hero */}
              <Column align="right">
                <Img
                  src={`${BASE_URL}/solvyn-icon-dark-bg.svg`}
                  alt=""
                  height={72}
                  style={{ opacity: 0.07 }}
                />
              </Column>
            </Row>
          </Section>

          {/* Teal accent line */}
          <div style={tealBar} />

          {/* Content */}
          <Section style={content}>

            {/* Eyebrow — teal line + label, matching the hero */}
            <Row style={{ marginBottom: "28px" }}>
              <Column style={{ width: "32px", verticalAlign: "middle" }}>
                <div style={eyebrowLine} />
              </Column>
              <Column style={{ verticalAlign: "middle", paddingLeft: "10px" }}>
                <Text style={eyebrowText}>Technology &amp; AI Consulting</Text>
              </Column>
            </Row>

            {/* Heading */}
            <Text style={heading}>We got your message, {name}.</Text>

            {/* Body */}
            <Text style={bodyText}>
              Thanks for reaching out. We received your submission and will
              follow up within one business day.
            </Text>
            <Text style={bodyText}>
              If anything changes or you want to add more context before we
              connect, just reply to this email.
            </Text>
          </Section>

          {/* Divider */}
          <div style={divider} />

          {/* Signature */}
          <Section style={signatureSection}>
            <Text style={sigName}>Cameron</Text>
            <Text style={sigRole}>Solvyn</Text>
          </Section>

          {/* Dark footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <Link href={BASE_URL} style={footerLink}>solvynconsulting.com</Link>
              {"  ·  "}
              <span style={{ color: "#52525b" }}>Arizona, serving clients nationwide</span>
            </Text>
            <Text style={copyright}>&copy; 2026 Solvyn LLC</Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

LeadConfirmation.PreviewProps = {
  name: "Alex",
} satisfies LeadConfirmationProps;

/* ── Styles ─────────────────────────────────────────────────────────── */

const body: React.CSSProperties = {
  backgroundColor: "#18181b",
  margin: 0,
  padding: 0,
};

const container: React.CSSProperties = {
  backgroundColor: "#ffffff",
  maxWidth: "580px",
  margin: "0 auto",
  overflow: "hidden",
};

const header: React.CSSProperties = {
  backgroundColor: "#18181b",
  backgroundImage:
    "radial-gradient(circle, rgba(113,113,122,0.3) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  padding: "28px 40px",
};

const tealBar: React.CSSProperties = {
  backgroundColor: "#0d9488",
  height: "3px",
};

const content: React.CSSProperties = {
  padding: "44px 40px 36px",
};

const eyebrowLine: React.CSSProperties = {
  backgroundColor: "#0d9488",
  height: "1px",
  width: "32px",
};

const eyebrowText: React.CSSProperties = {
  color: "#0d9488",
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  margin: 0,
  padding: 0,
  textTransform: "uppercase",
};

const heading: React.CSSProperties = {
  color: "#18181b",
  fontFamily: "'Space Grotesk', Arial, sans-serif",
  fontSize: "30px",
  fontWeight: 500,
  lineHeight: "1.2",
  margin: "0 0 24px",
  padding: 0,
};

const bodyText: React.CSSProperties = {
  color: "#71717a",
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  lineHeight: "1.65",
  margin: "0 0 16px",
  padding: 0,
};

const divider: React.CSSProperties = {
  borderTop: "1px solid #e4e4e7",
  margin: "0 40px",
};

const signatureSection: React.CSSProperties = {
  padding: "28px 40px",
};

const sigName: React.CSSProperties = {
  color: "#18181b",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  margin: "0 0 3px",
  padding: 0,
};

const sigRole: React.CSSProperties = {
  color: "#a1a1aa",
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  margin: 0,
  padding: 0,
};

const footer: React.CSSProperties = {
  backgroundColor: "#18181b",
  padding: "20px 40px",
};

const footerText: React.CSSProperties = {
  color: "#52525b",
  fontFamily: "Arial, sans-serif",
  fontSize: "13px",
  margin: "0 0 4px",
  padding: 0,
};

const footerLink: React.CSSProperties = {
  color: "#2dd4bf",
  textDecoration: "none",
};

const copyright: React.CSSProperties = {
  color: "#3f3f46",
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  margin: 0,
  padding: 0,
};
