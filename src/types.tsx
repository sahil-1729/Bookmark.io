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
    labels: any,
    categories: string,
    link: string,
    // topics: any
}
export type ServerActionReponse = {
    statusCode: number;
    status: string;
    message: string;
};
export type fetchBookmark = {
    link: string;
    user_id: string,
    email: string,
    categories: string,
    labels: Array<{ id: string, text: string }>,
    created_at: string,
    updated_at: string | null,
    id: string,
    metadata?: string
    visited?: boolean
}
export type setBookmark = React.Dispatch<React.SetStateAction<formInterface[]>>;
