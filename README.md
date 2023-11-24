### Summary

- 지금까지 필요를 통해 만들어진 node 서버들을 한곳으로 통합
- 젠킨스에 불필요하게 task 가 3개 올라와있을 필요가 없을 뿐더러 중복되는 기능(feature) 들이 있어서 하나로 통합처리

### AS-IS NodeServer

1. https://github.com/sieunju/node-memolist
2. https://github.com/sieunju/node-file-server
3. [https://github.com/sieunju/TIL/tree/develop/node-server](https://github.com/sieunju/TIL/tree/develop/node-server)

### TO-BE

- 옮기는 과정에서 EndPoint 규칙을 재정의
- API, HTML 인지에 따라서 앞에 /api or /view Path 설정

![](https://raw.githubusercontent.com/sieunju/node-web/develop/example_storage/node-web-arch.drawio.png)

### 서버 실행하는 명령어

```shell
node web-server.js
```
