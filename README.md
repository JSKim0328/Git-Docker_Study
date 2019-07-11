# Git 공부내용 요약
## 1. Git 시작하기
#### Git 설정
Git의 설정파일은 적용범위에 따라 다음과 같이 세가지 단계로 나뉜다.
* `/etc/gitconfig`: 시스템 전체에 적용되는 설정파일. `git config --system` 명령으로 읽고 쓸 수 있다.
* `~/.gitconfig`, `~/.config/git/config`: 특정 사용자에게만 적용되는 설정파일. `git config --global` 명령으로 읽고 쓸 수 있다.
* `./.git/config`: 특정 저장소에 적용되는 설정파일. `git config --local` 명령으로 읽고 쓸 수 있다.

적용범위가 적은 설정파일이 우선시 된다. `git config <key>` 명령을 통해 해당 설정을 확인할 수 있다. 아래의 명령어는 commit에서 사용될 사용자 정보를 설정하는 것인데, `--global` 옵션을 사용하면 한 번만 설정해주면 되고, `--local` 옵션을 통해 저장소마다 다른 사용자를 설정할 수도 있다(아무 옵션도 주지 않으면 `--local`이 디폴트이다).
```
git config --global user.name <User_name>
git config --global user.email <User_email>
```
## 2. Git의 기초
#### Git 저장소 만들기
Git 저장소를 처음 만드는 방법은 크게 두가지가 있다. 프로젝트 디렉토리를 선정해서 그 디렉토리를 저장소로 만드는 방법이 첫 번째고, 기존의 저장소를 가져오는 것이 두 번째이다. 

첫 번째 방법은 해당 디렉토리로 들어가서 `git init` 명령을 실행하는 것이다. 그럼 자동으로 해당 디렉토리는 Git 저장소가 된다(즉, `.git` 디렉토리가 형성된다). 이후 commit을 하면 본격적으로 Git을 통한 관리를 시작하게 된다.  

두 번째 방법은 `git clone <url>`을 사용하는 것이다. 예를 들어, `git clone https://github.com/libgit2/libgit2` 명령을 사용하면 현재 디렉토리에 libgit2라는 디렉토리를 만들고 그 디렉토리를 Git 저장소로 만든다. 물론 이 저장소는 <url>의 저장소의 정보를 모두 담고 있다. 만약 특정 디렉토리를 저장소로 만들고 싶으면 `git clone <url> <path>` 명령을 사용하면 된다.

#### Git Status
Git 저장소 안에 있는 파일은 크게 tracked와 untracked 상태로 나뉜다. tracked 파일은 Git에 의해 관리 되는 파일이고 untracked는 그 반대이다. 만약 `git init`을 통해 막 저장소를 만들었다면, 모든 파일은 untracked 상태일 것이다. 이는 `git status` 명령으로 확인할 수 있다. untracked 파일을 tracked 파일로 만들고 싶으면 `git add <file>` 명령을 사용하면 된다. 만약 로그나 임시 파일들과 같은 파일을 Git이 관리하게 하고 싶지 않으면 `.gitignore` 이라는 파일에 그 파일들을 적으면 된다. 해당 파일들은 `git status` 명령을 사용해도 untracked라 표시되지 않는다.

tracked 상태의 파일들은 다시 modifed, staged 상태로 나눌 수 있다. modifed는 말 그대로 수정된 파일인데, 이 내용을 commit하여 보존하고 싶으면 `git add` 명령을 통해 staged 상태로 만들고 commit 하면 된다. 만약 staged 파일을 내용은 보존하되 커밋에 포함하고 싶지 않으면 `git reset HEAD <file>` 명령을 사용하면 된다. 또, 수정한 내용을 버리고 싶으면 `git checkout -- <file>` 명령을 사용한다.

