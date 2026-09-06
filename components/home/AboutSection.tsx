"use client";

import Image from "next/image";
import {
  Globe,
  BadgeCheck,
  Lightbulb,
  Cpu,
  Factory,
  TrendingUp,
  Handshake,
  Brain,
  History,
  Calendar,
  Award,
  Sparkles,
} from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      num: "01",
      title: "Innovación",
      desc: "Vanguardia en tecnologías emergentes, modelos de transición energética y bioeconomía circular.",
      icon: Lightbulb,
      iconContainer: "bg-primary-container/15 text-primary",
    },
    {
      num: "02",
      title: "Tecnología",
      desc: "Industria 4.0, sensorización de procesos mineros, automatización agrícola y computación en la nube.",
      icon: Cpu,
      iconContainer: "bg-secondary/10 text-secondary",
    },
    {
      num: "03",
      title: "Producción",
      desc: "Cadena de valor agroindustrial, tabaco, caña de azúcar, manufacturas andinas y litio de alta pureza.",
      icon: Factory,
      iconContainer: "bg-primary-container/15 text-primary",
    },
    {
      num: "04",
      title: "Desarrollo",
      desc: "Atracción de inversiones de capital, ampliación de infraestructura logística y sostenibilidad territorial.",
      icon: TrendingUp,
      iconContainer: "bg-secondary/10 text-secondary",
    },
    {
      num: "05",
      title: "Vinculación Empresarial",
      desc: "Rondas de negocios multisectoriales internacionales con delegaciones del Cono Sur y mercados globales.",
      icon: Handshake,
      iconContainer: "bg-primary-container/15 text-primary",
    },
    {
      num: "06",
      title: "Economía del Conocimiento",
      desc: "Incubación de startups regionales, factorías de software, fintech y exportación de talento jujeño.",
      icon: Brain,
      iconContainer: "bg-secondary/10 text-secondary",
    },
  ];

  return (
    <section className="py-space-4xl bg-surface" id="sobre-expojuy">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs w-fit bg-secondary/10 px-space-sm py-space-2xs rounded-full">
              <Globe className="w-4 h-4 text-secondary shrink-0" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                Vidriera del Desarrollo Regional
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">Sobre ExpoJuy 2026</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Consagrada como la mayor muestra multisectorial del Norte Argentino, ExpoJuy reúne la potencia de la minería, agroindustria, turismo, energías renovables, tecnología y servicios en un espacio de intercambio estratégico regional e internacional.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Impulsada con el liderazgo institucional de la <strong>Cámara de Comercio Exterior de Jujuy</strong>, la exposición integra conferencias académicas, rondas de negocios y espectáculos artísticos, uniendo al sector público, privado y a toda la comunidad.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container p-space-md">
              <div className="relative w-full h-72 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex items-center justify-center">
                <Image
                  src="/images/brand/logo_camcomext.png"
                  alt="ExpoJuy Emblema Oficial"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <div className="mt-space-md flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-xs">
                  <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Cámara de Comercio Exterior de Jujuy
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Fundada 1988</span>
              </div>
            </div>
          </div>
        </div>

        {/* 34 Years History & Legacy Showcase Card */}
        <div className="mt-space-3xl bg-surface-container-lowest border border-surface-variant/30 rounded-3xl p-space-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-4 flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <History className="w-4 h-4 text-primary shrink-0" />
                <span>34 Años de Legado</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                Historia de la ExpoJuy
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Nacida en 1992 en las instalaciones del Aero Club Jujuy, la ExpoJuy ha crecido durante más de tres décadas como la muestra bienal de mayor trascendencia comercial, industrial y cultural de la región.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              {/* Stat 1: 1992 */}
              <div className="bg-surface-container/40 p-space-md rounded-2xl border border-surface-variant/20 flex flex-col justify-between hover:border-primary-container/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display-hero text-headline-xl text-primary font-bold">1992</span>
                  <div className="p-2 rounded-xl bg-primary-container/15 text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Primera Edición</span>
                <p className="text-xs text-on-surface-variant mt-1 leading-normal">
                  Inaugurada en el Aero Club Jujuy bajo la gestión del Sr. Raúl Mignacco.
                </p>
              </div>

              {/* Stat 2: 17ª Edición */}
              <div className="bg-surface-container/40 p-space-md rounded-2xl border border-surface-variant/20 flex flex-col justify-between hover:border-secondary/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display-hero text-headline-xl text-secondary font-bold">17ª</span>
                  <div className="p-2 rounded-xl bg-secondary/15 text-secondary">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Edición 2026</span>
                <p className="text-xs text-on-surface-variant mt-1 leading-normal">
                  17 ediciones bienales ininterrumpidas impulsando el desarrollo productivo.
                </p>
              </div>

              {/* Stat 3: 34 Años */}
              <div className="bg-surface-container/40 p-space-md rounded-2xl border border-surface-variant/20 flex flex-col justify-between hover:border-primary-container/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display-hero text-headline-xl text-primary font-bold">34</span>
                  <div className="p-2 rounded-xl bg-primary-container/15 text-primary">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Años de Trayectoria</span>
                <p className="text-xs text-on-surface-variant mt-1 leading-normal">
                  Evolución constante como epicentro del Corredor Bioceánico y ZICOSUR.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-space-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {pillars.map((pilar) => {
            const IconComponent = pilar.icon;
            return (
              <div
                key={pilar.num}
                className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-space-md">
                  <div className={`h-12 w-12 rounded-xl ${pilar.iconContainer} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 shrink-0" />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Pilar {pilar.num}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-2xs font-bold">
                    {pilar.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{pilar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Metrics Band */}
        <div className="mt-space-3xl bg-gradient-to-r from-primary to-secondary p-space-xl lg:p-space-2xl rounded-3xl text-on-primary shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg text-center">
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-display-hero text-primary-fixed leading-tight font-extrabold">+300</span>
              <span className="font-label-lg text-label-lg mt-space-2xs font-semibold">Expositores Activos</span>
              <span className="font-body-sm text-body-sm text-surface-variant/80">Empresas e Instituciones</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-display-hero text-secondary-fixed leading-tight font-extrabold">+100k</span>
              <span className="font-label-lg text-label-lg mt-space-2xs font-semibold">Visitantes Estimados</span>
              <span className="font-body-sm text-body-sm text-surface-variant/80">Profesionales y público</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-display-hero text-primary-fixed leading-tight font-extrabold">10</span>
              <span className="font-label-lg text-label-lg mt-space-2xs font-semibold">Días de Evento</span>
              <span className="font-body-sm text-body-sm text-surface-variant/80">Jornadas ininterrumpidas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-display-hero text-display-hero text-secondary-fixed leading-tight font-extrabold">+15</span>
              <span className="font-label-lg text-label-lg mt-space-2xs font-semibold">Rubros Económicos</span>
              <span className="font-body-sm text-body-sm text-surface-variant/80">Cadenas productivas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
