import { useState, useRef, useEffect, useLayoutEffect } from "react";

const Form = () => {
  const [warningText, setWarningText] = useState("");
  const [textColor, setTextColor] = useState("");
  const dummyNicknames = [
    "bravehong",
    "seobee",
    "mirakwon",
    "daniel7",
    "rain2943",
  ];
  const [inputs, setInputs] = useState({
    nickname: "",
    preferedPosition: "",
  });
  const { nickname, preferedPosition } = inputs;
  const inputRef = useRef(null);
  let typingTimer;

  // 만약에 타이핑을 하면 onChange 이벤트로 setTimeout으로 api를 보낸다
  // 이 때, api를 보내는 순간에 특정 flag가 true여야만 보내는걸로 해놓기
  // onChange를 할 떄는 flag= false 임
  // 근데 onChange로 setState를 한다음에는 flag= true 임
  // 이런식으로 구현

  const changeInputs = (e) => {
    if (
      e.target.value.at(-1) === " " ||
      e.target.value.replace(/ /g, "").length !== e.target.value.length
    ) {
      setWarningText("이름에 공백을 사용할 수 없습니다.");
      return;
    } else {
      setWarningText("");
      setInputs((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  useLayoutEffect(() => {
    if (warningText === "사용하기에 좋은 이름입니다.") setTextColor("blue");
    else setTextColor("red");
  }, [warningText]);

  //   const LINE_FEED = 10; // '\n'

  //   function getByteLength(decimal) {
  //     return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
  //   }

  //   function getByte(str) {
  //     return str
  //       .split("")
  //       .map((s) => s.charCodeAt(0))
  //       .reduce(
  //         (prev, unicodeDecimalValue) =>
  //           prev + getByteLength(unicodeDecimalValue),
  //         0
  //       );
  //   }

  const checkNickname = (param) => {
    if (param.length < 3) {
      setWarningText("이름이 너무 짧습니다.");
      return false;
    } else if (param.length > 12) {
      setWarningText("최대 6자 이내로 이름을 설정해주세요.");
      return false;
    } else {
      const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
      if (special_pattern.test(param) === true) {
        setWarningText("특수문자를 사용할 수 없습니다.");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener("keyup", (e) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          clearTimeout(typingTimer);
          if (!checkNickname(e.target.value)) return;
          if (dummyNicknames.includes(e.target.value)) {
            setWarningText("동일한 이름이 존재합니다.");
          } else {
            setWarningText("사용하기에 좋은 이름입니다.");
          }
        }, 700);
      });
      inputRef.current.addEventListener("keydown", (e) => {
        clearTimeout(typingTimer);
      });

      return () => {
        inputRef.current.removeEventListener("keyup", (e) => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(() => console.log("api"), 700);
        });
        inputRef.current.removeEventListener("keydown", (e) => {
          clearTimeout(typingTimer);
        });
      };
    }
  }, []);

  return (
    <div>
      <span style={{ color: textColor, marginBottom: "5px" }}>
        {warningText}
      </span>
      <br />
      <input
        ref={inputRef}
        name="nickname"
        type="text"
        onChange={changeInputs}
        value={nickname}
        autoComplete={"off"}
      />
      <br />
      <select
        style={{
          marginTop: "100px",
        }}
        name="preferedPosition"
        onChange={changeInputs}
        value={preferedPosition}
      >
        <option>게임 기획</option>
        <option>게임 프로그래밍</option>
        <option>AI</option>
        <option>엔터테인먼트</option>
        <option>QA</option>
        <option>서비스 플랫폼 개발</option>
        <option>보안</option>
        <option>경영 지원</option>
        <option>시스템 엔지니어링</option>
        <option>PM</option>
      </select>
    </div>
  );
};

export default Form;
// 1	최소 글자 미만	3byte 미만 타이핑된 상태 (n<3)	이름이 너무 짧습니다.
// 2	최대 글자 초과	12byte 초과 타이핑된 상태 (n>12)	최대 6자 이내로 이름을 설정해주세요.
// 3	공백 포함	스페이스바를 사용한 즉시	이름에 공백을 사용할 수 없습니다.
// 4	특수문자 포함	특수 문자 사용한 즉시	특수문자를 사용할 수 없습니다.
// 5	금칙어 포함
// 운영자, 관리자, 인사담당자 +

// 아래 8444개가 포함됐을 경우
// forbidden_words_list_05.xlsx

// 사용할 수 없는 단어가 포함된 이름입니다.
// 6	이름 중복	서버 내 이미 생선된 이름과 중복될 경우	동일한 이름이 존재합니다.
// 7	검증 완료	위 조건에 모두 해당 안될 때	사용하기에 좋은 이름입니다.

//
// - 공백을 입력했을 경우 => 아예 못치게하고 경고를 띄울지 || 치게하고 경고를 띄울지 || 그냥 못치게할지

// 누를순 있다
// bravehongrwrwrwr;

// hyk199
