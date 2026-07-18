import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarPlus,
  ClipboardList,
  MapPin,
  Megaphone,
  Settings,
  Users,
} from 'lucide-react';

const benefits = [
  {
    icon: Megaphone,
    title: 'Gagnez en visibilité',
    description: 'Présentez votre structure et vos activités à un public local intéressé par le sport.',
  },
  {
    icon: CalendarPlus,
    title: 'Publiez vos activités',
    description: 'Ajoutez vos cours, événements, stages, compétitions et séances sportives.',
  },
  {
    icon: Users,
    title: 'Touchez de nouveaux pratiquants',
    description: 'Facilitez la découverte de vos offres par des utilisateurs proches de votre zone géographique.',
  },
  {
    icon: Settings,
    title: 'Gérez vos informations',
    description: 'Mettez à jour vos horaires, coordonnées, lieux et disponibilités depuis votre espace professionnel.',
  },
];

const steps = [
  {
    title: 'Créez votre compte',
    description: 'Renseignez les informations principales de votre structure.',
  },
  {
    title: 'Complétez votre profil',
    description: 'Ajoutez votre présentation, votre logo, vos coordonnées et vos lieux d’activité.',
  },
  {
    title: 'Publiez vos activités',
    description: 'Créez et gérez vos événements, cours et offres sportives.',
  },
];

const audiences = [
  'Clubs sportifs',
  'Associations',
  'Salles de sport',
  'Coachs indépendants',
  'Organisateurs d’événements',
  'Collectivités locales',
];

const primaryButtonClass = 'inline-flex items-center justify-center rounded-lg bg-[#c44d00] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#b84f14] focus:outline-none focus:ring-2 focus:ring-[#c44d00] focus:ring-offset-2';

const ProfessionalsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#C7C5C5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12 sm:space-y-16">
        <section className="rounded-2xl bg-gradient-to-r from-[#0a1128] to-[#14213d] px-6 py-12 text-white shadow-lg sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-[#f28c4b]">Espace professionnel</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Développez la visibilité de vos activités sportives
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
              SportRadar permet aux clubs, associations, coachs et structures sportives de présenter leurs activités, de publier leurs événements et de toucher de nouveaux pratiquants.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/signup-company" className={primaryButtonClass}>
                Créer un compte professionnel
              </Link>
              <a
                href="#fonctionnement"
                className="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#0a1128] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0a1128]"
              >
                Découvrir le fonctionnement
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-title" className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h2 id="benefits-title" className="text-center text-3xl font-bold text-[#0a1128]">
            Pourquoi rejoindre SportRadar ?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-gray-200 bg-gray-50 p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#c44d00]">
                  <Icon aria-hidden="true" className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#0a1128]">{title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="fonctionnement" aria-labelledby="how-it-works-title" className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <h2 id="how-it-works-title" className="text-center text-3xl font-bold text-[#0a1128]">
            Comment ça fonctionne ?
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="relative rounded-xl border border-gray-200 p-6">
                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a1128] font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-[#0a1128]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="audience-title" className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 id="audience-title" className="text-3xl font-bold text-[#0a1128]">
                À qui s’adresse l’espace professionnel ?
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                Un espace pensé pour les acteurs qui font vivre le sport sur leur territoire.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2" aria-label="Professionnels concernés">
              {audiences.map((audience) => (
                <li key={audience} className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 font-medium text-[#0a1128]">
                  <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#c44d00]" />
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="rounded-2xl bg-[#0a1128] px-6 py-12 text-center text-white shadow-lg sm:p-12">
          <ClipboardList aria-hidden="true" className="mx-auto h-12 w-12 text-[#f28c4b]" />
          <h2 id="cta-title" className="mt-5 text-3xl font-bold">
            Prêt à faire connaître vos activités ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-200">
            Rejoignez SportRadar et rendez vos offres sportives plus visibles auprès des pratiquants de votre région.
          </p>
          <Link to="/signup-company" className={`${primaryButtonClass} mt-8`}>
            Créer mon compte professionnel
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ProfessionalsPage;
