import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    MonitorSmartphone,
    Settings2,
    SquareTerminal,
    Globe2,
    ListChecks,
    Target,
    Code,
    LayoutDashboard,
    Layers3,
    Layers,
    Users,
    FolderKanban,
    ShieldCheck,
    CreditCard,
    LifeBuoy,
    ShoppingCart,
    Megaphone,
    Brush,
    User,
    BookUser,
    HousePlus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import usePermission from "@/composables/permission";

// Sample data
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboards",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Fashion Academy Dashboard",
                    url: "/dashboard",
                },
                {
                    title: "Salon Dashboard",
                    url: "/dashboard/salon_dashboard",
                },
            ],
        },
        {
            title: "Fashion Academy",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Course Category",
                    url: "/dashboard/academy_category",
                },
                {
                    title: "All Courses",
                    url: "/dashboard/courses",
                },
                {
                    title: "Add Courses",
                    url: "/dashboard/add_course",
                },
            ],
        },
        {
            title: "Salon Services",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Salon Service",
                    url: "/dashboard/salon_service",
                },
            ],
        },
    ],
    projects: [
        {
            title: "Admin Dashboard",
            url: "/admin",
            icon: Frame,
        },
        {
            title: "Meta Data",
            url: "/admin/tags",
            icon: Frame,
        },
        {
            title: "Enquiries",
            url: "/admin/enquiries",
            icon: Frame,
        },
        {
            title: "All Services",
            url: "/admin/services",
            icon: PieChart,
        },
        {
            title: "Career",
            url: "/admin/career",
            icon: BookOpen,
        },
        {
            title: "Blog",
            url: "/admin/blogs",
            icon: Map,
        },
        {
            title: "Contact Details",
            url: "/admin/contact-details",
            icon: BookOpen,
        },
        {
            title: "Our Team",
            url: "/admin/our-team",
            icon: BookOpen,
        },
        {
            title: "Our Packages",
            url: "/admin/packages",
            icon: BookOpen,
        },
        {
            title: "Our Projects",
            url: "/admin/projects",
            icon: BookOpen,
        },
    ],
    SEO: [
        {
            title: "SEO Service",
            url: "/admin/seo-services",
            icon: Frame,
        },
        {
            title: "SEO Highlights",
            url: "/admin/seo-highlights",
            icon: Frame,
        },
        {
            title: "SEO Form",
            url: "/admin/seo-forms",
            icon: Frame,
        },
        {
            title: "SEO Process",
            url: "/admin/seo-processes",
            icon: Frame,
        },
        {
            title: "SEO Digital",
            url: "/admin/seo-digital",
            icon: Frame,
        },
        {
            title: "SEO optimization",
            url: "/admin/seo-optimization",
            icon: Frame,
        },
        {
            title: "SEO strategy",
            url: "/admin/seo-strategy",
            icon: Frame,
        },
    ],
    Dev: [
        {
            title: "Dev Commerce",
            url: "/admin/dev-commerce",
            icon: Frame,
        },
        {
            title: "Dev Cornerstone",
            url: "/admin/dev-cornerstone",
            icon: Frame,
        },
        {
            title: "Dev Innovation",
            url: "/admin/dev-innovation",
            icon: Frame,
        },
        {
            title: "Dev Maintain",
            url: "/admin/dev-maintain",
            icon: Frame,
        },
        {
            title: "Dev Step",
            url: "/admin/dev-step",
            icon: Frame,
        },
    ],
    Pages: [
        {
            title: "All Services",
            url: "/services",
            icon: PieChart,
        },
        {
            title: "SEO Service",
            url: "/#",
            icon: PieChart,
        },
        {
            title: "Marketing Service",
            url: "/#",
            icon: Map,
        },
        {
            title: "Development Service",
            url: "/#",
            icon: User,
        },
    ],
    Other: [
        {
            title: "Career",
            url: "/career",
            icon: BookOpen,
        },
        {
            title: "Blog",
            url: "/blogs",
            icon: Map,
        },
        {
            title: "Contact Details",
            url: "/contact-details",
            icon: BookOpen,
        },
        {
            title: "Our Team",
            url: "/our-team",
            icon: BookOpen,
        },
        {
            title: "Our Packages",
            url: "/packages",
            icon: BookOpen,
        },
        {
            title: "Our Projects",
            url: "/projects",
            icon: BookOpen,
        },
    ],
    Enquiry: [
        {
            title: "Hero Section",
            url: "/admin/hero-videos",
            icon: BookOpen,
        },
        {
            title: "About Section",
            url: "/admin/home-about",
            icon: BookOpen,
        },
        {
            title: "Tools and Technologies",
            url: "/admin/technologies",
            icon: Map,
        },
        {
            title: "FAQs",
            url: "/admin/faqs",
            icon: BookOpen,
        },
        {
            title: "Vision-Mission",
            url: "/admin/vision-mission",
            icon: BookOpen,
        },
        {
            title: "Our Creatives",
            url: "/admin/creatives",
            icon: BookOpen,
        },
        {
            title: "Graphics Logo",
            url: "/admin/graphics-logo",
            icon: BookOpen,
        },
    ],
    Google: [
        {
            title: "Google Campaigns",
            url: "/admin/google-campaigns",
            icon: BookOpen,
        },
        {
            title: "Google Media",
            url: "/admin/google-media",
            icon: BookOpen,
        },
        {
            title: "Google PPC",
            url: "/admin/google-ppc",
            icon: BookOpen,
        },
    ],
    SMM: [
        {
            title: "Facebook",
            url: "/admin/smm-facebook",
            icon: BookOpen,
        },
        {
            title: "SMM Benefits",
            url: "/admin/smm-benefit",
            icon: BookOpen,
        },
        {
            title: "SMM Youtube",
            url: "/admin/smm-youtube",
            icon: BookOpen,
        },
        {
            title: "SMM Services",
            url: "/admin/social-service",
            icon: BookOpen,
        },
    ],
    City: [
        {
            title: "City Pages",
            url: "/admin/cities",
            icon: Globe2,
        },
        {
            title: "Approach Sections",
            url: "/admin/approaches",
            icon: ListChecks,
        },
        {
            title: "Strategic Approach",
            url: "/admin/strategic-approaches",
            icon: Target,
        },
        {
            title: "Services",
            url: "/admin/city-services",
            icon: Layers,
        },
        {
            title: "Pricing Section",
            url: "/admin/pricing-sections",
            icon: Layers,
        },
        {
            title: "How We Work",
            url: "/admin/how-we-works",
            icon: ListChecks,
        },
        {
            title: "Projects",
            url: "/admin/city-projects",
            icon: FolderKanban,
        },
        {
            title: "Why Choose Us",
            url: "/admin/why-choose-us",
            icon: ShieldCheck,
        },
        {
            title: "FAQs",
            url: "/admin/city-faqs",
            icon: Layers,
        },
        {
            title: "Testimonials",
            url: "/admin/city-testimonials",
            icon: Layers,
        },

    ],

};