#### Git Commit
저장하고 싶은 수정사항을 모두 staged 상태로 만들었다면, `git commit` 명령을 통해 staged 상태의 파일들을 저장할 수 있다. 모든 커밋은 commit message가 있어야 하는데, `git commit -m '<message>'` 명령을 통해 간단히 커밋할 수 있다. 만약 어떤 수정사항을 커밋했는데, 그 수정사항에 오류가 있다면 수정 후 다시 커밋하면 된다. 그런데 그 수정사항이 너무 사소해서 새로운 커밋을 만들기 애매하다면 `git commit --amend` 명령을 통해 바로 직전의 커밋을 수정할 수 있다.

#### 커밋 로그 확인하기
어떤 커밋들이 이루어졌는지 확인하고 싶다면 아래와 같은 명령어들을 사용하면 된다.
```
git log     // 가장 기본적인 커밋 확인 명령. 모든 커밋 로그를 출력한다.
git log -p -2   // -p 옵션은 각 커밋의 변경점을 확인할 수 있고, -2 옵션은 최근부터 2개의 커밋만을 확인한다.
git log --graph // 커밋 로그를 그래프 형태로 시각화하여 출력한다.
git log --online // 커밋 로그를 체크섬과 커밋 메세지만 한 줄로 출력한다.
```

#### Remote 저장소
리모트 저장소는 협업을 위해 필수적인 개념으로 주로 프로젝트에 참여하는 사람들이 공유하는 저장소이다. `git remote add <name> <url>` 명령을 통해 새로운 리모트 저장소를 추가할 수 있고, `git remote` 명령을 통해 리모트 저장소의 목록을 볼 수 있다.

###### Remote 저장소 정보 가져오기
다음의 명령어를 통해 추가한 리모트 저장소의 정보를 가져올 수 있다.

    git fetch <remote>

물론 이 명령어는 단순히 정보를 가져오는 것으로 작업을 하고 싶으면 직접 브랜치를 만들어야 한다. `git pull` 명령어를 사용하면 이 작업을 자동화할 수 있다.

###### Remote 저장소에 브랜치 공유하기
다음의 명령어를 사용하면 원하는 브랜치를 리모트 저장소에 올릴 수 있다.

    git push <remote> <branch>
    
그 외에도 `git remote show <remote>` 명령을 통해 리모트 저장소의 상세 내용을 확인 할 수 있다.

## 3. Git 브랜치
#### Git이 파일들을 관리하는 방법
Git은 staged 된 모든 파일을 Git 저장소에 blob이라는 형태로 저장한다. 이 파일(blob)이 어떤 디렉토리 구조를 갖는지에 관한 정보가 트리 객체에 저장된다. 그리고 각 커밋 객체는 이 트리 객체를 저장한다. 즉, Git은 트리 객체를 통해 저장소에 저장된 파일들을 다양한 구조로 저장할 수 있고, 커밋 객체를 통해 커밋할 당시에 해당되는 트리가 무엇인지 기억함으로써, 작업 디렉토리에 다양한 순간을 저장하고 불러올 수 있다.
#### 브랜치란
커밋 객체들은 자기 이전의 커밋 객체를 가리키는 포인터를 갖는다. 즉, 임의의 커밋 객체를 선택하면 그 객체 이전의 모든 커밋이 줄줄이 딸려나오는 것이다. 이 때, 그 임의의 객체를 가리키는 포인터가 곧 브랜치이다. 
#### 새로운 브랜치 만들기
따로 브랜치를 만들지 않아도 기본적으로 master 브랜치가 존재하는데, 새로운 브랜치를 만들고 싶다면 `git branch <branch> <checksum>` 명령을 사용하면 된다(checksum의 일부만 입력해도 된다).

