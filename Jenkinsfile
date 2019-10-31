#!groovy

//==================================================
// Variables
//==================================================

//Provided
// env.JENKINS_HOME
// env.JOB_NAME
// env.BUILD_NUMBER

//Should provide
// REGISTRY_USERNAME
// REGISTRY_PASSWORD

def GIT_SERVER_PROTO = "ssh"
def GIT_SERVER_HOST = "git.idaoda.cn"
def GIT_SERVER_PORT = "50022"
def GIT_GROUP = "paas"
def GIT_REPO = "paas-web"
def GIT_USERNAME = "git"
def GITLAB_SERVER_PROTO = "http"
def GITLAB_SERVER_HOST = "${GIT_SERVER_HOST}"

//==================================================
// Stages
//==================================================

ansiColor('xterm') {
    node {
        stage name: 'checkout'
        checkout([
            changelog: true,
            poll     : true,
            scm      : [
                $class                           : 'GitSCM',
                branches                         : [[name: '${BRANCH}']],
                browser                          : [
                    $class : 'GitLab',
                    repoUrl: "${GITLAB_SERVER_PROTO}://"
                        + "${GITLAB_SERVER_HOST}/${GIT_GROUP}/${GIT_REPO}",
                    version: '8.11'
                ],
                doGenerateSubmoduleConfigurations: false,
                extensions                       : [],
                submoduleCfg                     : [],
                userRemoteConfigs                : [[url: "${GIT_SERVER_PROTO}://"
                    + "${GIT_USERNAME}@${GIT_SERVER_HOST}"
                    + ":${GIT_SERVER_PORT}/${GIT_GROUP}/${GIT_REPO}.git"]]
            ]
        ])

        stage name: 'prepare'
        sh '''
        chmod +x ./devtool
        '''

       // stage name: 'init'
       // sh './devtool build:init'

        stage name: 'build'
        sh './devtool build:app'

        stage name: 'dockerize'
        sh './devtool build:docker ${BRANCH}'

        stage name: 'release'
        sh "./devtool release:docker ${BRANCH} ${REGISTRY_USERNAME} ${REGISTRY_PASSWORD}"

        stage name: 'clean'
        sh './devtool clean:docker ${BRANCH}'

        stage name: 'complete'
        //sh """
        //kubectl patch deployment ${MODULE_NAME} -p \
        //        "{\\"spec\\":{\\"template\\":{\\"metadata\\":{\\"labels\\":{\\"date\\":\\"`date +'%s'`\\"}}}}}"
        //"""

        // slack
        // slackSend([
        //    channel   : '#jenkins',
        //     color     : 'good',
        //     message   : "${env.JOB_NAME}${env.BUILD_DISPLAY_NAME} 构建完成",
        //     teamDomain: "${env.SLACK_TEAM}",
        //     token     : "${env.SLACK_TOKEN}"
        // ])
    }
}
