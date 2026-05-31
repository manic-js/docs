import { getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import { appName } from '@/lib/shared';

export const revalidate = false;

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

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#070708',
        backgroundImage: `radial-gradient(circle at 100% 100%, ${tabColor}1f, transparent 55%), radial-gradient(circle at 0% 0%, ${tabColor}0d, transparent 35%)`,
        padding: '80px',
        boxSizing: 'border-box',
        position: 'relative',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Left Accent Highlight bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          backgroundColor: tabColor,
        }}
      />

      {/* Top Header Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Logo & Brand Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <svg
            width="48"
            height="48"
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
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#ffffff',
              letterSpacing: '-0.5px',
            }}
          >
            {appName}
          </span>
        </div>

        {/* Tab Category Badge */}
        <div
          style={{
            display: 'flex',
            padding: '6px 14px',
            borderRadius: '99px',
            backgroundColor: `${tabColor}1a`,
            border: `1px solid ${tabColor}50`,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: tabColor,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            {tabName}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%',
        }}
      >
        <span
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            width: '100%',
            display: 'block',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '26px',
            color: '#9ba1a6',
            lineHeight: 1.45,
            maxWidth: '900px',
            display: 'block',
          }}
        >
          {description}
        </span>
      </div>

      {/* Footer info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderTop: '1px solid #ffffff10',
          paddingTop: '24px',
        }}
      >
        <span style={{ fontSize: '16px', color: '#52585f' }}>
          documentation site
        </span>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: tabColor }}>
          manic.js.org
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      format: 'webp',
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map(page => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
