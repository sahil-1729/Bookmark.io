'use client';

import { SidebarButton } from './sidebar-button';
import { formInterface, SidebarItems } from '@/types';
import Link from 'next/link';
// import { Separator } from './ui/separator';
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
// import { Button } from './ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { LogOut, MoreHorizontal, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Separator } from './ui/separator';
import { useToggleContext } from '@/context/app-context';
import { Folder } from 'lucide-react';
import { uniq, sortedUniqBy } from 'lodash'

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const { bookmarks } = useToggleContext()
  const uniqueBookmarks = bookmarks && uniq(bookmarks.map(val => val.categories))
  console.log('unique - ', uniqueBookmarks)
  return (
    // <aside className='w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r'>
    <div className='w-80 h-full px-3 py-4 '>
      <h3 className='mx-3 text-lg font-semibold '>Bookmark.io</h3>
      <div className='mt-5'>
        <div className='flex flex-col gap-1 w-full'>
          {props.sidebarItems.links.map((link, index) => (
            <Link key={index} href={link.href}>
              <SidebarButton
                variant={pathname === link.href ? 'secondary' : 'ghost'}
                icon={link.icon}
                className='w-full'
              >
                {link.label}
              </SidebarButton>
            </Link>
          ))}
          {/* {props.sidebarItems.extras} */}
        </div>
        <Separator className='bg-primary my-4' orientation="horizontal" />
        {/* {bookmarks.map((bm: formInterface, key: number) => {
          return (<div>
            {bm.categories}
          </div>)
        })} */}

        <div className='flex flex-col gap-1 w-full'>
          {uniqueBookmarks.sort((a: string, b: string) => { return a > b }).map((category: string, index: number) => {
            return (
              <Link key={index} href='#'>
                <SidebarButton
                  variant={pathname === '' ? 'secondary' : 'ghost'}
                  icon={Folder}
                  className='w-full'
                >
                  {category}
                </SidebarButton>
              </Link>
            )
          })}
        </div>

        {/* <div className='absolute left-0 bottom-3 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://github.com/max-programming.png' />
                        <AvatarFallback>Max Programming</AvatarFallback>
                      </Avatar>
                      <span>Max Programming</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
                <div className='space-y-1'>
                  <Link href='/'>
                    <SidebarButton size='sm' icon={Settings} className='w-full'>
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size='sm' icon={LogOut} className='w-full'>
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div> */}
      </div>
    </div>
    // </aside>
  );
}