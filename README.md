# 1. Git 시작하기
### Git 설정
Git의 설정파일은 적용범위에 따라 다음과 같이 세가지 단계로 나뉜다.
* `/etc/gitconfig`: 시스템 전체에 적용되는 설정파일. `git config --system` 명령으로 읽고 쓸 수 있다.
* `~/.gitconfig`, `~/.config/git/config`: 특정 사용자에게만 적용되는 설정파일. `git config --global` 명령으로 읽고 쓸 수 있다.
* `./.git/config`: 특정 저장소에 적용되는 설정파일. `git config --local` 명령으로 읽고 쓸 수 있다.

적용범위가 적은 설정파일이 우선시 된다. `git config <key>` 명령을 통해 해당 설정을 확인할 수 있다. 아래의 명령어는 commit에서 사용될 사용자 정보를 설정하는 것인데, `--global` 옵션을 사용하면 한 번만 설정해주면 되고, `--local` 옵션을 통해 저장소마다 다른 사용자를 설정할 수도 있다(아무 옵션도 주지 않으면 `--local`이 디폴트이다).
```
git config --global user.name <User_name>
git config --global user.email <User_email>
```


# 2. Git의 기초
### Git 저장소 만들기
Git 저장소를 처음 만드는 방법은 크게 두가지가 있다. 프로젝트 디렉토리를 선정해서 그 디렉토리를 저장소로 만드는 방법이 첫 번째고, 기존의 저장소를 가져오는 것이 두 번째이다. 

첫 번째 방법은 해당 디렉토리로 들어가서 `git init` 명령을 실행하는 것이다. 그럼 자동으로 해당 디렉토리는 Git 저장소가 된다(즉, `.git` 디렉토리가 형성된다). 이후 commit을 하면 본격적으로 Git을 통한 관리를 시작하게 된다.  

두 번째 방법은 `git clone <url>`을 사용하는 것이다. 예를 들어, `git clone https://github.com/libgit2/libgit2` 명령을 사용하면 현재 디렉토리에 libgit2라는 디렉토리를 만들고 그 디렉토리를 Git 저장소로 만든다. 물론 이 저장소는 <url>의 저장소의 정보를 모두 담고 있다. 만약 특정 디렉토리를 저장소로 만들고 싶으면 `git clone <url> <path>` 명령을 사용하면 된다.
### Git Status
Git 저장소 안에 있는 파일은 크게 tracked와 untracked 상태로 나뉜다. tracked 파일은 Git에 의해 관리 되는 파일이고 untracked는 그 반대이다. 만약 `git init`을 통해 막 저장소를 만들었다면, 모든 파일은 untracked 상태일 것이다. 이는 `git status` 명령으로 확인할 수 있다. untracked 파일을 tracked 파일로 만들고 싶으면 `git add <file>` 명령을 사용하면 된다. 만약 로그나 임시 파일들과 같은 파일을 Git이 관리하게 하고 싶지 않으면 `.gitignore` 이라는 파일에 그 파일들을 적으면 된다. 해당 파일들은 `git status` 명령을 사용해도 untracked라 표시되지 않는다.

tracked 상태의 파일들은 다시 modifed, staged 상태로 나눌 수 있다. modifed는 말 그대로 수정된 파일인데, 이 내용을 commit하여 보존하고 싶으면 `git add` 명령을 통해 staged 상태로 만들고 commit 하면 된다. 만약 staged 파일을 내용은 보존하되 커밋에 포함하고 싶지 않으면 `git reset HEAD <file>` 명령을 사용하면 된다. 또, 수정한 내용을 버리고 싶으면 `git checkout -- <file>` 명령을 사용한다.

### Git Commit
저장하고 싶은 수정사항을 모두 staged 상태로 만들었다면, `git commit` 명령을 통해 staged 상태의 파일들을 저장할 수 있다. 모든 커밋은 commit message가 있어야 하는데, `git commit -m '<message>'` 명령을 통해 간단히 커밋할 수 있다. 만약 어떤 수정사항을 커밋했는데, 그 수정사항에 오류가 있다면 수정 후 다시 커밋하면 된다. 그런데 그 수정사항이 너무 사소해서 새로운 커밋을 만들기 애매하다면 `git commit --amend` 명령을 통해 바로 직전의 커밋을 수정할 수 있다.

### Remote 저장소
리모트 저장소는 협업을 위해 필수적인 개념으로 주로 프로젝트에 참여하는 사람들이 공유하는 저장소이다. `git remote add <name> <url>` 명령을 통해 새로운 리모트 저장소를 추가할 수 있고, `git remote` 명령을 통해 리모트 저장소의 목록을 볼 수 있다.

##### Remote 저장소 정보 가져오기
다음의 명령어를 통해 추가한 리모트 저장소의 정보를 가져올 수 있다.

    git fetch <remote>

물론 이 명령어는 단순히 정보를 가져오는 것으로 작업을 하고 싶으면 직접 브랜치를 만들어야 한다. `git pull` 명령어를 사용하면 이 작업을 자동화할 수 있다.

##### Remote 저장소에 브랜치 공유하기
다음의 명령어를 사용하면 원하는 브랜치를 리모트 저장소에 올릴 수 있다.

    git push <remote> <branch>
    
그 외에도 `git remote show <remote>` 명령을 통해 리모트 저장소의 상세 내용을 확인 할 수 있다.

# 3. Git 브랜치
### Git이 파일들을 관리하는 방법


