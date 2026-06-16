import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// A /instagram belso eszkoz (carousel elonezet + PNG generator) csak helyben,
// fejlesztes alatt (localhost / `npm run dev`) erheto el. Elesben (production)
// nem elerheto: 404-et ad, mintha nem letezne.
export function proxy(_request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not found', { status: 404 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/instagram', '/instagram/:path*', '/api/instagram-generate/:path*'],
}
