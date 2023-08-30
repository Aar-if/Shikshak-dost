pipeline {
  
  agent any

  stages {
     stages {
    stage('Clean workspace') {
      steps{
        script { 
          sh "rm -rf *"
        }
      }
    }
   stage('Checkout'){
            steps{
                git branch: 'main' , url: 'https://github.com/Aar-if/Shikshak-dost.git'   
          }
    }
    
    stage('BuildingCode') {
      steps{
      dir('/var/lib/jenkins/workspace/teacherapp-shiksha/Shikshak-dost'){
        sh "rm -rf node_modules"
        sh "rm -rf package-lock.json"
        sh "ls"
        //sh "yarn install"
        sh "npm i --legacy-peer-deps"
        sh "npm run build"
        }
      }
    }
    stage('Deployment') {
      steps{
      dir ('/var/lib/jenkins/workspace/teacherapp-shiksha/Shikshak-dost/dist/') { 
         script {
                   
                    def awsCliCmd = 'aws'
                    //sh "apt install awscli"
                    // Set AWS credentials
                    //sh "aws configure set aws_access_key_id AKIA6EXR534WHAGNPPCS"
                    //sh "aws configure set aws_secret_access_key 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"
                    //sh "aws configure set default.region ap-south-1"
       
                    def bucketName = 'onestbucket'  
                    sh "aws s3 cp /var/lib/jenkins/workspace/teacherapp-shiksha/Shikshak-dost/dist/index.html s3://${bucketName}/"
                     sh "aws s3 cp /var/lib/jenkins/workspace/teacherapp-shiksha/Shikshak-dost/dist/vite.svg s3://${bucketName}/"
                     sh "aws s3 cp /var/lib/jenkins/workspace/teacherapp-shiksha/Shikshak-dost/dist/assets/ s3://${bucketName}/assets/ --recursive"
        }
      }
    }
    }
    // New stage for executing ccs.sh script
    stage('Execute invalidation Script') {
      steps {
        dir('/var/lib/jenkins/workspace'){
        sh 'cd /var/lib/jenkins/workspace'
        sh 'sh teacherapp.sh'
      }
    }
  }
}
}
