export interface ProjectType {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  category: 'Cinematography' | 'Commercial' | 'Music Video' | 'Web & Digital' | 'Documentary';
  client: string;
  year: string;
  duration?: string;
  aspectRatio?: string;
  cameraGear: string[];
  thumbnail: string;
  videoUrl: string; // YouTube, Vimeo or MP4
  description: string;
  synopsis: string;
  director: string;
  cinematographer: string;
  colorist?: string;
  techStack?: string[];
  featured: boolean;
  galleryImages: string[];
  awards?: string[];
  deliverables?: string[];
  createdAt?: string;
}

export interface TeamMemberType {
  id?: string;
  _id?: string;
  name: string;
  slug: string;
  role: string;
  titleTag: string; // e.g. "Director of Photography / Co-Founder"
  avatar: string;
  coverImage?: string;
  bio: string;
  quote: string;
  specialties: string[];
  primaryGear: string[]; // Cameras, Lenses, Tech
  filmography: {
    title: string;
    year: string;
    role: string;
    type: string;
  }[];
  socials: {
    instagram?: string;
    imdb?: string;
    vimeo?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
  featured: boolean;
  order: number;
}

export interface EstimatorServiceItem {
  id: string;
  label: string;
  base: number;
}

export interface EstimatorTimelineItem {
  id: string;
  label: string;
  mult: number;
}

export interface SiteSettingsType {
  id?: string;
  _id?: string;
  siteName: string;
  tagline: string;
  logoText: string;
  logoImageUrl?: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImageUrl: string;
  currencySymbol: string;
  currencyCode: string;
  contactHeading?: string;
  contactSubheading?: string;
  estimatorServices?: EstimatorServiceItem[];
  estimatorTimelines?: EstimatorTimelineItem[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialLinks: {
    instagram?: string;
    vimeo?: string;
    youtube?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  googleAnalyticsId?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsType = {
  siteName: 'Cine Head',
  tagline: 'Cinema & Code',
  logoText: 'CINEHEAD',
  logoImageUrl: '',
  faviconUrl: '/favicon.ico',
  metaTitle: 'Cine Head • High-End Cinematography & Creative Software Agency',
  metaDescription: 'Cine Head is a world-class cinematography and creative technology agency. Specializing in 8K anamorphic motion pictures, commercial films, and bespoke Next.js / WebGL software solutions.',
  metaKeywords: [
    'Cinematography Agency',
    '8K Video Production',
    'ARRI Alexa 35',
    'Commercial Filmmaking',
    'Music Video Production',
    'Dolby Vision Color Grading',
    'Creative Software Agency',
    'Next.js Web Development',
    'WebGL 3D Interactive Web'
  ],
  ogImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
  currencySymbol: '$',
  currencyCode: 'USD',
  contactHeading: "Let's Build Something Iconic",
  contactSubheading: 'Select your required production or software services to get an instant real-time estimate.',
  estimatorServices: [
    { id: 'cinematography', label: '8K Cinema & Commercials', base: 4500 },
    { id: 'web_dev', label: 'Next.js Web App / Creative Tech', base: 3500 },
    { id: 'color_grading', label: 'Dolby Vision Color Grading', base: 1800 },
    { id: 'music_video', label: 'Narrative & Music Videos', base: 4000 },
    { id: 'drone_aerial', label: 'Heavy-Lift 8K Aerial Drone', base: 2200 },
    { id: 'visual_effects', label: 'CGI & Anamorphic VFX', base: 3000 },
  ],
  estimatorTimelines: [
    { id: 'urgent', label: 'Rush (< 2 Weeks)', mult: 1.3 },
    { id: 'standard', label: 'Standard (1 - 2 Months)', mult: 1.0 },
    { id: 'flexible', label: 'Flexible (3+ Months)', mult: 0.95 },
  ],
  contactEmail: 'hello@cinehead.agency',
  contactPhone: '+880 1700-CINEHD',
  contactAddress: 'Gulshan-2 Cinema Hub, Dhaka & London Production Unit',
  socialLinks: {
    instagram: 'https://instagram.com',
    vimeo: 'https://vimeo.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://x.com',
  },
  googleAnalyticsId: '',
};

export interface ServiceType {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  tagline: string;
  icon: string;
  category: 'Cinematography' | 'Post-Production' | 'Digital & Web' | 'Creative Tech';
  description: string;
  features: string[];
  gearAndTech: string[];
  deliverables: string[];
  startingPrice?: string;
}

export interface InquiryType {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  details: string;
  status: 'new' | 'contacted' | 'proposal_sent' | 'archived';
  createdAt?: string;
}

export const INITIAL_PROJECTS: ProjectType[] = [
  {
    title: 'Neon Odyssey: Cyberpunk Nocturne',
    slug: 'neon-odyssey-cyberpunk-nocturne',
    category: 'Cinematography',
    client: 'Aura Motion Pictures',
    year: '2026',
    duration: '4m 18s',
    aspectRatio: '2.39:1 Anamorphic',
    cameraGear: ['ARRI Alexa 35', 'Atlas Orion Anamorphic 40mm/65mm', 'DJI Ronin 2 3-Axis Gimbal'],
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Can be replaced with actual showreel
    description: 'An atmospheric visual study exploring neon refractions, rain-slicked midnight avenues, and human emotion under high-contrast anamorphic glass.',
    synopsis: 'Shot across four rain-soaked nights in Tokyo and Seoul, Neon Odyssey blends tactile optical flares with ultra-clean 4K HDR grading to evoke an ethereal neo-noir reality.',
    director: 'Aryan Vance',
    cinematographer: 'Naim Rahman',
    colorist: 'Elena Rostova',
    featured: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop'
    ],
    awards: ['Best Cinematography - Tokyo Indie Shorts 2025', 'Official Selection - Camerimage 2025'],
    deliverables: ['4K DCI Master', 'Dolby Vision HDR Grade', 'Behind The Scenes Reel', 'Custom Web Experience']
  },
  {
    title: 'Vanguard Electric Hypercar: Launch Film',
    slug: 'vanguard-electric-hypercar',
    category: 'Commercial',
    client: 'Vanguard Automobili',
    year: '2026',
    duration: '1m 30s',
    aspectRatio: '16:9 / 9:16 Cross-Format',
    cameraGear: ['RED V-Raptor 8K VV', 'Cooke Anamorphic /i Full Frame Plus', 'Chase Car Russian Arm'],
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    description: 'High-speed kinetic cinematography capturing the aerodynamic contours and blistering acceleration of the Vanguard Apex GT electric hypercar in the Mojave desert.',
    synopsis: 'Engineered for maximum adrenaline, this commercial utilized high-speed 8K sensor capture at 120fps with precision gimbal tracking and seamless CGI integration.',
    director: 'Sofia Chen',
    cinematographer: 'Tariq Al-Mansoor',
    colorist: 'Aryan Vance',
    featured: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop'
    ],
    awards: ['Cannes Lions Bronze - Craft in Cinematography', 'Clio Awards 2025 Silver'],
    deliverables: ['Broadcast 4K TVC', '9:16 Social Cutdowns', 'Interactive 3D Web Showcase']
  },
  {
    title: 'Aura Interactive: Next-Gen Web Experience',
    slug: 'aura-interactive-next-gen-web',
    category: 'Web & Digital',
    client: 'Aura Spatial Systems',
    year: '2025',
    duration: 'Interactive App',
    aspectRatio: 'Fluid Responsive WebGL',
    cameraGear: ['Sony FX9', 'Virtual Production LED Wall', 'Unreal Engine 5.4'],
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    description: 'A bespoke 3D spatial web application and interactive portfolio designed with Next.js, Three.js, and real-time custom video shaders.',
    synopsis: 'Bridging the gap between cinema and code. Cine Head developed the entire visual identity, recorded native 6K HDR video backdrops, and developed a lightning-fast WebGL platform.',
    director: 'Naim Rahman',
    cinematographer: 'Zayn Mercer',
    techStack: ['Next.js 15', 'Three.js / WebGL', 'Tailwind CSS', 'Framer Motion', 'MongoDB'],
    featured: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop'
    ],
    awards: ['Awwwards Site of the Month', 'FWA of the Day - Aug 2025'],
    deliverables: ['Production Web App', 'Interactive 3D Configurator', 'Global CDN Setup']
  },
  {
    title: 'Silent Echoes: The Alpine Solitude',
    slug: 'silent-echoes-alpine-solitude',
    category: 'Documentary',
    client: 'Nordic Heritage Trust',
    year: '2025',
    duration: '22m 10s',
    aspectRatio: '2.00:1 Univisium',
    cameraGear: ['Sony FX6', 'Sony GM Master Primes 24mm/50mm/85mm', 'DJI Inspire 3 (8K Full Frame)'],
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=7WTmnX4uFjo',
    description: 'An intimate chronicle of alpine glacier researchers braving sub-zero arctic blizzards to record climate memory trapped inside 10,000-year-old ice cores.',
    synopsis: 'Filmed under extreme environmental conditions (-35°C), capturing natural light transitions and raw monolithic landscapes with drone photogrammetry.',
    director: 'Elena Rostova',
    cinematographer: 'Naim Rahman',
    featured: false,
    galleryImages: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1200&auto=format&fit=crop'
    ],
    awards: ['Sundance Film Festival 2025 - Official Selection'],
    deliverables: ['DCI 4K Cinema Package', 'Soundtrack Master 7.1 Surround']
  },
  {
    title: 'Echoes of Midnight: Official Music Video',
    slug: 'echoes-of-midnight-music-video',
    category: 'Music Video',
    client: 'Island Wave Records / Artist: KAIROS',
    year: '2026',
    duration: '3m 52s',
    aspectRatio: '2.39:1 Anamorphic',
    cameraGear: ['ARRI Mini LF', 'Master Anamorphic 35/50/75', 'Steadicam M-2'],
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    description: 'A psychedelic visual symphony of liquid light projections, kinetic continuous steadicam choreographies, and vibrant neon hues.',
    synopsis: 'A single continuous-take illusion moving through 5 distinct dreamscapes built on a soundstage with motorized LED softboxes and in-camera practical lens filtration.',
    director: 'Aryan Vance',
    cinematographer: 'Tariq Al-Mansoor',
    colorist: 'Elena Rostova',
    featured: true,
    galleryImages: [
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop'
    ],
    awards: ['MTV VMA Best Visual Effects / Cinematography Nominee'],
    deliverables: ['4K Master', 'Color Lookup Tables (LUTs)', 'Visualiser Pack']
  },
  {
    title: 'Synthetix Cloud: Enterprise SaaS Platform',
    slug: 'synthetix-cloud-saas-platform',
    category: 'Web & Digital',
    client: 'Synthetix AI Systems',
    year: '2026',
    duration: 'Full-Stack Software',
    aspectRatio: 'Responsive Desktop & Mobile App',
    cameraGear: ['Studio 4K Macro Lens', 'Custom 3D Product Renders'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    description: 'High-performance AI telemetry dashboard and cloud rendering portal built with Next.js, Node.js, and real-time WebSocket pipelines.',
    synopsis: 'Engineered by Cine Head’s software division for high-throughput video processing workflows, rendering farms, and creative agency asset collaboration.',
    director: 'Zayn Mercer',
    cinematographer: 'Naim Rahman',
    techStack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'AWS S3 / Cloudinary', 'Tailwind CSS'],
    featured: false,
    galleryImages: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop'
    ],
    deliverables: ['Scalable Web Application', 'REST & GraphQL APIs', 'Documentation & Design System']
  }
];

