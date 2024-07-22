'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

export interface DeviceTypeProviderProps extends PropsWithChildren {
  isMobile: boolean;
}

// 필기는 /solution/device/conditional/layout.tsx에 했음.
export default function DeviceTypeProvider({ children, isMobile }: DeviceTypeProviderProps) {
  return <DeviceTypeContext.Provider value={{ isMobile }}>{children}</DeviceTypeContext.Provider>;
}

interface DeviceTypeContextValue {
  isMobile: boolean;
}

const DeviceTypeContext = createContext<DeviceTypeContextValue>({
  isMobile: true,
});

export function useIsMobile() {
  return useContext(DeviceTypeContext).isMobile;
}
