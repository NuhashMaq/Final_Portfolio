import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

from config import config
from models import db
from routes import api


def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')

    # If the React app has been built, serve it from the Flask backend.
    # This makes a simple and reliable "basic" implementation: one server, one origin.
    build_dir = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'frontend', 'build')
    )
    index_path = os.path.join(build_dir, 'index.html')
    has_frontend_build = os.path.exists(index_path)

    app = Flask(
        __name__,
        static_folder=build_dir if has_frontend_build else None,
        static_url_path='' if has_frontend_build else None,
    )
    app.config.from_object(config.get(config_name, config['default']))

    db.init_app(app)
    CORS(app, origins=app.config.get('CORS_ORIGINS', ['http://localhost:3000']))

    app.register_blueprint(api)

    # Serve frontend routes (SPA fallback), but never shadow /api.
    if has_frontend_build:
        @app.get('/')
        def serve_index():
            return send_from_directory(build_dir, 'index.html')

        @app.get('/<path:path>')
        def serve_static_or_index(path: str):
            if path.startswith('api'):
                return jsonify({'error': 'Not found'}), 404
            file_path = os.path.join(build_dir, path)
            if os.path.exists(file_path):
                return send_from_directory(build_dir, path)
            return send_from_directory(build_dir, 'index.html')
    else:
        @app.get('/')
        def no_frontend_build():
            return jsonify({
                'message': (
                    'Frontend build not found. Run "npm run build" in the frontend folder '
                    'to generate frontend/build, then refresh this page.'
                )
            }), 200

    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='127.0.0.1', port=5000, debug=True)