checksum을 생략하면 헤드 브랜치와 같은 커밋을 가리키는 브랜치가 생성된다. 헤드 브랜치를 바꾸는 명령어는 `git checkout <branch>`이다. 커밋을 하면 헤드 브랜치는 자동으로 다음 커밋을 가리키고, 다른 브랜치는 움직이지 않는다.
#### 브랜치 분할
앞에서 말했듯이, 커밋을 하면 현재 브랜치만 움직인다. 만약 master 브랜치와 같은 위치에 testing 브랜치를 만들고 master 브랜치에 헤드가 있는 상태에서 커밋을 한다고 하자. 그러면 master 브랜치는 새로운 커밋을 가리키고 testing 브랜치는 이전 커밋을 가리킬 것이다. 이 상태에서 `git checkout testing;~수정~;git commit -m '분할!'` 와 같은 명령들을 실행시키면, master 브랜치와 testing 브랜치는 한 커밋에서 나뉘어 질 것이다.
#### 브랜치 Merge
앞의 예시와 같이 분할된 브랜치를 다시 합치는 명령어 역시 존재한다. 예를 들어, master 브랜치에 헤드가 있는 상태에서 `git merge <other branch>(testing)` 명령을 실행하면, 두 브랜치의 파일들이 합쳐져 stage 된다. 그런 다음, 커밋을 하면 master 브랜치가 합쳐진 내용의 커밋을 가리키고 testing 브랜치는 움직이지 않는다.

그런데 merge 하려는 브랜치들에 서로 같은 이름의 다른 내용을 가진 파일이 존재할 수 있다. 이럴 경우, conflict가 발생하는데, conflict가 발생한 파일은 사용자가 수정하여 명시적으로 add 해줘야 한다.

merge한 후에 testing 브랜치가 더 이상 필요하지 않으면 `git branch -d testing` 명령을 통해 브랜치를 삭제할 수 있다.

#### 리모트 브랜치
리모트 브랜치란 리모트 저장소에 존재하는 브랜치를 말한다. 리모트 브랜치는 로컬에서는 `<remote>/<branch>`로 표기된다. 기본적으로 리모트 브랜치는 움직일 수 없는데, 만약 리모트 브랜치에 대해 작업을 하고 싶으면 로컬 브랜치로 리모트 브랜치를 track 해야 한다. 이를 위해 다양한 명령어가 존재하는데 다음과 같다.
```
git checkout -b <local branch> <remote>/<branch>
git checkout --track <remote>/<branch>
git branch -u <remote>/<branch>
```
또, `git push --delete <remote> <branch>` 명령을 통해 리모트 저장소의 브랜치를 삭제할 수 있다.

#### Rebase
브랜치를 합치는 또 다른 방법으로 rebase 가 있다. rebase 가 merge와 다른 점은 merge는 합치기 전 커밋을 보존하는데 반해, rebase는 보존하지 않는다. 예를 들어, testing 브랜치를 master 브랜치에 rebase 하려면 헤더를 testing에 위치시킨 상태(`git checkout testing`)에서 `git rabase master`하면 된다. 그러면, master와 testing의 공통 조상을 제외한 testing의 커밋이 모두 master 브랜치 다음에 위치하게 된다. 이 때, testing 브랜치의 커밋들은 master 브랜치의 커밋의 내용들이 반영되어 기존의 커밋과 달라지게 된다.

rebase를 이용하면 여러 갈래의 복잡한 브랜치에서 벗어나 단순한 하나의 브랜치로 버전을 관리할 수 있다. 하지만, 리모트 저장소의 브랜치에 rebase를 하는 것은 상당히 신중해야 한다. 만약 rebase한 브랜치의 커밋 중 하나에서 또 다른 branch를 형성해 작업 중인 동료가 있다면, 골치 아픈 상황에 처할 수 있다.

# Docker 공부내용 요약
## 1장. 시스템과 인프라 기초지식
#### 시스템 이용 형태
- 온-프레미스(on-premise): 시스템을 필요로 하는 수요자가 직접 서버나 네트워크 장비 등을 구매하여 시스템을 구축하는 시스템 이용 형태.
    - 주로 높은 가용성, 기밀성, 특수한 기능을 필요로 하는 시스템을 구축할 때 사용됨.
- 클라우드: 인터넷을 통해 제공되며 필요한 시스템을 필요한 만큼 이용료를 지불하여 사용하는 형태. 초기투자가 필요없다는 것이 특징. ex) SaaS, PaaS, IaaS 등.
    - 트래픽의 변동이 많거나, 백업을 구축하고자 할 때 주로 사용됨.

