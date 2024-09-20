import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

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
          scrollY > 0 ? 'py-2' : 'py-4'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className='text-3xl font-normal font-dancing-script cursor-default'>
            <span className="text-teal-200">geeked</span>
            <span className="text-cyan-300 ml-0.5">.</span>
            <span className="text-cyan-50">gg</span>
          </h1>
          <div className="flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-4">
                {['Home', 'Services', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={item === 'Contact' ? 'mailto:levikl@geeked.gg' : `#${item.toLowerCase()}`} className="text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
  )
}
