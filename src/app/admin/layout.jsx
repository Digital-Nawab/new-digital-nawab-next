'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Frame,
  PieChart,
  BookOpen,
  Map,
  Globe2,
  ListChecks,
  Target,
  Layers,
  FolderKanban,
  ShieldCheck,
  ChevronDown,
  Menu,
  PanelLeft,
  Loader2,
  LayoutDashboard,
} from 'lucide-react';

// Exact 7 Navigation Groups with Parent Icons
const navSections = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      { title: 'Admin Dashboard', url: '/admin', icon: Frame },
      { title: 'Meta Data', url: '/admin/tags', icon: Frame },
      { title: 'Enquiries', url: '/admin/enquiries', icon: Frame },
      { title: 'All Services', url: '/admin/services', icon: PieChart },
      { title: 'Career', url: '/admin/career', icon: BookOpen },
      { title: 'Blog', url: '/admin/blogs', icon: Map },
      { title: 'Contact Details', url: '/admin/contact-details', icon: BookOpen },
      { title: 'Our Team', url: '/admin/our-team', icon: BookOpen },
      { title: 'Our Packages', url: '/admin/packages', icon: BookOpen },
      { title: 'Our Projects', url: '/admin/projects', icon: BookOpen },
    ],
  },
  {
    title: 'Home Page',
    icon: BookOpen,
    items: [
      { title: 'Hero Section', url: '/admin/hero-videos', icon: BookOpen },
      { title: 'About Section', url: '/admin/home-about', icon: BookOpen },
      { title: 'Tools and Technologies', url: '/admin/technologies', icon: Map },
      { title: 'FAQs', url: '/admin/faqs', icon: BookOpen },
      { title: 'Vision-Mission', url: '/admin/vision-mission', icon: BookOpen },
      { title: 'Our Creatives', url: '/admin/creatives', icon: BookOpen },
      { title: 'Graphics Logo', url: '/admin/graphics-logo', icon: BookOpen },
    ],
  },
  {
    title: 'SEO Page',
    icon: Target,
    items: [
      { title: 'SEO Service', url: '/admin/seo-services', icon: Frame },
      { title: 'SEO Highlights', url: '/admin/seo-highlights', icon: Frame },
      { title: 'SEO Form', url: '/admin/seo-forms', icon: Frame },
      { title: 'SEO Process', url: '/admin/seo-processes', icon: Frame },
      { title: 'SEO Digital', url: '/admin/seo-digital', icon: Frame },
      { title: 'SEO optimization', url: '/admin/seo-optimization', icon: Frame },
      { title: 'SEO strategy', url: '/admin/seo-strategy', icon: Frame },
    ],
  },
  {
    title: 'Development Page',
    icon: Layers,
    items: [
      { title: 'Dev Commerce', url: '/admin/dev-commerce', icon: Frame },
      { title: 'Dev Cornerstone', url: '/admin/dev-cornerstone', icon: Frame },
      { title: 'Dev Innovation', url: '/admin/dev-innovation', icon: Frame },
      { title: 'Dev Maintain', url: '/admin/dev-maintain', icon: Frame },
      { title: 'Dev Step', url: '/admin/dev-step', icon: Frame },
    ],
  },
  {
    title: 'Google Campaigns',
    icon: PieChart,
    items: [
      { title: 'Google Campaigns', url: '/admin/google-campaigns', icon: BookOpen },
      { title: 'Google Media', url: '/admin/google-media', icon: BookOpen },
      { title: 'Google PPC', url: '/admin/google-ppc', icon: BookOpen },
    ],
  },
  {
    title: 'Social Media Page',
    icon: Map,
    items: [
      { title: 'Facebook', url: '/admin/smm-facebook', icon: BookOpen },
      { title: 'SMM Benefits', url: '/admin/smm-benefit', icon: BookOpen },
      { title: 'SMM Youtube', url: '/admin/smm-youtube', icon: BookOpen },
      { title: 'SMM Services', url: '/admin/social-service', icon: BookOpen },
    ],
  },
  {
    title: 'City Pages',
    icon: Globe2,
    items: [
      { title: 'City Pages', url: '/admin/cities', icon: Globe2 },
      { title: 'Approach Sections', url: '/admin/approaches', icon: ListChecks },
      { title: 'Strategic Approach', url: '/admin/strategic-approaches', icon: Target },
      { title: 'Services', url: '/admin/city-services', icon: Layers },
      { title: 'Pricing Section', url: '/admin/pricing-sections', icon: Layers },
      { title: 'How We Work', url: '/admin/how-we-works', icon: ListChecks },
      { title: 'Projects', url: '/admin/city-projects', icon: FolderKanban },
      { title: 'Why Choose Us', url: '/admin/why-choose-us', icon: ShieldCheck },
      { title: 'FAQs', url: '/admin/city-faqs', icon: Layers },
      { title: 'Testimonials', url: '/admin/city-testimonials', icon: Layers },
    ],
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  // All React state hooks declared at top level
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!isLoginPage);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Accordion state: All 7 main sections start closed unless clicked or on a specific subpage
  const [openSections, setOpenSections] = useState({
    Dashboard: false,
    'Home Page': false,
    'SEO Page': false,
    'Development Page': false,
    'Google Campaigns': false,
    'Social Media Page': false,
    'City Pages': false,
  });

  const isActivePath = (url) => {
    if (url === '/admin') return pathname === '/admin';
    return pathname === url || pathname?.startsWith(url + '/');
  };

  // Force Light Theme for Admin Dashboard matching Laravel Inertia UI
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
  }, [pathname]);

  // Auth verification
  useEffect(() => {
    if (isLoginPage) return;

    let mounted = true;
    fetch('/api/admin/auth/me')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthenticated');
        return res.json();
      })
      .then((data) => {
        if (mounted) {
          if (data.status && data.user) {
            setUser(data.user);
          } else {
            router.push('/admin/login');
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) router.push('/admin/login');
      });

    return () => {
      mounted = false;
    };
  }, [isLoginPage, router]);

  // Automatically expand the section if the user is on a specific subpage (not root /admin)
  useEffect(() => {
    if (pathname && pathname !== '/admin') {
      let matchedTitle = null;
      navSections.forEach((section) => {
        if (section.items.some((item) => item.url !== '/admin' && isActivePath(item.url))) {
          matchedTitle = section.title;
        }
      });

      if (matchedTitle) {
        setOpenSections({
          Dashboard: false,
          'Home Page': false,
          'SEO Page': false,
          'Development Page': false,
          'Google Campaigns': false,
          'Social Media Page': false,
          'City Pages': false,
          [matchedTitle]: true,
        });
      }
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  const toggleSection = (sectionTitle) => {
    setOpenSections((prev) => {
      const isCurrentlyOpen = !!prev[sectionTitle];
      if (isCurrentlyOpen) {
        return {
          ...prev,
          [sectionTitle]: false,
        };
      }
      return {
        Dashboard: false,
        'Home Page': false,
        'SEO Page': false,
        'Development Page': false,
        'Google Campaigns': false,
        'Social Media Page': false,
        'City Pages': false,
        [sectionTitle]: true,
      };
    });
  };

  // Early returns ONLY AFTER ALL HOOKS HAVE BEEN CALLED
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-gray-700">Verifying admin session...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased font-sans"
      style={{ colorScheme: 'light', color: '#111827' }}
    >
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar: Fixed / Sticky top-0 height 100vh with independent scroll */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ease-in-out md:sticky md:top-0 md:h-screen shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ backgroundColor: '#ffffff', color: '#111827', height: '100vh' }}
      >
        {/* Top Logo */}
        <div className="shrink-0 flex justify-center items-center py-4 px-6 border-b border-gray-100 bg-white">
          <Link href="/admin" className="flex items-center justify-center">
            <img
              src="/assets/logo.png"
              alt="Digital Nawab"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Sidebar Navigation: Accordion with 7 main sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 text-sm">
          {navSections.map((section) => {
            const isOpen = !!openSections[section.title];
            const hasActiveItem = section.items.some((item) => isActivePath(item.url));

            return (
              <div key={section.title} className="space-y-1">
                {/* Accordion Section Main Item */}
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer select-none group ${
                    isOpen
                      ? 'bg-indigo-50/90 text-indigo-700 shadow-xs'
                      : hasActiveItem
                      ? 'bg-gray-100 text-gray-900 font-bold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 font-medium'
                  }`}
                  style={{
                    color: isOpen ? '#4338ca' : hasActiveItem ? '#111827' : '#374151',
                    backgroundColor: isOpen ? '#eef2ff' : hasActiveItem ? '#f3f4f6' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <section.icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isOpen
                          ? 'text-indigo-600'
                          : hasActiveItem
                          ? 'text-gray-900'
                          : 'text-gray-500 group-hover:text-gray-800'
                      }`}
                      style={{
                        color: isOpen ? '#4f46e5' : hasActiveItem ? '#111827' : '#6b7280',
                      }}
                    />
                    <span className="truncate">{section.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 text-indigo-600'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                    style={{
                      color: isOpen ? '#4f46e5' : '#9ca3af',
                    }}
                  />
                </button>

                {/* Accordion Content: Child Links */}
                {isOpen && (
                  <div className="space-y-0.5 pl-3 pr-1 pt-1 pb-1">
                    {section.items.map((item) => {
                      const active = isActivePath(item.url);
                      return (
                        <Link
                          key={item.title}
                          href={item.url}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-all duration-150 group cursor-pointer ${
                            active
                              ? 'border-b-2 border-indigo-600 bg-gray-100/90 font-semibold shadow-xs'
                              : 'hover:bg-gray-100/80 font-medium'
                          }`}
                          style={{
                            color: active ? '#111827' : '#4b5563',
                            backgroundColor: active ? '#f3f4f6' : 'transparent',
                          }}
                        >
                          <item.icon
                            className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                              active
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-gray-700'
                            }`}
                            style={{ color: active ? '#4f46e5' : '#9ca3af' }}
                          />
                          <span
                            className="truncate"
                            style={{
                              color: active ? '#111827' : '#4b5563',
                              fontWeight: active ? '600' : '500',
                            }}
                          >
                            {item.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer: Red Logout Button */}
        <div className="shrink-0 p-3 border-t border-gray-100 bg-white">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-2 px-4 rounded-md transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
            style={{ color: '#ffffff', backgroundColor: '#dc2626' }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <header
          className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs"
          style={{ backgroundColor: '#ffffff', color: '#111827' }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg md:hidden cursor-pointer"
              title="Toggle Sidebar"
              style={{ color: '#374151' }}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:inline-flex p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
              title="Toggle Sidebar"
              style={{ color: '#4b5563' }}
            >
              <PanelLeft className="w-5 h-5" />
            </button>

            {/* Top Navigation Tabs matching Laravel Layout */}
            <nav className="flex items-center space-x-4 sm:space-x-6">
              {[
                { name: 'Dashboard', path: '/admin' },
                { name: 'Users', path: '/admin/users' },
                { name: 'Roles', path: '/admin/roles' },
                { name: 'Permissions', path: '/admin/permissions' },
              ].map((tab) => {
                const isTabActive = pathname === tab.path;
                return (
                  <Link
                    key={tab.name}
                    href={tab.path}
                    className={`text-sm pb-1 transition-colors ${
                      isTabActive
                        ? 'border-b-2 border-indigo-600 font-bold'
                        : 'hover:text-gray-900 font-medium'
                    }`}
                    style={{
                      color: isTabActive ? '#111827' : '#4b5563',
                      borderColor: isTabActive ? '#4f46e5' : 'transparent',
                    }}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header: User Menu */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 text-sm font-medium transition-colors cursor-pointer"
                style={{ color: '#1f2937' }}
              >
                <span>
                  {user?.name || 'Super Admin'} ({user?.roles?.[0] || 'admin'})
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {userMenuOpen && (
                <div
                  onMouseLeave={() => setUserMenuOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 text-sm"
                  style={{ backgroundColor: '#ffffff', color: '#111827' }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-semibold text-gray-900" style={{ color: '#111827' }}>
                      {user?.name || 'Super Admin'} ({user?.roles?.[0] || 'admin'})
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-0.5" style={{ color: '#6b7280' }}>
                      {user?.email || 'admin@digitalnawab.com'}
                    </p>
                  </div>

                  <Link
                    href="/admin/users"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    style={{ color: '#374151' }}
                  >
                    Account & Users
                  </Link>
                  <Link
                    href="/admin/tags"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    style={{ color: '#374151' }}
                  >
                    Meta Settings
                  </Link>

                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer"
                      style={{ color: '#dc2626' }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto"
          style={{ color: '#111827' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
