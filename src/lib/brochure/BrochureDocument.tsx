/* eslint-disable jsx-a11y/alt-text -- `Image` here is @react-pdf/renderer's
   PDF-embedding primitive, not an HTML <img>; it has no `alt` prop. */
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  Svg,
  Defs,
  RadialGradient,
  Stop,
  Rect,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ServiceDefinition } from "@/lib/services";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/services";
import type { Property } from "@/lib/propertyTypes";
import type { SocialLinks } from "@/lib/siteSettingsTypes";
import { formatCOP } from "@/lib/format";

// Clean, predictable wrapping — no "Hospi-talaria"-style hyphen breaks.
Font.registerHyphenationCallback((word) => [word]);

const COLORS = {
  ink950: "#08090b",
  ink900: "#101216",
  ink800: "#191c22",
  ink600: "#333944",
  white: "#ffffff",
  whiteSoft: "#d7d9dd",
  whiteFaint: "#9aa0ab",
  brand400: "#ff9a35",
  brand500: "#fb7d16",
  brand600: "#e2650c",
  brand700: "#bb4c0c",
  ctaBorder: "#f3d4ad",
  ctaBg: "#fdf4e9",
  border: "#e4e1db",
  paper: "#fdfbf8",
};

const SOCIAL_PLATFORM_DISPLAY: Record<keyof SocialLinks, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  twitter: "X / Twitter",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: COLORS.ink900,
    backgroundColor: COLORS.paper,
  },
  darkPage: {
    fontFamily: "Helvetica",
    backgroundColor: COLORS.ink950,
    color: COLORS.white,
  },
  bleed: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },

  body: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 50,
    paddingTop: 56,
    paddingBottom: 64,
  },
  eyebrow: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 2.4,
    color: COLORS.brand600,
  },
  eyebrowDark: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 2.4,
    color: COLORS.brand400,
  },
  h1: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    marginTop: 8,
    color: COLORS.ink950,
  },
  h1Dark: {
    fontFamily: "Helvetica-Bold",
    fontSize: 24,
    marginTop: 8,
    color: COLORS.white,
  },
  paragraph: {
    fontSize: 10.5,
    lineHeight: 1.6,
    color: COLORS.ink600,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 50,
    right: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.75,
    borderTopColor: COLORS.border,
    paddingTop: 10,
  },
});

function LightFooter() {
  return (
    <View style={styles.footer} fixed>
      <Text style={{ fontSize: 8, color: "#8b8577" }}>
        Grupo Saly — Construcción, Remodelación e Inmobiliaria
      </Text>
      <Text
        style={{ fontSize: 8, color: "#8b8577" }}
        render={({ pageNumber }) => String(pageNumber).padStart(2, "0")}
        fixed
      />
    </View>
  );
}

function DarkPageNumber() {
  return (
    <Text
      style={{ position: "absolute", bottom: 28, right: 50, fontSize: 8, color: COLORS.whiteFaint }}
      render={({ pageNumber }) => String(pageNumber).padStart(2, "0")}
      fixed
    />
  );
}

function CtaBand({ text }: { text: string }) {
  return (
    <View
      style={{
        marginTop: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: COLORS.ctaBorder,
        backgroundColor: COLORS.ctaBg,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 9.5, color: COLORS.ink900, flex: 1, lineHeight: 1.4 }}>
        {text}
      </Text>
      <Link
        src={whatsappLink(text)}
        style={{ fontFamily: "Helvetica-Bold", fontSize: 10.5, color: COLORS.brand600, textDecoration: "none" }}
      >
        WhatsApp {WHATSAPP_DISPLAY}
      </Link>
    </View>
  );
}

interface BrochureDocumentProps {
  logoUrl?: string | null;
  heroImage?: string | null;
  services: { service: ServiceDefinition; photo?: string | null }[];
  includeAbout: boolean;
  includeProcess: boolean;
  includeStats: boolean;
  properties: Property[];
  includeContact: boolean;
  socialLinks: SocialLinks;
}

const ABOUT_POINTS = [
  {
    title: "Cumplimiento Normativo",
    text: "Trabajamos bajo NSR-10 y normativa de habilitación en salud para cada tipo de proyecto.",
  },
  {
    title: "Cronogramas Reales",
    text: "Planeación de obra con fechas de entrega claras y seguimiento constante.",
  },
  {
    title: "Calidad Certificada",
    text: "Materiales certificados y personal calificado en cada etapa de construcción.",
  },
  {
    title: "Acompañamiento Total",
    text: "Un solo equipo te acompaña desde el diseño hasta la entrega final del proyecto.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Diagnóstico y diseño",
    text: "Visita técnica, levantamiento de necesidades y diseño arquitectónico o de remodelación.",
  },
  {
    title: "Presupuesto y planeación",
    text: "Presupuesto detallado, cronograma de obra y definición de materiales y acabados.",
  },
  {
    title: "Ejecución de obra",
    text: "Construcción con supervisión permanente, control de calidad y reportes de avance.",
  },
  {
    title: "Entrega llave en mano",
    text: "Revisión final, garantía sobre la obra entregada y acompañamiento post-entrega.",
  },
];

