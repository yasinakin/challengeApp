pipeline {
    agent any

    stages {
        stage('Clone  Repo') {
            steps {
                sh "cd /home/vagrant/challengeApp"
                sh "git pull"
            }
        }
        stage('Deploy') {
            steps {
                sh "sudo docker-compose -f docker/docker-compose.yml up -d"                    
                
            }
        }
        
    } 
}
