pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning Trash2CashNew repository...'
                git branch: 'main',
                    url: 'https://github.com/BIPULII/Trash2CashNew.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Build Containers') {
            steps {
                echo '🐳 Building Docker containers...'
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo '🚀 Starting Docker containers...'
                sh '''
                docker rm -f mongo backend frontend || true
                docker compose up -d --build
                docker ps
                '''
            }
        }

        stage('Verify Containers') {
            steps {
                echo '🔍 Checking running containers...'
                sh 'docker ps -a'
            }
        }

        stage('Check Logs (Optional)') {
            steps {
                echo '📜 Showing short logs for verification...'
                sh 'docker compose logs --tail=20'
            }
        }
            stage('Deploy') {
        steps {
            sh 'docker-compose down || true'
            sh 'docker-compose up -d'
    }
}

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed! Please check logs above.'
        }
    }
}