export const INITIAL_TEAM: TeamMemberType[] = [
  {
    name: 'Naim Rahman',
    slug: 'naim-rahman',
    role: 'Co-Founder & Director of Photography',
    titleTag: 'Lead DP & Creative Technologist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop',
    bio: 'With over a decade behind cinema viewfinders and terminal screens, Naim merges the precision of optical physics with cutting-edge software architecture. Having directed commercials and feature film cinematography across Europe, Asia, and North America, he specializes in high-contrast anamorphic visuals, drone heavy-lifters, and WebGL creative experiences.',
    quote: 'Cinema is light sculpted through glass, while code is pure thought turned into motion.',
    specialties: [
      'Anamorphic & Large Format Cinematography',
      'Virtual Production & LED Volumes',
      'High-Speed Tracking & Motion Control',
      'Fullstack Web Architecture (Next.js/Node/Cloud)'
    ],
    primaryGear: [
      'ARRI Alexa 35 & Alexa Mini LF',
      'Atlas Orion Anamorphic 2X Lens Set (32, 40, 65, 80, 100mm)',
      'RED V-Raptor 8K VV',
      'DJI Inspire 3 Cinema Drone with Zenmuse X9-8K Air',
      'Steadicam M-2 System with Volt Horizon Stabilization',
      'DaVinci Resolve Advanced Color Surface'
    ],
    filmography: [
      { title: 'Neon Odyssey', year: '2026', role: 'Director of Photography', type: 'Short Film' },
      { title: 'Vanguard Hypercar TVC', year: '2025', role: 'Cinematographer & Drone Op', type: 'Commercial' },
      { title: 'Silent Echoes', year: '2025', role: 'Cinematographer', type: 'Documentary' },
      { title: 'Aura Interactive Web', year: '2025', role: 'Lead Architect & Director', type: 'Digital Experience' }
    ],
    socials: {
      instagram: 'https://instagram.com',
      imdb: 'https://imdb.com',
      vimeo: 'https://vimeo.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'naim@cinehead.com'
    },
    featured: true,
    order: 1
  },
  {
    name: 'Aryan Vance',
    slug: 'aryan-vance',
    role: 'Creative Director & Film Director',
    titleTag: 'Commercial & Narrative Film Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
    bio: 'Aryan has helmed award-winning narrative pieces, commercial spots for Fortune 500 brands, and high-energy music videos. His visual signature combines meticulously choreographed movement with emotive character lighting.',
    quote: 'Every camera move must have a heartbeat and an emotional justification.',
    specialties: ['Narrative Directing', 'Action Choreography', 'Brand Storytelling', 'Cinematic Scripting'],
    primaryGear: [
      'Sony FX9 / FX6 Multi-Cam Package',
      'Cooke S4/i Prime Lenses',
      'Teradek Bolt 4K Zero-Delay Wireless System',
      'SmallHD Cine 13 Production Monitor'
    ],
    filmography: [
      { title: 'Echoes of Midnight', year: '2026', role: 'Director', type: 'Music Video' },
      { title: 'Midnight Drift TVC', year: '2025', role: 'Director', type: 'Commercial' },
      { title: 'The Solitary Path', year: '2024', role: 'Writer & Director', type: 'Feature Film' }
    ],
    socials: {
      instagram: 'https://instagram.com',
      vimeo: 'https://vimeo.com',
      linkedin: 'https://linkedin.com',
      email: 'aryan@cinehead.com'
    },
    featured: true,
    order: 2
  },
  {
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    role: 'Head of Color & Post-Production',
    titleTag: 'Senior Colorist & DIT Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop',
    bio: 'A master of tone and color psychology, Elena calibrated over 80 commercials and 12 feature films. Trained in Dolby Vision HDR and ACES workflows, she shapes the distinctive film-emulsion texture of Cine Head productions.',
    quote: 'Color grading isn’t just aesthetic; it’s the subconscious emotional anchor of the film.',
    specialties: ['Dolby Vision & HDR10+ Grading', 'Custom Film LUT Development', 'Color Science & ACES Workflows', 'Film Grain Simulation'],
    primaryGear: [
      'Sony BVM-HX310 4K HDR Reference Master Monitor',
      'DaVinci Resolve Studio Advanced Panel',
      'Custom Threadripper PRO 64-Core Color Station with Quad RTX 4090',
      'Tangent Element Panels'
    ],
    filmography: [
      { title: 'Neon Odyssey', year: '2026', role: 'Lead Colorist', type: 'Short Film' },
      { title: 'Vanguard Launch Film', year: '2025', role: 'Senior Colorist', type: 'Commercial' },
      { title: 'Echoes of Midnight', year: '2026', role: 'Colorist', type: 'Music Video' }
    ],
    socials: {
      instagram: 'https://instagram.com',
      vimeo: 'https://vimeo.com',
      email: 'elena@cinehead.com'
    },
    featured: true,
    order: 3
  },
  {
    name: 'Zayn Mercer',
    slug: 'zayn-mercer',
    role: 'Lead Software Engineer & Creative Coder',
    titleTag: 'Full-Stack Developer & Three.js Specialist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
    bio: 'Zayn bridges the worlds of high-end cinematic media and modern web engineering. He builds immersive 3D web experiences, bespoke streaming portals, and agency software solutions that load in milliseconds.',
    quote: 'Performance is our visual aesthetic on the web.',
    specialties: ['Next.js / React / TypeScript', 'Three.js & WebGL Shaders', 'Node.js & MongoDB Architecture', 'High-Performance Video Streaming'],
    primaryGear: [
      'Mac Studio M2 Ultra 128GB',
      'Custom WebGL Shader Pipelines',
      'Cloudflare Enterprise Edge Network',
      'Docker / Kubernetes Cluster'
    ],
    filmography: [
      { title: 'Aura Interactive WebGL', year: '2025', role: 'Lead Creative Developer', type: 'Web App' },
      { title: 'Synthetix Cloud Portal', year: '2026', role: 'Full-Stack Architect', type: 'SaaS Software' }
    ],
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'zayn@cinehead.com'
    },
    featured: true,
    order: 4
  }
];

