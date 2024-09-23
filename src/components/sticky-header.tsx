import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Github } from 'lucide-react'

export function StickyHeader() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-background shadow-md transition-all',
        scrollY > 0 ? 'py-2' : 'py-4',
      )}
    >
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <h1 className='text-xl sm:text-3xl font-normal font-dancing-script cursor-default'>
          <span className='text-teal-200'>geeked</span>
          <span className='text-cyan-300 ml-0.5'>.</span>
          <span className='text-cyan-50'>gg</span>
        </h1>
        <div className='flex items-center space-x-4'>
          <nav>
            <ul className='flex items-center justify-center space-x-4 text-xs sm:text-sm lg:text-base'>
              <li>
                <a href='/' className='text-gray-300 hover:text-white'>
                  Home
                </a>
              </li>
              <li>
                <a href='/#services' className='text-gray-300 hover:text-white'>
                  Services
                </a>
              </li>
              <li>
                <a href='mailto:levikl@geeked.gg' className='text-gray-300 hover:text-white'>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/levikl'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                >
                  <Github className='size-4 sm:size-5 lg:size-6 text-gray-300 hover:text-white' />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
