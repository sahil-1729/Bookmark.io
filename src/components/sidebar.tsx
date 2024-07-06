'use client';

import {
    Tags,
    List,
    Mail,
    History,
    Search,
    Component
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types';
// import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './sidebar-mobile';

const sidebarItems: SidebarItems = {
    links: [
        { label: 'Timeline', href: '/timeline', icon: History },
        { label: 'Search', href: '/search', icon: Search },
        { label: 'Groups', href: '/groups', icon: Component },
        {
            href: '/labels',
            icon: Tags,
            label: 'Labels',
        },
    ],
    // extras: (
    //     <div className='flex flex-col gap-2'>
    //         <SidebarButton icon={MoreHorizontal} className='w-full'>
    //             More
    //         </SidebarButton>
    //         <SidebarButton
    //             className='w-full justify-center text-white'
    //             variant='default'
    //         >
    //             Tweet
    //         </SidebarButton>
    //     </div>
    // ),
};

export function Sidebar() {
    const isDesktop = useMediaQuery('(min-width: 640px)', { 'initializeWithValue': false });

    if (isDesktop) {
        return <SidebarDesktop sidebarItems={sidebarItems} />;
    }

    return <SidebarMobile sidebarItems={sidebarItems} />;
}