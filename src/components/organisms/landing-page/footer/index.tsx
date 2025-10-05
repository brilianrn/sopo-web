import { Image } from '@/components/atoms';
import { Mail, MapPin, Phone } from 'lucide-react';
import { LogoWhite } from '../../../../../public/assets/images';

export const LandingPageFooter = () => {
  return (
    <footer className="bg-primary-darker text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={LogoWhite}
                alt="sopo logo white"
                className="w-fit h-15 rounded-2xl"
                height={40}
                width={40}
              />
            </div>
            <p className="text-sm text-background/80">
              Ekosistem Pertanian Digital Berbasis Sacha Inchi untuk Indonesia yang berkelanjutan.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Platform</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#ecosystem" className="hover:text-background transition-colors">
                  Ekosistem
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-background transition-colors">
                  Pilar SOPO
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-background transition-colors">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Stakeholder */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stakeholder</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Untuk Petani
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Untuk Investor
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Untuk Pembibit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Untuk Konsumen
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Kontak</h3>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>sopo.tech25@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+62 857-8520-9679</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Sidoarjo, Jawa Timur, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>
            &copy; 2025 SOPO. All rights reserved. Building sustainable agriculture for Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
};
