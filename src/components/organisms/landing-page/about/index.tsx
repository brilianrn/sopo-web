import { Award, Leaf, Target } from 'lucide-react';
import { FC } from 'react';
import { LandingPageSectionProps } from '../landing-page';

export const LandingPageAbout: FC<LandingPageSectionProps> = ({ id }) => {
  return (
    <section
      id={id}
      className="py-24 px-4 bg-gradient-to-br from-primary-darker to-primary-default text-primary-foreground"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full border border-primary-foreground/20">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">Tentang Sacha Inchi</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Superfood dari Peru untuk Indonesia
              </h2>

              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                {/* eslint-disable-next-line */}
                Sacha Inchi, juga dikenal sebagai "Inca Peanut", adalah tanaman superfood yang kaya
                akan Omega-3, Omega-6, dan Omega-9. Dengan kandungan nutrisi yang luar biasa, Sacha
                Inchi menjadi sumber Omega Nabati terbaik untuk kesehatan masyarakat Indonesia.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2 p-4 bg-primary-foreground/5 backdrop-blur-sm rounded-xl border border-primary-foreground/10">
                <div className="text-3xl font-bold">48%</div>
                <div className="text-sm text-primary-foreground/80">Kandungan Omega-3</div>
              </div>
              <div className="space-y-2 p-4 bg-primary-foreground/5 backdrop-blur-sm rounded-xl border border-primary-foreground/10">
                <div className="text-3xl font-bold">36%</div>
                <div className="text-sm text-primary-foreground/80">Kandungan Omega-6</div>
              </div>
              <div className="space-y-2 p-4 bg-primary-foreground/5 backdrop-blur-sm rounded-xl border border-primary-foreground/10">
                <div className="text-3xl font-bold">9%</div>
                <div className="text-sm text-primary-foreground/80">Kandungan Omega-9</div>
              </div>
            </div>
          </div>

          {/* Right Content - Mission Cards */}
          <div className="space-y-6">
            <div className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 rounded-2xl">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground">Misi SOPO</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Membangun ekosistem pertanian Sacha Inchi yang berkelanjutan, transparan, dan
                  menguntungkan bagi semua stakeholder—dari petani hingga konsumen akhir.
                </p>
              </div>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all duration-300 rounded-2xl">
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-warning-default flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground">Dampak Berkelanjutan</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Tidak hanya menghasilkan produk berkualitas, SOPO juga berkontribusi pada carbon
                  credit, pemberdayaan petani lokal, dan kesehatan masyarakat Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