#### 시스템 기반의 구축/운용 흐름
- 폭포형(waterfall): 체계적인 계획 속에서 개발을 진행하고 한 단계가 완전히 끝나면 다음 단계가 시작되는 전형적인 모습의 개발 형태이다. 예를 들어, 빌드가 모두 완료된 다음에 테스트를 진행한다.
- Agile software development: 어떤 틀과 계획 안에서 차례대로 진행하는 것보다는 피드백 중심으로 유연하게 진행되는 개발 형태이다. 빠른 출시를 통해 서비스 이용자의 피드백을 바탕으로 개발 과정을 빠르게 순환하며 진행된다. 반복되는 과정을 안정적으로 진행하기 위해 자동화를 적극 이용한다.

#### 인프라 구성 관리
- 코드를 사용하여 인프라를 구성하고 관리함으로써 인프라 구성의 변경점을 쉽게 파악하고 환경에 무관하게 자동으로 인프라를 구성할 수 있다.

## 2장. 컨테이너 기술과 Docker의 개요
#### 컨테이너 기술
- 컨테이너 기술은 한 Application이 작동하기 위해 필요한 리소스를 모아 독립적으로 작동할 수 있도록 하는 기술이다. 컨테이너는 OS 자원을 논리적으로 분리하여 사용하기 때문에, 여러 컨테이너가 독립적으로 작동할 수 있다. 이는 하나의 서버에서 여러 서버를 컨테이너 안에 담아 구동하고 통신할 수 있다는 것을 의미한다.

#### Docker 이미지
- 컨테이너를 구성하는 모든 것을 저장하고 있는 파일이다. 이를 공유함으로써 Docker가 설치되어있는 어떤 환경에서든 컨테이너를 구동할 수 있게 된다.

#### Docker의 기능
- Docker 이미지를 만드는 기능(build)
  프로그램이 작동하기 위해 필요한 리소스를 하나로 모아놓은 파일인 이미지 파일을 만들 수 있느 기능을 제공.
- Docker 이미지를 공유하는 기능(ship)
  Docker hub 등을 통해 이미지를 공유할 수 있다.
- Docker 컨테이너를 작동시키는 기능(run)
  이미지는 사용자의 환경에 관계없이 docker만 설치되어 있다면 컨테이너로 구동할 수 있다.

#### Docker Component
- __Docker Engine__: Docker 이미지 생성 컨테이너 구동 등 Docker의 핵심기능.
- __Docker Registry__: Dokcer 이미지를 공유하기 위한 기능.
- __Docker Compose__: 컨테이너 구성 정보를 코드로 정의하여 관리하는 기능.
- __Docker Machine__: Docker 실행 환경을 자동으로 구축하는 기능.
- __Docker swarm__: 여러 docker 호스트를 클러스터화 하는 기능.

#### Name Space
컨테이너라는 독립된 환경을 만들기 위해 사용되는 기술.
- PID namespace: 프로세스를 격리.
- Network namespace: 네트워크 리소스(IP 주소, port 등)을 격리.
- UID namespace: 사용자 ID를 격리.
- Mount namespace: 파일 시스템을 격리.
- UTS namespace: 호스트 네임을 격리.
- IPC namespace: 프로세스 간의 통신 오브젝트를 격리.

## 4장. Docker 명령
### Docker 이미지 관리 명령
#### 이미지 검색
원하는 이미지를 찾으려면 [Docker hub](hub.docker.com) 에서 검색하거나, `docker search`명령어를 사용하면 된다.
```
docker search [option] <keyword>
docker search nginx
docker serach --filter=stars=100 nginx
```
옵션에는 다음과 같은 것들이 있다.

옵션 | 효과
--- | ---
--no-trunc | 결과를 모두 표시
--limit | n건의 검색 결과만 표시
--filter=stars=n | 스타(즐겨찾기)의 수가 n이상인 이미지만 표시

