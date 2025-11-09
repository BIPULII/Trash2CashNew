pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/BIPULII/Trash2CashNew.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                echo 'Stopping and removing old containers if they exist...'
                sh 'docker rm -f backend || true'
                sh 'docker rm -f frontend || true'
                sh 'docker rm -f mongo || true'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Starting containers...'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