const STATS = [
  { value: "12+", label: "Años de experiencia" },
  { value: "120+", label: "Proyectos entregados" },
  { value: "45.000+", label: "m² construidos" },
  { value: "98%", label: "Clientes satisfechos" },
];

export default function BrochureDocument({
  logoUrl,
  heroImage,
  services,
  includeAbout,
  includeProcess,
  includeStats,
  properties,
  includeContact,
  socialLinks,
}: BrochureDocumentProps) {
  const activeSocials = (Object.keys(SOCIAL_PLATFORM_DISPLAY) as (keyof SocialLinks)[]).filter(
    (k) => socialLinks[k]
  );

  return (
    <Document
      title="Grupo Saly — Portafolio de Servicios"
      author="Grupo Saly"
      subject="Portafolio de servicios de construcción, remodelación e inmobiliaria"
    >
      {/* ---------------- COVER ---------------- */}
      <Page size="A4" style={styles.darkPage}>
        <View style={styles.bleed}>
          {heroImage && (
            <Image src={heroImage} style={{ width: "100%", height: "100%" }} />
          )}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: COLORS.ink950,
              opacity: heroImage ? 0.78 : 1,
            }}
          />
          <Svg style={styles.bleed} viewBox="0 0 595 842">
            <Defs>
              <RadialGradient id="glow1" cx="85%" cy="8%" r="60%">
                <Stop offset="0%" stopColor={COLORS.brand500} stopOpacity={0.55} />
                <Stop offset="100%" stopColor={COLORS.brand500} stopOpacity={0} />
              </RadialGradient>
              <RadialGradient id="glow2" cx="5%" cy="95%" r="55%">
                <Stop offset="0%" stopColor={COLORS.brand700} stopOpacity={0.4} />
                <Stop offset="100%" stopColor={COLORS.brand700} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect x={0} y={0} width={595} height={842} fill="url(#glow1)" />
            <Rect x={0} y={0} width={595} height={842} fill="url(#glow2)" />
          </Svg>
        </View>

        <View style={{ position: "absolute", top: 56, left: 50 }}>
          {logoUrl ? (
            <Image src={logoUrl} style={{ width: 92, height: 92, objectFit: "contain" }} />
          ) : (
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 20, color: COLORS.white }}>
              GRUPO SALY
            </Text>
          )}
        </View>

        <View style={{ position: "absolute", left: 50, right: 50, bottom: 150 }}>
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 10,
              letterSpacing: 3,
              color: COLORS.brand400,
            }}
          >
            CONSTRUCCIÓN · REMODELACIÓN · INMOBILIARIA
          </Text>
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 40,
              color: COLORS.white,
              marginTop: 14,
              lineHeight: 1.08,
            }}
          >
            Portafolio de{"\n"}Servicios
          </Text>
          <View style={{ marginTop: 22, width: 64, height: 3, backgroundColor: COLORS.brand500 }} />
          <Text style={{ marginTop: 18, fontSize: 11, color: COLORS.whiteSoft, maxWidth: 360, lineHeight: 1.5 }}>
            Estándares de las constructoras más grandes, con un equipo cercano
            y local que te acompaña de principio a fin.
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            left: 50,
            right: 50,
            bottom: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            borderTopWidth: 0.75,
            borderTopColor: "#2b2d33",
            paddingTop: 14,
          }}
        >
          <Text style={{ fontSize: 9, color: COLORS.whiteFaint }}>gruposaly.com</Text>
          <Text style={{ fontSize: 9, color: COLORS.whiteFaint }}>{WHATSAPP_DISPLAY}</Text>
        </View>
      </Page>

      {/* ---------------- SOBRE GRUPO SALY ---------------- */}
      {includeAbout && (
        <Page size="A4" style={styles.page}>
          <View style={styles.body}>
            <View>
              <Text style={styles.eyebrow}>SOBRE GRUPO SALY</Text>
              <Text style={styles.h1}>
                Equipo cercano y local, con{"\n"}estándares de clase mundial
              </Text>
              <Text style={styles.paragraph}>
                Somos una empresa colombiana de construcción, remodelación e
                inmobiliaria. Integramos arquitectura, ingeniería estructural,
                gerencia de proyectos y ejecución de obra para entregar espacios
                seguros, funcionales y con acabados de alto nivel — desde
                infraestructura hospitalaria hasta vivienda, comercio e
                industria.
              </Text>
              <Text style={styles.paragraph}>
                Cada proyecto tiene un interlocutor único que responde por el
                cronograma, el presupuesto y la calidad, para que tú te
                enfoques en tu negocio o tu familia mientras nosotros
                construimos.
              </Text>

              <View style={{ marginTop: 34, flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
                {ABOUT_POINTS.map((point) => (
                  <View
                    key={point.title}
                    style={{
                      width: "47%",
                      borderLeftWidth: 2.5,
                      borderLeftColor: COLORS.brand500,
                      paddingLeft: 14,
                      paddingVertical: 2,
                    }}
                  >
                    <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11.5, color: COLORS.ink950 }}>
                      {point.title}
                    </Text>
                    <Text style={{ marginTop: 5, fontSize: 9.5, lineHeight: 1.55, color: COLORS.ink600 }}>
                      {point.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <CtaBand text="¿Quieres conocer más sobre Grupo Saly y nuestros proyectos? Escríbenos." />
          </View>
          <LightFooter />
        </Page>
      )}

      {/* ---------------- SERVICIOS (one page each) ---------------- */}
      {services.map(({ service, photo }) => (
        <Page key={service.slug} size="A4" style={styles.page}>
          <View style={{ height: 240, position: "relative" }}>
            {photo ? (
              <>
                <Image src={photo} style={{ width: "100%", height: "100%" }} />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: COLORS.ink950,
                    opacity: 0.4,
                  }}
                />
              </>
            ) : (
              <View style={{ width: "100%", height: "100%", backgroundColor: COLORS.ink900 }} />
            )}
            <View style={{ position: "absolute", left: 50, right: 50, bottom: 28 }}>
              <Text
                style={{ fontFamily: "Helvetica-Bold", fontSize: 9, letterSpacing: 2.4, color: COLORS.brand400 }}
              >
                SERVICIO
              </Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 26, color: COLORS.white, marginTop: 6 }}>
                {service.title}
              </Text>
            </View>
          </View>

          <View style={{ ...styles.body, paddingTop: 28 }}>
            <View>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12, color: COLORS.brand600 }}>
                {service.tagline}
              </Text>
              <Text style={styles.paragraph}>{service.longDescription[0]}</Text>
              {service.longDescription[1] && (
                <Text style={styles.paragraph}>{service.longDescription[1]}</Text>
              )}

              {service.features.length > 0 && (
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10.5, color: COLORS.ink950 }}>
                    Qué incluye
                  </Text>
                  <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                    {service.features.map((f) => (
                      <View key={f} style={{ width: "47%", flexDirection: "row", alignItems: "flex-start", gap: 7 }}>
                        <View style={{ width: 5, height: 5, backgroundColor: COLORS.brand500, marginTop: 4 }} />
                        <Text style={{ fontSize: 9.5, color: COLORS.ink600, lineHeight: 1.45 }}>{f}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            <CtaBand text={`¿Te interesa ${service.title.toLowerCase()}? Cuéntanos tu proyecto.`} />
          </View>
          <LightFooter />
        </Page>
      ))}

      {/* ---------------- NUESTRO PROCESO ---------------- */}
      {includeProcess && (
        <Page size="A4" style={styles.page}>
          <View style={styles.body}>
            <View>
              <Text style={styles.eyebrow}>CÓMO TRABAJAMOS</Text>
              <Text style={styles.h1}>Un proceso claro, de principio a fin</Text>

              <View style={{ marginTop: 32 }}>
                {PROCESS_STEPS.map((step, i) => (
                  <View
                    key={step.title}
                    style={{
                      flexDirection: "row",
                      gap: 18,
                      paddingVertical: 16,
                      borderTopWidth: i === 0 ? 0 : 0.75,
                      borderTopColor: COLORS.border,
                    }}
                  >
                    <View
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 17,
                        borderWidth: 1.5,
                        borderColor: COLORS.brand500,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12, color: COLORS.brand600 }}>
                        {i + 1}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12.5, color: COLORS.ink950 }}>
                        {step.title}
                      </Text>
                      <Text style={{ marginTop: 4, fontSize: 9.5, lineHeight: 1.5, color: COLORS.ink600 }}>
                        {step.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <CtaBand text="¿Listo para iniciar? Cuéntanos sobre tu proyecto y te contactamos hoy mismo." />
          </View>
          <LightFooter />
        </Page>
      )}

      {/* ---------------- CIFRAS ---------------- */}
      {includeStats && (
        <Page size="A4" style={styles.darkPage}>
          <View style={{ ...styles.body, justifyContent: "center" }}>
            <Text style={styles.eyebrowDark}>RESULTADOS</Text>
            <Text style={styles.h1Dark}>Cifras que respaldan nuestro trabajo</Text>

            <View style={{ marginTop: 40, flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
              {STATS.map((stat) => (
                <View key={stat.label} style={{ width: "42%" }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 40, color: COLORS.brand400 }}>
                    {stat.value}
                  </Text>
                  <Text style={{ marginTop: 4, fontSize: 9.5, letterSpacing: 1, color: COLORS.whiteFaint }}>
                    {stat.label.toUpperCase()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <DarkPageNumber />
        </Page>
      )}

      {/* ---------------- PROYECTOS DESTACADOS ---------------- */}
      {properties.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.body}>
            <View>
              <Text style={styles.eyebrow}>PROYECTOS EN VENTA</Text>
              <Text style={styles.h1}>Proyectos destacados disponibles</Text>

              <View style={{ marginTop: 28 }}>
                {properties.map((p, i) => (
                  <View
                    key={p.id}
                    style={{
                      flexDirection: "row",
                      gap: 16,
                      paddingVertical: 16,
                      borderTopWidth: i === 0 ? 0 : 0.75,
                      borderTopColor: COLORS.border,
                      alignItems: "center",
                    }}
                  >
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        style={{ width: 86, height: 64, objectFit: "cover" }}
                      />
                    ) : (
                      <View style={{ width: 86, height: 64, backgroundColor: COLORS.ink800 }} />
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11.5, color: COLORS.ink950 }}>
                        {p.title}
                      </Text>
                      <Text style={{ marginTop: 2, fontSize: 9, color: COLORS.ink600 }}>
                        {p.location}
                      </Text>
                    </View>
                    <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 12, color: COLORS.brand600 }}>
                      {p.priceLabel || formatCOP(p.price)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <CtaBand text="¿Quieres agendar una visita o conocer más proyectos disponibles? Escríbenos." />
          </View>
          <LightFooter />
        </Page>
      )}

      {/* ---------------- CONTACTO (back cover) ---------------- */}
      {includeContact && (
        <Page size="A4" style={styles.darkPage}>
          <View style={styles.bleed}>
            <Svg style={styles.bleed} viewBox="0 0 595 842">
              <Defs>
                <RadialGradient id="glow3" cx="15%" cy="92%" r="60%">
                  <Stop offset="0%" stopColor={COLORS.brand500} stopOpacity={0.5} />
                  <Stop offset="100%" stopColor={COLORS.brand500} stopOpacity={0} />
                </RadialGradient>
              </Defs>
              <Rect x={0} y={0} width={595} height={842} fill="url(#glow3)" />
            </Svg>
          </View>

          <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 50 }}>
            <Text style={styles.eyebrowDark}>HABLEMOS</Text>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 30, color: COLORS.white, marginTop: 10, lineHeight: 1.15 }}>
              Construyamos tu próximo{"\n"}proyecto juntos
            </Text>
            <View style={{ marginTop: 20, width: 64, height: 3, backgroundColor: COLORS.brand500 }} />

            <View style={{ marginTop: 32, gap: 10 }}>
              <Link
                src={whatsappLink("Hola, quiero más información sobre los servicios de Grupo Saly.")}
                style={{ fontSize: 11, color: COLORS.whiteSoft, textDecoration: "none" }}
              >
                WhatsApp: {WHATSAPP_DISPLAY}
              </Link>
              <Link
                src="mailto:contacto@gruposaly.com"
                style={{ fontSize: 11, color: COLORS.whiteSoft, textDecoration: "none" }}
              >
                contacto@gruposaly.com
              </Link>
              <Link
                src="https://gruposaly.com"
                style={{ fontSize: 11, color: COLORS.whiteSoft, textDecoration: "none" }}
              >
                gruposaly.com
              </Link>
              {activeSocials.length > 0 && (
                <Text style={{ fontSize: 11, color: COLORS.whiteSoft }}>
                  Síguenos: {activeSocials.map((s) => SOCIAL_PLATFORM_DISPLAY[s]).join(" · ")}
                </Text>
              )}
            </View>
          </View>

          <View style={{ position: "absolute", bottom: 50, left: 50 }}>
            <Text style={{ fontSize: 8, color: COLORS.whiteFaint }}>
              © {new Date().getFullYear()} Grupo Saly. Todos los derechos reservados.
            </Text>
          </View>
        </Page>
      )}
    </Document>
  );
}