#### 이미지 다운로드 및 목록 확인
찾은 이미지 중 원하는 이미지를 다운받는 명령어는 다음과 같다.
```
docker pull [option] <image>[:tag]
docker pull ubuntu:latest
```
latest 태그는 이미지 중에 가장 최근의 것을 지칭한다.
만약 다운받은 이미지의 목록을 확인하고 싶으면 `docker images` 혹은 `docker image ls` 등을 사용한다.

#### 이미지 상세 정보 확인
`docker image insepct [option] <image>[:tag]` 를 사용하면 이미지의 상세 정보를 확인할 수 있다. 또, `--filter=` 옵션을 사용하면 원하는 결과를 원하는 형태로 출력할 수 있다. 

#### 이미지 삭제
불필요한 이미지를 삭제할 수도 있는데, 명령어는 `docker rmi [option] <image>[:tag]` 와 같다. 옵션에는 다음과 같은 것들이 있다.

옵션 | 효과
--- | ---
--all, -a | 사용하지 않은 이미지를 모두 삭제
--force, -f | 이미지를 예외없이 삭제

#### Docker hub 로그인/로그아웃
docker 이미지를 docker hub에 올리기 위해서는 docker hub에 로그인을 해야 한다. 로그인과 로그아웃 명령어는 각각 `docker login`, `docker logout` 이다.
#### Docker hub에 이미지 업로드
docker hub에 로그인 한 후, docker 이미지를 공유할 수 있다.
```
docker push <image>[:tag]
```
### Docker 컨테이너 관련 명령
#### Docker 이미지로부터 컨테이너 구동 시작
다운받은 docker 이미지를 컨테이너로 만들어서 실행시키고자 할 때, `docker run` 명령을 사용한다.
```
docker run [option] <image>[:tag] [parameter]
docker run -it --name mylinux ubuntu /bin/bash
docker run -d -p 800:80 nginx
```
주요 옵션은 다음과 같다.

옵션 | 효과
--- | ---
--detach, -d | 컨테이너를 백그라운드에서 실행한다.
--interactive, -i | 컨테이너의 표준입력을 연다.
--tty, -t | 컨테이너와 쉘의 입출력을 파이프라인한다.
--name | 컨테이너의 이름을 지정한다. 생략시 임의의 이름이 설정된다.
--publish, -p [hostport]:[container_port] | 호스트와 컨테이너의 포트를 맵핑한다.

#### Docker 컨테이너 목록 및 가동 상태 확인
`docker ps` 혹은 `docker container ls` 명령은 구동 중인 docker 컨테이너의 목록을 보여준다. 만약 모든 컨테이너의 목록을 보고 싶으면 `-a, --all` 명령을 사용하면 된다.
`docker container stats [container]` 명령을 사용하면 가동 중인 컨테이너의 상태를 `docker contatiner top [container]` 명령을 사용하면 컨테이너 안의 프로세스 실행 상태를 확인할 수 있다.

#### 구동 중인 docker 컨테이너 정지 및 재시작
구동 중인 docker를 정지할 때는 `docker container stop <container>` 를 사용하고, 다시 구동시키고 싶으면 `docker container start <container>` 을 사용한다. 이 두 명령어를 연달아 실행시키고자 한다면 `docker container restart <container>` 를 사용하면 된다.

#### 컨테이너 삭제
더 이상 컨테이너를 사용하지 않는 경우, `docker rm <container>` 명령으로 삭제한다.

### Docker 네트워크
외부와 컨테이너, 컨테이너와 컨테이너끼리 통신하고자 할 때, docker 네트워크를 사용한다. 기본적으로 bridge, host, none 세 가지의 네트워크가 생성되어 있는데, `docker run -d -p 800:80 nginx` 명령을 사용하고 `docker inspect` 명령으로 해당 컨테이너를 조사해보면 nginx 웹서버가 bridge 네트워크에 연결되있는 것을 확인할 수 있다. 관련된 명령어로는 다음과 같은 것들이 있다.

명령 | 효과
--- | ---
`docker network ls` | 네트워크 목록 표시.
`docker network create` | 네트워크 생성.
`docker network connect` | 네트워크 연결
`docker network disconnect` | 네트워크 연결 끊기.
`docker network inspect` | 네트워크 상세 정보 확인.
`docker network rm` | 네트워크 삭제.

