-- Seed data for ClickUpProject
-- Run this AFTER schema.sql.

-- Projects
insert into public.projects (title, description, image, link, technologies)
values
(
  'EDUPREDICT - AI Performance Analysis Platform',
  'Built an end-to-end predictive system using Django and React to classify student risk levels via XGBoost. Features include role-based access control, automated PDF reporting, and interactive analytics to improve early intervention strategies.',
  '/projects/edupredict.svg',
  'https://github.com/your-username/edupredict',
  '["Django","React","XGBoost","PDF Reporting","RBAC"]'::jsonb
),
(
  'Smart Rural Health Assistant',
  'Full-stack, bilingual AI health diagnostic tool using FastAPI, Streamlit, and Scikit-learn to provide disease prediction and severity triage for underserved rural populations. Included TF-IDF classifiers for 20+ diseases and a rule-based critical triage engine.',
  '/projects/rural-health.svg',
  'https://github.com/your-username/smart-rural-health-assistant',
  '["Python","FastAPI","Streamlit","Scikit-learn","NLP","TF-IDF"]'::jsonb
),
(
  'ClickUpProject - Portfolio Website',
  'A modern full-stack portfolio website with a React frontend and a Flask backend API. Includes projects, skills, and a contact form backed by SQLite.',
  '/projects/clickupproject.svg',
  'https://github.com/your-username/clickupproject',
  '["React","Flask","SQLAlchemy","SQLite","REST API"]'::jsonb
),
(
  'In Progress: Project 01',
  'Currently in development. Details, demo, and write-up coming soon.',
  '/projects/coming-soon.svg',
  null,
  '["In Progress"]'::jsonb
),
(
  'In Progress: Project 02',
  'Currently in development. Details, demo, and write-up coming soon.',
  '/projects/coming-soon.svg',
  null,
  '["In Progress"]'::jsonb
),
(
  'In Progress: Project 03',
  'Currently in development. Details, demo, and write-up coming soon.',
  '/projects/coming-soon.svg',
  null,
  '["In Progress"]'::jsonb
),
(
  'In Progress: Project 04',
  'Currently in development. Details, demo, and write-up coming soon.',
  '/projects/coming-soon.svg',
  null,
  '["In Progress"]'::jsonb
),
(
  'In Progress: Project 05',
  'Currently in development. Details, demo, and write-up coming soon.',
  '/projects/coming-soon.svg',
  null,
  '["In Progress"]'::jsonb
),
(
  'In Progress: Project 06',
  'Currently in development. Details, demo, and write-up coming soon.',
  '/projects/coming-soon.svg',
  null,
  '["In Progress"]'::jsonb
)
on conflict (title) do nothing;

-- Skills
insert into public.skills (category, name, level)
values
('Languages','Python','Advanced'),
('Languages','C','Intermediate'),
('Languages','C++','Intermediate'),
('Languages','Java','Intermediate'),
('Web','HTML','Intermediate'),
('Web','CSS','Intermediate'),
('Web','JavaScript','Intermediate'),
('Web','Node.js','Intermediate'),
('AI/ML','Machine Learning','Intermediate'),
('AI/ML','Deep Learning','Intermediate'),
('AI/ML','Reinforcement Learning','Intermediate'),
('AI/ML','Computer Vision','Intermediate'),
('AI/ML','NLP','Intermediate'),
('AI/ML','LLMs','Intermediate'),
('AI/ML','Prompt Engineering','Intermediate'),
('Libraries','OpenCV','Intermediate'),
('Libraries','HuggingFace','Intermediate'),
('Libraries','TensorFlow','Intermediate'),
('Databases','MySQL','Intermediate'),
('Databases','MongoDB','Intermediate'),
('Databases','PostgreSQL','Intermediate'),
('Tools','Git/GitHub','Advanced'),
('Tools','Kaggle','Intermediate'),
('Tools','Jupyter Notebook','Advanced'),
('Tools','VS Code','Advanced'),
('Hardware','Arduino','Intermediate')
on conflict do nothing;
