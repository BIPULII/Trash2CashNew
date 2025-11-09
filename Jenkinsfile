pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/BIPULII/Trash2CashNew.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'sudo docker compose build'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'sudo docker rm -f backend || true'
                sh 'sudo docker rm -f frontend || true'
                sh 'sudo docker rm -f mongo || true'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'sudo docker compose up -d'
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
