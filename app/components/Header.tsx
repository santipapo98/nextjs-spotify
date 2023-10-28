"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { toast } from "react-hot-toast"

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}: HeaderProps) => {
    
    const router = useRouter()
    const authModal = useAuthModal()

    const supabaseClient = useSupabaseClient()

    const {user} = useUser()

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut()
        //TODO: Reset any playing songs in the future
        router.refresh()

        if(error) {
            toast.error(error.message)   
        } else {
            toast.success("logged out successfully")
        }
    }

  return (
    <div className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-emerald-800
        p-6
    `, className)}>
        <div className='
            w-full
            mb-4
            flex
            items-center
            justify-between
        '>
            <div className='
            hidden
            md:flex
            gap-x-2
            items-center
            '>
                <button 
                onClick={() => router.back()}
                className='
                    rounded-full
                    bg-black
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                '>
                    <RxCaretLeft size={35} className="text-white"/>
                </button>
                <button 
                 onClick={() => router.forward()}
                className='
                    rounded-full
                    bg-black
                    flex
                    items-center  
                    justify-center
                    hover:opacity-75
                    transition
                '>
                    <RxCaretRight size={35} className="text-white"/>
                </button>
            </div>
            <div className='flex md:hidden gap-x-2 items-center'>
                <button className='
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                '>
                    <HiHome size={20} className='text-black'/>
                </button>

                <button className='
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center
                    justify-center
                    hover:opacity-75
                    transition
                '>
                    <BiSearch size={20} className='text-black'/>
                </button>
            </div>
            <div className='
            flex
            justify-between
            items-center
            gap-x-4'>
                {user ? (
                    <div className='
                        flex
                        gap-x-4
                        items-center
                    '>
                        <Button className='bg-white px-6 py-2' onClick={handleLogout}>Logout</Button>
                        <Button className='bg-white' onClick={() => router.push('/account')}>
                            <FaUserAlt/>
                        </Button>
                    </div>
                ) : (<>
                    <div>
                        <Button
                        className='
                            bg-transparent
                            text-neutral-300
                            font-medium
                        '
                        onClick={authModal.onOpen}>
                            Sign up
                        </Button>                        
                    </div>
                    <div>
                        <Button
                        className='
                            bg-white
                            px-6
                            py-2
                        '
                        onClick={authModal.onOpen}>
                            Log in
                        </Button>                        
                    </div>
                </>)} 
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header