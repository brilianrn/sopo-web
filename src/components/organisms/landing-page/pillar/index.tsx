import { cn } from '@/shared/utils';
import { Database, Network, Zap } from 'lucide-react';
import { FC } from 'react';
import { LandingPageSectionProps } from '../landing-page';

const pillars = [
  {
    icon: Network,
    title: 'Integrasi Rantai Pasok',
    subtitle: 'The Network',
    description:
      'Menghubungkan petani, investor, pembibit, dan konsumen dalam satu ekosistem digital yang transparan.',
    features: [
      'Platform terintegrasi end-to-end',
      'Transparansi harga dan kualitas',
      'Akses langsung ke semua stakeholder',
    ],
    gradient: 'from-primary-default/10 to-accent/10',
  },
  {
    icon: Database,
    title: 'Data & Analytics',
    subtitle: 'Coming Soon',
    description:
      'Sistem manajemen data pertanian yang membantu optimalisasi hasil panen dan efisiensi operasional.',
    features: [
      'Monitoring pertumbuhan real-time',
      'Prediksi hasil panen',
      'Analisis kualitas tanah',
    ],
    gradient: 'from-secondary/10 to-secondary/5',
  },
  {
    icon: Zap,
    title: 'Sustainability Impact',
    subtitle: 'Coming Soon',
    description:
      'Mendorong praktik pertanian berkelanjutan dengan sistem reward berbasis Carbon Credit.',
    features: [
      'Carbon Credit tracking',
      'ESG compliance monitoring',
      'Sustainable farming incentives',
    ],
    gradient: 'from-accent/10 to-primary-default/5',
  },
];

export const LandingPagePillar: FC<LandingPageSectionProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-default/10 rounded-full">
            <span className="text-sm font-semibold text-primary-default">3 Pilar Utama</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Fondasi Ekosistem SOPO</h2>
          <p className="text-xl text-muted-foreground">
            Platform yang dibangun di atas tiga pilar kuat untuk menciptakan pertanian berkelanjutan
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={cn(
                  'group hover:shadow-glow transition-all duration-300 border-border/50 overflow-hidden rounded-2xl box-shadow hover:bg-white bg-white/40',
                  index === 0 ? 'md:col-span-3 lg:col-span-1' : '',
                )}
              >
                <div className={`h-2 bg-gradient-to-r ${pillar.gradient}`} />
                <div className="p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-primary-default" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground px-3 py-1 bg-muted rounded-full">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">{pillar.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </div>

                  <ul className="space-y-2">
                    {pillar.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-default mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
