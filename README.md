# SPA Router 구현(with react, history API)

> 원티드 챌린지 중 spa-router 과제 내용입니다.
> 

<img src='https://github.com/bm4656/spa-router/assets/65716445/c9042777-488a-45f7-b523-a0a5c2a5d70e' width='500px'/>

## 요구 사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```
## 구현 내용

1. 먼저 페이지들을 만든 후 history API 테스트겸 페이지 이동을 구현해봤다.

```jsx
<button onClick={() => {
          history.pushState({ data: '/about' }, '', '/about');
        }}>
        about
</button>
```

2. Router, Route 컴포넌트를 구현했다.
- `<Router />` : props으로 children 받는 컴포넌트
- `<Route />` : props으로 {path: string, component: React.ReactNode} 를 받는 컴포넌트 -> 현재 url 경로와 path가 동일하면 컴포넌트 return.
3. `useRouter` :  {url:string} 을 받아 페이지 이동하는 push 기능 훅을 구현하였다.

```jsx
export default function useRouter() {
  const push = ({ state, url }: { state?: unknown; url: string }) => {
    history.pushState(state, '', url);
  };
return { push };
}
```

4. `history.pushState` 는 popstate 이벤트가 발생하지 않고, 뒤/앞으로 가기를 클릭 했을 때만 popstate 이벤트가 발생한다. 
5. 따라서 페이지 이동 후 나타나는 컴포넌트를 업데이트 해주기 위해 `window.onpopstate`를 사용하여 `handlePopState` 함수를 `onpopstate` 이벤트 핸들러로 등록해주었다.
```tsx
//useRouter.tsx
useEffect(() => {
    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null;
    };
  }, []);
```
7. `1) pushState 이용` `2) 뒤로가기` 의 페이지 이동 시 전역 컨텍스트의 pathname을 이동 후의 pathname으로 변경해준다.

```tsx
//useRouter.tsx
const { setPathname } = useContext(RouteContext);
const push = ({ state, url }: { state?: unknown; url: string }) => {
    history.pushState(state, '', url);
    setPathname(window.location.pathname);
  };

  const handlePopState = () => {
    setPathname(window.location.pathname);
  };
```

7. 전역 컨텍스트란 Router.tsx에서 route들을 감싸준 컨텍스트로 pathname에 대한 값을 가지고 있는데, 이를 route에서 props의 path와 컨텍스트의 pathname과 비교해서 맞는 컴포넌트만 return 해준다.
8. 컨텍스트를 사용한 이유는 popstate가 발생하지 않는 api이기에 화면 이동시 useEffect를 사용하더라도 변경이 안되었기 때문(?), 라우터들을 감싸는 우산(컨텍스트)으로 pathname 경로를 라우터 안에서 조회, 수정할 수 있도록 했다.

## 구현 중 공부한 내용

**History API**

> history API란 브라우저의 세션 기록을 조작할 수 있는 메소드를 담고 있는 객체
> 
- 기본적으로 뒤로가기, 앞으로가기, 페이지 이동 등을 조작 가능함
- html5에 새로 추가된 url 변경 메소드 → SPA!

```jsx
history.pushState({데이터 객체}, 페이지 제목 변경, 바꿀 주소)
history.replaceState(동일)
```

- 해당 메소드를 사용하면 현재 페이지의 url을 변경할 수 있고, **페이지가 갱신되지는 않지**만 실제로 페이지 이동으로 인식된다.

`pushState`

- 첫번째 인자: 데이터 객체를 전달, **history.state**에 저장되어 사용 가능
- 두번째 인자: 해당 페이지의 제목 변경(브라우저에서 기능이 구현되어 있지 않아 null을 전달)
- 세번째 인자: 변경할 url 주소
- 🔥 주의 : 브라우저에서 페이지를 이동하면 window.onpopstate 라는 이벤트가 발생하게 되는데, pushState는 popstate 이벤트가 발생하지 않고, 뒤/앞으로 가기를 클릭 했을 때만 popstate 이벤트가 발생!

`window.onpopstate`

- HTML5의 History API의 일부로서, 브라우저의 뒤로 가기 버튼이나 앞으로 가기 버튼을 클릭했을 때 발생하는 이벤트

`window.location.pathname`

- 현재 페이지의 URL 경로 부분