### 가동 중인 컨테이너 조작
#### 가동 컨테이너에 접속
예를 들어, `docker run -it --name mylinux ubuntu /bin/bash` 명령을 사용하면 우분투 컨테이너에서 bash 쉘을 실행시키는데 `exit` 명령을 치면 컨테이너까지 같이 정지된다. 그 이유는 `docker run` 의 인자로 `/bin/bash` 를 전달하여 프로세스를 실행시켰기 때문인데, 만약 프로세스만 정지하고 컨테이너의 구동을 유지한 상태로 컨테이너에서 빠져나오고 싶다면 `ctrl+P, ctrl+Q`를 누르면 된다. 그리고 다시 컨테이너에 접속하고 싶으면 `docker container attach` 명령을 사용한다.

#### 가동 컨테이너에서 프로세스 실행
위의 예시에서 컨테이너에서 빠져나온 상태로 접속하지 않고 어떤 명령만 실행시키고 싶다면 다음과 같이 하면 된다.
```
docker container exec <container> <command>
```
#### 컨테이너 내부 파일 복사
컨테이너 내부와 호스트 OS 파일 시스템에 사이에서 파일을 복사하고 싶으면 다음과 같이 한다.
```
docker cp <continer>:<path> <path> // 컨테이너 내부 파일 -> 호스트
docker cp <path> <container>:<path> // 호스트 내부 파일 -> 컨테이너
```
#### 컨테이너 변경점 확인
컨테이너를 이미지로 부터 구동하고 여러 조작을 하면서 달라진 점을 확인하고 싶으면 `docker diff <container>` 명령을 사용한다.

## 5장. Dockerfile
Dockerfile은 `COMMAND <parameter>` 의 기본 형식을 갖고 있고 `#` 을 통해 주석을 달 수도 있다. `command` 는 대문자로 쓰는 것이 관례이다(소문자로 써도 무관). 
#### FROM
Dockerfile은 항상 기존의 이미지를 베이스로 새로운 이미지를 생성한다. `FROM` 명령이 바로 그 베이스가 되는 이미지를 지정하는 명령이고, dockerfile에 항상 존재해야 한다. `FROM` 명령은 다음과 같은 형식으로 기술한다.
```
FROM [image]<:tag>
FROM [image]<@digest>
FROM ubuntu:latest
```
이미지의 digest는 `docker images --digests [image]` 를 통해 확인할 수 있다.
#### Dockerfile 빌드하기
Dockerfile에 작성한 내용을 토대로 이미지를 만드려면 `docker build` 명령을 사용하면 된다. 용례는 다음과 같다. directory는 Dockerfile이 위치한 디렉토리를 말한다.
```
docker build -t <image>:<tag> <directory>
docker build -t <image>:<tag> -f <my_own_dockerfile> <directory>
docker build - < Dockerfile
```
`-f` 옵션을 통해 파일 이름을 별도로 설정할 수도 있는데, 이 경우에 docker hub의 이미지 자동 생성 기능을 사용할 수 없다. 또, pipeline을 통해 Dockerfile의 내용만 전달할 경우, 다른 파일을 전달할 수 없게 된다. 그럴 경우에는 tar을 통해 아카이브를 형성하여 전달한다.
```
docker build - < docker.tar.gz
```

#### Docker 이미지의 레이어 구조
Dockerfile의 각 명령어는 모두 이미지 파일로 생성된다. 이런 이미지 파일들을 `intermediate image` 라고 하는데, 레이어 구조를 가진다. 그렇게 함으로써 공통되는 이미지 레이어는 여러 이미지가 공유할 수 있어서 디스크 용량을 효율적으로 이용할 수 있다.

#### 멀티스테이지 빌드
개발환경과 제품환경에서 필요한 리소스가 다른 경우가 존재하는데, 이런 경우 두 이미지가 같은 리소스를 갖는 것은 비효울적이다. 따라서, 각각의 이미지가 필요한 리소스만을 확보하도록 Dockerfile을 작성하면 더 효율적으로 이미지를 운용할 수 있다.

