'use client';

import logo from '@/assets/icons/logo.png';
import { useTouch } from '@/components/display/hybrid';
import {
  DeveloperFlags,
  useGlobalSettingsStore,
} from '@/contexts/useGlobalSettingsStore';
import Image from 'next/image';
import Link from 'next/link';
import { useLongPress } from 'react-use';
import { lusitana } from '../../display/fonts';
import ThemeSwitcher from '../theme-switcher';
import { AvatarDropdown } from './avatar-dropdown';

interface HeaderProps {
  isThemeShow?: boolean;
}

export default function Header({ isThemeShow = false }: HeaderProps) {
  const isTouch = useTouch();
  const developerFlags = useGlobalSettingsStore(state => state.developerFlags);
  const setDeveloperFlags = useGlobalSettingsStore(
    state => state.setDeveloperFlags
  );

  const longPressEvent = useLongPress(
    (event: TouchEvent | MouseEvent) => {
      if (isTouch || event.metaKey) {
        console.log('toggle dev-tools after long pressing');
        if (developerFlags) {
          setDeveloperFlags(DeveloperFlags.NONE);
        } else {
          setDeveloperFlags(DeveloperFlags.NORMAL);
        }
      }
    },
    {
      isPreventDefault: true,
      delay: 1000,
    }
  );

  return (
    <div className="w-full flex items-center justify-between">
      <div
        className={`${lusitana.className} flex flex-row items-center gap-2 leading-none`}
      >
        <Link href="/">
          <Image alt="logo" className="w-8 h-8 md:w-12 md:h-12" src={logo} />
        </Link>
        <p
          className="hidden sm:block sm:text-md md:text-2xl hover:animate-pulse cursor-default"
          {...longPressEvent}
        >
          四川鼎兴数智教育咨询有限公司
        </p>
      </div>

      <div className="flex items-center gap-2">
        {isThemeShow && <ThemeSwitcher />}
        <AvatarDropdown />
      </div>
    </div>
  );
}
