"""Static portfolio content served via API.

Keep personal/resume information here so the React frontend can stay UI-focused.
If you later build an admin dashboard, you can migrate these to database tables.
"""

PROFILE = {
    "fullName": "Mashfiq Naushad",
    "imageUrl": "/dp.jpg",
    # Google Drive (direct download)
    # Original share link:
    # https://drive.google.com/file/d/1BgsHSYjj6_TcxxPaHzKc6AOH10z_EJc1/view?usp=sharing
    "cvUrl": "https://drive.google.com/uc?export=download&id=1BgsHSYjj6_TcxxPaHzKc6AOH10z_EJc1",
    "email": "mashfiq.cse.ruet@gmail.com",
    "phone": "+880 1410 056159",
    "location": "Surma R/A, Sylhet, Bangladesh",
    "headline": "AI/ML Enthusiast • MLOps Expert • Full‑Stack Developer",
    "about": (
        "I build intelligent, scalable, and user‑centric AI/ML solutions with an MLOps mindset—clean data, reliable "
        "pipelines, measurable outcomes, and deployments that stay stable when they meet real users. "
        "Blending AI/ML, full‑stack development, and cloud tools, I can ship the model, the API, and the UI as one "
        "cohesive product. I’m experienced in prompt engineering, Git & GitHub, motion UI, responsive design, and "
        "accessibility—so the work is not only accurate, but also usable and polished. "
        "Beyond building, I stay active in leadership and event management: mentoring juniors, organizing workshops, "
        "and contributing to cultural and adventure initiatives—strengthening teamwork, strategic planning, and "
        "communication. I’m always looking for opportunities to apply technical depth to real‑world challenges and "
        "deliver practical, innovative solutions."
    ),
    "links": {
        "linkedin": "https://www.linkedin.com/",
        "facebook": "https://www.facebook.com/",
        "portfolio": "#"
    }
}

EXPERIENCE = [
    {
        "company": "BRITTOO.XYZ",
        "role": "AI/ML (NLP) & MLOps",
        "start": "Sept 2025",
        "end": "Present",
        "highlights": [
            "Developed NLP pipelines and LLM-based solutions to facilitate campus rental services.",
            "Implemented text classification, entity recognition, and semantic search.",
            "Built a chatbot to support easier negotiation and improved user experience."
        ]
    }
]

EDUCATION = [
    {
        "degree": "Bachelor of Engineering",
        "major": "Computer Science & Engineering",
        "institution": "Rajshahi University of Engineering & Technology (RUET)"
    },
    {
        "degree": "Higher Secondary Certificate (HSC)",
        "major": "",
        "institution": "Jalalabad Cantonment Public School & College, Sylhet"
    }
]

CERTIFICATIONS = [
    {
        "title": "Introduction to LLMs",
        "issuer": "Google Cloud",
        "type": "AI / Cloud / Large Language Models",
        "keywords": ["LLMs", "Generative AI", "Google Cloud", "AI foundations"],
    },
    {
        "title": "LangChain Course for Beginners",
        "issuer": "Simplilearn",
        "type": "LLM Application Development",
        "keywords": ["LangChain", "AI agents", "Prompt chaining", "LLM apps"],
    },
    {
        "title": "LLMOps for Beginners",
        "issuer": "Simplilearn",
        "type": "AI Operations / MLOps",
        "keywords": ["LLMOps", "MLOps", "Model deployment", "AI lifecycle"],
    },
    {
        "title": "Structuring Machine Learning Projects",
        "issuer": "DeepLearning.AI (Andrew Ng)",
        "type": "Machine Learning Strategy",
        "keywords": ["ML strategy", "Project design", "Model evaluation"],
    },
    {
        "title": "Machine Learning using Python",
        "issuer": "Simplilearn",
        "type": "Core Machine Learning",
        "keywords": ["Python", "Machine Learning", "Scikit-learn", "Data analysis"],
    },
    {
        "title": "AI+ Prompt Engineer Level 1™",
        "issuer": "AI CERTs™",
        "type": "Prompt Engineering",
        "keywords": ["Prompt Engineering", "Generative AI", "LLM interaction"],
    },
    {
        "title": "Craft Effective Prompts for Microsoft 365 Copilot",
        "issuer": "Microsoft",
        "type": "Enterprise AI / Productivity AI",
        "keywords": ["Microsoft Copilot", "AI productivity", "Prompt design"],
    },
    {
        "title": "Master Git & GitHub - Beginner to Expert",
        "issuer": "Udemy",
        "type": "Version Control / Software Engineering",
        "keywords": ["Git", "GitHub", "Version control", "Collaboration"],
    },
    {
        "title": "Digital Accessibility Training (DAT)",
        "issuer": "UNDP, ICT Division, Govt. of Bangladesh, a2i",
        "type": "Accessibility / Inclusive Design",
        "keywords": ["Accessibility", "WCAG", "Inclusive design", "UX"],
    }
]

ACTIVITIES = [
    {
        "role": "Technical Executive",
        "organization": "RCS - RUET Computing Society"
    },
    {
        "role": "Program Secretary",
        "organization": "RUET | Onuronon Cultural Club"
    },
    {
        "role": "Workshop Secretary",
        "organization": "Ovijatrik - RUET Adventure Club"
    },
    {
        "role": "Planning Secretary",
        "organization": "SDAR - Sylhet Divisional Association, RUET"
    }
]