#### RUN, CMD, ENTRYPOINT
이 명령들은 모두 Exec, Shell 두 가지 형태로 기술될 수 있다.
- Exec 형식
  `<COMMAND> ["parameter1","parameter2", ...]`
  이 형식은 실행하고자 하는 명령을 JSON 배열로 지정하는데, 쉘을 경유하지 않아서 환경변수를 사용할 수 없다.
- Shell 형식
  `<COMMAND> <shell_command>`
  이 형식은 쉘 커맨드 형태로 명령을 입력해서 쉘을 통해 실행된다.

#### RUN
이 명령은 최종 이미지를 위한 환경 구축을 위해 주로 사용된다. 예를 들어, 웹서버 nginx를 요구하는 환경이라면 웹서버를 미리 설치해놓는 것이 좋을 것이다. 이를 위해 Dockerfile에 다음과 같은 명령을 넣는다.
```
RUN apt-get install -y nginx
혹은
RUN ["/bin/bash", "-c", "apt-get install -y nginx"]
```
#### CMD
CMD 명령은 컨테이너를 구동할 때, 전달하는 디폴트 인자를 설정하는 명령이다. 예를 들어, Dockerfile에 다음과 같이 적고 빌드하여 `docker run -it --rm myubuntu` 를 실행하면 `docker run -it --rm ubuntu:latest /bin/bash` 를 실행한 것과 같다.
```
FROM ubuntu:latest
CMD ["/bin/bash"]
```
이 명령이 설정하는 것은 디폴트 인자이므로 여러 번 적어도 가장 마지막 명령만 적용된다. 또 컨테이너를 구동할 때, 다른 인자를 전달하면 `CMD` 명령은 무시된다.

#### ENTRYPOINT
이 명령도 `CMD` 처럼 컨테이너를 구동할 때, 인자를 설정하는 명령이다. 다만, `CMD` 와 다른 점은 이 명령은 항상 실행된다는 것이다. 즉, 컨테이너 구동 시에 다른 인자를 전달해도 `ENTRYPOINT` 로 설정한 인자가 먼저 위치하고 그 다음에 다른 인자들이 위치한다. 이 때, 이 명령으로 설정한 인자 다음에 올 인자를 `CMD` 명령으로 설정할 수도 있다. 다음의 예시를 보자.
```
FROM ubuntu:latest
ENTRYPOINT ["top"]
CMD ["-d", "10"]
```
이렇게 하면, 컨테이너를 구동했을 때, top의 결과를 10초마다 갱신하게 할 수 있다. 그런데 만약 컨테이너 구동시에 `-d 2` 라는 인자를 전달하면 `CMD` 명령으로 전달한 인자는 무시되고 top의 결과가 2초마다 갱신되게 된다. 이 때, 주의할 점은 `ENTRYPOINT` 명령을 쉘 형식으로 작성하면 추가 인자는 무시한다.

#### ONBUILD
`ONBUILD` 명령은 이 명령이 적혀있는 Dockerfile 로 생성된 이미지를 기반으로 작성되는 또 다른 이미지를 빌드할 때 실행되는 명령을 지정할 수 있다.

#### ENV
Dockerfile 에서 환경변수를 `ENV` 명령으로 설정할 수 있다. 이 명령으로 설정한 환경변수는 이미지 빌드 도중 `RUN, CMD, ENTRYPOINT` 등의 명령에 사용될 뿐만 아니라 컨테이너 구동 후에도 사용될 수 있다. `ENV` 명령은 다음과 같은 형식을 지닌다.
```
ENV <key> <value>
ENV <key>=<value>
```
첫번째 형식의 특징은 <key> 다음의 문자열은 뛰어쓰기마저 value로 취급한다. 즉, 한 명령에서 하나의 환경변수만을 설정할 수 있다. 반대로 두번째 형식은 한번에 어러 개의 환경변수를 설정할 수 있다. 중요한 차이점은 첫번째 형식은 환경변수를 생성할 때마다 새로운 이미지 레이어가 생성되고, 두번째는 하나의 이미지에서 모든 환경변수를 설정할 수도 있다는 것이다.

