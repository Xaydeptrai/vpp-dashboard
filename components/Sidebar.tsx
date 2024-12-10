import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from '@/components/ui/command';
  import {
    LayoutDashboard,
    Newspaper,
    Folders,
    CreditCard,
    Settings,
    User,
    Package,
  } from 'lucide-react';
  import Link from 'next/link';
  
  const Sidebar = () => {
    return (
      <Command className='bg-secondary rounded-none'>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Management'>
            <CommandItem className='mt-3'>
              <LayoutDashboard className='mr-2'/>
              <Link href='/'>Dashboard</Link>
            </CommandItem>
            <CommandItem className='mt-3'>
              <Newspaper className='mr-2' />
              <Link href='/orders'>Orders</Link>
            </CommandItem>
            <CommandItem className='mt-3'>
              <Package className='mr-2' />
              <Link href='/proudct'>Products</Link>
            </CommandItem>
            <CommandItem className='mt-3'>
              <Folders className='mr-2' />
              <Link href='/categories'>Categories</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    );
  };
  
  export default Sidebar;