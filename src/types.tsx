import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarItems {
    links: Array<{
        label: string;
        href: string;
        icon?: LucideIcon;
    }>;
    extras?: ReactNode;
}
export interface formInterface {
    labels: string,
    categories: string,
    link: string
}

export type setBookmark = (a: formInterface[]) => void;
