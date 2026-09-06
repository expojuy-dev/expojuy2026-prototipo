"use client";

import { Newspaper, ArrowRight, Camera, Download } from "lucide-react";

export function NewsSection() {
  return (
    <section className="py-space-4xl bg-surface" id="noticias">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
          <div>
            <div className="inline-flex items-center gap-space-xs bg-primary/10 px-space-sm py-space-2xs rounded-full mb-space-xs">
              <Newspaper className="w-4 h-4 text-primary shrink-0" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                Actualidad & Sala de Prensa
              </span>
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface font-bold">
              Últimas Noticias
            </h2>
          </div>
          <button className="inline-flex items-center gap-space-xs text-secondary hover:text-on-surface font-label-lg text-label-lg transition-colors font-semibold">
            <span>Ver todas las publicaciones</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Big Hero News Card */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ts3ik_ecCc4-y1Kk3SDsB8DLh_WL_iHu5pGreg_qM-iyjUjTyKp_yx_Tl4FmjzMeEhgx4rrqDUI9-xsp__AW_Wt3bdKY-PxTMom8KyasnhH_XKZw_ChxWanqzeuxKGqzrx4YIGLiTgkWvtrLSeARHdwg3Jhu0YJbsjqBOrd7obE6At3k2PMzfJVCGxaRaAA_Pp3xarIeFqPcC3WRpnfxh576aZ4aCKTJJRdDkRZG2mieb4saa0w_')",
                }}
              />
              <div className="absolute top-space-md left-space-md bg-secondary text-on-secondary px-space-sm py-space-2xs rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-md font-bold">
                Comercio Internacional
              </div>
            </div>
            <div className="p-space-xl flex flex-col justify-between flex-1">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  14 de Octubre, 2025 • Por Cámara Comex
                </span>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mt-space-2xs group-hover:text-primary transition-colors leading-snug font-bold">
                  Histórico acuerdo de integración logística entre Jujuy, Tarapacá y Potosí para el Corredor Bioceánico
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
                  Las comitivas gubernamentales y cámaras de comercio rubricaron el protocolo aduanero simplificado que reducirá hasta un 35% los tiempos de tránsito de cargas hacia el Pacífico.
                </p>
              </div>
              <div className="mt-space-lg pt-space-md flex items-center justify-between border-t border-slate-100">
                <span className="text-primary font-label-md text-label-md inline-flex items-center gap-1 font-semibold">
                  <span>Leer artículo completo</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </span>
                <span className="font-label-sm text-label-sm text-outline font-medium">Lectura: 4 min</span>
              </div>
            </div>
          </div>

          {/* 3 Side News & Press Kit Box */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            {/* Side News 1 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-md group">
              <div
                className="h-20 w-20 rounded-xl bg-cover bg-center shrink-0"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtFAiAFXHUjBi6NNNTzNiu_0Af2b2OJH3P-MGcnVhjz7eHNhlmrYXcx4uNjubOEayhex44U5yTLVNEcY_u3WxHaPZtN2ddjnBu5MsEMJaJwdp20ZniwowDH_YzpY5KStmXeYrnnzuWmgYthuxiF6gha_yFKJDq-UM7Cc3xFEqcKKUK9OA-h_siiJxLLtV_cdrKbgafenywTDEe0xdoNQdpJiURK_vZRfur2leN-JZTZEYuk5SH48OC')",
                }}
              />
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold">
                  Minería & Innovación
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-2 mt-1 font-bold">
                  Presentan nueva patente jujeña de extracción directa de litio con emisión cero de agua
                </h4>
                <span className="font-body-sm text-body-sm text-outline mt-1 block font-medium">
                  02 Octubre, 2025
                </span>
              </div>
            </div>

            {/* Side News 2 */}
            <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-space-md group">
              <div
                className="h-20 w-20 rounded-xl bg-cover bg-center shrink-0"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAOnK4gYH635acn5Ds3bdiLs2Glmui9zXa5fe__nJ6Pc4bZcdNVanMz6CvCunMi1B1hf0wasX_67bPi_8GfR-wVr1KN_WX5gkAfvf4EsyEbIWHucNi_cZqcbZwZIICn5tGP4cSXFJqKCKL1WtowEjp4mkDsKrp8mSFQosZ3blOpwL2AFQlH_PvY3tXW9vzM4-XrR5dMg-HR8_XWLJmnKJ8N0BclRWcz7tNmEaKAhy7K2KKGV0dqYF6')",
                }}
              />
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-bold">
                  Startups NOA
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-2 mt-1 font-bold">
                  Convocatoria abierta para el concurso de innovación tecnológica y capital semilla regional
                </h4>
                <span className="font-body-sm text-body-sm text-outline mt-1 block font-medium">
                  28 Septiembre, 2025
                </span>
              </div>
            </div>

            {/* Media Kit Direct Download Banner */}
            <div className="bg-gradient-to-br from-primary-container/30 to-secondary/20 p-space-xl rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-space-xs text-primary mb-space-2xs">
                  <Camera className="w-5 h-5 shrink-0" />
                  <span className="font-label-md text-label-md uppercase tracking-wider font-bold">
                    Sala de Prensa & Acreditados
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface leading-tight font-bold">
                  Media Kit Oficial ExpoJuy 2026
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
                  Descargá isologotipos vectoriales, manual de marca, imágenes oficiales en alta resolución y gacetillas institucionales.
                </p>
              </div>
              <button className="mt-space-md inline-flex items-center justify-center gap-space-xs rounded-full px-space-lg py-space-xs bg-on-surface text-surface font-label-md text-label-md hover:bg-primary transition-colors shadow-sm font-semibold">
                <Download className="w-4 h-4 shrink-0" />
                <span>Descargar Media Kit ZIP (48 MB)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
