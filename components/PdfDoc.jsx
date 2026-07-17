import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { cleanLines, contactLine } from "@/lib/store";

// Disable hyphenation so ATS parsers never see broken words.
Font.registerHyphenationCallback((word) => [word]);

// Strict ATS rules encoded here:
// - Helvetica only (a core PDF standard font, always extractable as real text)
// - Single column, no tables, no images, no icons, no text boxes
// - Standard section headers and plain round bullets
const s = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 46,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.35,
    color: "#111111",
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  contact: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 4,
  },
  section: {
    marginTop: 11,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
    paddingBottom: 2,
    marginBottom: 6,
  },
  entry: {
    marginBottom: 7,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Helvetica-Oblique",
  },
  dates: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  subline: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 9.5,
    marginTop: 1,
  },
  bulletRow: {
    flexDirection: "row",
    marginTop: 2,
    paddingLeft: 2,
  },
  bulletDot: {
    width: 11,
  },
  bulletText: {
    flex: 1,
  },
  skillLine: {
    marginTop: 2,
  },
});

const Bullet = ({ children }) => (
  <View style={s.bulletRow}>
    <Text style={s.bulletDot}>•</Text>
    <Text style={s.bulletText}>{children}</Text>
  </View>
);

const Section = ({ title, children }) => (
  <View style={s.section}>
    <Text style={s.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const dateRange = (start, end) =>
  [start, end].map((x) => (x || "").trim()).filter(Boolean).join(" - ");

export default function PdfDoc({ draft }) {
  const c = draft.contact || {};
  const experiences = (draft.experiences || []).filter(
    (e) => e.title || e.company || cleanLines(e.bullets).length
  );
  const educations = (draft.educations || []).filter(
    (e) => e.institution || e.degree
  );
  const projects = (draft.projects || []).filter(
    (p) => p.title || cleanLines(p.bullets).length
  );
  const skillCats = (draft.skills?.categories || []).filter(
    (x) => (x.name || "").trim() || (x.items || "").trim()
  );
  const certs = (draft.certifications || [])
    .map((x) => (x.text || "").trim())
    .filter(Boolean);

  return (
    <Document
      title={`${c.name || "Resume"} - ${draft.name || "Resume"}`}
      author={c.name || ""}
    >
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{(c.name || "").toUpperCase()}</Text>
        {contactLine(c) ? <Text style={s.contact}>{contactLine(c)}</Text> : null}

        {(draft.summary || "").trim() ? (
          <Section title="Professional Summary">
            <Text>{draft.summary.trim()}</Text>
          </Section>
        ) : null}

        {experiences.length > 0 && (
          <Section title="Experience">
            {experiences.map((e) => (
              <View key={e.id} style={s.entry} wrap>
                <View style={s.rowBetween}>
                  <Text style={[s.bold, { flex: 1, paddingRight: 8 }]}>
                    {e.title}
                  </Text>
                  <Text style={s.dates}>{dateRange(e.start, e.end)}</Text>
                </View>
                <Text style={s.subline}>
                  {[e.company, e.location].filter(Boolean).join(", ")}
                </Text>
                {cleanLines(e.bullets).map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </View>
            ))}
          </Section>
        )}

        {educations.length > 0 && (
          <Section title="Education">
            {educations.map((e) => (
              <View key={e.id} style={s.entry} wrap>
                <View style={s.rowBetween}>
                  <Text style={[s.bold, { flex: 1, paddingRight: 8 }]}>
                    {e.institution}
                  </Text>
                  <Text style={s.dates}>{dateRange(e.start, e.end)}</Text>
                </View>
                <Text style={s.subline}>
                  {[
                    e.degree,
                    e.grade ? `Grade: ${e.grade}` : "",
                    e.location,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </Text>
                {(e.modules || "").trim() ? (
                  <Bullet>Relevant modules: {e.modules.trim()}</Bullet>
                ) : null}
                {cleanLines(e.bullets).map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </View>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((p) => (
              <View key={p.id} style={s.entry} wrap>
                <View style={s.rowBetween}>
                  <Text style={[s.bold, { flex: 1, paddingRight: 8 }]}>
                    {p.title}
                  </Text>
                  <Text style={s.dates}>{(p.date || "").trim()}</Text>
                </View>
                {(p.tech || "").trim() || (p.link || "").trim() ? (
                  <Text style={s.subline}>
                    {[p.tech, p.link].filter(Boolean).join(" | ")}
                  </Text>
                ) : null}
                {cleanLines(p.bullets).map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </View>
            ))}
          </Section>
        )}

        {skillCats.length > 0 && (
          <Section title="Skills">
            {skillCats.map((cat) => (
              <Text key={cat.id} style={s.skillLine}>
                <Text style={s.bold}>
                  {(cat.name || "").trim()
                    ? `${cat.name.trim()}: `
                    : ""}
                </Text>
                {(cat.items || "").trim()}
              </Text>
            ))}
          </Section>
        )}

        {certs.length > 0 && (
          <Section title="Certifications">
            {certs.map((t, i) => (
              <Bullet key={i}>{t}</Bullet>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
}
