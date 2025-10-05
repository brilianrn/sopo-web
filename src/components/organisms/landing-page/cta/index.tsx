import { Button } from '@/components/atoms';
import { authRoute, defaultMessageWa } from '@/shared/constants';
import { ArrowRight, ShoppingBag, Sprout, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const roles = [
  {
    icon: Users,
    title: 'Saya Pembibit/Trainer',
    href: defaultMessageWa,
    description: 'Bergabung menyediakan bibit dan pelatihan berkualitas',
    cta: 'Jadi Partner',
  },
  {
    icon: Sprout,
    title: 'Saya Petani',
    href: authRoute.register,
    description: 'Bergabung untuk mendapatkan akses pelatihan dan harga transparan',
    cta: 'Daftar Sebagai Petani',
  },
  {
    icon: TrendingUp,
    title: 'Saya Investor',
    href: defaultMessageWa,
    description: 'Investasi di pertanian berkelanjutan dengan return yang jelas',
    cta: 'Mulai Investasi',
  },
  {
    icon: ShoppingBag,
    title: 'Saya Konsumen',
    href: authRoute.register,
    description: 'Beli produk Sacha Inchi langsung dari sumber terpercaya',
    cta: 'Belanja Sekarang',
  },
];

export const LandingPageCTA = () => {
  return (
    <section className="py-24 px-4 bg-gray-100/40">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Bergabung dengan Ekosistem SOPO
          </h2>
          <p className="text-xl text-muted-foreground">
            Pilih peran Anda dan mulai berkontribusi pada pertanian berkelanjutan Indonesia
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-primary-lighter bg-white hover:shadow-glow transition-all duration-300 hover:-translate-y-1 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-primary-default to-warning-default flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <Link
                  target="_blank"
                  href={role.href}
                  className="w-full group/btn !bg-white flex items-center justify-center space-x-2 !text-primary-default cursor-pointer rounded-lg transition-all duration-300 py-2 hover:!bg-primary-lighter/30 hover:font-medium"
                >
                  {role.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-default/70 rounded-3xl p-12 text-center space-y-6 shadow-glow">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground">
            Siap Memulai Perjalanan Anda?
          </h3>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Jadilah bagian dari revolusi pertanian digital Indonesia. Bersama SOPO, kita ciptakan
            masa depan pertanian yang berkelanjutan dan menguntungkan.
          </p>
          <Button
            target="_blank"
            href={defaultMessageWa}
            variant="primary"
            size="2xl"
            className="bg-primary-foreground text-primary-default hover:bg-primary-foreground/90 w-fit lg:!px-24"
          >
            Hubungi Kami
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
