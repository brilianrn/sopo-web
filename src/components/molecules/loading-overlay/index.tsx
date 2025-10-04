import { Spinner } from '@/components/atoms';
import { FC } from 'react';

export const LoadingOverlay: FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-black/40 backdrop-blur-xs backdrop-grayscale z-[11] top-0 fixed">
      <Spinner variant="primary" />
    </div>
  );
};
