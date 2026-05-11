"""
ML Service for Gestionprojets
Provides scoring, roadmap generation, and plagiarism analysis endpoints
"""
import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import py_eureka_client.eureka_client as eureka_client
from plagiarism_detector import PlagiarismDetector

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize plagiarism detector
plagiarism_detector = PlagiarismDetector(similarity_threshold=50.0, timeout=10)

# Configuration
EUREKA_SERVER = os.getenv('EUREKA_SERVER', 'http://localhost:8761/eureka/')
SERVICE_PORT = int(os.getenv('SERVICE_PORT', '5000'))
SERVICE_NAME = 'ml-service'

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'service': SERVICE_NAME}), 200

@app.route('/api/ml/score', methods=['POST'])
def score_project():
    """
    Score a project based on various metrics
    Expected payload: { "projectId": "...", "metrics": {...} }
    """
    try:
        data = request.get_json()
        project_id = data.get('projectId')
        metrics = data.get('metrics', {})
        
        # TODO: Implement actual scoring logic
        # For now, return a mock score
        score = {
            'projectId': project_id,
            'overallScore': 75.5,
            'maturityLevel': 'Growth',
            'strengths': ['Strong team', 'Clear vision'],
            'weaknesses': ['Limited funding', 'Market competition'],
            'recommendations': ['Seek additional funding', 'Expand market research']
        }
        
        logger.info(f"Scored project {project_id}: {score['overallScore']}")
        return jsonify(score), 200
        
    except Exception as e:
        logger.error(f"Error scoring project: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/roadmap', methods=['POST'])
def generate_roadmap():
    """
    Generate a project roadmap based on project details
    Expected payload: { "projectId": "...", "projectDetails": {...} }
    """
    try:
        data = request.get_json()
        project_id = data.get('projectId')
        project_details = data.get('projectDetails', {})
        
        # TODO: Implement actual roadmap generation logic
        # For now, return a mock roadmap
        roadmap = {
            'projectId': project_id,
            'phases': [
                {
                    'phase': 'Planning',
                    'duration': '2 weeks',
                    'tasks': ['Define requirements', 'Create project plan', 'Allocate resources']
                },
                {
                    'phase': 'Development',
                    'duration': '8 weeks',
                    'tasks': ['Design architecture', 'Implement features', 'Write tests']
                },
                {
                    'phase': 'Testing',
                    'duration': '2 weeks',
                    'tasks': ['Unit testing', 'Integration testing', 'User acceptance testing']
                },
                {
                    'phase': 'Deployment',
                    'duration': '1 week',
                    'tasks': ['Prepare production environment', 'Deploy application', 'Monitor performance']
                }
            ],
            'estimatedCompletion': '13 weeks'
        }
        
        logger.info(f"Generated roadmap for project {project_id}")
        return jsonify(roadmap), 200
        
    except Exception as e:
        logger.error(f"Error generating roadmap: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/projects/<int:project_id>/roadmap', methods=['POST'])
def generate_project_roadmap(project_id):
    """
    Generate a project roadmap based on project details (alternative endpoint)
    Expected payload: MlProjectRequest with project details
    """
    try:
        data = request.get_json()
        title = data.get('title', '')
        description = data.get('description', '')
        sector = data.get('sector', '')
        stage = data.get('stage', '')
        feedback = data.get('feedback', '')
        
        # TODO: Implement actual roadmap generation logic using AI
        # For now, return a mock roadmap based on project stage
        phases = []
        
        if stage.lower() in ['idea', 'concept']:
            phases = [
                {
                    'phase': 'Phase 1',
                    'title': 'Validate Product-Market Fit',
                    'description': 'Conduct customer discovery interviews and validate problem-solution fit',
                    'duration': '4 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Conduct 20+ customer interviews',
                        'Define target customer segments',
                        'Validate problem hypothesis',
                        'Create initial value proposition'
                    ]
                },
                {
                    'phase': 'Phase 2',
                    'title': 'Build MVP',
                    'description': 'Develop minimum viable product with core features',
                    'duration': '8 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Define MVP feature set',
                        'Design user experience',
                        'Develop core functionality',
                        'Set up basic infrastructure'
                    ]
                },
                {
                    'phase': 'Phase 3',
                    'title': 'Early Traction',
                    'description': 'Launch MVP and acquire first customers',
                    'duration': '6 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Launch beta version',
                        'Acquire 50+ beta users',
                        'Collect user feedback',
                        'Iterate on product'
                    ]
                }
            ]
        elif stage.lower() in ['prototype', 'mvp']:
            phases = [
                {
                    'phase': 'Phase 1',
                    'title': 'Product Refinement',
                    'description': 'Improve product based on user feedback',
                    'duration': '4 weeks',
                    'status': 'in_progress',
                    'tasks': [
                        'Analyze user feedback',
                        'Prioritize feature requests',
                        'Fix critical bugs',
                        'Improve UX/UI'
                    ]
                },
                {
                    'phase': 'Phase 2',
                    'title': 'Growth & Scaling',
                    'description': 'Scale user acquisition and infrastructure',
                    'duration': '8 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Implement growth strategies',
                        'Scale infrastructure',
                        'Build marketing funnel',
                        'Acquire 500+ users'
                    ]
                },
                {
                    'phase': 'Phase 3',
                    'title': 'Revenue Generation',
                    'description': 'Implement monetization strategy',
                    'duration': '6 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Launch pricing model',
                        'Convert free to paid users',
                        'Optimize conversion funnel',
                        'Achieve first revenue milestone'
                    ]
                }
            ]
        else:  # Growth, Scaling, etc.
            phases = [
                {
                    'phase': 'Phase 1',
                    'title': 'Market Expansion',
                    'description': 'Expand to new markets and customer segments',
                    'duration': '8 weeks',
                    'status': 'in_progress',
                    'tasks': [
                        'Research new markets',
                        'Adapt product for new segments',
                        'Launch marketing campaigns',
                        'Establish partnerships'
                    ]
                },
                {
                    'phase': 'Phase 2',
                    'title': 'Team Building',
                    'description': 'Build and scale the team',
                    'duration': '6 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Define hiring needs',
                        'Recruit key positions',
                        'Onboard new team members',
                        'Build company culture'
                    ]
                },
                {
                    'phase': 'Phase 3',
                    'title': 'Fundraising',
                    'description': 'Prepare for and execute fundraising round',
                    'duration': '12 weeks',
                    'status': 'pending',
                    'tasks': [
                        'Prepare pitch deck',
                        'Build financial model',
                        'Reach out to investors',
                        'Close funding round'
                    ]
                }
            ]
        
        roadmap = {
            'projectId': project_id,
            'title': title,
            'overallProgress': 45,
            'completedPhases': 1,
            'totalPhases': len(phases),
            'phases': phases,
            'estimatedCompletion': f"{sum(int(p.get('duration', '0 weeks').split()[0]) for p in phases)} weeks",
            'generatedAt': 'now',
            'feedback': feedback
        }
        
        logger.info(f"Generated roadmap for project {project_id} (stage: {stage})")
        return jsonify(roadmap), 200
        
    except Exception as e:
        logger.error(f"Error generating roadmap for project {project_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/plagiarism', methods=['POST'])
def check_plagiarism():
    """
    Check for plagiarism in project documents
    Expected payload: { "projectId": "...", "text": "..." }
    """
    try:
        data = request.get_json()
        project_id = data.get('projectId')
        text = data.get('text', '')
        web_sources = data.get('webSources', [])
        
        if not text:
            return jsonify({
                'error': 'No text provided',
                'projectId': project_id
            }), 400
        
        # Analyze using plagiarism detector
        result = plagiarism_detector.analyze_documents(
            document_texts=[text],
            web_sources=web_sources if web_sources else None
        )
        
        # Add project ID to result
        result['projectId'] = project_id
        
        logger.info(f"Checked plagiarism for project {project_id}: {result['plagiarismScore']}%")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error checking plagiarism: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/projects/<int:project_id>/score', methods=['POST'])
def score_project_by_id(project_id):
    """
    Score a project based on various metrics
    Expected payload: MlProjectRequest with project details
    """
    try:
        data = request.get_json()
        title = data.get('title', '')
        description = data.get('description', '')
        sector = data.get('sector', '')
        stage = data.get('stage', '')
        budget = data.get('budget', 0)
        team_size = data.get('teamSize', '')
        has_pitch_deck = data.get('hasPitchDeck', False)
        has_business_plan = data.get('hasBusinessPlan', False)
        
        # Calculate score based on project attributes
        base_score = 50
        
        # Stage scoring
        stage_scores = {
            'idea': 10,
            'concept': 15,
            'prototype': 25,
            'mvp': 35,
            'growth': 45,
            'scaling': 50
        }
        base_score += stage_scores.get(stage.lower(), 10)
        
        # Documentation scoring
        if has_pitch_deck:
            base_score += 10
        if has_business_plan:
            base_score += 10
        
        # Budget scoring
        if budget > 0:
            base_score += 5
        if budget > 10000:
            base_score += 5
        
        # Description quality
        if description and len(description) > 100:
            base_score += 5
        
        # Cap at 100
        overall_score = min(base_score, 100)
        
        # Determine maturity level
        if overall_score >= 80:
            maturity_level = 'Scaling'
        elif overall_score >= 60:
            maturity_level = 'Growth'
        elif overall_score >= 40:
            maturity_level = 'MVP'
        else:
            maturity_level = 'Early Stage'
        
        score = {
            'projectId': project_id,
            'overallScore': overall_score,
            'maturityLevel': maturity_level,
            'scores': {
                'team': min(base_score * 0.8, 100),
                'product': min(base_score * 0.9, 100),
                'market': min(base_score * 0.7, 100),
                'traction': min(base_score * 0.6, 100),
                'financials': min(base_score * 0.75, 100)
            },
            'strengths': [
                'Clear project vision' if description else 'Project defined',
                'Documented approach' if has_pitch_deck or has_business_plan else 'Getting started',
                f'{stage.capitalize()} stage' if stage else 'In development'
            ],
            'weaknesses': [
                'Limited funding' if budget < 10000 else None,
                'Early stage' if overall_score < 50 else None,
                'Needs more documentation' if not (has_pitch_deck and has_business_plan) else None
            ],
            'recommendations': [
                'Develop comprehensive business plan' if not has_business_plan else None,
                'Create pitch deck for investors' if not has_pitch_deck else None,
                'Seek additional funding' if budget < 10000 else None,
                'Expand market research',
                'Build MVP and test with users' if stage.lower() in ['idea', 'concept'] else None
            ]
        }
        
        # Filter out None values
        score['weaknesses'] = [w for w in score['weaknesses'] if w]
        score['recommendations'] = [r for r in score['recommendations'] if r]
        
        logger.info(f"Scored project {project_id}: {score['overallScore']}")
        return jsonify(score), 200
        
    except Exception as e:
        logger.error(f"Error scoring project {project_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/projects/<int:project_id>/plagiarism', methods=['POST'])
def check_project_plagiarism(project_id):
    """
    Check for plagiarism in project documents
    Expected payload: MlProjectRequest with document texts
    """
    try:
        data = request.get_json()
        document_texts = data.get('documentTexts', [])
        web_sources = data.get('webSources', [])
        
        if not document_texts:
            return jsonify({
                'error': 'No documents provided',
                'projectId': project_id
            }), 400
        
        # Analyze using plagiarism detector
        result = plagiarism_detector.analyze_documents(
            document_texts=document_texts,
            web_sources=web_sources if web_sources else None
        )
        
        # Add project ID to result
        result['projectId'] = project_id
        
        logger.info(f"Checked plagiarism for project {project_id}: {result['plagiarismScore']}% (checked {len(document_texts)} documents against {len(web_sources)} web sources)")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error checking plagiarism for project {project_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/projects/<int:project_id>/nlp', methods=['POST'])
def analyze_project_description(project_id):
    """
    Analyze project description using NLP
    Expected payload: MlProjectRequest with project details
    """
    try:
        data = request.get_json()
        description = data.get('description', '')
        
        # TODO: Implement actual NLP analysis
        # For now, return mock analysis
        result = {
            'projectId': project_id,
            'sentiment': 'positive',
            'sentimentScore': 0.75,
            'keyPhrases': ['innovation', 'market opportunity', 'customer value'],
            'entities': ['technology', 'customers', 'market'],
            'readabilityScore': 65,
            'suggestions': [
                'Add more specific metrics',
                'Clarify target market',
                'Include competitive analysis'
            ]
        }
        
        logger.info(f"Analyzed description for project {project_id}")
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error analyzing description for project {project_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/projects/<int:project_id>/recommendations', methods=['POST'])
def get_project_recommendations(project_id):
    """
    Get recommendations for project improvement
    Expected payload: MlProjectRequest with project details
    """
    try:
        data = request.get_json()
        stage = data.get('stage', '')
        
        # TODO: Implement actual recommendation logic
        # For now, return mock recommendations based on stage
        recommendations = {
            'projectId': project_id,
            'recommendations': [
                {
                    'category': 'Product Development',
                    'priority': 'high',
                    'suggestion': 'Focus on core features for MVP',
                    'impact': 'Faster time to market'
                },
                {
                    'category': 'Market Strategy',
                    'priority': 'medium',
                    'suggestion': 'Conduct customer interviews',
                    'impact': 'Better product-market fit'
                },
                {
                    'category': 'Team',
                    'priority': 'medium',
                    'suggestion': 'Hire technical co-founder',
                    'impact': 'Stronger technical execution'
                }
            ],
            'nextSteps': [
                'Define MVP feature set',
                'Create product roadmap',
                'Set up development environment'
            ]
        }
        
        logger.info(f"Generated recommendations for project {project_id}")
        return jsonify(recommendations), 200
        
    except Exception as e:
        logger.error(f"Error generating recommendations for project {project_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/ml/projects/<int:project_id>/playground', methods=['POST'])
def entrepreneur_playground(project_id):
    """
    Entrepreneur playground - AI assistant for project guidance
    Expected payload: Complex request with conversation history and documents
    """
    try:
        data = request.get_json()
        user_message = data.get('userMessage', '')
        
        # TODO: Implement actual AI assistant logic
        # For now, return a helpful mock response
        response = {
            'projectId': project_id,
            'response': f"I understand you're asking about: {user_message}. Here's my advice: Focus on validating your assumptions with real customers before building too much. Start small, test quickly, and iterate based on feedback.",
            'suggestions': [
                'Talk to 10 potential customers this week',
                'Create a simple landing page to test interest',
                'Define your key metrics for success'
            ],
            'resources': [
                {'title': 'Lean Startup Methodology', 'url': '#'},
                {'title': 'Customer Development Guide', 'url': '#'}
            ]
        }
        
        logger.info(f"Playground interaction for project {project_id}")
        return jsonify(response), 200
        
    except Exception as e:
        logger.error(f"Error in playground for project {project_id}: {str(e)}")
        return jsonify({'error': str(e)}), 500

def register_with_eureka():
    """Register this service with Eureka"""
    try:
        eureka_client.init(
            eureka_server=EUREKA_SERVER,
            app_name=SERVICE_NAME,
            instance_port=SERVICE_PORT,
            instance_host='localhost',
            health_check_url=f'http://localhost:{SERVICE_PORT}/health',
            status_page_url=f'http://localhost:{SERVICE_PORT}/health',
            home_page_url=f'http://localhost:{SERVICE_PORT}/'
        )
        logger.info(f"Successfully registered {SERVICE_NAME} with Eureka at {EUREKA_SERVER}")
    except Exception as e:
        logger.error(f"Failed to register with Eureka: {str(e)}")
        raise

if __name__ == '__main__':
    # Register with Eureka
    register_with_eureka()
    
    # Start Flask app
    logger.info(f"Starting {SERVICE_NAME} on port {SERVICE_PORT}")
    app.run(host='0.0.0.0', port=SERVICE_PORT, debug=False)
