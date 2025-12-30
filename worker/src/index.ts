import { createClient } from '@supabase/supabase-js';

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  CORS_ORIGINS?: string;
  ADMIN_TOKEN?: string;
}

// ---- Static portfolio content (ported from backend/content.py) ----
const PROFILE: Record<string, Json> = {
  fullName: 'Mashfiq Naushad',
  imageUrl: '/dp.jpg',
  cvUrl: 'https://drive.google.com/uc?export=download&id=1BgsHSYjj6_TcxxPaHzKc6AOH10z_EJc1',
  email: 'mashfiq.cse.ruet@gmail.com',
  phone: '+880 1410 056159',
  location: 'Surma R/A, Sylhet, Bangladesh',
  headline: 'AI/ML Enthusiast • MLOps Expert • Full‑Stack Developer',
  about:
    'I build intelligent, scalable, and user‑centric AI/ML solutions with an MLOps mindset—clean data, reliable ' +
    'pipelines, measurable outcomes, and deployments that stay stable when they meet real users. ' +
    'Blending AI/ML, full‑stack development, and cloud tools, I can ship the model, the API, and the UI as one ' +
    'cohesive product. I’m experienced in prompt engineering, Git & GitHub, motion UI, responsive design, and ' +
    'accessibility—so the work is not only accurate, but also usable and polished. ' +
    'Beyond building, I stay active in leadership and event management: mentoring juniors, organizing workshops, ' +
    'and contributing to cultural and adventure initiatives—strengthening teamwork, strategic planning, and ' +
    'communication. I’m always looking for opportunities to apply technical depth to real‑world challenges and ' +
    'deliver practical, innovative solutions.',
  links: {
    linkedin: 'https://www.linkedin.com/in/mashfiqnaushad/',
    facebook: 'https://www.facebook.com/imashfiqnaushadd',
    instagram: 'https://www.instagram.com/__maashfiiiiq__/',
    twitter: 'https://x.com/_maashfiiiiq_'
  }
};

const EXPERIENCE: Json = [
  {
    company: 'BRITTOO.XYZ',
    role: 'AI/ML (NLP) & MLOps',
    start: 'Sept 2025',
    end: 'Present',
    highlights: [
      'Developed NLP pipelines and LLM-based solutions to facilitate campus rental services.',
      'Implemented text classification, entity recognition, and semantic search.',
      'Built a chatbot to support easier negotiation and improved user experience.'
    ]
  }
];

const EDUCATION: Json = [
  {
    degree: 'Bachelor of Engineering',
    major: 'Computer Science & Engineering',
    institution: 'Rajshahi University of Engineering & Technology (RUET)'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    major: '',
    institution: 'Jalalabad Cantonment Public School & College, Sylhet'
  }
];

