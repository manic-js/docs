import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import { appName } from '@/lib/shared';

export const revalidate = false;

// Fetch fonts at build time
const fontRegularPromise = fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff'
).then(res => res.arrayBuffer());

const fontBoldPromise = fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff'
).then(res => res.arrayBuffer());

export async function GET(
  _req: Request,
  { params }: RouteContext<'/og/docs/[...slug]'>
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  // Determine Tab category and color based on first segment of slug
  const firstSegment = slug[0]?.toLowerCase() || '';
  let tabName = 'Docs';
  let tabColor = '#f15156'; // Default Red

  if (firstSegment === 'core') {
    tabName = 'Core';
    tabColor = '#8b5cf6'; // Purple
  } else if (firstSegment === 'cli') {
    tabName = 'CLI';
    tabColor = '#10b981'; // Green
  } else if (firstSegment === 'api') {
    tabName = 'API';
    tabColor = '#3b82f6'; // Blue
  } else if (firstSegment === 'framework') {
    tabName = 'Framework';
    tabColor = '#f15156'; // Red
  } else if (firstSegment === 'advanced') {
    tabName = 'Advanced';
    tabColor = '#f59e0b'; // Amber/Orange
  } else if (firstSegment === 'troubleshooting') {
    tabName = 'Troubleshoot';
    tabColor = '#eab308'; // Yellow
  }

  const title = page.data.title;
  const description = page.data.description || '';

  // Await font buffers
  const [fontRegular, fontBold] = await Promise.all([
    fontRegularPromise,
    fontBoldPromise,
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#070708',
        backgroundImage: `radial-gradient(circle at 85% 15%, ${tabColor}1f, transparent 50%), radial-gradient(circle at 15% 85%, ${tabColor}0d, transparent 35%)`,
        padding: '70px 80px',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Outer border to give a card feel */}
      <div
        style={{
          position: 'absolute',
          top: '30px',
          bottom: '30px',
          left: '30px',
          right: '30px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '24px',
          pointerEvents: 'none',
        }}
      />

      {/* Left accent indicator */}
      <div
        style={{
          position: 'absolute',
          left: '30px',
          top: '80px',
          bottom: '80px',
          width: '6px',
          borderRadius: '99px',
          backgroundColor: tabColor,
          boxShadow: `0 0 20px ${tabColor}`,
        }}
      />

      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Brand Group */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: tabColor }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M90.0155 49.2387C81.9069 55.4037 80.6796 56.5174 73.686 61.8924C74.0159 61.8975 75.5314 61.1137 77.0466 60.33C78.5615 59.5466 80.0761 58.7633 80.4058 58.7683L81.1275 58.7794C82.8629 58.8059 84.6116 58.8327 86.3492 58.8603L120.025 64.192L50.925 111.008C48.1862 112.661 45.476 114.324 42.8128 116C42.8128 116 70.3089 77.4056 75.6606 69.7669C68.5868 76.0582 67.8794 76.0582 64.3425 75.8141C60.3351 75.858 56.3253 75.9009 52.313 75.9425L7 76.0582L20.0072 63.9843C29.7747 53.9198 39.7855 43.9286 49.7964 33.9374C55.5395 28.2056 61.2835 22.4728 66.9806 16.7272C68.8718 14.8199 70.7579 12.9109 72.6373 11L121 25.5738C118.674 27.3501 116.355 29.1284 114.041 30.9083C106.814 36.4666 98.3988 42.8647 90.0155 49.2387Z"
              fill="currentColor"
            />
          </svg>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-1px',
            }}
          >
            {appName}
          </span>
        </div>

        {/* Tab category badge */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '99px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: tabColor,
              boxShadow: `0 0 10px ${tabColor}`,
            }}
          />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {tabName}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '100%',
          paddingLeft: '24px',
        }}
      >
        <span
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-2px',
            display: 'block',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '28px',
            color: '#a1a1aa',
            lineHeight: 1.5,
            maxWidth: '920px',
            display: 'block',
          }}
        >
          {description}
        </span>
      </div>

      {/* Footer Area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          paddingLeft: '24px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            color: '#71717a',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Documentation
        </span>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: tabColor,
            letterSpacing: '-0.5px',
          }}
        >
          manicjs.tech
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      format: 'webp',
      fonts: [
        {
          name: 'Inter',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fontBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map(page => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
