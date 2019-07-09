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
따로 브랜치를 만들지 않아도 기본적으로 master 브랜치가 존재하는데, 새로운 브랜치를 만들고 싶다면 `git branch <branch> <checksum>` 명령을 사용하면 된다(checksum의 일부만 입력해도 된다). checksum을 생략하면 헤드 브랜치와 같은 커밋을 가리키는 브랜치가 생성된다. 헤드 브랜치를 바꾸는 명령어는 `git checkout <branch>`이다. 커밋을 하면 헤드 브랜치는 자동으로 다음 커밋을 가리키고, 다른 브랜치는 움직이지 않는다.
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