export function AppSidebar({ ...props }) {
    // const { prop } = usePage();
    const user = props?.user?.data;
    // console.log(props);
    const [roleData, setRoleData] = React.useState(user);
    const { hasRoles } = usePermission();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {/* <TeamSwitcher teams={data.teams} /> */}
                <div className="flex justify-center items-center border-b-2">
                    <a href="/">
                        <img src="/assets/logo.png" className="" alt="" />
                    </a>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* <NavMain /> */}
                {hasRoles(["admin", "manager", "enquiry"]) && (
                    <NavProjects title="Dashboard" projects={data.projects} />
                )}
                {hasRoles(["admin", "home_manager"]) && (
                    <NavProjects title="Home Page" projects={data.Enquiry} />
                )}
                {hasRoles(["admin", "seo_manager"]) && (
                    <NavProjects title="SEO Page" projects={data.SEO} />
                )}
                {hasRoles(["admin", "dev_manager"]) && (
                    <NavProjects title="Development Page" projects={data.Dev} />
                )}
                {hasRoles(["admin", "google_manager"]) && (
                    <NavProjects
                        title="Google Campaigns"
                        projects={data.Google}
                    />
                )}
                {hasRoles(["admin", "sm_manager"]) && (
                    <NavProjects
                        title="Social Media Page"
                        projects={data.SMM}
                    />
                )}
                {hasRoles(["admin"]) && (
                    <NavProjects
                        title="City Pages"
                        projects={data.City}
                    />
                )}

                {/* <NavProjects title="Pages" projects={data.Pages} /> */}
                {/* <NavProjects title="Other Pages" projects={data.Other} /> */}
            </SidebarContent>
            <SidebarFooter>
                <button
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            localStorage.removeItem("dn_user");
                            localStorage.removeItem("auth_token");
                            window.location.href = "/login";
                        }
                    }}
                    className="w-full bg-red-600 border flex text-white text-xl items-center justify-center font-semibold gap-2 rounded-md p-2 hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
