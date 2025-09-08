'use client';

import {
    Tags,
    List,
    Mail,
    History,
    Search,
    Component
} from 'lucide-react';
import { SidebarDesktop } from './sidebarDesktop';
import { SidebarItems } from '@/types';
// import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebarMobile';

const sidebarItems: SidebarItems = {
    links: [
        { label: 'Timeline', href: '/timeline', icon: History },
        { label: 'Search', href: '/search', icon: Search },
    ],

};

interface props {
    categories: Array<string> | []
}
export function Sidebar({ categories }: props) {
    const isDesktop = useMediaQuery('(min-width: 640px)', { 'initializeWithValue': false });

    if (isDesktop) {
        return <SidebarDesktop categories={categories} sidebarItems={sidebarItems} />;
    }

    return <SidebarMobile categories={categories} sidebarItems={sidebarItems} />;
}