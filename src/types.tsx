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
export type ServerActionReponse = {
    statusCode: number;
    status: string;
    message: string;
};
export type setBookmark = React.Dispatch<React.SetStateAction<formInterface[]>>;
