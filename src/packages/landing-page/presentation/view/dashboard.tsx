'use client';

import { Button, Collapse } from '@/components/atoms';
import {
  LandingPageAbout,
  LandingPageCTA,
  LandingPageEcosystem,
  LandingPageFooter,
  LandingPageHero,
  LandingPagePillar,
} from '@/components/organisms/landing-page';
import { authRoute } from '@/shared/constants';
import styles from '@/shared/styles/packages/landing-page.module.css';
import { cn } from '@/shared/utils';
import classNames from 'clsx';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Logo } from '../../../../../public/assets/images';

const sectionIds = ['hero', 'ecosystem', 'pillars', 'about'];

export const DashboardView = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [openedMenu, setOpenedMenu] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    let currentActive = 'hero';

    const offset = 100;

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        if (window.scrollY >= section.offsetTop - offset) {
          currentActive = id;
        }
      }
    });

    setActiveSection(currentActive);
    // eslint-disable-next-line
  }, [sectionIds]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  const getClassName = (id: string) =>
    cn(styles['topbar-menu'], activeSection === id && styles['topbar-active-menu']);

  return (
    <main className="bg-gray-50 text-gray-900 relative">
      {openedMenu && (
        <div
          className="fixed bg-transparent w-screen h-screen z-[2]"
          onClick={() => setOpenedMenu(false)}
        />
      )}
      <div className={cn(styles.topbar, 'box-shadow')}>
        <div className={cn('flex items-center justify-between')}>
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
            <Image src={Logo} alt="sopo logo" className="h-10 w-fit cursor-pointer" priority />
          </a>
          <div className="lg:flex hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 gap-4 text-md text-black items-center">
            <a
              href="#hero"
              className={getClassName('hero')}
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              Beranda
            </a>
            <a
              href="#ecosystem"
              className={getClassName('ecosystem')}
              onClick={(e) => handleNavClick(e, 'ecosystem')}
            >
              Ekosistem
            </a>
            <a
              href="#pillars"
              className={getClassName('pillars')}
              onClick={(e) => handleNavClick(e, 'pillars')}
            >
              Pilar
            </a>
            <a
              href="#about"
              className={getClassName('about')}
              onClick={(e) => handleNavClick(e, 'about')}
            >
              Tentang
            </a>
          </div>
          <div className="flex justify-end items-center gap-1">
            <Button href={authRoute.register} className="rounded-full w-fit" target="_blank">
              Gabung <span className="md:block hidden">Sekarang</span>
            </Button>
            <ChevronDown
              onClick={() => setOpenedMenu(!openedMenu)}
              className={cn(
                openedMenu && 'rotate-180',
                'lg:hidden block size-8 text-black cursor-pointer transition-all duration-200',
              )}
            />
          </div>
        </div>
        <Collapse
          opened={openedMenu}
          className={classNames([
            openedMenu ? 'md:mt-2 mt-8' : 'mt-0',
            'flex flex-col gap-8 text-left text-dark-default px-4',
          ])}
        >
          <a
            href="#hero"
            className={getClassName('hero')}
            onClick={(e) => handleNavClick(e, 'hero')}
          >
            Beranda
          </a>
          <a
            href="#ecosystem"
            className={getClassName('ecosystem')}
            onClick={(e) => handleNavClick(e, 'ecosystem')}
          >
            Ekosistem
          </a>
          <a
            href="#pillars"
            className={getClassName('pillars')}
            onClick={(e) => handleNavClick(e, 'pillars')}
          >
            Pilar
          </a>
          <a
            href="#about"
            className={getClassName('about')}
            onClick={(e) => handleNavClick(e, 'about')}
          >
            Tentang
          </a>
        </Collapse>
      </div>

      {/* SECTIONS: Pastikan ID sesuai dengan daftar sectionIds di atas */}
      <LandingPageHero id="hero" />
      <LandingPageEcosystem id="ecosystem" />
      <LandingPagePillar id="pillars" />
      <LandingPageAbout id="about" />
      <LandingPageCTA />
      <LandingPageFooter />
    </main>
  );
};
