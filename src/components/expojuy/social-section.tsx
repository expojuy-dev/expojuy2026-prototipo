"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark, Hash, Instagram } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

type Post = {
  id: string;
  user: string;
  avatar: string;
  image: string;
  alt: string;
  likes: string;
  caption: string;
  time: string;
};

const POSTS: Post[] = [
  {
    id: "p1",
    user: "expojuy",
    avatar: "EJ",
    image: "/images/hero-feria.png",
    alt: "Vista del predio ferial de ExpoJuy con stands iluminados en turquesa y violeta",
    likes: "4.218",
    caption: "🚀 Faltan pocos meses y el predio ya palpita la #ExpoJuy2026. ¿Ya reservaste tu stand?",
    time: "Hace 2 hs",
  },
  {
    id: "p2",
    user: "clusteritjujuy",
    avatar: "IT",
    image: "/images/news-tech.png",
    alt: "Escenario del Espacio Tech con presentación de inteligencia artificial",
    likes: "1.934",
    caption: "Confirmado: el Espacio Tech tendrá 30 startups del NOA + demos de IA en vivo 🤖 #ExpoJuy2026",
    time: "Hace 5 hs",
  },
  {
    id: "p3",
    user: "liticaandes",
    avatar: "LA",
    image: "/images/news-litio.png",
    alt: "Salares de Jujuy con piscinas de evaporación de litio",
    likes: "2.761",
    caption: "Nuestro pabellón del litio va a sorprender al mundo 🇦🇷⚡ Nos vemos en el Pabellón B #ExpoJuy2026",
    time: "Ayer",
  },
  {
    id: "p4",
    user: "ccejujuy",
    avatar: "CC",
    image: "/images/news-ronda.png",
    alt: "Ejecutivos en ronda de negocios internacional",
    likes: "987",
    caption: "Ya son +400 reuniones B2B agendadas con compradores de 12 países 🌎 #ConectandoPaíses",
    time: "Ayer",
  },
  {
    id: "p5",
    user: "saborjujeno",
    avatar: "SJ",
    image: "/images/news-gastro.png",
    alt: "Puesto de gastronomía regional del norte argentino",
    likes: "3.120",
    caption: "El Pabellón D va a oler a empanadas, vinos de altura y café de Yungas 😍 #ExpoJuy2026",
    time: "Hace 2 días",
  },
  {
    id: "p6",
    user: "greenh2norte",
    avatar: "GH",
    image: "/images/news-energia.png",
    alt: "Parque de paneles solares en el piedemonte andino",
    likes: "1.542",
    caption: "El hidrógeno verde de la Puna se presenta en sociedad ☀️💧 #EnergíaDelFuturo",
    time: "Hace 3 días",
  },
];

export function SocialSection() {
  const [liked, setLiked] = React.useState<Set<string>>(new Set());

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section
      id="redes"
      className="bg-gradient-to-b from-background to-lavender-light/60 py-20 sm:py-24"
      aria-label="Feed de redes sociales de ExpoJuy"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="#ExpoJuy2026"
          title="El evento en"
          highlight="redes sociales"
          description="Seguí la cobertura en vivo del evento y sumate a la conversación con el hashtag #ExpoJuy2026."
        />

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          {POSTS.map((post, i) => (
            <ScrollReveal
              key={post.id}
              delay={Math.min(i * 0.06, 0.3)}
              className="w-[280px] shrink-0 snap-center sm:w-[300px]"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-lavender/50 bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-brand/10">
                {/* Header del post */}
                <div className="flex items-center gap-2.5 px-4 py-3">
                  <span className="bg-gradient-brand flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-extrabold text-white">
                    {post.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-ink">{post.user}</p>
                    <p className="text-[11px] text-muted-foreground">{post.time}</p>
                  </div>
                  <Instagram className="h-4 w-4 text-lavender" aria-hidden="true" />
                </div>
                {/* Imagen */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Acciones */}
                <div className="flex items-center gap-3.5 px-4 py-3">
                  <button
                    onClick={() => toggleLike(post.id)}
                    aria-label={liked.has(post.id) ? "Quitar me gusta" : "Dar me gusta"}
                    aria-pressed={liked.has(post.id)}
                    className="transition active:scale-90"
                  >
                    <Heart
                      className={cn(
                        "h-5.5 w-5.5",
                        liked.has(post.id) ? "fill-red-500 text-red-500 scale-110" : "text-ink"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <MessageCircle className="h-5 w-5 text-ink" aria-hidden="true" />
                  <Send className="h-5 w-5 text-ink" aria-hidden="true" />
                  <Bookmark className="ml-auto h-5 w-5 text-ink" aria-hidden="true" />
                </div>
                {/* Caption */}
                <p className="px-4 pb-4 text-[13px] leading-snug text-graphite">
                  <strong className="font-bold text-ink">{post.likes}</strong> Me gusta
                  <span className="mt-1 block">
                    <strong className="font-bold text-violet-ink">{post.user}</strong>{" "}
                    {post.caption}
                  </span>
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA seguir */}
        <ScrollReveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-3xl border border-lavender/50 bg-surface p-7 text-center shadow-sm sm:flex-row">
            <p className="font-display text-lg font-bold text-ink">
              <Hash className="mr-1 inline h-5 w-5 text-turquoise" aria-hidden="true" />
              Etiquetá tus fotos con <span className="text-gradient">#ExpoJuy2026</span> y aparecé en nuestro feed
            </p>
            <a
              href="https://instagram.com/expojuy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-brand inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              Seguir a @expojuy
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