const CERTIFICATIONS: Json = [
  {
    title: 'Introduction to LLMs',
    issuer: 'Google Cloud',
    type: 'AI / Cloud / Large Language Models',
    keywords: ['LLMs', 'Generative AI', 'Google Cloud', 'AI foundations'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'LangChain Course for Beginners',
    issuer: 'Simplilearn',
    type: 'LLM Application Development',
    keywords: ['LangChain', 'AI agents', 'Prompt chaining', 'LLM apps'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'LLMOps for Beginners',
    issuer: 'Simplilearn',
    type: 'AI Operations / MLOps',
    keywords: ['LLMOps', 'MLOps', 'Model deployment', 'AI lifecycle'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'Structuring Machine Learning Projects',
    issuer: 'DeepLearning.AI (Andrew Ng)',
    type: 'Machine Learning Strategy',
    keywords: ['ML strategy', 'Project design', 'Model evaluation'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'Machine Learning using Python',
    issuer: 'Simplilearn',
    type: 'Core Machine Learning',
    keywords: ['Python', 'Machine Learning', 'Scikit-learn', 'Data analysis'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'AI+ Prompt Engineer Level 1™',
    issuer: 'AI CERTs™',
    type: 'Prompt Engineering',
    keywords: ['Prompt Engineering', 'Generative AI', 'LLM interaction'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'Craft Effective Prompts for Microsoft 365 Copilot',
    issuer: 'Microsoft',
    type: 'Enterprise AI / Productivity AI',
    keywords: ['Microsoft Copilot', 'AI productivity', 'Prompt design'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'Master Git & GitHub - Beginner to Expert',
    issuer: 'Udemy',
    type: 'Version Control / Software Engineering',
    keywords: ['Git', 'GitHub', 'Version control', 'Collaboration'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  },
  {
    title: 'Digital Accessibility Training (DAT)',
    issuer: 'UNDP, ICT Division, Govt. of Bangladesh, a2i',
    type: 'Accessibility / Inclusive Design',
    keywords: ['Accessibility', 'WCAG', 'Inclusive design', 'UX'],
    url: 'https://drive.google.com/drive/folders/1gXoceCFZ0oj5LIeiIymW1bJ5Xhoo7BSJ'
  }
];

const ACTIVITIES: Json = [
  {
    role: 'Technical Executive',
    organization: 'RCS - RUET Computing Society',
    url: 'https://www.facebook.com/ruetcs'
  },
  {
    role: 'Program Secretary',
    organization: 'RUET | Onuronon Cultural Club',
    url: 'https://www.facebook.com/search/top?q=onuronon%20-%20ruet%20cultural%20club'
  },
  {
    role: 'Workshop Secretary',
    organization: 'Ovijatrik - RUET Adventure Club',
    url: 'https://www.facebook.com/profile.php?id=61555982677745'
  },
  {
    role: 'Planning Secretary',
    organization: 'SDAR - Sylhet Divisional Association, RUET',
    url: 'https://www.facebook.com/profile.php?id=61560067080855'
  }
];

function parseCorsOrigins(raw: string | undefined): string[] {
  const trimmed = (raw ?? '').trim();
  if (!trimmed) return ['*'];
  return trimmed
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function getAllowedCorsOrigin(req: Request, env: Env): string | null {
  const allow = parseCorsOrigins(env.CORS_ORIGINS);
  if (allow.includes('*')) return '*';

  const origin = (req.headers.get('Origin') ?? '').trim();
  if (!origin) {
    // Non-browser clients typically won't send Origin; pick a deterministic value.
    return allow[0] ?? null;
  }

  return allow.includes(origin) ? origin : null;
}

function corsHeaders(origin: string | null): HeadersInit {
  if (!origin) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

function jsonResponse(req: Request, env: Env, body: unknown, status = 200): Response {
  const origin = getAllowedCorsOrigin(req, env);
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin)
    }
  });
}

function errorResponse(req: Request, env: Env, status: number, message: string, details?: unknown): Response {
  return jsonResponse(req, env, { error: message, details }, status);
}

function requireAdminToken(req: Request, env: Env): Response | null {
  const required = (env.ADMIN_TOKEN ?? '').trim();
  if (!required) return null; // not enabled

  const provided = (req.headers.get('X-Admin-Token') ?? '').trim();
  if (!provided || provided !== required) {
    return errorResponse(req, env, 401, 'Unauthorized');
  }
  return null;
}

function getSupabase(env: Env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
    global: {
      headers: {
        'X-Client-Info': 'clickupproject-api-worker'
      }
    }
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // CORS preflight
    if (req.method === 'OPTIONS') {
      const origin = getAllowedCorsOrigin(req, env);
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (!url.pathname.startsWith('/api/')) {
      return errorResponse(req, env, 404, 'Not found');
    }

    try {
      // ---- Health ----
      if (req.method === 'GET' && url.pathname === '/api/health') {
        return jsonResponse(req, env, { status: 'ok' }, 200);
      }

      // ---- Static content ----
      if (req.method === 'GET' && url.pathname === '/api/profile') return jsonResponse(req, env, PROFILE);
      if (req.method === 'GET' && url.pathname === '/api/experience') return jsonResponse(req, env, EXPERIENCE);
      if (req.method === 'GET' && url.pathname === '/api/education') return jsonResponse(req, env, EDUCATION);
      if (req.method === 'GET' && url.pathname === '/api/certifications') return jsonResponse(req, env, CERTIFICATIONS);
      if (req.method === 'GET' && url.pathname === '/api/activities') return jsonResponse(req, env, ACTIVITIES);

      const supabase = getSupabase(env);

      // ---- Projects ----
      if (url.pathname === '/api/projects' && req.method === 'GET') {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) return errorResponse(req, env, 500, 'Failed to fetch projects', error);
        return jsonResponse(req, env, data ?? [], 200);
      }

      if (url.pathname === '/api/projects' && req.method === 'POST') {
        const auth = requireAdminToken(req, env);
        if (auth) return auth;

        const payload = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const title = typeof payload.title === 'string' ? payload.title.trim() : '';
        const description = typeof payload.description === 'string' ? payload.description.trim() : '';

        if (!title || !description) {
          return errorResponse(req, env, 400, 'title and description are required');
        }

        const technologies = Array.isArray(payload.technologies)
          ? payload.technologies.filter((x) => typeof x === 'string')
          : [];

        const insertRow = {
          title,
          description,
          image: typeof payload.image === 'string' ? payload.image : null,
          link: typeof payload.link === 'string' ? payload.link : null,
          technologies
        };

        const { data, error } = await supabase.from('projects').insert(insertRow).select('*').single();
        if (error) {
          // Unique violation etc.
          const code = (error as unknown as { code?: string }).code;
          if (code === '23505') return errorResponse(req, env, 409, 'Project title already exists');
          return errorResponse(req, env, 500, 'Failed to create project', error);
        }

        return jsonResponse(req, env, data, 201);
      }

      // ---- Skills ----
      if (url.pathname === '/api/skills' && req.method === 'GET') {
        const { data, error } = await supabase.from('skills').select('*');
        if (error) return errorResponse(req, env, 500, 'Failed to fetch skills', error);

        const grouped = new Map<string, { category: string; items: unknown[] }>();
        for (const row of data ?? []) {
          const category = typeof (row as any).category === 'string' ? (row as any).category : 'Other';
          if (!grouped.has(category)) grouped.set(category, { category, items: [] });
          grouped.get(category)!.items.push(row);
        }

        return jsonResponse(req, env, Array.from(grouped.values()), 200);
      }

      if (url.pathname === '/api/skills' && req.method === 'POST') {
        const auth = requireAdminToken(req, env);
        if (auth) return auth;

        const payload = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const category = typeof payload.category === 'string' ? payload.category.trim() : '';
        const name = typeof payload.name === 'string' ? payload.name.trim() : '';

        if (!category || !name) {
          return errorResponse(req, env, 400, 'category and name are required');
        }

        const level = typeof payload.level === 'string' && payload.level.trim() ? payload.level.trim() : 'Intermediate';

        const { data, error } = await supabase
          .from('skills')
          .insert({ category, name, level })
          .select('*')
          .single();

        if (error) return errorResponse(req, env, 500, 'Failed to create skill', error);
        return jsonResponse(req, env, data, 201);
      }

      // ---- Contact ----
      if (url.pathname === '/api/contact' && req.method === 'POST') {
        const payload = (await req.json().catch(() => ({}))) as Record<string, unknown>;
        const name = typeof payload.name === 'string' ? payload.name.trim() : '';
        const email = typeof payload.email === 'string' ? payload.email.trim() : '';
        const message = typeof payload.message === 'string' ? payload.message.trim() : '';

        if (!name || !email || !message) {
          return errorResponse(req, env, 400, 'name, email, message are required');
        }

        const { data, error } = await supabase
          .from('contacts')
          .insert({ name, email, message })
          .select('*')
          .single();

        if (error) return errorResponse(req, env, 500, 'Failed to create contact message', error);

        return jsonResponse(
          req,
          env,
          {
            ...data,
            emailDelivery: {
              sent: false,
              skipped: true,
              reason: 'Email delivery is not configured for the Worker. Message saved to database.'
            }
          },
          201
        );
      }

      return errorResponse(req, env, 404, 'Not found');
    } catch (err) {
      return errorResponse(req, env, 500, 'Internal error', (err as Error)?.message ?? String(err));
    }
  }
};
