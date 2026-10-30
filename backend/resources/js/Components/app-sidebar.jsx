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
            url: "/",
            icon: Frame,
        },
        {
            title: "Meta Data",
            url: "/tags",
            icon: Frame,
        },
        {
            title: "Enquiries",
            url: "/enquiries",
            icon: Frame,
        },
        {
            title: "All Services",
            url: "/services",
            icon: PieChart,
        },
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
    SEO: [
        {
            title: "SEO Service",
            url: "/seo-services",
            icon: Frame,
        },
        {
            title: "SEO Highlights",
            url: "/seo-highlights",
            icon: Frame,
        },
        {
            title: "SEO Form",
            url: "/seo-forms",
            icon: Frame,
        },
        {
            title: "SEO Process",
            url: "/seo-processes",
            icon: Frame,
        },
        {
            title: "SEO Digital",
            url: "/seo-digital",
            icon: Frame,
        },
        {
            title: "SEO optimization",
            url: "/seo-optimization",
            icon: Frame,
        },
        {
            title: "SEO strategy",
            url: "/seo-strategy",
            icon: Frame,
        },
    ],
    Dev: [
        {
            title: "Dev Commerce",
            url: "/dev-commerce",
            icon: Frame,
        },
        {
            title: "Dev Cornerstone",
            url: "/dev-cornerstone",
            icon: Frame,
        },
        {
            title: "Dev Innovation",
            url: "/dev-innovation",
            icon: Frame,
        },
        {
            title: "Dev Maintain",
            url: "/dev-maintain",
            icon: Frame,
        },
        {
            title: "Dev Step",
            url: "/dev-step",
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
            url: "/hero-videos",
            icon: BookOpen,
        },
        {
            title: "About Section",
            url: "/home-about",
            icon: BookOpen,
        },
        {
            title: "Tools and Technologies",
            url: "/technologies",
            icon: Map,
        },
        {
            title: "FAQs",
            url: "/faqs",
            icon: BookOpen,
        },
        {
            title: "Vision-Mission",
            url: "/vision-mission",
            icon: BookOpen,
        },
        {
            title: "Our Creatives",
            url: "/creatives",
            icon: BookOpen,
        },
        {
            title: "Graphics Logo",
            url: "/graphics-logo",
            icon: BookOpen,
        },
    ],
    Google: [
        {
            title: "Google Campaigns",
            url: "/google-campaigns",
            icon: BookOpen,
        },
        {
            title: "Google Media",
            url: "/google-media",
            icon: BookOpen,
        },
        {
            title: "Google PPC",
            url: "/google-ppc",
            icon: BookOpen,
        },
    ],
    SMM: [
        {
            title: "Facebook",
            url: "/smm-facebook",
            icon: BookOpen,
        },
        {
            title: "SMM Benefits",
            url: "/smm-benefit",
            icon: BookOpen,
        },
        {
            title: "SMM Youtube",
            url: "/smm-youtube",
            icon: BookOpen,
        },
        {
            title: "SMM Services",
            url: "/social-service",
            icon: BookOpen,
        },
    ],
    City: [
        {
            title: "City Pages",
            url: "/cities",
            icon: Globe2,
        },
        {
            title: "Approach Sections",
            url: "/approaches",
            icon: ListChecks,
        },
        {
            title: "Strategic Approach",
            url: "/strategic-approaches",
            icon: Target,
        },
        {
            title: "Services",
            url: "/city-services",
            icon: Layers,
        },
        {
            title: "Pricing Section",
            url: "/pricing-sections",
            icon: Layers,
        },
        {
            title: "How We Work",
            url: "/how-we-works",
            icon: ListChecks,
        },
        {
            title: "Projects",
            url: "/city-projects",
            icon: FolderKanban,
        },
        {
            title: "Why Choose Us",
            url: "/why-choose-us",
            icon: ShieldCheck,
        },
        {
            title: "FAQs",
            url: "/city-faqs",
            icon: Layers,
        },
        {
            title: "Testimonials",
            url: "/city-testimonials",
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
                    // onClick={logout}
                    className="w-full bg-red-600 border flex text-white text-xl items-center justify-center font-semibold gap-2 rounded-md p-2 hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
