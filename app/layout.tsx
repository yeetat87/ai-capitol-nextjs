import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800']
})

export const metadata: Metadata = {
  title: 'AI Automation Services | Free AI Readiness Assessment | The AI Capitol',
  description: 'Discover if your business is ready for AI automation. Take our free 3-minute assessment and get a personalized roadmap to save 40+ hours weekly and boost revenue by 35%.',
  keywords: 'AI automation, business automation, workflow automation, AI readiness assessment, revenue operations, marketing automation, sales automation',
  authors: [{ name: 'The AI Capitol' }],
  openGraph: {
    title: 'Is Your Business Bleeding Money Without AI? | Free Assessment',
    description: '83% of businesses lose $127K+ yearly to manual work. Take our 3-minute AI Readiness Assessment and discover your automation potential.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>{children}</body>
    </html>
  )
}
