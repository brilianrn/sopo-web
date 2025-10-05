import { cn } from '@/shared/utils';
import { ShoppingBag, Sprout, TrendingUp, Users } from 'lucide-react';
import { FC } from 'react';
import { LandingPageSectionProps } from '../landing-page';

const stakeholders = [
  {
    icon: Users,
    title: 'Pembibit & Trainer',
    description:
      'Menyediakan bibit berkualitas dan pelatihan teknis yang terstandar secara digital kepada para petani.',
    color: 'from-warning-default/90 to-warning-default/70',
  },
  {
    icon: Sprout,
    title: 'Petani & Pemilik Lahan',
    description:
      'Mengelola lahan, mengakses pelatihan digital, dan menjual hasil panen dengan harga yang transparan.',
    color: 'from-primary-default/90 to-primary-default/70',
  },
  {
    icon: TrendingUp,
    title: 'Investor/Industri',
    description:
      'Mendanai budidaya Sacha Inchi dan mendapatkan manfaat dari hasil panen serta potensi Carbon Credit.',
    color: 'from-gray-300/90 to-gray-300/70',
  },
  {
    icon: ShoppingBag,
    title: 'Konsumen & Pasar',
    description:
      'Membeli produk turunan Sacha Inchi (minyak, snack, dll.) langsung dari sumber yang terverifikasi.',
    color: 'from-ocean-400/60 to-ocean-400/40',
  },
];

export const LandingPageEcosystem: FC<LandingPageSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Integrasi Rantai Pasok</h2>
          <p className="text-xl text-primary-600 opacity-80">
            SOPO menghubungkan seluruh stakeholder dalam satu ekosistem digital yang transparan dan
            berkelanjutan
          </p>
        </div>

        {/* Stakeholder Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stakeholders.map((stakeholder, index) => {
            const Icon = stakeholder.icon;
            return (
              <div
                key={index}
                className="group hover:shadow-glow transition-all duration-300 box-shadow rounded-2xl"
              >
                <div className="p-6 space-y-4">
                  <div
                    className={cn(
                      stakeholder.color,
                      'w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300',
                    )}
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{stakeholder.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stakeholder.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200/30 backdrop-blur-sm rounded-full border border-gray-200/30">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-primary-500"></span>
            </span>
            <span className="text-sm font-medium text-accent-foreground">
              Semua stakeholder terhubung dalam satu platform terpadu
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
