from app import create_app
from models import db, Project, Skill


def seed():
    app = create_app()
    with app.app_context():
        db.drop_all()
        db.create_all()

        projects = [
            Project(
                title='EDUPREDICT - AI Performance Analysis Platform',
                description=(
                    'Built an end-to-end predictive system using Django and React to classify student risk levels '
                    'via XGBoost. Features include role-based access control, automated PDF reporting, and '
                    'interactive analytics to improve early intervention strategies.'
                ),
                image='/projects/edupredict.svg',
                link='https://github.com/your-username/edupredict',
                technologies=['Django', 'React', 'XGBoost', 'PDF Reporting', 'RBAC']
            ),
            Project(
                title='Smart Rural Health Assistant',
                description=(
                    'Full-stack, bilingual AI health diagnostic tool using FastAPI, Streamlit, and Scikit-learn '
                    'to provide disease prediction and severity triage for underserved rural populations. '
                    'Included TF-IDF classifiers for 20+ diseases and a rule-based critical triage engine.'
                ),
                image='/projects/rural-health.svg',
                link='https://github.com/your-username/smart-rural-health-assistant',
                technologies=['Python', 'FastAPI', 'Streamlit', 'Scikit-learn', 'NLP', 'TF-IDF']
            ),
            Project(
                title='ClickUpProject - Portfolio Website',
                description=(
                    'A modern full-stack portfolio website with a React frontend and a Flask backend API. '
                    'Includes projects, skills, and a contact form backed by SQLite.'
                ),
                image='/projects/clickupproject.svg',
                link='https://github.com/your-username/clickupproject',
                technologies=['React', 'Flask', 'SQLAlchemy', 'SQLite', 'REST API']
            ),

            # Placeholder projects (in progress)
            Project(
                title='In Progress: Project 01',
                description='Currently in development. Details, demo, and write-up coming soon.',
                image='/projects/coming-soon.svg',
                link=None,
                technologies=['In Progress']
            ),
            Project(
                title='In Progress: Project 02',
                description='Currently in development. Details, demo, and write-up coming soon.',
                image='/projects/coming-soon.svg',
                link=None,
                technologies=['In Progress']
            ),
            Project(
                title='In Progress: Project 03',
                description='Currently in development. Details, demo, and write-up coming soon.',
                image='/projects/coming-soon.svg',
                link=None,
                technologies=['In Progress']
            ),
            Project(
                title='In Progress: Project 04',
                description='Currently in development. Details, demo, and write-up coming soon.',
                image='/projects/coming-soon.svg',
                link=None,
                technologies=['In Progress']
            ),
            Project(
                title='In Progress: Project 05',
                description='Currently in development. Details, demo, and write-up coming soon.',
                image='/projects/coming-soon.svg',
                link=None,
                technologies=['In Progress']
            ),
            Project(
                title='In Progress: Project 06',
                description='Currently in development. Details, demo, and write-up coming soon.',
                image='/projects/coming-soon.svg',
                link=None,
                technologies=['In Progress']
            ),
        ]

        skills = [
            # Core
            Skill(category='Languages', name='Python', level='Advanced'),
            Skill(category='Languages', name='C', level='Intermediate'),
            Skill(category='Languages', name='C++', level='Intermediate'),
            Skill(category='Languages', name='Java', level='Intermediate'),
            Skill(category='Web', name='HTML', level='Intermediate'),
            Skill(category='Web', name='CSS', level='Intermediate'),
            Skill(category='Web', name='JavaScript', level='Intermediate'),
            Skill(category='Web', name='Node.js', level='Intermediate'),

            # AI / ML
            Skill(category='AI/ML', name='Machine Learning', level='Intermediate'),
            Skill(category='AI/ML', name='Deep Learning', level='Intermediate'),
            Skill(category='AI/ML', name='Reinforcement Learning', level='Intermediate'),
            Skill(category='AI/ML', name='Computer Vision', level='Intermediate'),
            Skill(category='AI/ML', name='NLP', level='Intermediate'),
            Skill(category='AI/ML', name='LLMs', level='Intermediate'),
            Skill(category='AI/ML', name='Prompt Engineering', level='Intermediate'),

            # Libraries
            Skill(category='Libraries', name='OpenCV', level='Intermediate'),
            Skill(category='Libraries', name='HuggingFace', level='Intermediate'),
            Skill(category='Libraries', name='TensorFlow', level='Intermediate'),

            # Data / DB
            Skill(category='Databases', name='MySQL', level='Intermediate'),
            Skill(category='Databases', name='MongoDB', level='Intermediate'),
            Skill(category='Databases', name='PostgreSQL', level='Intermediate'),

            # Tools
            Skill(category='Tools', name='Git/GitHub', level='Advanced'),
            Skill(category='Tools', name='Kaggle', level='Intermediate'),
            Skill(category='Tools', name='Jupyter Notebook', level='Advanced'),
            Skill(category='Tools', name='VS Code', level='Advanced'),
            Skill(category='Hardware', name='Arduino', level='Intermediate'),
        ]

        db.session.add_all(projects)
        db.session.add_all(skills)
        db.session.commit()

        print('Seed complete.')


if __name__ == '__main__':
    seed()