export const INITIAL_SERVICES: ServiceType[] = [
  {
    title: 'High-End Cinematography & Direction',
    slug: 'cinematography-direction',
    tagline: 'World-class 8K & Anamorphic motion picture capture for cinema and global brands.',
    icon: 'Camera',
    category: 'Cinematography',
    description: 'Complete visual production from initial treatment to principal photography. We field industry-standard ARRI, RED, and Sony cinema packages with bespoke lighting design and precision camera movement.',
    features: [
      'ARRI Alexa 35 & RED V-Raptor 8K packages',
      'Anamorphic & Vintage spherical cinema lenses',
      'Steadicam, Gimbal, and Heavy-lift Drone teams',
      'Virtual Production & LED Volume integration',
      'Full Camera Crew: DP, Gaffer, Key Grip, ACs'
    ],
    gearAndTech: ['ARRI Alexa 35', 'Cooke / Atlas Anamorphic', 'Inspire 3 8K Drone', 'Aputure & ARRI Skypanels'],
    deliverables: ['Raw Cinema DNG / ProRes 4444XQ masters', 'On-set DIT daily proxy pipeline', 'Stills & Behind-the-scenes photography'],
    startingPrice: '$4,500 / day'
  },
  {
    title: 'Commercials & Brand Storytelling',
    slug: 'commercials-brand-storytelling',
    tagline: 'High-conversion, cinematic commercial spots engineered to captivate audiences.',
    icon: 'Film',
    category: 'Cinematography',
    description: 'We help brands break through digital noise with visual stories that stir genuine human resonance. From 15-second social disruptors to 2-minute cinematic brand manifestos.',
    features: [
      'Creative concept & treatment development',
      'Storyboarding & pre-visualization',
      'Location scouting & casting management',
      'Cross-platform delivery (16:9, 9:16, 4:5, 1:1)'
    ],
    gearAndTech: ['Cinema Motion Control Bolt Arm', 'High-Speed Phantom Flex 4K', 'Teradek Live Client Streaming'],
    deliverables: ['Hero 4K Commercial Master', 'Social Media cutdowns with dynamic subtitles', 'Clean textless international versions'],
    startingPrice: '$8,000 / project'
  },
  {
    title: 'Post-Production, Color & VFX',
    slug: 'post-production-color-vfx',
    tagline: 'Precision color grading in Dolby Vision HDR and seamless visual effects.',
    icon: 'Sparkles',
    category: 'Post-Production',
    description: 'Elevate your footage into high-art cinema. Our calibrated color suites deliver certified Dolby Vision and ACES workflows, complemented by CGI cleanup and sound mastering.',
    features: [
      'DaVinci Resolve Studio color grading',
      'Dolby Vision & HDR10 mastering',
      'Film grain modeling & custom LUT creation',
      '2D/3D VFX compositing & screen replacements',
      'Dolby Atmos 7.1.4 sound design & mixing'
    ],
    gearAndTech: ['Sony BVM-HX310 Reference Monitors', 'DaVinci Resolve Advanced Panel', 'Pro Tools Ultimate Suite'],
    deliverables: ['ProRes Master', 'DCP Cinema Package', 'Custom Film LUT file for client library'],
    startingPrice: '$1,800 / project'
  },
  {
    title: 'Bespoke Web & Creative Software',
    slug: 'web-creative-software',
    tagline: 'Ultra-modern Next.js web applications and digital experiences for visionary brands.',
    icon: 'Code2',
    category: 'Digital & Web',
    description: 'We don’t build generic templates. Our software engineering wing crafts lightning-fast web applications, interactive 3D WebGL experiences, and custom video platforms designed to outrank competitors.',
    features: [
      'Next.js 15 & React Fullstack Engineering',
      'Tailwind CSS & Apple-style Glassmorphic UI/UX',
      'Three.js & WebGL Interactive 3D graphics',
      'MongoDB & Cloud API integrations',
      'Advanced SEO optimization & 99+ Lighthouse performance'
    ],
    gearAndTech: ['Next.js App Router', 'Tailwind CSS', 'WebGL / Three.js', 'MongoDB', 'Cloudinary Video Edge'],
    deliverables: ['Production Ready Source Code', 'Automated CI/CD Deployment', 'Admin CMS Dashboard', 'SEO & Performance Audit'],
    startingPrice: '$3,500 / project'
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    quote: 'Cine Head transformed our vehicle launch into pure cinematic poetry. The 8K desert footage and the accompanying interactive web platform blew our global stakeholders away.',
    clientName: 'Marcus Lindqvist',
    clientRole: 'Head of Marketing, Vanguard Automobili',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
  },
  {
    quote: 'Finding an agency that masters both Hollywood-grade anamorphic lighting and cutting-edge Next.js web development under one roof is virtually impossible. Cine Head is in a league of their own.',
    clientName: 'Sarah Jenkins',
    clientRole: 'Creative Director, Aura Spatial Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    quote: 'Their attention to detail—from the on-set lens choice to the millisecond-fast interactive portal—made our music video rollout a massive viral success with over 15M views.',
    clientName: 'Julian Thorne',
    clientRole: 'A&R Director, Island Wave Records',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
  }
];
