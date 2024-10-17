pipeline {
    agent {label 'ec2'}

    stages {
        stage('Preparation') {
            steps {
                // Clone the code repository
                git branch: 'main', url: 'https://github.com/Alien166/Automated-Deployment-Pipeline.git'
            }
        }
        stage('CI') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh """
                        docker build . -f dockerfile -t toba44/docker-js
                        docker login -u ${USERNAME} -p ${PASSWORD}
                        docker push toba44/docker-js
                    """
                }
            }
        }
        stage('CD') {
            steps {
                // Use Ansible to deploy the container
                sh """
                   ansible-playbook -i Ansible/inventory Ansible/site.yml -u ec2-user 
                  """
            }
        }
    }
}
