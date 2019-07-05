Three.js 
==============================================
3D 랜더링에 사용되는 라이브러리.
원본 three.js파일을 다운 받아 HTML `<script link="js/three.js">`를 선언하여 사용 가능.
[문제점]
1. 언제나 메인 html파일이 전송된다면 three.js파일도 같이 전송되어야한다.
2. client의 웹브라우저 버전에 따른 업데이트를 해야한다.
3. 라이브러리 새 번전 체크 할 때 마다 버전 제어 diff파일에 명령어들이 쌓여서 알아보기 힘들다.

[해결 - 모듈을 통해 가져오기]
```js
npm install three

//requir or impor의 차이는?
var THREE = require('three');

//or

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

```

[웹브라우저에 대해]
- 구형 웹브라우저는 지원하지 않을 수 있다.
- three.js에서 사용되는 Javascript언어 기능이 있다.
- WebGL호환성도 꼭 확인하자.
- three.js는 기본적으로 WebGL1을 사용한다. 공식문서에 WebGL2를 사용하는 방법이 있다.

[3D model을 전송할 때]
3D model을 전송하려면 materials, textures, lights, cameras등이 포함된다. 공식 문서에서는 gITF의 사용을 권장하고 있다. 형식은 .GLB, .GLTF의 파일 형식이 있다.

[Migration(마이그레이션)]
어플리케이션 또는 모듈을 전혀 다른 환경에서 실행할 수 있도록 어플리케이션 또는 모듈의 함수들을 다른 환경의 비슷한 동작을 하는 함수로 변환,맵핑하는 작업을 말한다.
Js, WebGL의 버전에 주의

## How to update Things(객체)

## Curves(곡선)
선과 도형 중 곡선이 있는 도형의 point들을 설정하기 위해 사용되는 추가 요소이다.

## Material 
랜더링 될때 스타일에 대한 정보를 가지고 있다. 2D에서는 texture를 제외하고는 모두 사용 가능하다.

## Geometry


(주로 쓰이는 함수)
BufferGeometry

## Light
### AmbientLight
장면의모든 물체를 동등하게 비추는 빛

## Camera 객체
### 1_OrthographicCamera
이 카메라 객체를 사용하게 되면 랜더링 된 이미지의 객체 크기는 카메라와의 거리에 관계없이 일정하게 유지됩다.
2D장면, UI요소를 렌더링할 때 사용된다.

### 2_PerspectiveCamera
이 카메라는 3D장면 렌더링에 사용되는 가장 일반적인 투영모드이다.
