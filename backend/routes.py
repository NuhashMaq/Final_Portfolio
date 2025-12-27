import smtplib
import ssl
from email.message import EmailMessage

from flask import Blueprint, jsonify, request, current_app
from models import db, Project, Skill, Contact
from content import PROFILE, EXPERIENCE, EDUCATION, CERTIFICATIONS, ACTIVITIES

api = Blueprint('api', __name__, url_prefix='/api')

@api.get('/health')
def health():
    return jsonify({'status': 'ok'}), 200


# ---- Profile / Resume Content ----

@api.get('/profile')
def get_profile():
    return jsonify(PROFILE), 200


@api.get('/experience')
def get_experience():
    return jsonify(EXPERIENCE), 200


@api.get('/education')
def get_education():
    return jsonify(EDUCATION), 200


@api.get('/certifications')
def get_certifications():
    return jsonify(CERTIFICATIONS), 200


@api.get('/activities')
def get_activities():
    return jsonify(ACTIVITIES), 200

# ---- Projects ----

@api.get('/projects')
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([p.to_dict() for p in projects]), 200

@api.post('/projects')
def create_project():
    data = request.get_json(silent=True) or {}
    title = data.get('title')
    description = data.get('description')
    if not title or not description:
        return jsonify({'error': 'title and description are required'}), 400

    p = Project(
        title=title,
        description=description,
        image=data.get('image'),
        link=data.get('link'),
        technologies=data.get('technologies') or [],
    )
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201

# ---- Skills ----

@api.get('/skills')
def get_skills():
    skills = Skill.query.all()
    grouped = {}
    for s in skills:
        grouped.setdefault(s.category, {'category': s.category, 'items': []})
        grouped[s.category]['items'].append(s.to_dict())
    return jsonify(list(grouped.values())), 200

@api.post('/skills')
def create_skill():
    data = request.get_json(silent=True) or {}
    category = data.get('category')
    name = data.get('name')
    if not category or not name:
        return jsonify({'error': 'category and name are required'}), 400

    s = Skill(category=category, name=name, level=data.get('level', 'Intermediate'))
    db.session.add(s)
    db.session.commit()
    return jsonify(s.to_dict()), 201

# ---- Contact ----

def _send_contact_email(*, name: str, email: str, message: str):
    """Send a contact notification email.

    Uses SMTP settings from app config / environment variables.
    Returns a small dict describing the delivery outcome.
    """

    cfg = current_app.config
    host = cfg.get('SMTP_HOST')
    port = int(cfg.get('SMTP_PORT') or 587)
    username = (cfg.get('SMTP_USERNAME') or '').strip()
    password = (cfg.get('SMTP_PASSWORD') or '').strip()
    use_tls = bool(cfg.get('SMTP_USE_TLS', True))

    to_email = (cfg.get('CONTACT_TO_EMAIL') or '').strip() or (PROFILE.get('email') or '').strip()
    from_email = (cfg.get('CONTACT_FROM_EMAIL') or '').strip() or username or to_email

    if not to_email:
        return {
            'sent': False,
            'skipped': True,
            'reason': 'No CONTACT_TO_EMAIL configured and PROFILE.email is empty.'
        }

    if not username or not password:
        return {
            'sent': False,
            'skipped': True,
            'reason': 'SMTP_USERNAME/SMTP_PASSWORD not configured in environment (.env).'
        }

    msg = EmailMessage()
    msg['Subject'] = f"Portfolio Contact: {name}"
    msg['From'] = from_email
    msg['To'] = to_email
    # Lets you hit Reply in Gmail and respond directly to the sender
    msg['Reply-To'] = email
    msg.set_content(
        "You received a new message from your portfolio contact form.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        "Message:\n"
        f"{message}\n"
    )

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP(host, port, timeout=12) as server:
            server.ehlo()
            if use_tls:
                server.starttls(context=context)
                server.ehlo()
            server.login(username, password)
            server.send_message(msg)
        return {'sent': True, 'skipped': False}
    except Exception as exc:
        # Do not fail the API call: message is still stored in SQLite.
        return {'sent': False, 'skipped': False, 'error': str(exc)}

@api.post('/contact')
def create_contact():
    data = request.get_json(silent=True) or {}
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    if not name or not email or not message:
        return jsonify({'error': 'name, email, message are required'}), 400

    c = Contact(name=name, email=email, message=message)
    db.session.add(c)
    db.session.commit()

    delivery = _send_contact_email(name=name, email=email, message=message)
    payload = c.to_dict()
    payload['emailDelivery'] = delivery
    return jsonify(payload), 201
