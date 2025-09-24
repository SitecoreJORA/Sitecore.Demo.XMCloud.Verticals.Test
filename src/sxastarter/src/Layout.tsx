/**
 * This Layout is needed for Starter Kit.
 */
import React from 'react';
import Head from 'next/head';
import { Placeholder, LayoutServiceData, Field, HTMLLink } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import Scripts from 'src/Scripts';
import { ParallaxProvider } from 'react-scroll-parallax';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = config.publicUrl;

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const theme = layoutData.sitecore.context.theme as string;
  const contextSiteClass = `site-${theme?.toLowerCase()}`;

  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'anonymous'} />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <meta property="og:site" content={layoutData?.sitecore?.context?.site?.name} />
        <meta name="description" content="A Verticals demo site."></meta>
        {headLinks.map((headLink) => (
          <link rel={headLink.rel} key={headLink.href} href={headLink.href} />
        ))}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <ParallaxProvider>
        <div className={`${mainClassPageEditing} ${contextSiteClass} body`}>
          <header>
            <div id="header">
              {route && <Placeholder name="headless-header" rendering={route} />}
            </div>
          </header>
          <main>
            <div id="content">
              {route && <Placeholder name="headless-main" rendering={route} />}
            </div>
          </main>
          <footer>
            <div id="footer">
              <svg className="large-visual" viewBox="0 0 504 68" preserveAspectRatio="none">
                <path d="M504 68V40.0166C501.199 39.4166 497.599 40.5166 497.599 40.5166C491.297 42.0166 486.997 46.5166 480.795 45.7166C474.994 44.9166 470.093 41.1166 465.492 37.6166C455.29 29.6166 454.79 28.1166 449.089 20.5166C444.888 15.4166 439.987 12.0166 434.286 8.31661C413.682 -5.98339 400.079 0.0166063 381.676 12.3166C372.874 18.2166 362.572 21.7166 352.17 18.5166C339.367 16.3166 325.665 17.7166 314.462 22.8166C305.161 28.9166 318.463 34.6166 296.159 38.2166C279.155 11.8166 228.545 1.21658 206.041 11.4166C195.839 16.0166 188.037 38.7166 182.036 42.1166C176.235 39.9166 169.934 36.7166 163.632 35.6166C159.432 34.6166 157.631 36.9166 155.131 39.4166C145.629 50.2166 143.228 51.8166 132.326 46.7166C101.32 21.2166 91.7182 35.0166 62.3123 48.9166C57.4114 50.6166 52.4104 51.3166 47.2094 50.0166C32.4064 46.1166 20.204 50.5166 8.90179 58.0166C7.10143 59.2166 3.60071 62.2166 0 65.6166V68H504Z"></path>
              </svg>
              {route && <Placeholder name="headless-footer" rendering={route} />}
            </div>
          </footer>
        </div>
      </ParallaxProvider>
    </>
  );
};

export default Layout;