#### ARG
Docker 파일 내에서의 변수를 설정하는 명령이다. 이 명령에 의해 설정된 변수는 이미지 빌드 과정에서만 사용되고 구동된 컨테이너에서는 접근할 수 없다.
```
ARG <name>[=default]
```

#### WORKDIR
이 명령은 Dockerfile 의 여러 명령에서 `.` 에 해당하는 작업 디렉토리를 설정한다.
```
WORKDIR [path]
```
만약 경로에 해당하는 디렉토리가 존재하지 않으면, 디렉토리를 자동으로 생성한다.

#### USER
이 명령은 사용자를 설정하며 `USER [user]` 와 같이 쓴다.
#### LABEL
`LABEL <key>=<value>` 와 같이 사용하며, 제목, 버전, 관리자, 설명 등 이미지에 관련된 정보를 제공할 때 사용한다.
#### EXPOSE
컨테이너가 listen 중인 특정 포트를 외부에 노출시키고자 할 때 사용한다.
```
EXPOSE <port>
```

#### ADD, COPY
두 명령의 사용 형식은 다음과 같다.
```
ADD/COPY <host_path> <image_path>
ADD/COPY ["host_path", "image_path"]
```
두 명령은 기본적으로 호스트에 있는 파일을 이미지에 추가하는 기능을 한다. 다만 `ADD` 명령은 호스트 가 아닌 웹 등의 외부에 존재하는 파일도 전달할 수 있고, 아카이브 파일의 자동 압축 해제 등의 기능을 지원하는 반면, `COPY` 명령은 단순히 호스트에 존재하는 파일을 그대로 복사한다.

## 6장. Docker 이미지 공개
#### Github을 통한 이미지 자동 생성과 공개
Docker hub 은 github 과의 연동을 지원하는데, 계정 연동을 하면 github 에 공개한 Dockerfile(파일 이름이 Dockerfile 이어야함)을 자동으로 Docker hub 에 이미지로 빌드하여 올려준다.

#### Docker registry를 이용한 private registry 구축
##### Docker regsitry 다운 및 컨테이너 구동
Docker hub 에서 다운받을 수 있는 `registry` 를 컨테이너로 구동하면 로컬 레지스트리를 구성할 수 있다. 레지스트리는 5000번 포트를 `EXPOSE` 하고 있기 때문에, 컨테이너를 구동할 때, `docker run -dp <hostport>:5000 registry` 명령을 사용한다.

##### Docker 이미지 업로드
Docker 이미지의 업로드를 하려면 특정한 규칙에 따라 이미지에 태그를 붙여야 한다. 그 규칙은 다음과 같다.
```
docker image tag <local_image> <address>:<hostport>/<image name>
docker image tag my_ubuntu localhost:5000/my_registry_ubuntu
```
그런 다음, 다음과 같이 `docker push` 명령을 사용하면 컨테이너로 구동 중인 로컬 레지스트리에 이미지가 업로드 된다.
```
docker push localhost:5000/my_registry_ubuntu
```
##### Docker 이미지 다운로드
다운로드도 마찬가지로 `docker pull` 명령을 사용하면 되는데, 만약 레지스트리에 어떤 이미지가 있는지 보고 싶다면, 다음과 같은 명령을 사용한다.
```
curl http://localhost:<hostport>/v2/_catalog
```
이 명령을 사용하면 업로드한 이미지의 목록을 보여준다.

#### 클라우드를 이용한 프라이빗 레지스트리 구축
구글의 [Google Container Registry](https://console.cloud.google.com/apis/library/containerregistry.googleapis.com?q=googel%20container&id=345e3473-111d-4883-bae6-76295c034ed8&project=daring-cache-246402&pli=1) 를 사용하면 로컬이 아닌 클라우드에서 이미지를 관리할 수 있다.

# 7장. 여러 컨테이너의 운용 관리
